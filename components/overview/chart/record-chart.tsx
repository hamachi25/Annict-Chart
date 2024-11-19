"use client";

import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import type { TimeSeriesData } from "@/features/types";
import { TimeSeriesChart } from "@/components/chart/time-series-chart";
import { recordChartConfig } from "@/features/chart-config";

type TimeRange = "last30d" | "last6m" | "last1y" | "All";

const getTimeRangeDescription = (timeRange: string): string => {
    switch (timeRange) {
        case "last30d":
            return "過去30日間";
        case "last6m":
            return "過去6ヶ月間";
        case "last1y":
            return "過去1年間";
        case "All":
            return "全期間";
        default:
            return "";
    }
};

export function RecordChart(props: {
    chartData: {
        last30d: TimeSeriesData[];
        last6m: TimeSeriesData[];
        last1y: TimeSeriesData[];
        All: TimeSeriesData[];
    };
}) {
    const [timeRange, setTimeRange] = React.useState<TimeRange>("All");

    const totalValue = props.chartData[timeRange].reduce((sum, item) => sum + item.value, 0);

    const formatDate = (value: string, isTooltip: boolean) => {
        if (timeRange === "last30d") {
            const [, month, day] = value.split("-");
            return isTooltip ? `${parseInt(month)}月${parseInt(day)}日` : `${parseInt(day)}`;
        }
        const [year, month] = value.split("-");
        return isTooltip ? `${parseInt(year)}年${parseInt(month)}月` : `${parseInt(month)}月`;
    };

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 py-4 px-6">
                    <CardTitle className="flex gap-2 items-center">記録したエピソード</CardTitle>
                    <CardDescription>
                        {getTimeRangeDescription(timeRange)}に記録したエピソード数の推移
                    </CardDescription>
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
                <div className="mb-4 flex gap-3 justify-end">
                    <Select
                        value={timeRange}
                        onValueChange={(value: string) => setTimeRange(value as TimeRange)}
                    >
                        <SelectTrigger
                            className="w-[90px] rounded-lg"
                            aria-label="表示する期間を選択"
                        >
                            <SelectValue placeholder="全期間" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="last30d" className="rounded-lg">
                                30日
                            </SelectItem>
                            <SelectItem value="last6m" className="rounded-lg">
                                6ヶ月
                            </SelectItem>
                            <SelectItem value="last1y" className="rounded-lg">
                                1年
                            </SelectItem>
                            <SelectItem value="All" className="rounded-lg">
                                全期間
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <TimeSeriesChart
                    data={props.chartData[timeRange]}
                    chartConfig={recordChartConfig}
                    xAxisFormatter={(value) => formatDate(value, false)}
                    tooltipFormatter={(value) => formatDate(value, true)}
                    yAxisLabels={{ left: "月間記録", right: "累積記録" }}
                    chartType="line-bar"
                />
            </CardContent>
        </Card>
    );
}
