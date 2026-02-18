import { Inject, Injectable } from "@nestjs/common";
import type { IClientRepository } from "../domain/client.repository";


@Injectable()
export class ToggleClientStatusUseCase {
    constructor(
        @Inject('IClientRepository')
        private readonly clientRepository: IClientRepository
    ) { }

    async execute(id: string, status: boolean): Promise<void> {
        await this.clientRepository.updateStatus(id, status);
    }
}