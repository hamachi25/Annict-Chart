import type { TimeSeriesData, UserData } from "./types";

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
