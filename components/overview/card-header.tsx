import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function TimeSeriesCardHeader({
    title,
    description,
    totalValue,
}: {
    title: string;
    description: string;
    totalValue: number;
}) {
    return (
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 py-4 px-4 sm:px-6">
                <CardTitle className="flex gap-2 items-center">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </div>
            <div className="flex">
                <div className="relative z-30 flex flex-1 flex-row gap-1 border-t px-4 py-3 text-left sm:flex-col sm:justify-center sm:border-l sm:border-t-0 sm:px-10 sm:py-4">
                    <span className="text-xs text-muted-foreground">累計</span>
                    <span className="text-lg font-bold leading-none sm:text-3xl">{totalValue}</span>
                </div>
            </div>
        </CardHeader>
    );
}
