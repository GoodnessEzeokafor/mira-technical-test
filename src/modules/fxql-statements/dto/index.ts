import { IsNotEmpty, IsString } from "class-validator";

export class FxQlDto {
    @IsNotEmpty()
    @IsString()
    public readonly FXQL: string
}