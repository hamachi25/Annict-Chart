export type TimeSeriesData = {
    date: string;
    value: number;
    totalValue?: number;
};

export type PieChartCount = {
    type: string;
    fill: string;
    value: number;
    percentage: number;
}[];

export type ActivityItem = {
    __typename: string;
    createdAt: string;
    state?: string;
    work?: {
        media: "MOVIE" | "OTHER" | "OVA" | "TV" | "WEB";
        seasonYear: number;
        annictId: number;
    };
};

export type UserData = {
    wannaWatchCount: number;
    watchingCount: number;
    watchedCount: number;
    onHoldCount: number;
    stopWatchingCount: number;
    recordsCount: number;
    works: {
        nodes: { seasonYear: number }[];
    };
    activities: {
        edges: { item: ActivityItem }[];
    };
};

export type QueryResult = {
    data: {
        viewer: UserData;
    };
};

export type RecordDataSets = {
    last30d: TimeSeriesData[];
    last6m: TimeSeriesData[];
    last1y: TimeSeriesData[];
    All: TimeSeriesData[];
    AllperYear: TimeSeriesData[];
};

export type StatusDataSets = {
    last6m: TimeSeriesData[];
    last1y: TimeSeriesData[];
    All: TimeSeriesData[];
    AllperYear: TimeSeriesData[];
};

export type AnilistMediaItem = {
    id: number;
    title: {
        native: string;
    };
    genres: string[];
    coverImage: {
        large: string;
    };
};

export type AnilistQueryResult = {
    data: {
        [key: string]: {
            media: AnilistMediaItem[];
        };
    };
};

export type GenreData = {
    genreCount: PieChartCount;
    genreDetails: {
        [key: string]: { title: string; coverImage: string; annictId: number | undefined }[];
    };
};
