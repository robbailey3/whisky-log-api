import { Module } from '@nestjs/common';
import { WhiskyService } from './whisky.service';
import { WhiskyController } from './whisky.controller';
import { WhiskyController } from './whisky.controller';

@Module({
  providers: [WhiskyService],
  controllers: [WhiskyController]
})
export class WhiskyModule {}
