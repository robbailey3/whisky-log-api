import { DatabaseService } from '@/shared/services/database/database.service';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { DistilleryDto } from './models/distillery.dto';

@Injectable()
export class DistilleryService {
  private readonly COLLECTION_NAME = 'distilleries';

  constructor(private readonly db: DatabaseService) {}

  public async getDistilleries(
    limit: number,
    skip: number
  ): Promise<DistilleryDto[]> {
    const docs = await this.db
      .getCollection<DistilleryDto>(this.COLLECTION_NAME)
      .find({}, { limit, skip })
      .toArray();

    return docs.map((doc) => plainToInstance(DistilleryDto, doc));
  }

  public async getDistilleryById(id: ObjectId) {
    const doc = this.db
      .getCollection<DistilleryDto>(this.COLLECTION_NAME)
      .findOne({ _id: id });

    return plainToInstance(DistilleryDto, doc);
  }

  public async createDistillery(distillery: DistilleryDto) {
    return this.db
      .getCollection<DistilleryDto>(this.COLLECTION_NAME)
      .insertOne(distillery);
  }

  public async updateDistillery(id: ObjectId, distillery: DistilleryDto) {
    return this.db
      .getCollection<DistilleryDto>(this.COLLECTION_NAME)
      .findOneAndUpdate({ _id: id }, { $set: { ...distillery } });
  }

  public async deleteDistillery(id: ObjectId) {
    return this.db
      .getCollection<DistilleryDto>(this.COLLECTION_NAME)
      .findOneAndDelete({ _id: id });
  }
}
