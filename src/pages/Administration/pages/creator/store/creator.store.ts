// src/pages/Creators/store/creators.store.ts

import {
	Creator,
	type ResponseCreator,
	type CreatorDto,
} from "@/models/creator.model";
import { API } from "@/utils/constant";
import { authRequest } from "@/utils/request";
import { create } from "zustand";

export type CreateCreatorRequest = Omit<CreatorDto, "id">;
export type UpdateCreatorRequest = Partial<CreateCreatorRequest>;

export interface CreatorsState {
	creators: Array<Creator>;
	loading: boolean;
	error: string | null;
	getCreators: () => Promise<void>;
	createCreator: (data: CreateCreatorRequest) => Promise<void>;
	updateCreator: (id: string, data: UpdateCreatorRequest) => Promise<void>;
	deleteCreator: (id: string) => Promise<void>;
}

const useCreatorsStore = create<CreatorsState>((set, get) => ({
	creators: [],
	loading: false,
	error: null,

	getCreators: async () => {
		set({ loading: true, error: null });
		try {
			const url = API.CREATOR.BASE;
			const response = await authRequest<ResponseCreator>(url);
			console.log("🚀 ~ getCreators: ~ response:", response);
			if (!response) throw new Error("Empty response");
			const items = response.data.map((dto) => new Creator(dto));
			set({ creators: items, loading: false });
		} catch (err: unknown) {
			console.error(err);
			const message = err instanceof Error ? err.message : String(err);
			set({ error: message, loading: false });
		}
	},

	createCreator: async (data) => {
		set({ loading: true, error: null });
		try {
			const url = API.CREATOR.BASE;
			await authRequest<CreatorDto>(url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			await get().getCreators();
		} catch (err: unknown) {
			console.error(err);
			const message = err instanceof Error ? err.message : String(err);
			set({ error: message });
			throw err;
		} finally {
			set({ loading: false });
		}
	},

	updateCreator: async (id, data) => {
		set({ loading: true, error: null });
		try {
			const url = API.CREATOR.BY_ID(id);
			await authRequest<CreatorDto>(url, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			await get().getCreators();
		} catch (err: unknown) {
			console.error(err);
			const message = err instanceof Error ? err.message : String(err);
			set({ error: message });
			throw err;
		} finally {
			set({ loading: false });
		}
	},

	deleteCreator: async (id) => {
		set({ loading: true, error: null });
		try {
			const url = API.CREATOR.BY_ID(id);
			await authRequest<null>(url, { method: "DELETE" });
			set((state) => ({
				creators: state.creators.filter((c) => c.id !== id),
			}));
		} catch (err: unknown) {
			console.error(err);
			const message = err instanceof Error ? err.message : String(err);
			set({ error: message });
			throw err;
		} finally {
			set({ loading: false });
		}
	},
}));

export default useCreatorsStore;
