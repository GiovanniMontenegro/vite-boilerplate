// src/models/creator.model.ts
export enum CreatorProvider {
	twitch = "twitch",
	stripe = "stripe",
	patreon = "patreon",
}
/**
 * DTO restituito dall’API
 */
export interface CreatorDto {
	id: string;
	channelName: string;
	name: string;
	telegramId: string;
	provider: CreatorProvider;
	email: string;
	cron?: string;
	gracePeriod: number;
	enabled: boolean;
}

export interface ResponseCreator {
	data: Array<CreatorDto>;
}

/**
 * Model per la gestione interna dei Creator
 */
export class Creator {
	public id: string;
	public channelName: string;
	public name: string;
	public telegramId: string;
	public provider: CreatorProvider;
	public email: string;
	public cron?: string;
	public gracePeriod: number;
	public enabled: boolean;

	public constructor(data: CreatorDto) {
		this.id = data.id;
		this.channelName = data.channelName;
		this.name = data.name;
		this.telegramId = data.telegramId;
		this.provider = data.provider;
		this.email = data.email;
		this.cron = data.cron;
		this.gracePeriod = data.gracePeriod;
		this.enabled = data.enabled;
	}

	public static fromDto(dto: CreatorDto): Creator {
		return new Creator(dto);
	}
}
