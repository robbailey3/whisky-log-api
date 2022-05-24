import { Module } from '@nestjs/common';
import { DistilleryService } from './distillery.service';
import { DistilleryController } from './distillery.controller';

@Module({
  providers: [DistilleryService],
  controllers: [DistilleryController]
})
export class DistilleryModule {}
