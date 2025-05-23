// src/utils/request.ts
import { API, APP_PATH, JWT_KEY, REFRESH_KEY } from "./constant";

export class ResponseError extends Error {
	public override name = "ResponseError";
	public response: Response;

	public constructor(response: Response) {
		super(response.statusText);
		this.response = response;
	}
}

/**
 * Clears authentication and redirects to login page.
 */
function redirectToLogin(): void {
	sessionStorage.removeItem(JWT_KEY);
	sessionStorage.removeItem(REFRESH_KEY);
	window.location.replace(APP_PATH.LOGIN);
}

/**
 * Throws a ResponseError for non-OK responses.
 */
function genericError(response: Response): never {
	throw new ResponseError(response);
}

/**
 * Builds headers for authenticated requests.
 */
function buildAuthHeader(options?: RequestInit): RequestInit {
	const token = sessionStorage.getItem(JWT_KEY) ?? "";
	return {
		...options,
		headers: {
			"Content-Type": "application/json",
			Authorization: token ? `Bearer ${token}` : "",
			...(options?.headers ?? {}),
		},
	};
}

/**
 * Parses JSON or returns null for no-content responses.
 */
async function parseJSON<T>(response: Response): Promise<T | null> {
	if (response.status === 204 || response.status === 205) {
		return null;
	}
	return response.json() as Promise<T>;
}

/**
 * Ensures response status is OK.
 */
function checkStatus(response: Response): Response {
	if (response.ok) {
		return response;
	}
	genericError(response);
}

/**
 * Checks auth-specific status, handles refresh logic signal.
 */
function _authCheckStatus(
	response: Response,
	alreadyRefreshed = false
): Response | typeof REFRESH_KEY {
	if (response.ok) {
		return response;
	}
	if (response.status === 401) {
		if (alreadyRefreshed) {
			redirectToLogin();
		}
		return REFRESH_KEY;
	}
	genericError(response);
}

/**
 * Makes a generic request and parses JSON.
 */
export async function request<T>(
	url: string,
	options?: RequestInit
): Promise<T> {
	const fetchResponse = await fetch(url, options);
	const validResponse = checkStatus(fetchResponse);
	const data = await parseJSON<T>(validResponse);
	return data as T;
}

/**
 * Attempts to refresh the auth token.
 */
async function refreshToken(): Promise<void> {
	const refreshToken = sessionStorage.getItem(REFRESH_KEY) ?? "";
	if (!refreshToken) {
		redirectToLogin();
		return;
	}
	const authOptions: RequestInit = {
		headers: {
			Authorization: `Bearer ${refreshToken}`,
			"Content-Type": "application/json",
		},
	};
	const response = await fetch(API.AUTH.GET_REFRESH, authOptions);
	const result = (await checkStatus(response).json()) as {
		accessToken: string;
		refreshToken: string;
	};
	sessionStorage.setItem(JWT_KEY, result.accessToken);
	sessionStorage.setItem(REFRESH_KEY, result.refreshToken);
}

/**
 * Makes an authenticated request, auto-refresh token if needed.
 */
async function _authRequest<T>(
	url: string,
	options?: RequestInit
): Promise<T | null> {
	let authOptions = buildAuthHeader(options);
	let fetchResponse = await fetch(url, authOptions);
	let statusCheck = _authCheckStatus(fetchResponse);

	if (statusCheck === REFRESH_KEY) {
		await refreshToken();
		authOptions = buildAuthHeader(options);
		fetchResponse = await fetch(url, authOptions);
		statusCheck = _authCheckStatus(fetchResponse, true) as Response;
	}

	if (statusCheck instanceof Response) {
		return parseJSON<T>(statusCheck);
	}
	return null;
}

/**
 * Public authenticated request helper.
 */
export async function authRequest<T>(
	url: string,
	options?: RequestInit
): Promise<T | null> {
	return _authRequest<T>(url, options);
}
