import { Test, TestingModule } from '@nestjs/testing';
import { TipomovimientoController } from './tipomovimiento.controller';

describe('TipomovimientoController', () => {
  let controller: TipomovimientoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipomovimientoController],
    }).compile();

    controller = module.get<TipomovimientoController>(TipomovimientoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
