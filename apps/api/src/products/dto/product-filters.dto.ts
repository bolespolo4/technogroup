import { IsOptional, IsString, IsNumberString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProductFiltersDto {
  @ApiPropertyOptional() @IsOptional() @IsString() family?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() system?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() polymer?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() reinforcement?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() surface?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumberString() page?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumberString() limit?: string;
}
