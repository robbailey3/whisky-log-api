import { Module } from '@nestjs/common';
import { DramController } from './dram.controller';
import { DramService } from './dram.service';

@Module({
  controllers: [DramController],
  providers: [DramService]
})
export class DramModule {}
