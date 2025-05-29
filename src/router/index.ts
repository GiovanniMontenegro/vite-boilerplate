import type { RouterItem } from "@/types/route.type";

type AppRoute = RouterItem & {
	protected: boolean;
};

enum CONSOLE_ROUTES_KEYS {
	DASHBOARD = "dashboard",
	CHANNELS = "channels",
	SUBSCRIPTIONS = "subscriptions",
	MODS = "moderators",
	SCHEDULE = "schedule",
	SUPPORT = "support",
	ADMIN = "administration",
}

const ONLY_ADMIN_ROUTES = [CONSOLE_ROUTES_KEYS.ADMIN];

const CONSOLE_ROUTES: Map<string, AppRoute> = new Map();

for (const route of Object.values(CONSOLE_ROUTES_KEYS)) {
	CONSOLE_ROUTES.set(route, {
		meta: {
			title: `menu.${route}`,
			key: route,
			label: `menu.${route}`,
		},
		path: `${route}`,
		protected: true,
	});
}

export { CONSOLE_ROUTES, CONSOLE_ROUTES_KEYS, ONLY_ADMIN_ROUTES };
export type { AppRoute };
