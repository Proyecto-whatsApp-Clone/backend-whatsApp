import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(
      @InjectModel(User.name)
      private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ number: createUserDto.number }).exec();

    if (existingUser) {
      throw new HttpException('El número de teléfono ya está registrado.', HttpStatus.BAD_REQUEST);
    }

    for (const [value] of Object.entries(createUserDto)) {
      if (value === null || value === undefined || value === '') {
        throw new HttpException(`Favor de acompletar el formulario.`, HttpStatus.BAD_REQUEST);
      }
    }

    const user = new this.userModel(createUserDto);
    return user.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  findByNumber(number: string): Promise<User> {
    return this.userModel.findOne({ number: number }).exec();
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel
    .findByIdAndUpdate(id, updateUserDto, { new: true })
    .exec();
  }

  async removeUser(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: id }).exec();
  }

  async login(number: string, password: string): Promise<User> {
    return this.userModel.findOne({ number: number, password: password }).exec();
  }

}
