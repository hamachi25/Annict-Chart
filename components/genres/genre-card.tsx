import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipArrow,
} from "@/components/ui/tooltip";

type Props = {
    data: {
        [key: string]: {
            title: string;
            coverImage: string;
            annictId: number | undefined;
        }[];
    };
};

export function GenreCard({ data }: Props) {
    if (!data) return;

    const totalItems = Object.values(data).reduce((acc, items) => acc + items.length, 0);

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
            {Object.entries(data).map(([genre, items]) => (
                <Card key={genre}>
                    <CardHeader className="dark:bg-gray-900">
                        <CardTitle className="text-xl">{genre}</CardTitle>
                        <div className="flex w-full">
                            <div className="w-1/2">
                                <div className="text-lg text-gray-700 dark:text-gray-300">
                                    {items.length}
                                </div>
                                <div className="text-sm text-gray-500">アニメの数</div>
                            </div>
                            <div className="w-1/2">
                                <div className="text-lg text-gray-700 dark:text-gray-300">
                                    {((items.length / totalItems) * 100).toFixed(1)}%
                                </div>
                                <div className="text-sm text-gray-500">ジャンルの割合</div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="bg-gray-100 dark:bg-black p-4">
                        <Carousel
                            className="w-full"
                            opts={{
                                dragFree: true,
                                slidesToScroll: "auto",
                            }}
                        >
                            <CarouselContent className="-ml-1 select-none">
                                {items.slice(0, 15).map((item, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="px-1 flex-[0_0_auto] md:px-1.5"
                                    >
                                        <TooltipProvider delayDuration={0}>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <div className="flex h-[109px]">
                                                        {item.annictId ? (
                                                            <Link
                                                                href={`https://annict.com/works/${item.annictId}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center"
                                                            >
                                                                <Image
                                                                    unoptimized
                                                                    className="rounded !max-h-[109px]"
                                                                    src={item.coverImage}
                                                                    alt={item.title}
                                                                    width={76}
                                                                    height={109}
                                                                    layout="intrinsic"
                                                                />
                                                            </Link>
                                                        ) : (
                                                            <Image
                                                                unoptimized
                                                                className="rounded"
                                                                src={item.coverImage}
                                                                alt={item.title}
                                                                width={76}
                                                                height={109}
                                                                layout="intrinsic"
                                                            />
                                                        )}
                                                    </div>
                                                </TooltipTrigger>

                                                <TooltipContent className="dark:bg-slate-800">
                                                    <p className="dark:text-gray-200">
                                                        {item.title}
                                                    </p>
                                                    <TooltipArrow className="dark:fill-slate-800" />
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
