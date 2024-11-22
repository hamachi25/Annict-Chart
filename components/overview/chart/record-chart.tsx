"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
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
import { TimeSeriesCardHeader } from "@/components/overview/card-header";

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

    const chartConfig =
        timeRange === "last30d" ? recordChartConfig.daily : recordChartConfig.monthly;

    return (
        <Card>
            <TimeSeriesCardHeader
                title="記録したエピソード"
                description={`${getTimeRangeDescription(timeRange)}に記録したエピソード数の推移`}
                totalValue={totalValue}
            />

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
                    chartConfig={chartConfig}
                    xAxisFormatter={(value) => formatDate(value, false)}
                    tooltipFormatter={(value) => formatDate(value, true)}
                    yAxisLabels={{
                        left: timeRange === "last30d" ? "日別記録" : "月別記録",
                        right: "累積記録",
                    }}
                    chartType="line-bar"
                />
            </CardContent>
        </Card>
    );
}
