import { findOptionsFromQuery } from '@/utils/findOptions';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'bson';
import { DramService } from './dram.service';
import { CreateDramDto } from './models/createDram.dto';
import { DramDto } from './models/dram.dto';
import { UpdateDramDto } from './models/updateDram.dto';
import { GetDramQueryDto } from './queries/getDramQuery.dto';

@Controller('dram')
@ApiTags('Dram')
export class DramController {
  constructor(private readonly dramService: DramService) {}

  @Get('')
  @ApiOkResponse({ type: [DramDto], description: 'An array of dram objects' })
  public async getDrams(@Query() query: GetDramQueryDto): Promise<DramDto[]> {
    return this.dramService.find({}, findOptionsFromQuery(query));
  }

  @Get('/:id')
  public async getDramById(@Param('id') id: string): Promise<DramDto> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
    return this.dramService.findById(ObjectId.createFromHexString(id));
  }

  @Post()
  public async createDram(@Body() body: CreateDramDto): Promise<DramDto> {
    return this.dramService.create(body);
  }

  @Patch('/:id')
  public async updateDram(
    @Param('id') id: string,
    @Body() body: UpdateDramDto
  ) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
    return this.dramService.update(ObjectId.createFromHexString(id), body);
  }

  @Delete('/:id')
  public async deleteDram(@Param('id') id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
    return this.dramService.delete(ObjectId.createFromHexString(id));
  }
}
