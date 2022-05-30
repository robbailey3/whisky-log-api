import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DramController } from './dram.controller';
import { DramService } from './dram.service';

@Module({
  controllers: [DramController],
  providers: [DramService],
  imports: [PassportModule]
})
export class DramModule {}
