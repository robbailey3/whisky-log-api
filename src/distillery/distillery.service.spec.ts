import { Test, TestingModule } from '@nestjs/testing';
import { DistilleryService } from './distillery.service';

describe('DistilleryService', () => {
  let service: DistilleryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DistilleryService],
    }).compile();

    service = module.get<DistilleryService>(DistilleryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
