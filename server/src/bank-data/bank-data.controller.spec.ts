import { Test, TestingModule } from '@nestjs/testing';
import { BankDataController } from './bank-data.controller';

describe('BankDataController', () => {
  let controller: BankDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankDataController],
    }).compile();

    controller = module.get<BankDataController>(BankDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
