import { DatabaseService } from '@/shared/services/database/database.service';
import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Collection, Filter, ObjectId } from 'mongodb';
import { CreateDramDto } from './models/createDram.dto';
import { DramDto } from './models/dram.dto';
import { UpdateDramDto } from './models/updateDram.dto';

@Injectable()
export class DramService {
  private readonly logger = new Logger(DramService.name);

  private readonly COLLECTION_NAME = 'dram';

  constructor(private readonly databaseService: DatabaseService) {}

  public async getDrams(
    filter: Filter<DramDto>,
    limit: number,
    skip: number
  ): Promise<DramDto[]> {
    const docs = await this.databaseService
      .getCollection<DramDto>(this.COLLECTION_NAME)
      .find(filter, { limit, skip })
      .toArray();

    return docs.map((doc) => {
      return plainToInstance(DramDto, doc);
    });
  }

  public async getDramById(id: ObjectId) {
    const doc = await this.databaseService
      .getCollection<DramDto>(this.COLLECTION_NAME)
      .findOne({ _id: id });

    return plainToInstance(DramDto, doc);
  }

  public async createDram(createDram: CreateDramDto) {
    const dram: DramDto = {
      ...createDram,
      dateAdded: new Date(),
      dateUpdated: new Date()
    };

    const result = await this.databaseService
      .getCollection<DramDto>(this.COLLECTION_NAME)
      .insertOne(dram);

    return plainToInstance(DramDto, { ...dram, _id: result.insertedId });
  }

  public async updateDram(id: ObjectId, updateDram: UpdateDramDto) {
    await this.databaseService
      .getCollection<DramDto>(this.COLLECTION_NAME)
      .updateOne({ _id: id }, { $set: updateDram });

    return this.getDramById(id);
  }

  public async deleteDram(id: ObjectId): Promise<void> {
    await this.databaseService
      .getCollection<DramDto>(this.COLLECTION_NAME)
      .deleteOne({ _id: id });
  }
}
