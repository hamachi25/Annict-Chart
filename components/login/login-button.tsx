import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LoginButton({ className }: { className: string }) {
    return (
        <Link
            href={{
                pathname: "https://annict.com/oauth/authorize",
                query: {
                    client_id: "GLmuMZLJQ_BCUnwTWXzb7ZKB2hm2VSALvJSPKbVB010",
                    redirect_uri: "http://localhost:3000/callback",
                    response_type: "code",
                    scope: "read",
                },
            }}
        >
            <Button className={className}>ログイン</Button>
        </Link>
    );
}
