
import { APP_THEME } from "@/common/constants";
import useAppStore from "@/store/app.store";
import { DARK_THEME, LIGHT_THEME } from "@/styles/theme";
import { ConfigProvider, Spin } from "antd";
import enUs from 'antd/locale/en_US';
import itIT from 'antd/locale/it_IT';
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router";
import SharedStyle from "./common/SharedStyle";
import MainLayout from "./components/layout/MainLayout";
import PageLayout from "./components/layout/PageLayout";
import Home from "./pages/Home";
import { LoginPage } from "./pages/Login";
import Mods from "./pages/Mods";
import { CONSOLE_ROUTES_KEYS } from "./router";
import { type AuthState, useAuthStore } from "./store/auth.store";
import { APP_PATH, JWT_KEY } from "./utils/constant";


// Componente per gestire le rotte protette
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
	const authState = useAuthStore(state => state) as AuthState;
	const { status, user, getProfile, logout } = authState;
	const navigate = useNavigate()

	useEffect(() => {
		const JWT = sessionStorage.getItem(JWT_KEY);
		if (!user) {
			if (JWT) {
				getProfile({
					accessToken: JWT,
				}, navigate)
			} else {
				logout()
				navigate(APP_PATH.LOGIN);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	if (status === 'CHECKING') {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
				<Spin size="large" />
			</div>
		);
	}

	const isAuthenticated = status === 'LOGIN';
	return isAuthenticated
		? <>{children}</>
		: <Navigate to={`/${APP_PATH.BASE_PATH}/${APP_PATH.LOGIN}`} replace />;
};

const App = (): React.ReactElement => {
	const { i18n } = useTranslation();
	//Check if it's dark mode
	const { theme } = useAppStore()
	const isDarkMode = theme === APP_THEME.DARK;
	return (
		<ConfigProvider
			theme={isDarkMode ? DARK_THEME : LIGHT_THEME}
			locale={i18n.language === 'it' ? itIT : enUs}
		>
			<BrowserRouter>
				<Routes>
					{/* Public showcase route */}
					<Route path="/" element={<MainLayout />}>
						<Route index element={<Home />} />
					</Route>

					{/* Console base: login and protected pages */}
					<Route path={APP_PATH.BASE_PATH}>
						{/* Login under console path */}
						<Route path={APP_PATH.LOGIN} element={<LoginPage />} />
						{/* Protected console pages */}
						<Route element={<PrivateRoute><PageLayout /></PrivateRoute>}>
							<Route index element={<Home />} />
							<Route path={CONSOLE_ROUTES_KEYS.DASHBOARD} element={<Home />} />
							<Route path={CONSOLE_ROUTES_KEYS.CHANNELS} element={<Home />} />
							<Route path={CONSOLE_ROUTES_KEYS.USERS} element={<Home />} />
							<Route path={CONSOLE_ROUTES_KEYS.MODS} element={<Mods />} />
							<Route path={CONSOLE_ROUTES_KEYS.SCHEDULE} element={<Home />} />
							<Route path={CONSOLE_ROUTES_KEYS.SUPPORT} element={<Home />} />
							<Route path={CONSOLE_ROUTES_KEYS.ADMIN} element={<Home />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
			<SharedStyle />
		</ConfigProvider>
	);
};

export default App;
