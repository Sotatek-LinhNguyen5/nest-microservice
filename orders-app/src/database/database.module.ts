import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';
import { SubOrder } from 'src/orders/entities/sub-order.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: [Product, User, Order, SubOrder],
        synchronize: true,
        migrations: [
          'src/database/migrations/*.ts',
          'dist/database/migrations/*{.ts,.js}',
        ],
        cli: {
          migrationsDir: 'src/database/migrations',
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
