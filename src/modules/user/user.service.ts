import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    private readonly entityManager: EntityManager
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const userNew = new User();

    userNew.name = createUserDto.name;
    userNew.lastName = createUserDto.lastName;
    userNew.email = createUserDto.email;
    userNew.password = createUserDto.password;
    userNew.age = createUserDto.age;

    const userRepository = this.entityManager.getRepository(User);
    return userRepository.save(userNew);
  }

  findAll(): Promise<User[]> {
    const userRepository = this.entityManager.getRepository(User);
    return userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
