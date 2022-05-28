import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { GeocodingService } from './geocoding.service';

describe('GeocodingService', () => {
  let service: GeocodingService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeocodingService],
      imports: [HttpModule, ConfigModule]
    }).compile();

    service = module.get<GeocodingService>(GeocodingService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('getFormattedAddress', () => {
    beforeEach(() => {
      jest.spyOn<HttpService, 'get'>(httpService, 'get').mockReturnValue(
        of({
          data: { results: [{ formatted_address: '123 Fake Street, Dengub' }] }
        } as any)
      );
    });
    it('should make a http GET request to the google api', async () => {
      await service.getFormattedAddress(1, 1);

      expect(httpService.get).toHaveBeenCalled();
    });

    it('should pass the latitude and longitude to the api', async () => {
      await service.getFormattedAddress(1, 1);

      expect(httpService.get).toHaveBeenCalledWith(
        expect.stringContaining('latlng=1,1')
      );
    });

    it('should return the formatted address', async () => {
      const response = await service.getFormattedAddress(1, 1);

      expect(response).toBe('123 Fake Street, Dengub');
    });
  });
});
