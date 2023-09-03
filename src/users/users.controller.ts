import { Controller, Post, Body, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { UpdateUserNameDto } from './dto/updateUsername.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @UseGuards(AuthGuard)
  async createUser(@Body('username') username: string, @Body('password') password: string) {
    const user = await this.usersService.createUser(username, password);
    return user;
  }
  @Put('username')
  async updateUserUsername(@Body() request: UpdateUserNameDto){
    return await this.usersService.updateUserUsername(request);
  }

  @Put('userIntro')
  async updateUserIntro(@Body() request: UpdateUserNameDto){
    return await this.usersService.updateUserIntro(request);
  }

}