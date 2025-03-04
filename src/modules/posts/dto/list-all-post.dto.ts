import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';


export class ListAllPostDto  extends PaginationDto{
    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    title: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    content: string;

    @IsInt()
    @IsOptional()
    @Type(()=>Number)
    @ApiProperty({ required: false })
    user: number;
}