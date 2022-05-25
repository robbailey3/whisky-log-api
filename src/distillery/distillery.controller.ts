import { createGeoQuery } from '@/utils/query';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { DistilleryService } from './distillery.service';
import { GetDistilleriesQuery } from './queries/getDistilleriesQuery';
import { DistilleryDto } from './models/distillery.dto';
import { GeocodingService } from '@/shared/services/geocoding/geocoding.service';

@Controller('distillery')
@ApiTags('Distillery')
export class DistilleryController {
  private readonly logger = new Logger(DistilleryController.name);

  constructor(
    private readonly distilleryService: DistilleryService,
    private readonly geocodingService: GeocodingService
  ) {}

  @Get()
  @ApiOkResponse({
    type: [DistilleryDto],
    description: 'An array of distillery objects'
  })
  public async GetDistilleries(
    @Query() query: GetDistilleriesQuery
  ): Promise<DistilleryDto[]> {
    this.logger.log(
      `Get distilleries request received with query: ${JSON.stringify(query)}`
    );
    let filter = {};
    if (query.longitude || query.latitude || query.distance) {
      filter = createGeoQuery(
        'location',
        query.latitude,
        query.longitude,
        query.distance
      );
    }
    if (query.name) {
      filter = {
        ...filter,
        name: { $regex: query.name, $options: 'i' }
      };
    }
    return await this.distilleryService.getDistilleries(
      filter,
      query.limit,
      query.skip
    );
  }

  @Get('/:id')
  public async GetDistilleryById(
    @Param('id') id: string
  ): Promise<DistilleryDto> {
    this.logger.log(`Get distillery by id request received with id: ${id}`);
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
    return this.distilleryService.getDistilleryById(
      ObjectId.createFromHexString(id)
    );
  }

  @Post()
  public async CreateDistillery(
    @Body() distillery: DistilleryDto
  ): Promise<DistilleryDto> {
    this.logger.log(
      `Create distillery request received with distillery: ${JSON.stringify(
        distillery
      )}`
    );
    const formattedAddress = await this.geocodingService.getFormattedAddress(
      distillery.location.coordinates[0] as number,
      distillery.location.coordinates[1] as number
    );

    distillery.formattedAddress = formattedAddress;

    distillery.dateAdded = new Date();
    distillery.dateUpdated = new Date();

    const insertedId = await this.distilleryService.createDistillery(
      distillery
    );

    return { ...distillery, _id: insertedId.toHexString() };
  }

  @Patch('/:id')
  public async UpdateDistillery(
    @Param('id') id: string,
    @Body() distillery: DistilleryDto
  ): Promise<DistilleryDto> {
    this.logger.log(
      `Update distillery request received with id: ${id} and distillery: ${JSON.stringify(
        distillery
      )}`
    );
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
    if (distillery.location && distillery.location.coordinates) {
      const formattedAddress = await this.geocodingService.getFormattedAddress(
        distillery.location.coordinates[0] as number,
        distillery.location.coordinates[1] as number
      );
      distillery.formattedAddress = formattedAddress;
    }

    await this.distilleryService.updateDistillery(
      ObjectId.createFromHexString(id),
      distillery
    );

    return { ...distillery, _id: id };
  }

  @Delete('/:id')
  public async DeleteDistillery(@Param('id') id: string): Promise<void> {
    this.logger.log(`Delete distillery request received with id: ${id}`);

    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
    await this.distilleryService.deleteDistillery(new ObjectId(id));
  }
}
