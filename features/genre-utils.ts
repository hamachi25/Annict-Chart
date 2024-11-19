import { arm } from "@kawaiioverflow/arm";
import type { AnilistQueryResult } from "./types";

// Anilistのジャンルデータを処理する関数
export function processAnilistGenres(anilistFetchResult: AnilistQueryResult, anilistIds: number[]) {
    const genreCount: { [key: string]: number } = {};
    const genreDetails: {
        [key: string]: { title: string; coverImage: string; annictId: number | undefined }[];
    } = {};

    const genreTranslations: { [key: string]: string } = {
        Action: "アクション",
        Adventure: "冒険",
        Comedy: "コメディ",
        Drama: "ドラマ/青春",
        Ecchi: "エッチ",
        Fantasy: "ファンタジー",
        Horror: "ホラー",
        "Mahou Shoujo": "魔法少女",
        Mecha: "ロボット/メカ",
        Music: "音楽",
        Mystery: "ミステリー",
        Psychological: "心理戦",
        Romance: "恋愛/ラブコメ",
        "Sci-Fi": "SF",
        "Slice of Life": "日常",
        Sports: "スポーツ",
        Supernatural: "超常現象",
        Thriller: "サスペンス",
    };

    const data = anilistFetchResult.data;

    Object.keys(data).forEach((key) => {
        const sortedMedia = data[key].media.sort(
            (a, b) => anilistIds.indexOf(a.id) - anilistIds.indexOf(b.id)
        );
        sortedMedia.forEach((media) => {
            media.genres.forEach((genre) => {
                const translatedGenre = genreTranslations[genre] || genre;
                if (!genreCount[translatedGenre]) {
                    genreCount[translatedGenre] = 0;
                    genreDetails[translatedGenre] = [];
                }
                genreCount[translatedGenre]++;
                const match = arm.find((item) => item.anilist_id === media.id);
                genreDetails[translatedGenre].push({
                    title: media.title.native,
                    coverImage: media.coverImage.large,
                    annictId: match ? match.annict_id : undefined,
                });
            });
        });
    });

    const total = Object.values(genreCount).reduce((sum, count) => sum + count, 0);

    const genreCountWithPercentage = Object.keys(genreCount).map((genre) => ({
        type: genre,
        value: genreCount[genre],
        percentage: total > 0 ? Math.floor((genreCount[genre] / total) * 100) : 0,
        fill: `var(--color-${genre.replace("/", "-").toUpperCase()})`, // 色設定を修正
    }));

    // valueの大きい順にソート
    genreCountWithPercentage.sort((a, b) => b.value - a.value);

    // 上位4つを取得し、それ以降を「その他」にまとめる
    const top4Genres = genreCountWithPercentage.slice(0, 5);
    const otherGenres = genreCountWithPercentage.slice(5);

    const otherGenreCount = otherGenres.reduce((sum, genre) => sum + genre.value, 0);
    const otherGenrePercentage = otherGenres.reduce((sum, genre) => sum + genre.percentage, 0);

    if (otherGenreCount > 0) {
        top4Genres.push({
            type: "その他",
            value: otherGenreCount,
            percentage: otherGenrePercentage,
            fill: "var(--color-その他)",
        });
    }

    const sortedGenreDetails = Object.entries(genreDetails)
        .sort(([, a], [, b]) => b.length - a.length)
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {} as { [key: string]: { title: string; coverImage: string; annictId: number | undefined }[] });

    return { genreCount: top4Genres, genreDetails: sortedGenreDetails };
}

// Anilistのジャンルデータを初期化する関数
export function initializeGenreData() {
    return {
        genreCount: [{ type: "", value: 0, fill: "", percentage: 0 }],
        genreDetails: { "": [{ title: "", coverImage: "", annictId: undefined }] },
    };
}
