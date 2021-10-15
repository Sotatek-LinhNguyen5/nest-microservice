import { IsNotEmpty, IsPositive } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  thumbnail_url: string;

  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsPositive()
  @IsNotEmpty()
  quantity: number;
}
