import { Test, TestingModule } from '@nestjs/testing';
import { TrainerPokemonController } from './trainer-pokemon.controller';
import { TrainerPokemonService } from './trainer-pokemon.service';

describe('TrainerPokemonController', () => {
  let controller: TrainerPokemonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainerPokemonController],
      providers: [TrainerPokemonService],
    }).compile();

    controller = module.get<TrainerPokemonController>(TrainerPokemonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
