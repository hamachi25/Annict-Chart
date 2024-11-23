import type { TimeSeriesData, UserData } from "@/features/types/index";
import { episodeActivity, statusActivity } from "./activity";
import { extractWatchCounts } from "./watch-counts";
import { calculateSeasonYears, generateAnilistIds } from "./watched-work";

export function extractDataFromQuery(userData: UserData, newUserData: UserData) {
    const recordData = episodeActivity(userData);
    const statusData = statusActivity(userData);
    const watchCounts = extractWatchCounts(userData);
    const seasonYearData = calculateSeasonYears(userData);
    const anilistIds = generateAnilistIds(newUserData);

    return {
        watchCounts,
        recordData: extractRecordData(recordData),
        statusData: extractStatusData(statusData),
        mediaCount: statusData.mediaCount,
        activeDays: recordData.activeDays,
        seasonYearData,
        anilistIds,
    };
}

function extractRecordData(recordData: {
    last30d: TimeSeriesData[];
    last6m: TimeSeriesData[];
    last1y: TimeSeriesData[];
    All: TimeSeriesData[];
}) {
    return {
        last30d: recordData.last30d,
        last6m: recordData.last6m,
        last1y: recordData.last1y,
        All: recordData.All,
    };
}

function extractStatusData(statusData: {
    last6m: TimeSeriesData[];
    last1y: TimeSeriesData[];
    All: TimeSeriesData[];
}) {
    return {
        last6m: statusData.last6m,
        last1y: statusData.last1y,
        All: statusData.All,
    };
}
