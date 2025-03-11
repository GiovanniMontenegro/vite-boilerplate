import type { StateCreator } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type MiddlewareStore = [
	["zustand/devtools", never],
	["zustand/persist", unknown],
	["zustand/subscribeWithSelector", never],
	["zustand/immer", never],
];

export const addMiddlewareStore = <T>(
	name: string,
	slice: StateCreator<T, [["zustand/immer", never]], []>
): StateCreator<T, [], MiddlewareStore> =>
	devtools(
		persist(subscribeWithSelector(immer((...args) => slice(...args))), {
			name: `${name}Store`,
			partialize: (state) => state, // or pick certain fields
		}),
		{ name: `${name}DevTools` }
	);
