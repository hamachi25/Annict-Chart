import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LoginButton({ className }: { className: string }) {
    return (
        <Link
            href={{
                pathname: "https://annict.com/oauth/authorize",
                query: {
                    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
                    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
                    response_type: "code",
                    scope: "read",
                },
            }}
        >
            <Button className={className}>ログイン</Button>
        </Link>
    );
}
