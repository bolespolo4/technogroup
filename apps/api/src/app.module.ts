import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { SystemsModule } from './systems/systems.module';
import { MarketsModule } from './markets/markets.module';
import { MediaModule } from './media/media.module';
import { SupportModule } from './support/support.module';
import { TechnicalHubModule } from './technical-hub/technical-hub.module';
import { PortalModule } from './portal/portal.module';
import { AdminModule } from './admin/admin.module';
import { HealthModule } from './health/health.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    AuthModule,
    ProductsModule,
    SystemsModule,
    MarketsModule,
    MediaModule,
    SupportModule,
    TechnicalHubModule,
    PortalModule,
    AdminModule,
    HealthModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {}
