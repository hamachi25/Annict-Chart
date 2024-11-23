import { PercentChart } from "@/components/chart/percent-chart";
import { GenreCard } from "@/components/genres/genre-card";

import type { GenreData } from "@/features/types";
import { createMediaChartConfig } from "@/features/chart-config";

export default function GenreChart({ genresData }: { genresData: GenreData }) {
    const mediaChartConfig = createMediaChartConfig(genresData);
    return (
        <>
            <PercentChart
                title="ジャンル分布"
                chartData={genresData.genreCount}
                chartConfig={mediaChartConfig}
            />
            <GenreCard data={genresData.genreDetails} />
        </>
    );
}
