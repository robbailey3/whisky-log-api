import { Test, TestingModule } from '@nestjs/testing';
import { WhiskyController } from './whisky.controller';

describe('WhiskyController', () => {
  let controller: WhiskyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhiskyController],
    }).compile();

    controller = module.get<WhiskyController>(WhiskyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
