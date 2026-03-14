import { IsString, IsOptional, IsBoolean, IsObject, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  family?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  polymer?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  reinforcement?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  surface?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  specifications?: Record<string, any>;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  applications?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
