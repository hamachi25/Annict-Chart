"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";

import Seo from "@/components/seo";
import { Header } from "@/components/header";
import { getToken } from "@/features/get-token";
import { LoginButton } from "@/components/login/login-button";
import { Footer } from "@/components/footer";

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        const token = getToken();
        if (token) router.push("/");
    }, [router]);

    return (
        <>
            <Seo pageTitle={"ログイン"} pagePath={"https://annict-chart.vercel.app/login"} />
            <div className="mx-auto max-w-[1200px] flex flex-col ">
                <Header isLoginPage={true} />
                <main className="mx-auto w-full pt-20 pb-14 px-4 flex flex-col gap-14 justify-center items-center md:pt-32">
                    <div className="flex flex-col items-center text-center gap-8">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col text-center justify-center sm:flex-row sm:items-end">
                                <h1 className="text-5xl font-bold">Annict Chart</h1>
                            </div>
                            <p className="text-md text-muted-foreground">
                                Annict
                                Chartは、Annictの視聴記録をグラフで可視化する非公式サービスです。
                            </p>
                        </div>
                        <LoginButton className="w-30 h-10" />
                    </div>

                    <div className="border shadow">
                        {/* PC */}
                        <Image
                            className="hidden sm:block dark:hidden"
                            src="/hero-image.jpg"
                            alt="Annictのデータをグラフ化した画像"
                            layout="responsive"
                            width={979}
                            height={551}
                        />
                        <Image
                            className="hidden sm:dark:block"
                            src="/hero-image-dark.jpg"
                            alt="Annictのデータをグラフ化した画像"
                            layout="responsive"
                            width={979}
                            height={551}
                        />
                        {/* スマホ */}
                        <Image
                            className="block sm:hidden dark:hidden w-[300px] h-[650px]"
                            src="/hero-image-sm.png"
                            alt="Annictのデータをグラフ化した画像"
                            width={375}
                            height={812}
                        />
                        <Image
                            className="hidden dark:block sm:!hidden w-[300px] h-[650px]"
                            src="/hero-image-sm-dark.png"
                            alt="Annictのデータをグラフ化した画像"
                            width={375}
                            height={812}
                        />
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
