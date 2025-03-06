import { ApiProperty } from "@nestjs/swagger";

export class UploadDto {

    @ApiProperty({ type: String, format: 'binary' })
    files: any
}