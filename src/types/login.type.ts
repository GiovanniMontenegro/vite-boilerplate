export interface LoginRequest {
	username: string;
	password: string;
}

export interface LoginResponse {
	accessToken: string;
	refreshToken?: string;
}

export interface WebUser {
	id: string;
	username: string;
	broadcasterId: string;
	email: string;
	role: string;
}
