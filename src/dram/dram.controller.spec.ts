import { Test, TestingModule } from '@nestjs/testing';
import { DramController } from './dram.controller';

describe('DramController', () => {
  let controller: DramController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DramController],
    }).compile();

    controller = module.get<DramController>(DramController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
