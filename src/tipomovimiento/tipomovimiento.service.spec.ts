import { Test, TestingModule } from '@nestjs/testing';
import { TipomovimientoService } from './tipomovimiento.service';

describe('TipomovimientoService', () => {
  let service: TipomovimientoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipomovimientoService],
    }).compile();

    service = module.get<TipomovimientoService>(TipomovimientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
