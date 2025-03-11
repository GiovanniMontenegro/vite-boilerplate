
import { ConfigProvider } from "antd";
import enUs from 'antd/locale/en_US';
import itIT from 'antd/locale/it_IT';
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router";
import { APP_THEME } from "./common/constants";
import type { FunctionComponent } from "./common/types";
import useDeviceDetection, { type DeviceInfo } from "./hooks/useDeviceDetection";
import { Home } from "./pages/Home";
import { DARK_THEME, LIGHT_THEME } from "./styles/theme";
import useAppStore from "./store/app.store";

const App = (): FunctionComponent => {
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
					<Route path="/" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</ConfigProvider>
	);
};

export default App;
