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
	getProfile: (
		data: LoginResponse,
		navigate: NavigateFunction
	) => Promise<void>;
	logout: () => void;
	resetStore: () => void;
}

export const useAuthStore = create(
	addMiddlewareStore("auth", (set, get) => ({
		loading: false,
		user: undefined,
		status: "CHECKING",
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
				// Recuperi getProfile dallo store
				const { getProfile } = get() as AuthState;
				// Chiami getProfile passando la response e, ad esempio, navigate
				await getProfile(response, navigate);
			} catch (err: unknown) {
				set({ loading: false });
				if (err instanceof Error) {
					throw err;
				}
				throw new Error("Errore durante il login");
			}
		},
		getProfile: async (
			data: LoginResponse,
			navigate: NavigateFunction
		): Promise<void> => {
			const { loading } = get() as AuthState;
			if (!loading) {
				set({ loading: true });
			}
			sessionStorage.setItem(JWT_KEY, data.accessToken);
			if (data.refreshToken) {
				sessionStorage.setItem(REFRESH_KEY, data.refreshToken);
			}
			const profile: WebUser | null = await authRequest<WebUser>(
				API.AUTH.GET_PROFILE
			);
			if (!profile) {
				throw new Error("Profilo utente non trovato");
			}
			set({ user: profile, status: "LOGIN", loading: false });

			// Evita promesse pendenti
			void navigate(`/${APP_PATH.BASE_PATH}/${APP_PATH.DASHBOARD}`);
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
