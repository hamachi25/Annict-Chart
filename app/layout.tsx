import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body className={notoSansJP.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
