import { create } from "zustand";
import { type MiddlewareStore, addMiddlewareStore } from ".";
import { APP_THEME } from "@/common/constants";

type State = {
	firstName: string;
	lastName: string;
	theme: APP_THEME;
};

type Action = {
	updateFirstName: (firstName: State["firstName"]) => void;
	updateLastName: (lastName: State["lastName"]) => void;
};

// Create your store, which includes both state and (optionally) actions
const useAppStore = create<State & Action, MiddlewareStore>(
	addMiddlewareStore("app", (set) => ({
		firstName: "",
		lastName: "",
        theme: APP_THEME.LIGHT,
		updateFirstName: (firstName): void => {
			set(() => ({ firstName: firstName }));
		},
		updateLastName: (lastName): void => {
			set(() => ({ lastName: lastName }));
		},
	}))
);

export default useAppStore;
