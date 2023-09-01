import { Test, TestingModule } from '@nestjs/testing';
import { TrainerPokemonService } from './trainer-pokemon.service';

describe('TrainerPokemonService', () => {
  let service: TrainerPokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainerPokemonService],
    }).compile();

    service = module.get<TrainerPokemonService>(TrainerPokemonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
