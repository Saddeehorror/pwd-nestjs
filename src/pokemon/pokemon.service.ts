import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import axios from 'axios';
import { NautreModel, PokemonModel, StatsModel, TypesModel } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {




  async generate(id: number) {
    let pokemonInfo = await this.getPokemonInfo(id)
    let pokemon:PokemonModel = {
      // pokeInfo: pokemonInfo,
      trainerId:'',
      name:pokemonInfo.name,
      pokemonId:(pokemonInfo.id < 10)?'0'+pokemonInfo.id:pokemonInfo.id,
      types:this.setTypes(pokemonInfo),
      nature:this.setNature(),
      gender:this.setGender(),
      isShiny:this.setRandomShinyStatus(),
      baseStats:{
        hp: this.serchPokemonStat('hp',pokemonInfo),
        attack: this.serchPokemonStat('attack',pokemonInfo),
        defense: this.serchPokemonStat('defense',pokemonInfo),
        specialAttack: this.serchPokemonStat('special-attack',pokemonInfo),
        specialDefense: this.serchPokemonStat('special-defense',pokemonInfo),
        speed: this.serchPokemonStat('speed',pokemonInfo),
      },
      ivs:{
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
      },
      evs:{
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
      },
      stats:{
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
      },
      level:5,
      currentExp:0,
      expReq:0,
      baseExperience:pokemonInfo.base_experience
    }


    pokemon.ivs = this.generateRandomIVs(pokemon.baseStats);
    pokemon.evs = this.initializeEVs(pokemon.baseStats);
    pokemon.stats = {
      hp: this.calculateStat('hp',pokemon),
      attack: this.calculateStat('attack',pokemon),
      defense: this.calculateStat('defense',pokemon),
      specialAttack: this.calculateStat('specialAttack',pokemon),
      specialDefense: this.calculateStat('specialDefense',pokemon),
      speed: this.calculateStat('speed',pokemon),
    };
    pokemon.expReq = this.calcExpRequired(pokemon.baseExperience,pokemon.level)
    return pokemon;
    return pokemonInfo;

  }

  calcExpRequired(base,lvl){
    return Math.round((base * lvl+1 * lvl+1) / (lvl * lvl));
  }
  serchPokemonStat(stat:string,pokemon):number{

    let statValue = 0;

    pokemon.stats.forEach(element => {
      if (element.stat.name == stat) {
        statValue = element.base_stat
      }
    });
    return statValue;
  }

  async getPokemonInfo(id:number){
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/'+id);
    return response.data;
  }

  generateRandomIVs(baseStats:StatsModel):StatsModel {
    const ivs:any = {};
    // Generate random IV values between 0 and 31 for each stat
    for (const stat in baseStats) {
      ivs[stat] = Math.floor(Math.random() * 32);
    }
    return ivs;
  }

  initializeEVs(baseStats:StatsModel):StatsModel {
    const evs:any = {};
    // Initialize EVs to 0 for each stat
    for (const stat in baseStats) {
      evs[stat] = 0;
    }
    return evs;
  }

  calculateStat(statName: string,pokemon:PokemonModel) {
    const base = pokemon.baseStats[statName];
    const iv = pokemon.ivs[statName];
    const ev = pokemon.evs[statName];
    const nature = pokemon.nature;
    const levelModifier = 2; // Adjust for actual level scaling

  // Factor de modificación de la naturaleza
  const natureModifier = nature.increase === statName ? 1.1 : nature.decrease === statName ? 0.9 : 1;


  // Fórmula para calcular la estadística final con la influencia de la naturaleza
  const stat = Math.floor((((base * 2 + iv + ev / 4) * pokemon.level) / 100 + 5) * natureModifier * levelModifier);

  return stat;
  }

   setTypes(pokemonInfo:any){
    let types = {
      normal:{name:'Normal',color:'bg-gray-500'},
      fighting:{name:'Lucha',color:'bg-pink-500'},
      flying:{name:'Volador',color:'bg-blue-200'},
      poison:{name:'Veneno',color:'bg-purple-500'},
      grass:{name:'Hierba',color:'bg-green-500'},
      fire:{name:'Fuego',color:'bg-orange-500'},
      water:{name:'Agua',color:'bg-blue-500'},
    }

    let pokeTypes:TypesModel[] = []

    for (let index = 0; index < pokemonInfo.types.length; index++) {
      console.log(types[pokemonInfo.types[index].type.name]);
      pokeTypes.push(types[pokemonInfo.types[index].type.name])
      
    }
  
    // await pokemonInfo.types.forEach(element => {
    //   pokeTypes.push(types[element.type.name])
    // });

    return pokeTypes;

  }
  setNature(){
    enum Stat {
      HP = 'hp',
      Attack = 'attack',
      Defense = 'defense',
      SpecialAttack = 'specialAttack',
      SpecialDefense = 'specialDefense',
      Speed = 'speed',
    }

    const availableNatures: NautreModel[] = [
      { name: 'Adamant', increase: Stat.Attack, decrease: Stat.SpecialAttack },
      { name: 'Bashful', increase: null, decrease: null },
      { name: 'Bold', increase: Stat.Defense, decrease: Stat.Attack },
      { name: 'Brave', increase: Stat.Attack, decrease: Stat.Speed },
      { name: 'Calm', increase: Stat.SpecialDefense, decrease: Stat.Attack },
      { name: 'Careful', increase: Stat.SpecialDefense, decrease: Stat.SpecialAttack },
      { name: 'Docile', increase: null, decrease: null },
      { name: 'Gentle', increase: Stat.SpecialDefense, decrease: Stat.Defense },
      { name: 'Hardy', increase: null, decrease: null },
      { name: 'Hasty', increase: Stat.Speed, decrease: Stat.Defense },
      { name: 'Impish', increase: Stat.Defense, decrease: Stat.SpecialAttack },
      { name: 'Jolly', increase: Stat.Speed, decrease: Stat.SpecialAttack },
      { name: 'Lax', increase: Stat.Defense, decrease: Stat.SpecialDefense },
      { name: 'Lonely', increase: Stat.Attack, decrease: Stat.Defense },
      { name: 'Mild', increase: Stat.SpecialAttack, decrease: Stat.Defense },
      { name: 'Modest', increase: Stat.SpecialAttack, decrease: Stat.Attack },
      { name: 'Naive', increase: Stat.Speed, decrease: Stat.SpecialDefense },
      { name: 'Naughty', increase: Stat.Attack, decrease: Stat.SpecialDefense },
      { name: 'Quiet', increase: Stat.SpecialAttack, decrease: Stat.Speed },
      { name: 'Quirky', increase: null, decrease: null },
      { name: 'Rash', increase: Stat.SpecialAttack, decrease: Stat.SpecialDefense },
      { name: 'Relaxed', increase: Stat.Defense, decrease: Stat.Speed },
      { name: 'Sassy', increase: Stat.SpecialDefense, decrease: Stat.Speed },
      { name: 'Serious', increase: null, decrease: null },
      { name: 'Timid', increase: Stat.Speed, decrease: Stat.Attack },
      // Agrega más naturalezas aquí
    ];
    const randomIndex = Math.floor(Math.random() * availableNatures.length);
  return availableNatures[randomIndex];
  }

  setGender(){
    const randomGender = Math.random() < 0.5 ? 'Male' : 'Female';
    return randomGender;
  }

  setRandomShinyStatus() {
    return Math.random() < 0.05; // Probabilidad del 5% de ser shiny
  }


  async firstgenstarters(){
    const firstGenid = [1,4,7];
    let firgenPokemon = [];

    for (let index = 0; index < firstGenid.length; index++) {
      let poke = await this.generate(firstGenid[index])
      console.log(poke);
      firgenPokemon.push(poke);
    }

    return firgenPokemon;


  }

}
