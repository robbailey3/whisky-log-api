import { Test, TestingModule } from '@nestjs/testing';
import { DistilleryController } from './distillery.controller';
import { DistilleryService } from './distillery.service';

jest.mock('./distillery.service');

describe('DistilleryController', () => {
  let controller: DistilleryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistilleryController],
      providers: [DistilleryService]
    }).compile();

    controller = module.get<DistilleryController>(DistilleryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GetDistilleries', () => {
    it('');
  });
});
