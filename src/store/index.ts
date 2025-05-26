import type { StateCreator } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type MiddlewareStore = [
	["zustand/devtools", never],
	["zustand/subscribeWithSelector", never],
	["zustand/immer", never],
];

export const addMiddlewareStore = <T>(
	name: string,
	slice: StateCreator<T, [["zustand/immer", never]], []>
): StateCreator<T, [], MiddlewareStore> =>
	devtools(subscribeWithSelector(immer((...args) => slice(...args))), {
		name: `${name}DevTools`,
	});
