import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeltonPercentChart({ title }: { title: string }) {
    const isGenrePage = title === "ジャンル分布";
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="flex gap-2 items-center">
                    {/* <Skeleton className="w-28 h-6 rounded-full" /> */}
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="pb-6 w-full h-[300px] sm:h-[250px]">
                <div
                    className={`flex flex-col h-full w-full justify-center items-center mx-auto px-8 sm:px-16 lg:px-32 gap-2
                        ${isGenrePage ? "sm:flex-row" : "md:flex-row"}`}
                >
                    <div
                        className={`w-full h-1/2 flex justify-center items-center ${
                            isGenrePage ? "sm:w-1/2 sm:h-full" : "md:w-1/2 md:h-full"
                        }`}
                    >
                        <Skeleton
                            className={`w-24 h-24 rounded-full ${
                                isGenrePage ? "sm:w-40 sm:h-40" : "md:w-40 md:h-40"
                            }`}
                        />
                    </div>
                    <div
                        className={`w-full h-1/2 flex flex-col items-center justify-center ${
                            isGenrePage ? "sm:w-1/2 sm:h-full" : "md:w-1/2 md:h-full"
                        }`}
                    >
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex gap-2 items-center">
                                <Skeleton className="w-8 h-4" />
                                <Skeleton className="w-72 h-10" />
                                <Skeleton className="w-6 h-4" />
                            </div>
                            <div className="flex gap-2 items-center">
                                <Skeleton className="w-8 h-4" />
                                <Skeleton className="w-64 h-10" />
                                <Skeleton className="w-6 h-4" />
                            </div>
                            <div className="flex gap-2 items-center">
                                <Skeleton className="w-8 h-4" />
                                <Skeleton className="w-60 h-10" />
                                <Skeleton className="w-6 h-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
