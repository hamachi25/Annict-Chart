const Seo = ({ pageTitle, pagePath }: { pageTitle: string; pagePath: string }) => {
    const defaultTitle = "Annict Chart";

    const title = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle;
    const ogTitle = pageTitle ? `${defaultTitle} | ${pageTitle}` : defaultTitle;
    const description = "Annict Chartは、Annictの視聴記録をグラフで可視化する非公式サービスです。";
    const url = pagePath;

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={ogTitle} />
            <meta property="og:site_name" content="Annict Chart" />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="https://annict-chart.vercel.app/og.png" />
            <link rel="canonical" href={url} />
        </>
    );
};

export default Seo;
