const TWITCH_STATS_ENDPOINT = {
	BASE: "/api/twitch",
	statsWeekly: (id: string): string =>
		`${TWITCH_STATS_ENDPOINT.BASE}/${id}/stats/weekly`,
	statsMonthly: (id: string): string =>
		`${TWITCH_STATS_ENDPOINT.BASE}/${id}/stats/monthly`,
	statsDaily: (id: string): string => `${TWITCH_STATS_ENDPOINT.BASE}/${id}/stats/daily`,
	statsLast: (id: string): string => `${TWITCH_STATS_ENDPOINT.BASE}/${id}/stats/last`,
};

export { TWITCH_STATS_ENDPOINT };
