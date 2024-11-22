import { ChartConfig } from "@/components/ui/chart";
import { GenreData } from "@/features/types/index";

export const statusTimeChartConfig = {
    value: {
        label: "月別",
        color: "hsl(var(--chart-1))",
    },
    totalValue: {
        label: "累積",
        color: "hsl(var(--chart-4))",
    },
} satisfies ChartConfig;

export const recordChartConfig = {
    monthly: {
        value: {
            label: "月別",
            color: "hsl(var(--chart-1))",
        },
        totalValue: {
            label: "累積",
            color: "hsl(var(--chart-4))",
        },
    },
    daily: {
        value: {
            label: "日別",
            color: "hsl(var(--chart-1))",
        },
        totalValue: {
            label: "累積",
            color: "hsl(var(--chart-4))",
        },
    },
} as { [key: string]: ChartConfig };

export const seasonChartConfig = {
    value: {
        label: "年間",
        color: "hsl(var(--chart-1))",
    },
};

export const mediaChartConfig = {
    TV: {
        label: "TV",
        color: "hsl(var(--chart-1))",
    },
    MOVIE: {
        label: "映画",
        color: "hsl(var(--chart-2))",
    },
    OVA: {
        label: "OVA",
        color: "hsl(var(--chart-3))",
    },
    WEB: {
        label: "WEB",
        color: "hsl(var(--chart-4))",
    },
    OTHER: {
        label: "その他",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig;

export const statusPercentChartConfig = {
    watchedCount: {
        label: "見た",
        color: "hsl(var(--chart-1))",
    },
    stopWatchingCount: {
        label: "視聴中止",
        color: "hsl(var(--chart-2))",
    },
    wannaWatchCount: {
        label: "見たい",
        color: "hsl(var(--chart-3))",
    },
    watchingCount: {
        label: "見てる",
        color: "hsl(var(--chart-4))",
    },
    onHoldCount: {
        label: "一時中断",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig;

export const createMediaChartConfig = (genresData: GenreData) => {
    const config: { [key: string]: { label: string; color: string } } = {};
    const colorOrder = [1, 2, 3, 4, 5, 6, 7];
    genresData.genreCount.forEach((genre, index) => {
        config[genre.type.replace("/", "-")] = {
            label: genre.type, // ラベルを修正
            color: `hsl(var(--chart-${colorOrder[index % colorOrder.length]}))`,
        };
    });
    return config;
};
