import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
@Schema()
export class TrainerPokemon extends Document{
    @Prop({ required: true })
    trainerId: string;
    @Prop({ required: true })
    pokemonId: string;
    @Prop({ required: true })
    name: string;
    @Prop({ type: Object })
    nature:NautreModel;
    @Prop({ type: Array })
    types:TypesModel;
    @Prop()
    gender:string;
    @Prop({default:false})
    isShiny: boolean;
    @Prop({ type: Object })
    baseStats:StatsModel;
    @Prop({ type: Object })
    ivs:StatsModel;
    @Prop({ type: Object })
    evs:StatsModel;
    @Prop({ type: Object })
    stats:StatsModel;
    @Prop()
    level:number;
    @Prop()
    baseExperience:number;
    @Prop()
    currentExp:number;
    @Prop()
    expReq:number;

}

export const TrainerPokemonSchema = SchemaFactory.createForClass(TrainerPokemon)

export class PokemonModel{
    pokeInfo?:any;
    pokemonId:string;
    name:string;
    nature:NautreModel;
    types:TypesModel[];
    gender:string;
    isShiny:boolean;
    baseStats:StatsModel;
    ivs:StatsModel;
    evs:StatsModel;
    stats:StatsModel;
    level:number;
    baseExperience:number;
    currentExp:number;
    expReq:number;
}

export interface StatsModel{
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
}

export interface TypesModel{
    name:string;
    color:string;
}

export interface NautreModel{
    name:string;
    increase:string;
    decrease:string;
}