"use client";

import * as React from "react";
import { TimeSeriesChart } from "../../chart/time-series-chart";
import { Card, CardContent } from "@/components/ui/card";
import type { TimeSeriesData } from "@/features/types";
import { seasonChartConfig } from "@/features/chart-config";
import { TimeSeriesCardHeader } from "@/components/overview/card-header";

export function SeasonChart(props: { chartData: TimeSeriesData[] }) {
    const totalValue = props.chartData.reduce((sum, item) => sum + item.value, 0);

    return (
        <Card>
            <TimeSeriesCardHeader
                title="アニメの放送年度"
                description="視聴したアニメの放送年度"
                totalValue={totalValue}
            />

            <CardContent className="px-2 pt-6 sm:p-6">
                <TimeSeriesChart
                    data={props.chartData}
                    chartConfig={seasonChartConfig}
                    xAxisFormatter={(value) => value}
                    tooltipFormatter={(value) => `${value}年`}
                    yAxisLabels={{}}
                    chartType="line"
                />
            </CardContent>
        </Card>
    );
}
