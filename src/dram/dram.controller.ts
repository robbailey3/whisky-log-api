import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'bson';
import { DramService } from './dram.service';
import { DramDto } from './models/dram.dto';
import { GetDramQueryDto } from './queries/getDramQuery.dto';

@Controller('dram')
@ApiTags('dram')
export class DramController {
  constructor(private readonly dramService: DramService) {}

  @Get('')
  public async getDrams(@Query() query: GetDramQueryDto): Promise<DramDto[]> {
    return this.dramService.getDrams({}, query.limit, query.skip);
  }

  @Get('/:id')
  public async getDramById(@Param('id') id: string): Promise<DramDto> {
    if (ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
    return this.dramService.getDramById(ObjectId.createFromHexString(id));
  }
}
