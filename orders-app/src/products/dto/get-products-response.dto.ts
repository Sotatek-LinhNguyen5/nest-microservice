import { ApiProperty } from '@nestjs/swagger';
import { IProduct } from '../interfaces/product.interface';

export class GetProductsResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({
    example: {
      products: [
        {
          id: 1,
          name: 'Product A',
          description: 'Product description',
          thumbnail_url:
            'https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_topic/untitled_1-c62be4464e28-1606807875675-REFRLWL6.png',
          price: 20.0,
          quantity: 99,
        },
      ],
    },
    nullable: true,
  })
  data: {
    products: IProduct[];
  };

  @ApiProperty({ example: 'null' })
  errors: { [key: string]: any };
}
