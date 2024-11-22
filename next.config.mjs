/** @type {import('next').NextConfig} */

const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN;

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' https://s4.anilist.co;
    object-src 'none';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
    connect-src 'self' https://api.annict.com https://graphql.anilist.co ${apiUrl};
`;

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "s4.anilist.co",
                pathname: "/file/anilistcdn/media/anime/cover/**",
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains; preload",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "Content-Security-Policy",
                        value: cspHeader.replace(/\n/g, ""),
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
