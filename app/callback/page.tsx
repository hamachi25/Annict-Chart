"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { fetchToken } from "@/features/api/fetch";

export default function Callback() {
    const router = useRouter();
    const hasFetched = useRef(false);

    const searchParams = useSearchParams();
    const code = searchParams.get("code");

    useEffect(() => {
        if (!code) {
            router.push("/login");
            return;
        }

        const fetchData = async () => {
            if (hasFetched.current) return;
            hasFetched.current = true;

            const result = await fetchToken(code);
            if (result) {
                router.push("/");
            } else {
                router.push("/login");
            }
        };
        fetchData();
    }, [code]);

    return (
        <div className="min-h-screen flex justify-center items-center">
            <span className="text-xl">認証中</span>
        </div>
    );
}
