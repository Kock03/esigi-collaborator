import { Test, TestingModule } from '@nestjs/testing';
import { BankDataService } from './bank-data.service';

describe('BankDataService', () => {
  let service: BankDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankDataService],
    }).compile();

    service = module.get<BankDataService>(BankDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
