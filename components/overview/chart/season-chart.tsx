"use client";

import * as React from "react";
import { TimeSeriesChart } from "../../chart/time-series-chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { TimeSeriesData } from "@/features/types";
import { seasonChartConfig } from "@/features/chart-config";

export function SeasonChart(props: { chartData: TimeSeriesData[] }) {
    const totalValue = props.chartData.reduce((sum, item) => sum + item.value, 0);

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 py-4 px-6">
                    <CardTitle className="flex gap-2 items-center">アニメの放送年度</CardTitle>
                    <CardDescription>視聴したアニメの放送年度</CardDescription>
                </div>
                <div className="flex">
                    <div className="relative z-30 flex flex-1 flex-row gap-1 border-t px-6 py-3 text-left sm:flex-col sm:justify-center sm:border-l sm:border-t-0 sm:px-10 sm:py-4">
                        <span className="text-xs text-muted-foreground">累計</span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                            {totalValue}
                        </span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="px-2 pt-6 sm:p-6">
                <TimeSeriesChart
                    data={props.chartData}
                    chartConfig={seasonChartConfig}
                    xAxisFormatter={(value) => `${value}年`}
                    tooltipFormatter={(value) => `${value}年`}
                    yAxisLabels={{ left: "年間記録" }}
                    chartType="line"
                />
            </CardContent>
        </Card>
    );
}
