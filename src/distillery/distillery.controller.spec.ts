import { Test, TestingModule } from '@nestjs/testing';
import { DistilleryController } from './distillery.controller';

describe('DistilleryController', () => {
  let controller: DistilleryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistilleryController],
    }).compile();

    controller = module.get<DistilleryController>(DistilleryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
