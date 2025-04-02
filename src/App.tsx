
import { APP_THEME } from "@/common/constants";
import useDeviceDetection, { type DeviceInfo } from "@/hooks/useDeviceDetection";
import useAppStore from "@/store/app.store";
import { DARK_THEME, LIGHT_THEME } from "@/styles/theme";
import { ConfigProvider } from "antd";
import enUs from 'antd/locale/en_US';
import itIT from 'antd/locale/it_IT';
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./components/layout/MainLayout";
import PageLayout from "./components/layout/PageLayout";
import Home from "./pages/Home";
import { CONSOLE_BASE_PATH, CONSOLE_ROUTES_KEYS } from "./router";
import SharedStyle from "./common/SharedStyle";

const App = (): React.ReactElement => {
	const { i18n } = useTranslation();
	//Check if it's dark mode
	const { theme } = useAppStore()
	console.log("🚀 ~ App ~ theme:", theme)
	const isDarkMode = theme === APP_THEME.DARK;
	//Get user device
	const userDevice: DeviceInfo = useDeviceDetection();
	console.log("🚀 ~ App ~ userDevice:", userDevice)
	return (
		<ConfigProvider
			theme={isDarkMode ? DARK_THEME : LIGHT_THEME}
			locale={i18n.language === 'it' ? itIT : enUs}
		>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainLayout />} >
						<Route index element={<Home />} />
					</Route>
					<Route path={CONSOLE_BASE_PATH} element={<PageLayout />} >
						<Route index element={<Home />} />
						<Route path={CONSOLE_ROUTES_KEYS.DASHBOARD} element={<Home />} />
						<Route path={CONSOLE_ROUTES_KEYS.CHANNELS} element={<Home />} />
						<Route path={CONSOLE_ROUTES_KEYS.USERS} element={<Home />} />
						<Route path={CONSOLE_ROUTES_KEYS.MODS} element={<Home />} />
						<Route path={CONSOLE_ROUTES_KEYS.SCHEDULE} element={<Home />} />
						<Route path={CONSOLE_ROUTES_KEYS.SUPPORT} element={<Home />} />
						<Route path={CONSOLE_ROUTES_KEYS.ADMIN} element={<Home />} />
					</Route>
				</Routes>
			</BrowserRouter>
			<SharedStyle />
		</ConfigProvider>
	);
};

export default App;
