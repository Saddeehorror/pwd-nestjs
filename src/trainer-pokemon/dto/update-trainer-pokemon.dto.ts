import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainerPokemonDto } from './create-trainer-pokemon.dto';

export class UpdateTrainerPokemonDto extends PartialType(CreateTrainerPokemonDto) {}
