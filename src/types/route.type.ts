import type { MenuItemType } from "antd/es/menu/interface";
import type { RouteObject } from "react-router";

export type RouterItem = RouteObject & {
	// set antd menu props in meta
	meta?: MenuItemType;
	children?: Array<RouterItem>;
};
