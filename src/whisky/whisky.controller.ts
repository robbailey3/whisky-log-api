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
import { ApiTags } from '@nestjs/swagger';
import { ObjectID } from 'bson';
import { CreateWhiskyDto } from './models/createWhisky.dto';
import { UpdateWhiskyDto } from './models/updateWhisky.dto';
import { WhiskyDto } from './models/whisky.dto';
import { GetWhiskyQueryDto } from './queries/getWhiskyQuery.dto';
import { WhiskyService } from './whisky.service';

@Controller('whisky')
@ApiTags('Whisky')
export class WhiskyController {
  constructor(private readonly whiskyService: WhiskyService) {}

  @Get()
  public async getWhiskies(
    @Query() query: GetWhiskyQueryDto
  ): Promise<WhiskyDto[]> {
    return this.whiskyService.find({}, findOptionsFromQuery(query));
  }

  @Get('/:id')
  public async getWhisky(@Param('id') id: string): Promise<WhiskyDto> {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Invalid ID');
    }

    return this.whiskyService.findById(ObjectID.createFromHexString(id));
  }

  @Post()
  public async createWhisky(@Body() body: CreateWhiskyDto): Promise<WhiskyDto> {
    return this.whiskyService.create(body);
  }

  @Patch('/:id')
  public async updateWhisky(
    @Param('id') id: string,
    @Body() body: UpdateWhiskyDto
  ): Promise<WhiskyDto> {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Invalid ID');
    }

    return this.whiskyService.update(ObjectID.createFromHexString(id), body);
  }

  @Delete('/:id')
  public async deleteWhisky(@Param('id') id: string): Promise<void> {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Invalid ID');
    }

    await this.whiskyService.delete(ObjectID.createFromHexString(id));
  }
}
