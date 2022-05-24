import { DatabaseService } from '@/shared/services/database/database.service';
import { Injectable } from '@nestjs/common';
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
    return this.db
      .getCollection<DistilleryDto>(this.COLLECTION_NAME)
      .find({}, { limit, skip })
      .toArray();
  }

  public async getDistilleryById(id: ObjectId) {
    return this.db
      .getCollection<DistilleryDto>(this.COLLECTION_NAME)
      .findOne({ _id: id });
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
}
