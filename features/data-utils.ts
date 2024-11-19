import type { TimeSeriesData, QueryResult } from "@/features/types/index";
import { episodeActivity, statusActivity } from "./activity-utils";
import { extractWatchCounts } from "./watch-utils";
import { calculateSeasonYears } from "./work-utils";

export function extractDataFromQuery(result: QueryResult) {
    const data = result.data.viewer;
    const recordData = episodeActivity(data);
    const statusData = statusActivity(data);
    const watchCounts = extractWatchCounts(data);
    const seasonYearData = calculateSeasonYears(data);

    return {
        watchCounts,
        recordData: extractRecordData(recordData),
        statusData: extractStatusData(statusData),
        mediaCount: statusData.mediaCount,
        activeDays: recordData.activeDays,
        seasonYearData,
        anilistIds: statusData.anilistIds,
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
