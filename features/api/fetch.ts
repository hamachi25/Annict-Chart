export async function fetchFromAnnict(query: string, token: string) {
    try {
        const response = await fetch("https://api.annict.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            if (response.status === 401) localStorage.removeItem("token");
            throw new Error("Failed to fetch data from Annict");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function fetchFromAnilist(query: string, anilistIds: number[]) {
    try {
        const response = await fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query, variables: { ids: anilistIds } }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data from Anilist");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

export async function fetchToken(code: string) {
    try {
        if (!apiUrl || !redirectUri) {
            throw new Error(
                "API URLまたはリダイレクトURIが設定されていません。環境変数を確認してください。"
            );
        }
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code,
                redirect_uri: redirectUri,
            }),
        });

        if (!response.ok) {
            throw new Error("認証に失敗しました");
        }

        const { access_token } = await response.json();
        localStorage.setItem("token", access_token);
        return true;
    } catch (error) {
        console.error(error);
    }
}
