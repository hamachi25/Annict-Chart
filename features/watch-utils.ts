import type { PieChartCount, UserData } from "@/features/types/index";

// 視聴カウントデータを抽出する関数
export function extractWatchCounts(data: UserData): PieChartCount {
    const total = calculateTotalWatchCount(data);

    const watchCounts: PieChartCount = createWatchCounts(data);

    // percentageを計算して追加
    watchCounts.forEach((count) => {
        count.percentage = total > 0 ? Math.floor((count.value / total) * 100) : 0;
    });

    // valueの多い順に並び替える
    watchCounts.sort((a, b) => b.value - a.value);

    return watchCounts;
}

// 総視聴カウントを計算する関数
export function calculateTotalWatchCount(data: UserData) {
    return (
        data.wannaWatchCount +
        data.watchingCount +
        data.watchedCount +
        data.onHoldCount +
        data.stopWatchingCount
    );
}

// 視聴カウントを作成する関数
export function createWatchCounts(data: UserData): PieChartCount {
    return [
        {
            type: "wannaWatchCount",
            fill: "var(--color-wannaWatchCount)",
            value: data.wannaWatchCount,
            percentage: 0,
        },
        {
            type: "watchingCount",
            fill: "var(--color-watchingCount)",
            value: data.watchingCount,
            percentage: 0,
        },
        {
            type: "watchedCount",
            fill: "var(--color-watchedCount)",
            value: data.watchedCount,
            percentage: 0,
        },
        {
            type: "onHoldCount",
            fill: "var(--color-onHoldCount)",
            value: data.onHoldCount,
            percentage: 0,
        },
        {
            type: "stopWatchingCount",
            fill: "var(--color-stopWatchingCount)",
            value: data.stopWatchingCount,
            percentage: 0,
        },
    ];
}
