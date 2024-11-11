import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const userNew = new User();

    userNew.name = createUserDto.name;
    userNew.lastName = createUserDto.lastName;
    userNew.email = createUserDto.email;
    userNew.number = createUserDto.number;
    userNew.password = createUserDto.password;
    userNew.age = createUserDto.age;

    const userRepository = this.entityManager.getRepository(User);
    return userRepository.save(userNew);
  }

  findAll(): Promise<User[]> {
    const userRepository = this.entityManager.getRepository(User);
    return userRepository.find();
  }

  async findById(id: string): Promise<User | undefined> {
    const objectId = new ObjectId(id);
    return await this.userRepository.findOne({
      where: { _id: objectId },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async removeUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
