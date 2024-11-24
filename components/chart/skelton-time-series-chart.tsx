import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { TimeSeriesData } from "@/features/types";

export function SkeltonTimeSeriesChart({
    title,
    description,
    chartData,
}: {
    title: string;
    description: string;
    chartData: {
        [key: string]: TimeSeriesData[];
    };
}) {
    const totalValue = chartData["All"].reduce((sum, item) => sum + item.value, 0);

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 py-4 px-4 sm:px-6">
                    <CardTitle className="flex gap-2 items-center">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                <div className="flex">
                    <div className="relative z-30 flex flex-1 flex-row gap-1 border-t px-4 py-3 text-left sm:flex-col sm:justify-center sm:border-l sm:border-t-0 sm:px-10 sm:py-4">
                        <span className="text-xs text-muted-foreground">累計</span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                            {totalValue}
                        </span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="px-3 pt-5 sm:p-6">
                <div className="mb-4 flex gap-3 justify-end">
                    <Select value="All">
                        <SelectTrigger
                            className="w-[90px] rounded-lg"
                            aria-label="表示する期間を選択"
                        >
                            <SelectValue placeholder="全期間" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="All" className="rounded-lg">
                                全期間
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="h-[250px]"></div>
            </CardContent>
        </Card>
    );
}
