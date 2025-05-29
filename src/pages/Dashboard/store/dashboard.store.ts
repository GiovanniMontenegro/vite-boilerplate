import { API } from "@/utils/constant";
import { authRequest } from "@/utils/request";
import { create } from "zustand";

export interface StatPoint {
	date: string;
	count: number;
}

interface StatisticsState {
	weekly: Array<StatPoint>;
	monthly: Array<StatPoint>;
	daily: Array<StatPoint>;
	lastDay: number;
	loading: boolean;
	error: string | null;
	fetchWeekly: () => Promise<void>;
	fetchMonthly: () => Promise<void>;
	fetchDaily: () => Promise<void>;
	fetchLastDay: () => Promise<void>;
}

export const useStatisticsStore = create<StatisticsState>((set) => {
	// helper generico per authRequest + gestione loading/error
	const fetchData = async <T>(
		url: string,
		onSuccess: (data: T) => void
	): Promise<void> => {
		set({ loading: true, error: null });
		try {
			const data = await authRequest<T>(url);
			if (data === null || data === undefined) {
				throw new Error("No data returned");
			}
			onSuccess(data);
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : String(err);
			set({ error: message });
		} finally {
			set({ loading: false });
		}
	};

	return {
		weekly: [],
		monthly: [],
		daily: [],
		lastDay: 0,
		loading: false,
		error: null,

		fetchWeekly: async (): Promise<void> => {
			await fetchData<Array<StatPoint>>(
				API.STATS_ENDPOINT.statsWeekly,
				(data) => {
					set({ weekly: data });
				}
			);
		},

		fetchMonthly: async (): Promise<void> => {
			await fetchData<Array<StatPoint>>(
				API.STATS_ENDPOINT.statsMonthly,
				(data) => {
					set({ monthly: data });
				}
			);
		},

		fetchDaily: async (): Promise<void> => {
			await fetchData<Array<StatPoint>>(
				API.STATS_ENDPOINT.statsDaily,
				(data) => {
					set({ daily: data });
				}
			);
		},

		fetchLastDay: async (): Promise<void> => {
			await fetchData<{ count: number }>(
				API.STATS_ENDPOINT.statsLast,
				(data) => {
					set({ lastDay: data.count });
				}
			);
		},
	};
});

export default useStatisticsStore;
