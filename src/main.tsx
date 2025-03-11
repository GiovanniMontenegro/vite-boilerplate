import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import './common/i18n'
import { ConfigProvider, theme } from 'antd';
import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./pages/Home.tsx";

const rootElement = document.querySelector("#root") as Element;

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<React.Suspense fallback="loading">
				<ConfigProvider
					theme={{
						// 1. Use dark algorithm
						algorithm: theme.darkAlgorithm,

						// 2. Combine dark algorithm and compact algorithm
						// algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
					}}
				>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<App />} />
							<Route path="/home" element={<Home />} />
						</Routes>
					</BrowserRouter>
				</ConfigProvider>
			</React.Suspense>
		</React.StrictMode>
	);
}
