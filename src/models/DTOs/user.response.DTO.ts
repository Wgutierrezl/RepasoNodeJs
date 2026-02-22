import { RoleResponseDTO } from "./role.response.DTO";

export class UserResponseDTO {
    id!: number;
    username!: string
    email!: string;
    role!: RoleResponseDTO;
    isActive!: boolean;
    createdAt!: Date;
}