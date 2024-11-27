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
    version: number;
    wannaWatchCount: number;
    watchingCount: number;
    watchedCount: number;
    onHoldCount: number;
    stopWatchingCount: number;
    recordsCount: number;
    works: {
        pageInfo: { endCursor: string };
        nodes: { annictId: number; seasonYear: number }[];
    };
    activities: {
        pageInfo: { endCursor: string };
        edges: { item: ActivityItem }[];
    };
};

export type AnnictQueryResult = {
    data: {
        viewer: UserData;
    };
};

export type RecordDataSets = {
    last30d: TimeSeriesData[];
    last6m: TimeSeriesData[];
    last1y: TimeSeriesData[];
    All: TimeSeriesData[];
};

export type StatusDataSets = {
    last6m: TimeSeriesData[];
    last1y: TimeSeriesData[];
    All: TimeSeriesData[];
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

export type Store = {
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
};
