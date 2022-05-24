import { Module } from '@nestjs/common';
import { WhiskyModule } from './whisky/whisky.module';
import { DistilleryModule } from './distillery/distillery.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [WhiskyModule, DistilleryModule, SharedModule]
})
export class AppModule {}
