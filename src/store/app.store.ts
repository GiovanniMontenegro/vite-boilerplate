import { create } from "zustand";
import { type MiddlewareStore, addMiddlewareStore } from ".";
import { APP_THEME } from "@/common/constants";

type State = {
	theme: APP_THEME;
};

type Action = {
	setTheme: (theme: APP_THEME) => void;
};

// Create your store, which includes both state and (optionally) actions
const useAppStore = create<State & Action, MiddlewareStore>(
	addMiddlewareStore("app", (set) => ({
		theme: APP_THEME.DARK,
		setTheme: (theme): void => {
			set({ theme });
		},
	}))
);

export default useAppStore;
