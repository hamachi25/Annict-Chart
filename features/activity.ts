import type { UserData } from "@/features/types/index";
import {
    generateDateCountMap,
    getSortedDates,
    getToday,
    getStartDate,
    getAllDates,
    createAllTimeData,
    calculateActiveDays,
    getMonthlySummary,
    calculateTotalMonths,
    calculateCumulativeSum,
    createEmptyStatusData,
    filterEpisodes,
    filterStatuses,
    calculateMediaCount,
    getLast30DaysSummary,
} from "./utils";

// エピソード活動データを抽出する関数
export function episodeActivity(data: UserData) {
    const episodes = filterEpisodes(data); // エピソードをフィルタリング
    const dateCountMap = generateDateCountMap(episodes); // 日付ごとのエピソード数をカウント

    const dates = getSortedDates(dateCountMap); // 日付をソート
    const today = getToday(); // 今日の日付を取得
    const startDate = getStartDate(dates); // 開始日を取得

    const dateArray = getAllDates(startDate, today); // 開始日から今日までの日付の配列を作成
    const allTimeData = createAllTimeData(dateArray, dateCountMap); // 全期間のデータを作成

    const activeDays = calculateActiveDays(allTimeData); // アクティブな日数を計算

    const last30DaysData = getLast30DaysSummary(dateCountMap, today); // 30日間のデータを取得
    const recordData = [
        last30DaysData,
        calculateCumulativeSum(getMonthlySummary(allTimeData, 6, today)),
        calculateCumulativeSum(getMonthlySummary(allTimeData, 12, today)),
        calculateCumulativeSum(
            getMonthlySummary(allTimeData, calculateTotalMonths(today, startDate), today)
        ),
    ];

    return {
        last30d: recordData[0],
        last6m: recordData[1],
        last1y: recordData[2],
        All: recordData[3],
        activeDays,
    };
}

// ステータス活動データを抽出する関数
export function statusActivity(data: UserData) {
    const statuses = filterStatuses(data); // ステータスをフィルタリング
    const dateCountMap = generateDateCountMap(statuses); // 日付ごとのステータス数をカウント

    const mediaCount = calculateMediaCount(statuses); // メディアの数を計算

    const dates = getSortedDates(dateCountMap); // 日付をソート
    // 日付が存在しない場合、空のデータを返す
    if (dates.length === 0) {
        return createEmptyStatusData(mediaCount);
    }

    const today = getToday(); // 今日の日付を取得
    const startDate = getStartDate(dates); // 開始日を取得

    const dateArray = getAllDates(startDate, today); // 開始日から今日までの日付の配列を作成
    const allTimeData = createAllTimeData(dateArray, dateCountMap); // 全期間のデータを作成

    const statusData = [6, 12, calculateTotalMonths(today, startDate)].map((period) =>
        calculateCumulativeSum(getMonthlySummary(allTimeData, period, today))
    );

    return {
        last6m: statusData[0],
        last1y: statusData[1],
        All: statusData[2],
        mediaCount,
    };
}
