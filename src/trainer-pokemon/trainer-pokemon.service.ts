import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrainerPokemon } from './entities/trainer-pokemon.entity';
import { PokemonService } from 'src/pokemon/pokemon.service';


@Injectable()
export class TrainerPokemonService {

  constructor(
    @InjectModel(TrainerPokemon.name) private TrainerPokemonModel: Model<TrainerPokemon>,
    private pokemonService:PokemonService
    ){}

  async create(id: number):Promise<TrainerPokemon> {

    let pokemon = await this.pokemonService.generate(id);

    console.log(pokemon);

    let newPokemon = new this.TrainerPokemonModel(pokemon);
    console.log(newPokemon);
    return newPokemon.save();
  }

  async getAll(){
    let pokemon = await this.TrainerPokemonModel.find();

    return pokemon;
  }


}
