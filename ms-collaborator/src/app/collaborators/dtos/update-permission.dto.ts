import { IsNotEmpty } from "class-validator";

export class UpdatePermissionDto{
    @IsNotEmpty()
    PermissionId: string;
}