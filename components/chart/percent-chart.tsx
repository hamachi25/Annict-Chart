import { LabelList, Pie, PieChart, Bar, BarChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

type ChartData = {
    type: string;
    value: number;
    fill: string;
    percentage: number;
}[];

type Props = {
    title: string;
    chartData: ChartData;
    chartConfig: ChartConfig;
};

const labelFormatter = (
    value: string,
    chartData: ChartData,
    chartConfig: ChartConfig,
    isMobile: boolean
) => {
    const entry = chartData.find((item) => item.type === value);
    if (!entry || entry.value === 0) return null;

    const total = chartData.reduce((sum, item) => sum + item.value, 0);
    const percentage = (entry.value / total) * 100;
    if (percentage <= 10) return null;

    const config = chartConfig[value.replace("/", "-") as keyof typeof chartConfig];
    if (!config) return null;

    if (isMobile) {
        const sortedData = [...chartData].sort((a, b) => b.value - a.value);
        const topThree = sortedData.slice(0, 3).map((item) => item.type);
        if (!topThree.includes(value)) return null;
    }

    return config.label;
};

export function PercentChart({ title, chartData, chartConfig }: Props) {
    const isGenrePage = title === "ジャンル分布";
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="flex gap-2 items-center">{title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-6 w-full h-[300px] sm:h-[250px]">
                <div
                    className={`flex flex-col h-full w-full justify-center items-center mx-auto gap-2
                        ${isGenrePage ? "sm:flex-row" : "md:flex-row md:gap-0"}`}
                >
                    <ChartContainer
                        config={chartConfig}
                        className={`h-1/2 ${
                            isGenrePage ? "w-full sm:w-1/3 sm:h-full" : "w-full md:h-full md:w-1/2"
                        }`}
                    >
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="type"
                                startAngle={90}
                                endAngle={-270}
                                // paddingAngle={1}
                                // innerRadius={40}
                            >
                                <LabelList
                                    dataKey="type"
                                    className="fill-white"
                                    stroke="none"
                                    fontSize={12}
                                    fontWeight={500}
                                    formatter={(value: string) =>
                                        labelFormatter(value, chartData, chartConfig, isMobile)
                                    }
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                    <ChartContainer
                        config={chartConfig}
                        className={`w-full h-1/2 relative ${
                            isGenrePage
                                ? "right-0 sm:w-2/5 sm:h-2/3 sm:my-auto"
                                : "right-2 md:right-0 md:w-1/2 md:h-2/3 md:my-auto"
                        } `}
                    >
                        <BarChart
                            accessibilityLayer
                            data={chartData.filter((item) => item.percentage > 0).slice(0, 3)}
                            layout="vertical"
                            margin={
                                title === "ジャンル分布"
                                    ? { left: 25, right: 40 }
                                    : { left: 0, right: 40 }
                            }
                        >
                            <XAxis type="number" dataKey="value" hide />
                            <YAxis
                                dataKey="type"
                                type="category"
                                tickLine={false}
                                tickMargin={5}
                                axisLine={false}
                                tickFormatter={(value) => {
                                    const label =
                                        chartConfig[
                                            value.replace("/", "-") as keyof typeof chartConfig
                                        ]?.label;
                                    return typeof label === "string" ? label : "";
                                }}
                            />
                            <Bar dataKey="value" radius={5}>
                                <LabelList
                                    dataKey="percentage"
                                    position="right"
                                    offset={8}
                                    className="fill-foreground"
                                    fontSize={12}
                                    formatter={(value: number) => `${value}%`}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    );
}
