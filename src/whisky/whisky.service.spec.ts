import { Test, TestingModule } from '@nestjs/testing';
import { WhiskyService } from './whisky.service';

describe('WhiskyService', () => {
  let service: WhiskyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhiskyService],
    }).compile();

    service = module.get<WhiskyService>(WhiskyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
