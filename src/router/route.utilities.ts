import type { RouterItem } from "@/types/route.type";
import { type AppRoute, CONSOLE_ROUTES } from ".";

const getRoutePath = (key: string): string => {
	return CONSOLE_ROUTES.get(key)?.path ?? "";
};

const getKeyByPath = (path: string): string => {
	let keyValue;
	CONSOLE_ROUTES.forEach((value) => {
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

export { getRoutePath, getKeyByPath, generateMenuRoutes };
