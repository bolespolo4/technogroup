import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './entities/user.entity';
import { ProductEntity } from './entities/product.entity';
import { SystemEntity } from './entities/system.entity';
import { DocumentEntity } from './entities/document.entity';
import { MarketEntity } from './entities/market.entity';
import { ProjectEntity } from './entities/project.entity';
import { MediaPostEntity } from './entities/media-post.entity';
import { SupportRequestEntity } from './entities/support-request.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('database.url'),
        entities: [
          UserEntity,
          ProductEntity,
          SystemEntity,
          DocumentEntity,
          MarketEntity,
          ProjectEntity,
          MediaPostEntity,
          SupportRequestEntity,
        ],
        synchronize: configService.get<string>('nodeEnv') !== 'production',
        logging: configService.get<string>('nodeEnv') === 'development',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
