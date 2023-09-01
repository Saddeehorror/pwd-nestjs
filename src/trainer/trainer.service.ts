import { Injectable } from '@nestjs/common';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Trainer } from './entities/trainer.entity';
import { Model } from 'mongoose';

@Injectable()
export class TrainerService {
  constructor(@InjectModel(Trainer.name) private userModel: Model<Trainer >) {}

  create(createTrainerDto: CreateTrainerDto) {

    const newTrainer = new this.userModel({ pokename:'wasd'});
    return newTrainer.save();

  }

}
