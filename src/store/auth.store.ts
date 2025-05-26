// src/store/auth.store.ts
import { create } from "zustand";
import { addMiddlewareStore } from "@/store";
import type { LoginRequest, LoginResponse, WebUser } from "@/types/login.type";
import { API, APP_PATH, JWT_KEY, REFRESH_KEY } from "@/utils/constant";
import { authRequest, request } from "@/utils/request";
import type { NavigateFunction } from "react-router";

export interface AuthState {
	loading: boolean;
	user?: WebUser;
	status: "LOGIN" | "CHECKING" | "LOGOUT";
	login: (data: LoginRequest, navigate: NavigateFunction) => Promise<void>;
	logout: () => void;
	resetStore: () => void;
}

export const useAuthStore = create(
	addMiddlewareStore("auth", (set) => ({
		loading: false,
		user: undefined,
		status: "LOGOUT",
		login: async (data: LoginRequest, navigate: NavigateFunction) => {
			const { username, password } = data;
			set({ loading: true });
			try {
				const response: LoginResponse = await request<LoginResponse>(
					API.AUTH.POST_SIGNIN,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ username, password }),
					}
				);
				sessionStorage.setItem(JWT_KEY, response.accessToken);
				sessionStorage.setItem(REFRESH_KEY, response.refreshToken);

				const profile: WebUser | null = await authRequest<WebUser>(
					API.AUTH.GET_PROFILE
				);
				if (!profile) {
					throw new Error("Profilo utente non trovato");
				}
				set({ user: profile, status: "LOGIN", loading: false });

				// Evita promesse pendenti
				void navigate(`/${APP_PATH.BASE_PATH}/${APP_PATH.DASHBOARD}`);
			} catch (err: unknown) {
				set({ loading: false });
				if (err instanceof Error) {
					throw err;
				}
				throw new Error("Errore durante il login");
			}
		},

		logout: (): void => {
			sessionStorage.removeItem(JWT_KEY);
			sessionStorage.removeItem(REFRESH_KEY);
			set({ user: undefined, status: "LOGOUT" });
		},

		resetStore: (): void => {
			sessionStorage.removeItem(JWT_KEY);
			sessionStorage.removeItem(REFRESH_KEY);
			set({ loading: false, user: undefined, status: "LOGOUT" });
		},
	}))
);
