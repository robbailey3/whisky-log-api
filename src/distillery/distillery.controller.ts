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
  Query,
  Req,
  SetMetadata,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { DistilleryService } from './distillery.service';
import { GetDistilleriesQuery } from './queries/getDistilleriesQuery.dto';
import { DistilleryDto } from './models/distillery.dto';
import { CreateDistilleryDto } from './models/createDistillery.dto';
import { UpdateDistilleryDto } from './models/updateDistillery.dto';
import { findOptionsFromQuery } from '@/utils/findOptions';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '@/auth/permissions/permissions.guard';
import { Permissions } from '@/auth/permissions/permissions.decorator';
import { Permission } from '@/auth/permissions/permissions';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Controller('distillery')
@ApiTags('Distillery')
@ApiBearerAuth()
@UseGuards(AuthGuard(), PermissionsGuard)
export class DistilleryController {
  private readonly logger = new Logger(DistilleryController.name);

  constructor(private readonly distilleryService: DistilleryService) {}

  @Get()
  @Permissions(Permission['distillery:create'])
  @ApiOkResponse({
    type: [DistilleryDto],
    description: 'An array of distillery objects'
  })
  public async GetDistilleries(
    @Req() req: any,
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
      findOptionsFromQuery(query)
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
    @Body() distillery: CreateDistilleryDto
  ): Promise<DistilleryDto> {
    this.logger.log(
      `Create distillery request received with distillery: ${JSON.stringify(
        distillery
      )}`
    );

    return await this.distilleryService.createDistillery(distillery);
  }

  @Patch('/:id')
  public async UpdateDistillery(
    @Param('id') id: string,
    @Body() distillery: UpdateDistilleryDto
  ): Promise<DistilleryDto> {
    this.logger.log(
      `Update distillery request received with id: ${id} and distillery: ${JSON.stringify(
        distillery
      )}`
    );
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }

    const updatedDistillery = await this.distilleryService.updateDistillery(
      ObjectId.createFromHexString(id),
      distillery
    );

    return updatedDistillery;
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
