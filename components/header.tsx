import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

import { ModeToggle } from "@/components/mode-toggle";
import { PageTab } from "@/components/page-tab";
import SvgComponent from "@/components/icon";
import { LoginButton } from "@/components/login/login-button";

export function Header({ isLoginPage }: { isLoginPage: boolean }) {
    const { isLoading } = useStore();

    return (
        <header className="top-0 w-full border-b">
            <div className="flex h-14 px-6 items-center md:px-8">
                <Link href="/" className="flex gap-2">
                    <SvgComponent className="w-6 h-6" />
                    <span className={!isLoginPage ? "hidden sm:block" : ""}>Annict Chart</span>
                </Link>
                <div className="flex flex-1 justify-end gap-4">
                    {!isLoginPage && !isLoading.status && <PageTab />}
                    <ModeToggle />
                    {isLoginPage && <LoginButton className="" />}
                </div>
            </div>
        </header>
    );
}
