import { PaginationQuery } from '@/queries/PaginationQuery';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { DistilleryService } from './distillery.service';
import { DistilleryDto } from './models/distillery.dto';

@Controller('distillery')
@ApiTags('Distillery')
export class DistilleryController {
  constructor(private readonly distilleryService: DistilleryService) {}

  @Get()
  @ApiOkResponse({
    type: DistilleryDto,
    description: 'An array of distillery objects'
  })
  public async GetDistilleries(
    @Query() query: PaginationQuery
  ): Promise<DistilleryDto[]> {
    return this.distilleryService.getDistilleries(query.limit, query.skip);
  }

  @Get('/:id')
  public async GetDistilleryById(id: string): Promise<DistilleryDto> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
    return this.distilleryService.getDistilleryById(new ObjectId(id));
  }

  @Post()
  public async CreateDistillery(@Body() distillery: DistilleryDto) {
    const { insertedId } = await this.distilleryService.createDistillery(
      distillery
    );

    return { ...distillery, _id: (insertedId as ObjectId).toHexString() };
  }

  @Patch('/:id')
  public async UpdateDistillery(id: string, @Body() distillery: DistilleryDto) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
    return this.distilleryService.updateDistillery(
      ObjectId.createFromHexString(id),
      distillery
    );
  }
}
