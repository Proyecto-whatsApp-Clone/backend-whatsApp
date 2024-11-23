import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get('all-users')
  findAll() {
    return this.userService.findAll();
  }

  @Get('id/:id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findById(id);
    return user;
  }

  @Get('number/:number')
  async serachForNumber(@Param('number') number: string): Promise<User> {
    const user = await this.userService.findByNumber(number);
    return user;
  }

  @Post('login')
  async login(
    @Body('number') number: string,
    @Body('password') password: string): Promise<User> {
      const user = await this.userService.login(number, password);
      
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      
      return user;
  }

  @Patch('update/id/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto): Promise<User> {
      return this.userService.updateUser(id, updateUserDto)
  }

  @Delete('delete/id/:id')
  remove(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }
}
