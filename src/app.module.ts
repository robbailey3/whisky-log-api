import { Module } from '@nestjs/common';
import { WhiskyModule } from './whisky/whisky.module';
import { DistilleryModule } from './distillery/distillery.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DramModule } from './dram/dram.module';

@Module({
  imports: [WhiskyModule, DistilleryModule, SharedModule, UserModule, AuthModule, DramModule]
})
export class AppModule {}
