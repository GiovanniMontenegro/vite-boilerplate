const JWT_KEY = "token";
const REFRESH_KEY = "refresh_token";

const BASE_PATH = {
	API: import.meta.env.VITE_SERVER_API,
	AUTH: "auth",
	TWITCH: "twitch",
	CREATOR: "creator",
};

enum APP_PATH {
	BASE_PATH = "console",
	LOGIN = "login",
	DASHBOARD = "dashboard",
	CHANNELS = "channels",
	USERS = "users",
	MODS = "moderators",
	SCHEDULE = "schedule",
	SUPPORT = "support",
	ADMIN = "administration",
}

const API = {
	AUTH: {
		POST_SIGNIN: `${BASE_PATH.API}/${BASE_PATH.AUTH}/signin`,
		POST_SIGNUP: `${BASE_PATH.API}/${BASE_PATH.AUTH}/signup`,
		GET_LOGOUT: `${BASE_PATH.API}/${BASE_PATH.AUTH}/logout`,
		GET_PROFILE: `${BASE_PATH.API}/${BASE_PATH.AUTH}/profile`,
		GET_NAVBAR: `${BASE_PATH.API}/${BASE_PATH.AUTH}/navbar`,
		GET_REFRESH: `${BASE_PATH.API}/${BASE_PATH.AUTH}/refresh`,
		POST_CHANGE_PASSWORD: `${BASE_PATH.API}/${BASE_PATH.AUTH}/changepwd`,
	},
	TWITCH_STATS_ENDPOINT: {
		BASE: "/api/",
		statsWeekly: (id: string): string =>
			`${BASE_PATH.API}/${BASE_PATH.TWITCH}/${id}/stats/weekly`,
		statsMonthly: (id: string): string =>
			`${BASE_PATH.API}/${BASE_PATH.TWITCH}/${id}/stats/monthly`,
		statsDaily: (id: string): string =>
			`${BASE_PATH.API}/${BASE_PATH.TWITCH}/${id}/stats/daily`,
		statsLast: (id: string): string =>
			`${BASE_PATH.API}/${BASE_PATH.TWITCH}/${id}/stats/last`,
	},
	TELEGRAM_MODERATORS: {
		/**
		 * Url base per i moderatori Telegram
		 * GET: lista moderatori
		 * POST: crea nuovo moderatore
		 */
		BASE: `${BASE_PATH.API}/${BASE_PATH.CREATOR}/${APP_PATH.MODS}`,

		/**
		 * URL per operazioni su uno specifico moderatore
		 * GET: dettagli moderatore
		 * PATCH: aggiorna moderatore
		 * DELETE: elimina moderatore
		 */
		BY_ID: (username: string): string =>
			`${BASE_PATH.API}/${BASE_PATH.CREATOR}/${APP_PATH.MODS}/${username}`,
	},
};

export { API, APP_PATH, JWT_KEY, REFRESH_KEY };
