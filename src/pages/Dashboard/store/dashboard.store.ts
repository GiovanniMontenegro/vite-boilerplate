import { TWITCH_STATS_ENDPOINT } from "@/utils/endpoint.constant";
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
	fetchWeekly: (id: string) => Promise<void>;
	fetchMonthly: (id: string) => Promise<void>;
	fetchDaily: (id: string) => Promise<void>;
	fetchLastDay: (id: string) => Promise<void>;
}

export const useStatisticsStore = create<StatisticsState>((set) => ({
	weekly: [],
	monthly: [],
	daily: [],
	lastDay: 0,
	loading: false,
	error: null,

	fetchWeekly: async (id) => {
		set({ loading: true, error: null });
		try {
			const res = await fetch(TWITCH_STATS_ENDPOINT.statsWeekly(id));
			const data: Array<StatPoint> = (await res.json()) as StatPoint[];
			set({ weekly: data, loading: false });
		} catch (error: any) {
			set({ error: error.message, loading: false });
		}
	},

	fetchMonthly: async (id) => {
		set({ loading: true, error: null });
		try {
			const res = await fetch(TWITCH_STATS_ENDPOINT.statsMonthly(id));
			const data: Array<StatPoint> = (await res.json()) as StatPoint[];
			set({ monthly: data, loading: false });
		} catch (error: any) {
			set({ error: error.message, loading: false });
		}
	},

	fetchDaily: async (id) => {
		set({ loading: true, error: null });
		try {
			const res = await fetch(TWITCH_STATS_ENDPOINT.statsDaily(id));
			const data: Array<StatPoint> = (await res.json()) as StatPoint[];
			set({ daily: data, loading: false });
		} catch (error: any) {
			set({ error: error.message, loading: false });
		}
	},

	fetchLastDay: async (id) => {
		set({ loading: true, error: null });
		try {
			const res = await fetch(TWITCH_STATS_ENDPOINT.statsLast(id));
			const { count }: { count: number } = (await res.json()) as {
				count: number;
			};
			set({ lastDay: count, loading: false });
		} catch (error: any) {
			set({ error: error.message, loading: false });
		}
	},
}));
