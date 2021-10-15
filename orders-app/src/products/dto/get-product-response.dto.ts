import { ApiProperty } from '@nestjs/swagger';
import { IProduct } from '../interfaces/product.interface';

export class GetProductResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({
    example: {
      id: 1,
      name: 'Product A',
      description: 'Description',
      thumbnail_url:
        'https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_topic/thumbnail_title-e09cfa4482e9-1606807855486-rvfgsqbh.png?v=0',
      price: 20,
      quantity: 10,
    },
    nullable: true,
  })
  data: IProduct;

  @ApiProperty({ example: null })
  errors: { [key: string]: any };
}
