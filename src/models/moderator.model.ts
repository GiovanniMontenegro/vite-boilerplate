// src/models/moderator.model.ts

/**
 * DTO restituito dall’API
 */
export interface ModeratorDto {
	id: string;
	telegramUsername: string;
	broadcaster: string;
	enabled: boolean;
}

export interface ResponseModerator {
	data: Array<ModeratorDto>;
}

/**
 * Model per la gestione interna dei Moderatori
 */
export class Moderator {
	public id: string;
	public telegramUsername: string;
	public broadcaster: string;
	public enabled: boolean;

	public constructor(data: ModeratorDto) {
		this.id = data.id;
		this.telegramUsername = data.telegramUsername;
		this.broadcaster = data.broadcaster;
		this.enabled = data.enabled;
	}

	public static fromDto(dto: ModeratorDto): Moderator {
		return new Moderator(dto);
	}
}
