// src/pages/Mods/store/mods.store.ts

import {
	Moderator,
	type ModeratorDto,
	type ResponseModerator,
} from "@/models/moderator.model";
import { API } from "@/utils/constant";
import { authRequest } from "@/utils/request";
import { create } from "zustand";

export type CreateModeratorRequest = Omit<ModeratorDto, "id" | "broadcaster">;
export type UpdateModeratorRequest = Partial<CreateModeratorRequest>;

export interface ModeratorsState {
	moderators: Array<Moderator>;
	loading: boolean;
	error: string | null;

	getModerators(): Promise<void>;
	addModerator(payload: CreateModeratorRequest): Promise<void>;
	updateModerator(id: string, payload: UpdateModeratorRequest): Promise<void>;
	deleteModerator(id: string): Promise<void>;
}

const useModeratorsStore = create<ModeratorsState>((set) => ({
	moderators: [],
	loading: false,
	error: null,

	getModerators: async () => {
		set({ loading: true, error: null });
		try {
			const dtos = await authRequest<ResponseModerator>(
				API.TELEGRAM_MODERATORS.BASE
			);
			if (!dtos) throw new Error("No data returned");
			const models = dtos.data.map((dto) => new Moderator(dto));
			set({ moderators: models });
		} catch (err: unknown) {
			console.error(err);
			throw err;
		} finally {
			set({ loading: false });
		}
	},

	addModerator: async (payload) => {
		set({ loading: true, error: null });
		try {
			const dto = await authRequest<ModeratorDto>(
				API.TELEGRAM_MODERATORS.BASE,
				{
					method: "POST",
					body: JSON.stringify(payload),
				}
			);
			if (!dto) throw new Error("No data returned");
			await useModeratorsStore.getState().getModerators();
		} catch (err: unknown) {
			console.error(err);
			throw err;
		} finally {
			set({ loading: false });
		}
	},

	updateModerator: async (id, payload) => {
		set({ loading: true, error: null });
		try {
			const url = API.TELEGRAM_MODERATORS.BY_ID(id);
			const dto = await authRequest<ModeratorDto>(url, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!dto) throw new Error("No data returned");
			set((state) => ({
				moderators: state.moderators.map((m) =>
					m.id === id ? new Moderator({ ...m, ...payload }) : m
				),
			}));
		} catch (err: unknown) {
			console.error(err);
			throw err;
		} finally {
			set({ loading: false });
		}
	},

	deleteModerator: async (id) => {
		set({ loading: true, error: null });
		try {
			const url = API.TELEGRAM_MODERATORS.BY_ID(id);
			await authRequest<null>(url, { method: "DELETE" });
			set((state) => ({
				moderators: state.moderators.filter((m) => m.id !== id),
			}));
		} catch (err: unknown) {
			console.error(err);
			throw err;
		} finally {
			set({ loading: false });
		}
	},
}));

export default useModeratorsStore;
