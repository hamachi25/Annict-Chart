export const annictQuery = `
    query {
        viewer {
            wannaWatchCount
            watchingCount
            watchedCount
            onHoldCount
            stopWatchingCount
            recordsCount
            works(state: WATCHED, orderBy: { field: SEASON, direction: DESC }) {
		    	nodes {
		    		seasonYear
		    	}
		    }
            activities(orderBy: {field: CREATED_AT, direction: DESC}) {
                edges {
                    item {
                        __typename
                        ... on Record {createdAt}
                        ... on Status {
                            createdAt
                            state
                            work {
							    media
                                seasonYear
                                annictId
						    }
                        }
                    }
                }
            }
        }
    }
`;

export const generateAnilistQuery = (pages: number) => {
    let query = `query ($ids: [Int]) {`;
    for (let i = pages; i >= 1; i--) {
        query += `
            page_${i}: Page(page: ${i}, perPage: 50) {
                media(id_in: $ids) {
                    id
                    title {
                        native
                    }
                    genres
                    coverImage {
                        large
                    }
                }
            }
        `;
    }
    query += `}`;
    return query;
};
