import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { SystemsModule } from './systems/systems.module';
import { MarketsModule } from './markets/markets.module';
import { MediaModule } from './media/media.module';
import { SupportModule } from './support/support.module';
import { TechnicalHubModule } from './technical-hub/technical-hub.module';
import { PortalModule } from './portal/portal.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.testing', '.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgresql://technobit:technobit_dev@localhost:5432/technobit',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV === 'development',
    }),
    HealthModule,
    AuthModule,
    ProductsModule,
    SystemsModule,
    MarketsModule,
    MediaModule,
    SupportModule,
    TechnicalHubModule,
    PortalModule,
    AdminModule,
  ],
})
export class AppModule {}
