import { MutableRefObject } from "react";
import { annictQuery, generateAnilistQuery } from "@/features/api/query";
import { processAnilistGenres } from "@/features/genre";
import { fetchFromAnnict, fetchFromAnilist } from "@/features/api/fetch";
import type {
    AnilistQueryResult,
    AnnictQueryResult,
    UserData,
    Store,
} from "@/features/types/index";
import { extractDataFromQuery } from "@/features/extract-data";
import { updateData, getDataFromLocalStorage, saveDataToLocalStorage } from "@/features/utils";

export function fetchData(token: string, store: Store, hasFetched: MutableRefObject<boolean>) {
    const {
        setStatusCount,
        setRecordDataSets,
        setStatusDataSets,
        setMediaCount,
        activeDays,
        setActiveDays,
        setSeasonYearData,
        setGenresData,
        setIsLoading,
    } = store;

    if (token === "" || hasFetched.current || activeDays !== undefined) return;
    hasFetched.current = true;

    const fetchData = async () => {
        setIsLoading({ status: true, message: "Annictから視聴記録を取得しています。" });

        const storedData: UserData = getDataFromLocalStorage("annictData");
        const storedUserData = storedData || null;
        const beforeCursor = {
            activities: storedUserData?.activities.pageInfo.startCursor || null,
            works: storedUserData?.works.pageInfo.startCursor || null,
        };

        const annictFetchResult: AnnictQueryResult = await fetchFromAnnict(
            annictQuery(beforeCursor),
            token
        );

        if (!annictFetchResult.data) {
            setIsLoading({ status: false, message: "" });
            return;
        }

        const newUserData = annictFetchResult.data.viewer;

        // 保存されたデータに新しいデータを追加
        const updatedData = updateData(storedUserData, newUserData);
        saveDataToLocalStorage("annictData", updatedData);

        const dataSets = extractDataFromQuery(updatedData, newUserData);
        setStatusCount(dataSets.watchCounts);
        setRecordDataSets(dataSets.recordData);
        setStatusDataSets(dataSets.statusData);
        setMediaCount(dataSets.mediaCount);
        setActiveDays(dataSets.activeDays);
        setSeasonYearData(dataSets.seasonYearData);

        setIsLoading({ status: true, message: "Anilistからジャンルデータを取得しています。" });

        if (dataSets.anilistIds.length > 0) {
            const pages = Math.ceil(dataSets.anilistIds.length / 50);
            const anilistFetchResult: AnilistQueryResult = await fetchFromAnilist(
                generateAnilistQuery(pages),
                dataSets.anilistIds
            );

            if (!anilistFetchResult?.data) {
                setIsLoading({ status: false, message: "" });
                return;
            }

            const { genreCount, genreDetails } = processAnilistGenres(
                anilistFetchResult.data,
                dataSets.anilistIds
            );
            setGenresData({ genreCount, genreDetails });
        } else {
            const { genreCount, genreDetails } = processAnilistGenres({}, dataSets.anilistIds);
            setGenresData({ genreCount, genreDetails });
        }

        setIsLoading({ status: false, message: "" });
    };

    fetchData();
}
