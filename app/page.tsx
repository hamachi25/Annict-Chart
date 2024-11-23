"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Seo from "@/components/seo";
import { Header } from "@/components/header";
import { SkeltonOverviewPage } from "@/components/overview/skelton-overview-page";
import { Loading } from "@/components/loading";

import { useFetchData } from "@/features/api/fetch-data";
import { getToken } from "@/features/get-token";
import { useStore } from "@/lib/store";

export default function Home() {
    const router = useRouter();
    const [token, setToken] = useState<string>("");

    const { isLoading, activeDays } = useStore();

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/login");
        } else {
            setToken(token);
        }
    }, []);

    useFetchData(token);

    const DynamicOverviewPage = dynamic(() => import("@/components/overview/overview-page"), {
        loading: () => <SkeltonOverviewPage />,
    });

    return (
        <>
            <Seo pageTitle={""} pagePath={"https://annict-chart.vercel.app/"} />
            <div className="mx-auto max-w-[1200px]">
                <Header isLoginPage={false} />
                <main className="mx-auto mt-5 mb-10 px-4">
                    {isLoading.status ? (
                        <Loading />
                    ) : !activeDays ? (
                        <div className="text-lg text-center my-20">
                            データの取得に失敗しました。
                        </div>
                    ) : (
                        <DynamicOverviewPage />
                    )}
                </main>
            </div>
        </>
    );
}
