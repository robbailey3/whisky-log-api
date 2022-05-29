import { DatabaseService } from '@/shared/services/database/database.service';
import { GeocodingService } from '@/shared/services/geocoding/geocoding.service';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Filter, FindOptions, ModifyResult, ObjectId } from 'mongodb';
import { CreateDistilleryDto } from './models/createDistillery.dto';
import { DistilleryDto } from './models/distillery.dto';
import { UpdateDistilleryDto } from './models/updateDistillery.dto';

@Injectable()
export class DistilleryService {
  private readonly COLLECTION_NAME = 'distilleries';

  constructor(
    private readonly db: DatabaseService,
    private readonly geocodingService: GeocodingService
  ) {}

  public async getDistilleries(
    filter: Filter<DistilleryDto>,
    options: FindOptions
  ): Promise<DistilleryDto[]> {
    const docs = await this.db
      .getCollection<DistilleryDto>(this.COLLECTION_NAME)
      .find(filter, options)
      .toArray();

    return docs.map((doc) => {
      return plainToInstance(DistilleryDto, doc);
    });
  }

  public async getDistilleryById(id: ObjectId): Promise<DistilleryDto> {
    const doc = await this.db
      .getCollection<DistilleryDto>(this.COLLECTION_NAME)
      .findOne({ _id: id });

    return plainToInstance(DistilleryDto, doc);
  }

  public async createDistillery(
    distillery: CreateDistilleryDto
  ): Promise<DistilleryDto> {
    const formattedAddress = await this.geocodingService.getFormattedAddress(
      distillery.location.coordinates[0] as number,
      distillery.location.coordinates[1] as number
    );

    const d: DistilleryDto = {
      ...distillery,
      formattedAddress,
      dateAdded: new Date(),
      dateUpdated: new Date()
    };

    const result = await this.db
      .getCollection<DistilleryDto>(this.COLLECTION_NAME)
      .insertOne(d);

    return plainToInstance(DistilleryDto, { ...d, _id: result.insertedId });
  }

  public async updateDistillery(
    id: ObjectId,
    updates: UpdateDistilleryDto
  ): Promise<DistilleryDto> {
    let docUpdate: Partial<DistilleryDto> = { ...updates };
    if (updates.location && updates.location.coordinates) {
      const formattedAddress = await this.geocodingService.getFormattedAddress(
        updates.location.coordinates[0] as number,
        updates.location.coordinates[1] as number
      );
      docUpdate = { ...updates, formattedAddress, dateUpdated: new Date() };
    }
    await this.db
      .getCollection<DistilleryDto>(this.COLLECTION_NAME)
      .findOneAndUpdate({ _id: id }, { $set: { ...docUpdate } });

    const result = await this.db
      .getCollection<DistilleryDto>(this.COLLECTION_NAME)
      .findOne({ _id: id });

    return plainToInstance(DistilleryDto, result);
  }

  public async deleteDistillery(id: ObjectId): Promise<void> {
    await this.db
      .getCollection<DistilleryDto>(this.COLLECTION_NAME)
      .findOneAndDelete({ _id: id });
  }
}
