import type { RouterItem } from "@/types/route.type";

type AppRoute = RouterItem & {
	protected: boolean;
};



enum CONSOLE_ROUTES_KEYS {
	DASHBOARD = "dashboard",
	CHANNELS = "channels",
	USERS = "users",
	MODS = "moderators",
	SCHEDULE = "schedule",
	SUPPORT = "support",
	ADMIN = "administration",
}

const CONSOLE_ROUTES: Map<string, AppRoute> = new Map();
for (const route of Object.values(CONSOLE_ROUTES_KEYS)) {
	CONSOLE_ROUTES.set(route, {
		meta: {
			title: `${route}.title`,
			key: route,
			label: `${route}.label`,
		},
		path: `${route}`,
		protected: true,
	});
}

export { CONSOLE_ROUTES, CONSOLE_ROUTES_KEYS };
export type { AppRoute };
