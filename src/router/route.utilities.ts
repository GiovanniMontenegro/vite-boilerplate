import type { RouterItem } from "@/types/route.type";
import { type AppRoute, CONSOLE_ROUTES, ONLY_ADMIN_ROUTES } from ".";
import { ADMIN } from "@/utils/constant";

const getAppRoutes = (role: string): Map<string, AppRoute> => {
	if (role === ADMIN) {
		return CONSOLE_ROUTES;
	}
	const filteredMap: Map<string, AppRoute> = new Map();
	CONSOLE_ROUTES.forEach((value, key) => {
		if (!ONLY_ADMIN_ROUTES.includes(key)) {
			filteredMap.set(key, value);
		}
	});
	return filteredMap;
};

const getRoutePath = (key: string, role: string): string => {
	return getAppRoutes(role).get(key)?.path ?? "";
};

const getKeyByPath = (path: string, role: string): string => {
	let keyValue;
	getAppRoutes(role).forEach((value) => {
		if (value.path === path) {
			keyValue = value.meta?.key ?? "";
		}
	});
	return keyValue ?? "";
};

const generateMenuRoutes = (
	consoleRoute: Map<string, AppRoute>
): Array<RouterItem> => {
	const routeMenus: Array<RouterItem> = [];
	consoleRoute.forEach((route) =>
		routeMenus.push({
			meta: route?.meta,
			path: route?.path,
		})
	);
	return routeMenus;
};

export { getRoutePath, getKeyByPath, generateMenuRoutes, getAppRoutes };
