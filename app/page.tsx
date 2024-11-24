"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

import { MetaData } from "@/components/metadata";
import { Header } from "@/components/header";
import { SkeltonOverviewPage } from "@/components/overview/skelton-overview-page";
import { Loading } from "@/components/loading";

import { fetchData } from "@/features/api/fetch-data";
import { getToken } from "@/features/get-token";
import { useStore } from "@/lib/store";

export default function Home() {
    const router = useRouter();
    const [token, setToken] = useState<string>("");

    const hasFetched = useRef(false);
    const store = useStore();

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/login");
        } else {
            setToken(token);
        }
    }, [router]);

    useEffect(() => {
        fetchData(token, store, hasFetched);
    }, [token, store]);

    const DynamicOverviewPage = dynamic(() => import("@/components/overview/overview-page"), {
        loading: () => <SkeltonOverviewPage />,
    });

    return (
        <>
            <MetaData pageTitle={""} pagePath={"https://annict-chart.vercel.app/"} />
            <div className="mx-auto max-w-[1200px]">
                <Header isLoginPage={false} />
                <main className="mx-auto mt-5 mb-10 px-4">
                    {store.isLoading.status ? (
                        <Loading />
                    ) : !store.activeDays ? (
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
