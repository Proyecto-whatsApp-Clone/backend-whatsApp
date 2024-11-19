import { Injectable } from '@nestjs/common';
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

  createUser(createUserDto: CreateUserDto): Promise<User> {
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

  // async register(number: string, password: string) {
  //   this.userRepository.findOne({
  //     where: { number: number, password: password }
  //   });

  //   return `Numero: ${number}, Contraseña ${password}`;
  // }
}
