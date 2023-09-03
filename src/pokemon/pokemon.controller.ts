import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}



  @Get('generate/:id')
  generate(@Param('id') id: string) {
    return this.pokemonService.generate(+id);
  }

  @Get('kanto-starters')
  firstgenstarters() {
    return this.pokemonService.firstgenstarters();
  }


}
