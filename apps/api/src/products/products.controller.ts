import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductFiltersDto } from './dto/product-filters.dto';
import { Public } from '../common/decorators/roles.decorator';

@ApiTags('products')
@Controller('products')
@Public()
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List products with filters' })
  findAll(@Query() filters: ProductFiltersDto) {
    return this.productsService.findAll(filters);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get product by slug' })
  findOne(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Get(':slug/related')
  @ApiOperation({ summary: 'Get related products' })
  findRelated(@Param('slug') slug: string) {
    return this.productsService.findRelated(slug);
  }
}
