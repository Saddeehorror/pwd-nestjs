import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrainerPokemonService } from './trainer-pokemon.service';
import { CreateTrainerPokemonDto } from './dto/create-trainer-pokemon.dto';
import { UpdateTrainerPokemonDto } from './dto/update-trainer-pokemon.dto';

@Controller('trainer-pokemon')
export class TrainerPokemonController {
  constructor(private readonly trainerPokemonService: TrainerPokemonService) {}




  @Post()
  async create(@Body() request: CreateTrainerPokemonDto) {
    return await this.trainerPokemonService.create(request);
  }

  @Get()
  async getAll() {
    return await this.trainerPokemonService.getAll();
  }

}
