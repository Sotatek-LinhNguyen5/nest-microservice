import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<ProductDto[]> {
    return this.productsRepository.find();
  }

  async getProductById(id: number) {
    const product = await this.productsRepository.findOne(id);
    if (product) {
      return product;
    }
    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }
}
