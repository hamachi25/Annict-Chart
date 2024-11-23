import type { TimeSeriesData, UserData } from "./types";
import { arm } from "@kawaiioverflow/arm";

// シーズン年データを計算する関数
export function calculateSeasonYears(data: UserData): TimeSeriesData[] {
    const seasonYearCountMap: { [year: string]: number } = {};
    const currentYear = new Date().getFullYear();

    data.works.nodes.forEach((work) => {
        const year = work.seasonYear;
        seasonYearCountMap[year] = (seasonYearCountMap[year] || 0) + 1;
    });

    for (
        let year = Math.min(...Object.keys(seasonYearCountMap).map(Number));
        year <= currentYear;
        year++
    ) {
        if (!seasonYearCountMap[year]) {
            seasonYearCountMap[year] = 0;
        }
    }

    return Object.keys(seasonYearCountMap).map((year) => ({
        date: year,
        value: seasonYearCountMap[year],
    }));
}

// anilist_idを取得して配列にする
export function generateAnilistIds(data: UserData): number[] {
    return data.works.nodes
        .map((work) => {
            const match = arm.find((item) => item.annict_id === work.annictId);
            return match ? match.anilist_id : undefined;
        })
        .filter((id): id is number => id !== undefined);
}
