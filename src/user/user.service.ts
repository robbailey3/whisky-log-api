import { DatabaseService } from '@/shared/services/database/database.service';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Filter, FindOptions, ObjectId } from 'mongodb';
import { CreateUserDto } from './models/createUser.dto';
import { UserDto } from './models/user.dto';

@Injectable()
export class UserService {
  private readonly COLLECTION_NAME = 'user';

  constructor(private readonly databaseService: DatabaseService) {}

  public async find(filter: Filter<UserDto>, options: FindOptions) {
    const docs = await this.databaseService
      .getCollection<UserDto>(this.COLLECTION_NAME)
      .find(filter, options)
      .toArray();

    return docs.map((doc) => {
      return plainToInstance(UserDto, doc);
    });
  }

  public async findById(id: ObjectId) {
    const doc = await this.databaseService
      .getCollection<UserDto>(this.COLLECTION_NAME)
      .findOne({ _id: id });

    return plainToInstance(UserDto, doc);
  }

  public async create(user: CreateUserDto) {
    const { password, ...sanitizedUser } = user;
    const newUser: UserDto = {
      ...sanitizedUser,
      dateAdded: new Date(),
      dateUpdated: new Date()
    };

    const result = await this.databaseService
      .getCollection<UserDto>(this.COLLECTION_NAME)
      .insertOne(newUser);

    return plainToInstance(UserDto, { ...newUser, _id: result.insertedId });
  }

  public async update(id: ObjectId, updateUser: UserDto) {
    await this.databaseService
      .getCollection<UserDto>(this.COLLECTION_NAME)
      .updateOne(
        { _id: id },
        { $set: { ...updateUser, dateUpdated: new Date() } }
      );

    return this.findById(id);
  }
}
