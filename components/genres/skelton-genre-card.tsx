import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { GenreData } from "@/features/types";

export function SkeltonGenreCard({ genresData }: { genresData: GenreData }) {
    const data = genresData.genreDetails;

    const totalItems = Object.values(data).reduce((acc, items) => acc + items.length, 0);

    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
            {Object.entries(data).map(([genre, items]) => (
                <Card key={genre}>
                    <CardHeader>
                        <CardTitle className="text-xl">{genre}</CardTitle>
                        <div className="flex w-full">
                            <div className="w-1/2">
                                <div className="h-7 flex items-end text-lg text-gray-700 dark:text-gray-300">
                                    {items.length}
                                </div>
                                <div className="text-sm text-gray-500">アニメの数</div>
                            </div>
                            <div className="w-1/2">
                                <div className="h-7 flex items-end text-lg text-gray-700 dark:text-gray-300">
                                    {((items.length / totalItems) * 100).toFixed(1)}%
                                </div>
                                <div className="text-sm text-gray-500">ジャンルの割合</div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="bg-gray-100 dark:bg-black p-4 pb-5">
                        <div className="w-full -ml-1">
                            <div className="flex overflow-hidden">
                                {[...Array(5)].map((_, index) => (
                                    <div key={index} className="px-1 md:px-1.5">
                                        <Skeleton className="w-[76px] h-[109px]" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
