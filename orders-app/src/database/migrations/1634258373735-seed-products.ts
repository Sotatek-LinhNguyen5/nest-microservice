/* eslint-disable @typescript-eslint/no-empty-function */
import { Product } from 'src/products/entities/product.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedProducts1634258373735 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const productsRepo = queryRunner.manager.getRepository(Product);

    productsRepo
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values([
        {
          name: 'Product A',
          description: 'Description',
          thumbnail_url:
            'https://menstaysimplicity.com/wp-content/uploads/woocommerce-placeholder.png',
          quantity: 99,
          price: 20,
        },
        {
          name: 'Product B',
          description: 'Description',
          thumbnail_url:
            'https://menstaysimplicity.com/wp-content/uploads/woocommerce-placeholder.png',
          quantity: 14,
          price: 15,
        },
        {
          name: 'Product C',
          description: 'Description',
          thumbnail_url:
            'https://menstaysimplicity.com/wp-content/uploads/woocommerce-placeholder.png',
          quantity: 3,
          price: 10,
        },
      ])
      .execute();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
