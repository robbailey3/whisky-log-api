import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './services/database/database.service';
import { GeocodingService } from './services/geocoding/geocoding.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule],
  providers: [DatabaseService, GeocodingService],
  exports: [DatabaseService, GeocodingService]
})
export class SharedModule {}
