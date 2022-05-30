import { Module } from '@nestjs/common';
import { DistilleryService } from './distillery.service';
import { DistilleryController } from './distillery.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'firebase-jwt' })],
  providers: [DistilleryService],
  controllers: [DistilleryController]
})
export class DistilleryModule {}
