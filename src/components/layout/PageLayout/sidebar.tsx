import { generateMenuRoutes, getAppRoutes, getKeyByPath, getRoutePath } from "@/router/route.utilities";
import { type AuthState, useAuthStore } from "@/store/auth.store";
import type { RouterItem } from "@/types/route.type";
import { Layout, Menu, type MenuProps } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

const { Sider } = Layout;

type AntdMenuItem = Required<MenuProps>["items"][number];

/**
 * Trasforma i tuoi RouterItem in MenuProps['items'], 
 * garantendo che `key`, `label`, e `children` siano sempre presenti.
 */
const buildMenuItems = (
    routes: Array<RouterItem>,
    t: (key: string) => string
): Array<AntdMenuItem> =>
    routes
        .map((route) => {
            if (!route.meta) return null;

            const { key, icon, title } = route.meta;
            const label = t(title ?? "");
            const children = route.children
                ? buildMenuItems(route.children, t)
                : undefined;

            return {
                key,
                icon,
                label,
                children,
            } as AntdMenuItem;
        })
        .filter((i): i is AntdMenuItem => i !== null);

const PageSidebar = (props: { autoCollapse?: boolean }): React.ReactElement => {
    const { t } = useTranslation();
    const { autoCollapse = true } = props;
    const { user } = useAuthStore() as AuthState;
    const role = user?.role ?? "";

    // ricostruisco le rotte ogni volta che cambia il ruolo
    const routes = useMemo<Array<RouterItem>>(
        () => generateMenuRoutes(getAppRoutes(role)),
        [role]
    );

    // menuItems dipende da `routes` e da `t`
    const menuItems = useMemo<Array<AntdMenuItem>>(
        () => buildMenuItems(routes, t),
        [routes, t]
    );

    const navigate = useNavigate();
    const location = useLocation();

    const [selectedKeys, setSelectedKeys] = useState<Array<string>>([]);
    const [openKeys, setOpenKeys] = useState<Array<string>>([]);

    // aggiorno la selezione ogni volta che cambia il path o il ruolo
    useEffect(() => {
        setSelectedKeys([getKeyByPath(location.pathname, role)]);
        // navigo comunque al path corrente
        void navigate(location.pathname);
    }, [location.pathname, navigate, role]);

    const onMenuClick: MenuProps["onClick"] = ({ key, keyPath }) => {
        if (autoCollapse) {
            // apro solo il genitore se autoCollapse è attivo
            setOpenKeys(keyPath.slice(1));
        }
        void navigate(getRoutePath(key, role));
    };

    const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
        setOpenKeys(keys);
    };

    return (
        <Sider theme="light">
            <Menu
                mode="inline"
                items={menuItems}
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                onClick={onMenuClick}
                onOpenChange={onOpenChange}
            />
        </Sider>
    );
};

export default PageSidebar;
