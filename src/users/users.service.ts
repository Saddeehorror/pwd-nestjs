import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User} from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserNameDto } from './dto/updateUsername.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User >) {}

  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña con bcrypt

    const newUser = new this.userModel({ username, password: hashedPassword });
    return newUser.save();
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findByGoogleId(googleId:string){
    const user = await this.userModel.findOne({sub:googleId});
    return user;
  }

  create(object:any){
    // return true;
    const newUser = new this.userModel(object);
    return newUser.save();
  }

  async updateUserUsername(request:UpdateUserNameDto){
    let user = await this.findByGoogleId(request.id)

    if (!user) {
      throw new Error('usuario no encontrado');
    }

    let userUpdate = await this.userModel.findByIdAndUpdate(user._id,
      {username:request.username},
      {new:true}
      )

    return userUpdate;

  }

  async updateUserIntro(request:UpdateUserNameDto){
    console.log('updateUserIntro');
    let user = await this.findByGoogleId(request.id)

    if (!user) {
      throw new Error('usuario no encontrado');
    }

    let userUpdate = await this.userModel.findByIdAndUpdate(user._id,
      {skipintro:true},
      {new:true}
      )

    return userUpdate;

  }

}