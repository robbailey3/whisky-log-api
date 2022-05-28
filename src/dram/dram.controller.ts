import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DramService } from './dram.service';
import { DramDto } from './models/dram.dto';

@Controller('dram')
@ApiTags('dram')
export class DramController {
  constructor(private readonly dramService: DramService) {}

  @Get()
  public async getDrams(): Promise<DramDto[]> {
    return await this.dramService.getDrams();
  }
}
