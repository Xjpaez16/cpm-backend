import { Client } from "./client.entity";

export interface IClientRepository {
    save(client: Client): Promise<void>;
    findAll(): Promise<Client[]>;
    updateStatus(id: string, status: boolean): Promise<void>;
    findById(id: string): Promise<Client | null>;
    update(id: string, client: Client): Promise<void>;
}