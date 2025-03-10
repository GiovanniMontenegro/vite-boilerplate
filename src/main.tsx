import { createRouter } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { routeTree } from "./routeTree.gen.ts";
import './common/i18n'
import { ConfigProvider, theme } from 'antd';

const router = createRouter({ routeTree });
const rootElement = document.querySelector("#root") as Element;

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}


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
					<App router={router} />
				</ConfigProvider>
			</React.Suspense>
		</React.StrictMode>
	);
}
