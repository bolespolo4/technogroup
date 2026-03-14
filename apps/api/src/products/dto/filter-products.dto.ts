import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FilterProductsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  family?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  system?: string;

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
  @IsString()
  search?: string;

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ required: false, default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 20;
}
