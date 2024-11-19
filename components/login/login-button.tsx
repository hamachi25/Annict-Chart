import Link from "next/link";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

export function LoginButton({ className }: { className: string }) {
    const state = uuidv4();

    useEffect(() => {
        console.log("保存");
        console.log("state：" + state);
        sessionStorage.setItem("oauth_state", state);
    }, [state]);

    return (
        <Link
            href={{
                pathname: "https://annict.com/oauth/authorize",
                query: {
                    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
                    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
                    response_type: "code",
                    scope: "read",
                    state: state,
                },
            }}
        >
            <Button className={className}>ログイン</Button>
        </Link>
    );
}
