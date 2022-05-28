import { Test, TestingModule } from '@nestjs/testing';
import { DramService } from './dram.service';

describe('DramService', () => {
  let service: DramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DramService],
    }).compile();

    service = module.get<DramService>(DramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
