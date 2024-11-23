"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useFetchData } from "@/features/api/fetch-data";
import { getToken } from "@/features/get-token";

import { useStore } from "@/lib/store";
import { Header } from "@/components/header";
import { Loading } from "@/components/loading";
import Seo from "@/components/seo";
import { SkeltonPercentChart } from "@/components/chart/skelton-percent-chart";
import { SkeltonGenreCard } from "@/components/genres/skelton-genre-card";

export default function GenrePage() {
    const router = useRouter();
    const [token, setToken] = useState<string>("");

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/login");
        } else {
            setToken(token);
        }
    }, []);

    const { genresData, isLoading } = useStore();
    useFetchData(token);

    const DynamicChart = dynamic(() => import("@/components/genres/chart"), {
        loading: () => (
            <>
                <SkeltonPercentChart title="ジャンル分布" />
                <SkeltonGenreCard genresData={genresData} />
            </>
        ),
    });

    return (
        <>
            <Seo pageTitle={"ジャンル"} pagePath={"https://annict-chart.vercel.app/genres"} />
            <div className="mx-auto max-w-[1200px]">
                <Header isLoginPage={false} />
                <main className="mx-auto mt-5 mb-10 px-4">
                    <div className="flex flex-col gap-4 md:gap-6">
                        {isLoading.status ? (
                            <Loading />
                        ) : !genresData.genreCount[0].type ? (
                            <div className="text-lg text-center my-20">
                                <p>ジャンルの取得に失敗しました。</p>
                                <p>AniListのAPIサーバーが停止している可能性があります。</p>
                            </div>
                        ) : (
                            <DynamicChart genresData={genresData} />
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
