import { DatabaseService } from '@/shared/services/database/database.service';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Filter, FindOptions, ObjectId } from 'mongodb';
import { CreateWhiskyDto } from './models/createWhisky.dto';
import { UpdateWhiskyDto } from './models/updateWhisky.dto';
import { WhiskyDto } from './models/whisky.dto';

@Injectable()
export class WhiskyService {
  private readonly COLLECTION_NAME = 'whisky';

  constructor(private readonly databaseService: DatabaseService) {}

  public async find(filter: Filter<WhiskyDto>, options: FindOptions) {
    const docs = await this.databaseService
      .getCollection<WhiskyDto>(this.COLLECTION_NAME)
      .find(filter, options)
      .toArray();

    return docs.map((doc) => {
      return plainToInstance(WhiskyDto, doc);
    });
  }

  public async findById(id: ObjectId) {
    const doc = await this.databaseService
      .getCollection<WhiskyDto>(this.COLLECTION_NAME)
      .findOne({ _id: id });

    return plainToInstance(WhiskyDto, doc);
  }

  public async create(createWhisky: CreateWhiskyDto) {
    const whisky: WhiskyDto = {
      ...createWhisky,
      dateAdded: new Date(),
      dateUpdated: new Date()
    };

    const result = await this.databaseService
      .getCollection<WhiskyDto>(this.COLLECTION_NAME)
      .insertOne(whisky);

    return plainToInstance(WhiskyDto, { ...whisky, _id: result.insertedId });
  }

  public async update(id: ObjectId, updateWhisky: UpdateWhiskyDto) {
    await this.databaseService
      .getCollection<WhiskyDto>(this.COLLECTION_NAME)
      .updateOne(
        { _id: id },
        { $set: { ...updateWhisky, dateUpdated: new Date() } }
      );

    return this.findById(id);
  }

  public async delete(id: ObjectId) {
    await this.databaseService
      .getCollection<WhiskyDto>(this.COLLECTION_NAME)
      .deleteOne({ _id: id });
  }
}
