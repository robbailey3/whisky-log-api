import { DatabaseService } from '@/shared/services/database/database.service';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Filter, InsertOneResult, ObjectId } from 'mongodb';
import { DistilleryDto } from './models/distillery.dto';

@Injectable()
export class DistilleryService {
  private readonly COLLECTION_NAME = 'distilleries';

  constructor(private readonly db: DatabaseService) {}

  public async getDistilleries(
    filter: Filter<DistilleryDto>,
    limit: number,
    skip: number
  ): Promise<DistilleryDto[]> {
    const docs = await this.db
      .getCollection<DistilleryDto>(this.COLLECTION_NAME)
      .find(filter)
      .limit(limit)
      .skip(skip)
      .toArray();

    return docs.map((doc) => {
      doc._id = (doc._id as ObjectId).toHexString();
      return plainToInstance(DistilleryDto, doc);
    });
  }

  public async getDistilleryById(id: ObjectId): Promise<DistilleryDto> {
    const doc = await this.db
      .getCollection<DistilleryDto>(this.COLLECTION_NAME)
      .findOne({ _id: id });

    return plainToInstance(DistilleryDto, doc);
  }

  public async createDistillery(distillery: DistilleryDto): Promise<ObjectId> {
    const result = await this.db
      .getCollection<DistilleryDto>(this.COLLECTION_NAME)
      .insertOne(distillery);

    return result.insertedId as ObjectId;
  }

  public async updateDistillery(
    id: ObjectId,
    distillery: DistilleryDto
  ): Promise<DistilleryDto> {
    const result = await this.db
      .getCollection<DistilleryDto>(this.COLLECTION_NAME)
      .findOneAndUpdate({ _id: id }, { $set: { ...distillery } });

    return plainToInstance(DistilleryDto, result.value);
  }

  public async deleteDistillery(id: ObjectId): Promise<void> {
    await this.db
      .getCollection<DistilleryDto>(this.COLLECTION_NAME)
      .findOneAndDelete({ _id: id });
  }
}
