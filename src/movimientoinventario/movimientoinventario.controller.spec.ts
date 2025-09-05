import { Test, TestingModule } from '@nestjs/testing';
import { MovimientoinventarioController } from './movimientoinventario.controller';

describe('MovimientoinventarioController', () => {
  let controller: MovimientoinventarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovimientoinventarioController],
    }).compile();

    controller = module.get<MovimientoinventarioController>(MovimientoinventarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
