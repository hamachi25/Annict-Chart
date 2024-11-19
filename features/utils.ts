import type { TimeSeriesData, ActivityItem, PieChartCount, UserData } from "@/features/types/index";

// 日付の範囲内のすべての日付を取得する関数
export function getAllDates(startDate: Date, endDate: Date): string[] {
    const dateArray: string[] = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        dateArray.push(formatDateToISO(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
}

// 月ごとのサマリーを取得する関数
export function getMonthlySummary(
    data: TimeSeriesData[],
    months: number,
    today: Date
): TimeSeriesData[] {
    const result: { [month: string]: number } = {};
    const startMonth = new Date(today);
    startMonth.setMonth(startMonth.getMonth() - months + 1);
    startMonth.setDate(1);

    data.forEach(({ date, value }) => {
        const dateObj = new Date(date);
        if (dateObj < startMonth) return;
        const monthStr = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`;
        result[monthStr] = (result[monthStr] || 0) + value;
    });

    const filledMonthsArray: string[] = [];
    for (
        let currentMonth = new Date(startMonth);
        currentMonth <= today;
        currentMonth.setMonth(currentMonth.getMonth() + 1)
    ) {
        const monthStr = `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`;
        filledMonthsArray.push(monthStr);
    }

    return filledMonthsArray.map((month) => ({
        date: month,
        value: result[month] || 0,
    }));
}

// 累積和を計算する関数
export function calculateCumulativeSum(data: TimeSeriesData[]): TimeSeriesData[] {
    let totalSum = 0;
    return data.map((entry) => {
        totalSum += entry.value;
        return { ...entry, totalValue: totalSum };
    });
}

// 日付をISO形式にフォーマットする関数
export const formatDateToISO = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
};

// JSTの日付文字列に変換する関数
export function convertToJSTDateString(dateString: string): string {
    const utcDate = new Date(dateString);
    const jstTimestamp = utcDate.getTime() + 9 * 60 * 60 * 1000;
    const jstDate = new Date(jstTimestamp);
    return jstDate.toISOString().split("T")[0]; // JSTの日付部分を取得
}

// 日付カウントマップを生成する関数
export function generateDateCountMap(items: { createdAt: string }[]): {
    [key: string]: number;
} {
    const dateCountMap: { [key: string]: number } = {};
    items.forEach((item) => {
        const date = convertToJSTDateString(item.createdAt);
        dateCountMap[date] = (dateCountMap[date] || 0) + 1;
    });
    return dateCountMap;
}

// 日付をソートする関数
export function getSortedDates(dateCountMap: { [key: string]: number }): string[] {
    return Object.keys(dateCountMap).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
}

// 今日の日付を取得する関数
export function getToday(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}

// 開始日を取得する関数
export function getStartDate(dates: string[]): Date {
    const startDate = dates.length > 0 ? new Date(dates[0]) : new Date();
    startDate.setHours(0, 0, 0, 0);
    return startDate;
}

// 全期間データを作成する関数
export function createAllTimeData(
    dateArray: string[],
    dateCountMap: { [key: string]: number }
): TimeSeriesData[] {
    return dateArray.map((date) => ({
        date: date,
        value: dateCountMap[date] || 0,
    }));
}

// 活動日数を計算する関数
export function calculateActiveDays(allTimeData: TimeSeriesData[]): number {
    return allTimeData.filter((data) => data.value > 0).length;
}

// レコードデータを作成する関数
export function createRecordData(
    today: Date,
    dateCountMap: { [key: string]: number },
    days: number
): TimeSeriesData[] {
    const start = new Date(today);
    start.setDate(today.getDate() - days + 1);
    const dateArray = getAllDates(start, today);
    return dateArray.map((date) => ({
        date: date,
        value: dateCountMap[date] || 0,
    }));
}

// 合計月数を計算する関数
export function calculateTotalMonths(today: Date, startDate: Date): number {
    return (
        (today.getFullYear() - startDate.getFullYear()) * 12 +
        (today.getMonth() - startDate.getMonth()) +
        1
    );
}

// 空のステータスデータを作成する関数
export function createEmptyStatusData(mediaCount: PieChartCount) {
    return {
        last6m: [],
        last1y: [],
        All: [],
        mediaCount,
        seasonYearData: [],
        anilistIds: [],
    };
}

// エピソードをフィルタリングする関数
export function filterEpisodes(data: UserData): ActivityItem[] {
    return data.activities.edges
        .map((edge) => edge.item)
        .filter((item) => item.__typename === "Record");
}

// ステータスをフィルタリングする関数
export function filterStatuses(data: UserData): ActivityItem[] {
    return data.activities.edges
        .map((edge) => edge.item)
        .filter((item) => item.__typename === "Status" && item.state === "WATCHED");
}

// メディアカウントを計算する関数
export function calculateMediaCount(statuses: ActivityItem[]): PieChartCount {
    const mediaCount: PieChartCount = initializeMediaCount();

    statuses.forEach((status) => {
        if (status.work && status.work.media) {
            const media = mediaCount.find((m) => m.type === status.work?.media);
            if (media) {
                media.value += 1;
            }
        }
    });

    const total = mediaCount.reduce((sum, media) => sum + media.value, 0);

    mediaCount.forEach((media) => {
        media.percentage = total > 0 ? Math.floor((media.value / total) * 100) : 0;
    });

    mediaCount.sort((a, b) => b.value - a.value);

    return mediaCount;
}

// メディアカウントを初期化する関数
export function initializeMediaCount(): PieChartCount {
    return [
        { type: "MOVIE", value: 0, fill: "var(--color-MOVIE)", percentage: 0 },
        { type: "OTHER", value: 0, fill: "var(--color-OTHER)", percentage: 0 },
        { type: "OVA", value: 0, fill: "var(--color-OVA)", percentage: 0 },
        { type: "TV", value: 0, fill: "var(--color-TV)", percentage: 0 },
        { type: "WEB", value: 0, fill: "var(--color-WEB)", percentage: 0 },
    ];
}
