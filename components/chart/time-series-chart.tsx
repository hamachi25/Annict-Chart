import * as React from "react";
import { CartesianGrid, ComposedChart, Line, Bar, XAxis, YAxis } from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";

import type { TimeSeriesData } from "@/features/types";

type CommonChartProps = {
    data: TimeSeriesData[];
    chartConfig: ChartConfig;
    xAxisFormatter: (value: string) => string;
    tooltipFormatter: (value: string) => string;
    yAxisLabels: {
        left?: string;
        right?: string;
    };
    chartType: "line" | "line-bar";
};

export function TimeSeriesChart(props: CommonChartProps) {
    const { data, chartConfig, xAxisFormatter, tooltipFormatter, yAxisLabels, chartType } = props;
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <ChartContainer className="h-[250px] w-full" config={chartConfig}>
            <ComposedChart
                accessibilityLayer
                data={data}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} horizontal={true} />
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={xAxisFormatter}
                    interval={"preserveStartEnd"}
                />
                <YAxis
                    yAxisId={1}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickCount={5}
                    tick={isMobile || chartType === "line" ? false : true}
                    width={isMobile || chartType === "line" ? 0 : 60}
                    label={
                        yAxisLabels.left
                            ? {
                                  value: yAxisLabels.left,
                                  angle: 0,
                                  position: "insideLeft",
                                  style: {
                                      fontSize: 13,
                                      textAnchor: "middle",
                                      writingMode: "vertical-rl",
                                      textOrientation: "upright",
                                  },
                              }
                            : undefined
                    }
                />
                {chartType === "line-bar" && (
                    <YAxis
                        yAxisId={2}
                        tickLine={false}
                        axisLine={false}
                        orientation="right"
                        tickMargin={8}
                        tickCount={5}
                        tick={isMobile ? false : true}
                        width={isMobile ? 0 : 60}
                        label={
                            yAxisLabels.right
                                ? {
                                      value: yAxisLabels.right,
                                      angle: 0,
                                      position: "insideRight",
                                      style: {
                                          fontSize: 13,
                                          textAnchor: "middle",
                                          writingMode: "vertical-rl",
                                          textOrientation: "upright",
                                      },
                                  }
                                : undefined
                        }
                    />
                )}
                <ChartTooltip
                    animationDuration={300}
                    animationEasing="ease-out"
                    content={<ChartTooltipContent labelFormatter={tooltipFormatter} />}
                />
                {chartType === "line-bar" && (
                    <>
                        <ChartLegend verticalAlign="top" content={<ChartLegendContent />} />
                        <Bar
                            yAxisId={1}
                            dataKey="value"
                            type="linear"
                            fill="var(--color-value)"
                            radius={4}
                        />
                    </>
                )}
                <Line
                    yAxisId={chartType === "line-bar" ? 2 : 1}
                    dataKey={chartType === "line-bar" ? "totalValue" : "value"}
                    type="monotone"
                    stroke={
                        chartType === "line-bar" ? "var(--color-totalValue)" : "var(--color-value)"
                    }
                    strokeWidth={3}
                    dot={false}
                />
            </ComposedChart>
        </ChartContainer>
    );
}
