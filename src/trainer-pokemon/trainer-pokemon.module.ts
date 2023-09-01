import { Module } from '@nestjs/common';
import { TrainerPokemonService } from './trainer-pokemon.service';
import { TrainerPokemonController } from './trainer-pokemon.controller';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainerPokemon, TrainerPokemonSchema } from './entities/trainer-pokemon.entity';

@Module({
  imports:[
    PokemonModule,
    MongooseModule.forFeature([{ name: TrainerPokemon.name, schema: TrainerPokemonSchema }]),
  ],
  controllers: [TrainerPokemonController],
  providers: [TrainerPokemonService],

})
export class TrainerPokemonModule {}
