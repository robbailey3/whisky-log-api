import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { GeocodingResponse } from './responses/geocodingResponse';

@Injectable()
export class GeocodingService {
  private readonly logger = new Logger(GeocodingService.name);

  private readonly API_URL =
    'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  public async getFormattedAddress(
    latitude: number,
    longitude: number
  ): Promise<string> {
    this.logger.log(`Getting formatted address for ${latitude}, ${longitude}`);

    try {
      const response = await firstValueFrom(
        this.httpService.get<GeocodingResponse>(
          `${this.API_URL}?latlng=${latitude},${longitude}&key=${this.API_KEY}`
        )
      );

      return response.data.results[0]?.formatted_address ?? '';
    } catch (e: any) {
      this.logger.error(
        `Failed to get formatted address for ${latitude}, ${longitude} with error: ${e.message}`
      );
      throw new InternalServerErrorException(e);
    }
  }

  private get API_KEY(): string {
    return this.configService.get<string>('GOOGLE_API_KEY');
  }
}
