import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetProductResponseDto } from './dto/get-product-response.dto';
import { GetProductsResponseDto } from './dto/get-products-response.dto';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOkResponse({
    type: GetProductsResponseDto,
    description: 'List of products',
  })
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetProductResponseDto,
    description: 'Product detail',
  })
  async getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(Number(id));
  }
}
