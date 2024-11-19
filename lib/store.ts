import { initializeGenreData } from "@/features/genre-utils";

import type { TimeSeriesData } from "@/features/types";
import type {
    PieChartCount,
    RecordDataSets,
    StatusDataSets,
    GenreData,
} from "@/features/types/index";

import { create } from "zustand";

export const useStore = create<{
    statusCount: PieChartCount;
    setStatusCount: (statusCount: PieChartCount) => void;
    recordDataSets: RecordDataSets;
    setRecordDataSets: (recordDataSets: RecordDataSets) => void;
    statusDataSets: StatusDataSets;
    setStatusDataSets: (statusDataSets: StatusDataSets) => void;
    mediaCount: PieChartCount;
    setMediaCount: (mediaCount: PieChartCount) => void;
    activeDays: number | undefined;
    setActiveDays: (activeDays: number) => void;
    seasonYearData: TimeSeriesData[];
    setSeasonYearData: (seasonYearData: TimeSeriesData[]) => void;
    genresData: GenreData;
    setGenresData: (genresData: GenreData) => void;
    isLoading: {
        status: boolean;
        message: string;
    };
    setIsLoading: (isLoading: { status: boolean; message: string }) => void;
}>((set) => ({
    statusCount: [
        { type: "wannaWatchCount", fill: "var(--color-wannaWatchCount)", value: 0, percentage: 0 },
        { type: "watchingCount", fill: "var(--color-watchingCount)", value: 0, percentage: 0 },
        { type: "watchedCount", fill: "var(--color-watchedCount)", value: 0, percentage: 0 },
        { type: "onHoldCount", fill: "var(--color-onHoldCount)", value: 0, percentage: 0 },
        {
            type: "stopWatchingCount",
            fill: "var(--color-stopWatchingCount)",
            value: 0,
            percentage: 0,
        },
    ],
    setStatusCount: (statusCount) => set({ statusCount }),

    recordDataSets: {
        last30d: [],
        last6m: [],
        last1y: [],
        All: [],
        AllperYear: [],
    },
    setRecordDataSets: (recordDataSets) => set({ recordDataSets }),

    statusDataSets: {
        last6m: [],
        last1y: [],
        All: [],
        AllperYear: [],
    },
    setStatusDataSets: (statusDataSets) => set({ statusDataSets }),

    mediaCount: [
        { type: "MOVIE", value: 0, fill: "var(--color-MOVIE)", percentage: 0 },
        { type: "OTHER", value: 0, fill: "var(--color-OTHER)", percentage: 0 },
        { type: "OVA", value: 0, fill: "var(--color-OVA)", percentage: 0 },
        { type: "TV", value: 0, fill: "var(--color-TV)", percentage: 0 },
        { type: "WEB", value: 0, fill: "var(--color-WEB)", percentage: 0 },
    ],
    setMediaCount: (mediaCount) => set({ mediaCount }),

    activeDays: undefined,
    setActiveDays: (activeDays) => set({ activeDays }),

    seasonYearData: [],
    setSeasonYearData: (seasonYearData) => set({ seasonYearData }),

    genresData: initializeGenreData(),
    setGenresData: (genresData) => set({ genresData }),

    isLoading: {
        status: true,
        message: "",
    },
    setIsLoading: (isLoading) => set({ isLoading }),
}));
