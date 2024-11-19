import { useRef } from "react";
import { annictQuery, generateAnilistQuery } from "@/features/api/query";
import { processAnilistGenres } from "@/features/genre-utils";
import { extractDataFromQuery } from "@/features/data-utils";
import { fetchFromAnnict, fetchFromAnilist } from "@/features/api/fetch";
import type { AnilistQueryResult } from "@/features/types/index";
import { useStore } from "@/lib/store";

export function useFetchData(token: string) {
    const {
        setStatusCount,
        setRecordDataSets,
        setStatusDataSets,
        setMediaCount,
        activeDays,
        setActiveDays,
        setSeasonYearData,
        setGenresData,
        isLoading,
        setIsLoading,
    } = useStore();

    const hasFetched = useRef(false);

    if (token === "") return { isLoading: true };

    if (hasFetched.current || activeDays !== undefined) return { isLoading };
    hasFetched.current = true;

    const fetchData = async () => {
        setIsLoading({ status: true, message: "Annictから視聴記録を取得しています。" });

        const annictFetchResult = await fetchFromAnnict(annictQuery, token);

        if (!annictFetchResult.data) {
            setIsLoading({ status: false, message: "" });
            return;
        }

        const dataSets = extractDataFromQuery(annictFetchResult);
        setStatusCount(dataSets.watchCounts);
        setRecordDataSets(dataSets.recordData);
        setStatusDataSets(dataSets.statusData);
        setMediaCount(dataSets.mediaCount);
        setActiveDays(dataSets.activeDays);
        setSeasonYearData(dataSets.seasonYearData);

        setIsLoading({ status: true, message: "Anilistからジャンルデータを取得しています。" });

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
            anilistFetchResult,
            dataSets.anilistIds
        );
        setGenresData({ genreCount, genreDetails });

        setIsLoading({ status: false, message: "" });
    };

    fetchData();
}
