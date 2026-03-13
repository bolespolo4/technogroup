import { IsString, IsEmail, IsEnum, IsArray, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SupportType } from '@technobit/shared';

export class CreateSupportRequestDto {
  @ApiProperty() @IsString() @MinLength(2) name!: string;
  @ApiProperty() @IsEmail() email!: string;
  @ApiProperty() @IsString() company!: string;
  @ApiProperty() @IsString() country!: string;
  @ApiProperty() @IsString() role!: string;
  @ApiProperty({ enum: SupportType }) @IsEnum(SupportType) support_type!: SupportType;
  @ApiProperty({ type: [String] }) @IsArray() systems!: string[];
  @ApiProperty({ type: [String] }) @IsArray() product_families!: string[];
  @ApiProperty() @IsString() @MinLength(20) description!: string;
}
