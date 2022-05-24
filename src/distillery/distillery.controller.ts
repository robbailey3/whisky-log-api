import { PaginationQuery } from '@/queries/PaginationQuery';
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
import { ObjectId } from 'mongodb';
import { DistilleryService } from './distillery.service';
import { DistillerySearchQueryDto } from './models/distillery-search-query.dto';
import { DistilleryDto } from './models/distillery.dto';

@Controller('distillery')
@ApiTags('Distillery')
export class DistilleryController {
  constructor(private readonly distilleryService: DistilleryService) {}

  @Get()
  @ApiOkResponse({
    type: [DistilleryDto],
    description: 'An array of distillery objects'
  })
  public async GetDistilleries(
    @Query() query: DistillerySearchQueryDto
  ): Promise<DistilleryDto[]> {
    return await this.distilleryService.getDistilleries(
      query.limit,
      query.skip
    );
  }

  @Get('/:id')
  public async GetDistilleryById(id: string): Promise<DistilleryDto> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
    return this.distilleryService.getDistilleryById(new ObjectId(id));
  }

  @Post()
  public async CreateDistillery(
    @Body() distillery: DistilleryDto
  ): Promise<DistilleryDto> {
    const { insertedId } = await this.distilleryService.createDistillery(
      distillery
    );

    return { ...distillery, _id: (insertedId as ObjectId).toHexString() };
  }

  @Patch('/:id')
  public async UpdateDistillery(
    @Param('id') id: string,
    @Body() distillery: DistilleryDto
  ): Promise<DistilleryDto> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
    await this.distilleryService.updateDistillery(
      ObjectId.createFromHexString(id),
      distillery
    );

    return { ...distillery, _id: id };
  }

  @Delete('/:id')
  public async DeleteDistillery(id: string): Promise<void> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
    await this.distilleryService.deleteDistillery(new ObjectId(id));
  }
}
