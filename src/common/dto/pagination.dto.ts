import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @Type(()=>Number)
    @Min(1)
    @ApiProperty({ required: false, default: 1 })
    @IsInt()
    page: number = 1;

    @IsOptional()
    @Type(()=>Number)
    @Min(1)
    @ApiProperty({ required: false, default: 10 })
    @IsInt()
    limit: number = 10;
}