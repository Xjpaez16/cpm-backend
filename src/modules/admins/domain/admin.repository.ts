import { Admin } from "./admin.entity";

export interface IAdminRepository {
    findById(id: string): Promise<Admin | null>;
    findByUsername(username: string): Promise<Admin | null>;
}
