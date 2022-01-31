import { Test, TestingModule } from '@nestjs/testing';
import { IdiomsService } from './languages.service';

describe('IdiomsService', () => {
  let service: IdiomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdiomsService],
    }).compile();

    service = module.get<IdiomsService>(IdiomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
