import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Collection, MongoClient } from 'mongodb';
import { from, retry, tap } from 'rxjs';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private client: MongoClient;
  private readonly logger = new Logger(DatabaseService.name);

  constructor(private readonly config: ConfigService) {}

  public onModuleInit() {
    this.connect();
  }

  private connect() {
    const startTime = Date.now();
    from(MongoClient.connect(this.connectionString))
      .pipe(
        tap(() => this.logger.log('Connecting to Database')),
        retry(5)
      )
      .subscribe({
        next: (client) => {
          const endTime = Date.now();
          this.client = client;
          this.logger.log(`Connected to Database in ${endTime - startTime}ms`);
        },
        error: (err) => {
          this.logger.error(`Error connecting to database: ${err}`);
        }
      });
  }

  public getCollection<T>(collectionName: string): Collection<T> {
    return this.client
      .db(this.config.get<string>('DB_NAME'))
      .collection<T>(collectionName);
  }

  private get connectionString() {
    return `${this.config.get<string>(
      'DB_PROTOCOL'
    )}://${this.config.get<string>('DB_USER')}:${this.config.get<string>(
      'DB_PASSWORD'
    )}@${this.config.get<string>('DB_HOST')}/${this.config.get<string>(
      'DB_NAME'
    )}?retryWrites=true&writeConcern=majority`;
  }
}
