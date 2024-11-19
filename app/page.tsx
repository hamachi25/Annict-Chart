"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Header } from "@/components/header";
import { OverviewPage } from "@/components/page/overview-page";

import { useFetchData } from "@/features/api/fetch-data";
import { getToken } from "@/features/get-token";

export default function Home() {
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

    useFetchData(token);

    return (
        <div className="mx-auto max-w-[1200px]">
            <Header isLoginPage={false} />
            <main className="mx-auto mt-5 mb-10 px-4">
                <OverviewPage />
            </main>
        </div>
    );
}
