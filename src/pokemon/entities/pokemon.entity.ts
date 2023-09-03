export class PokemonModel{
    pokeInfo?:any;
    trainerId?:string;
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