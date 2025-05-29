import { Layout, Menu } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { generateMenuRoutes, getAppRoutes, getKeyByPath, getRoutePath } from "@/router/route.utilities";
import { type AuthState, useAuthStore } from "@/store/auth.store";
import type { RouterItem } from "@/types/route.type";
import type { ItemType, MenuItemType } from "antd/es/menu/interface";

const { Sider } = Layout;

//Define the routes

const getMenuItems = (
    routes: Array<RouterItem>
): Array<ItemType<MenuItemType>> => {
    return routes
        .map((itm) => {
            //If no meta defined return null
            if (!itm.meta) {
                return null;
            }
            //if has children
            let children = null;
            if (itm.children) {
                children = getMenuItems(itm.children);
            }

            return children
                ? {
                    ...itm.meta,
                    children,
                }
                : {
                    ...itm.meta,
                    path: itm.path,
                };
        })
        .filter((itm) => !!itm);
};

/**
 * PageSidebar
 * @param props {autoCollapse?: boolean} automatic collapes menu when click another menu
 * @returns
 */
const PageSidebar = (props: { autoCollapse?: boolean }): React.ReactElement => {
    const { autoCollapse = true } = props;
    const { user } = useAuthStore() as AuthState
    const role = user?.role ?? "";
    console.log("🚀 ~ user:", user)
    const routes: Array<RouterItem> = useMemo(() => generateMenuRoutes(getAppRoutes(role)), [])
    const menuItems = useMemo(() => getMenuItems(routes), [routes])
    const navigate = useNavigate();
    const [selectedKeys, setSelectedKeys] = useState<Array<string>>([]);
    const [lastOpenedMenu, setLastOpenedMenu] = useState<Array<string>>([]);
    const location = useLocation();

    useEffect(() => {
        setSelectedKeys([getKeyByPath(location.pathname, role)]);
        void navigate(location.pathname);
    }, [location.pathname, navigate, role]);

    const onSwitchMenu = ({
        key,
        keyPath,
    }: {
        key: string;
        keyPath: Array<string>;
        item: React.ReactInstance;
    }): void => {
        if (autoCollapse && keyPath.slice(1)) {
            setLastOpenedMenu(keyPath.slice(1));
        }
        void navigate(getRoutePath(key, role));
    };

    const onOpenChange = (openKeys: Array<string>): void => {
        setLastOpenedMenu(openKeys);
    };

    return (
        <Sider theme="light">
            <Menu
                openKeys={lastOpenedMenu}
                onOpenChange={onOpenChange}
                selectedKeys={selectedKeys}
                mode="inline"
                items={menuItems}
                onClick={onSwitchMenu}
            />
        </Sider>
    );
};

export default PageSidebar;
