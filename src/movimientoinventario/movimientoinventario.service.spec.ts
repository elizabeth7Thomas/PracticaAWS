import { Test, TestingModule } from '@nestjs/testing';
import { MovimientoinventarioService } from './movimientoinventario.service';

describe('MovimientoinventarioService', () => {
  let service: MovimientoinventarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovimientoinventarioService],
    }).compile();

    service = module.get<MovimientoinventarioService>(MovimientoinventarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
