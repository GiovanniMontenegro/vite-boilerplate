const JWT_KEY = "token";
const REFRESH_KEY = "refresh_token";

const BASE_PATH = {
	API: import.meta.env.VITE_SERVER_API,
	AUTH: "auth",
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
};

export { API, APP_PATH, JWT_KEY, REFRESH_KEY };
