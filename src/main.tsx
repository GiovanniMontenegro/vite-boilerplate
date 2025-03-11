
import React from "react";
import ReactDOM from "react-dom/client";
import './common/i18n';
import App from "./App";


const rootElement = document.querySelector("#root") as Element;

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<React.Suspense fallback="loading">
				<App />
			</React.Suspense>
		</React.StrictMode>
	);
}
