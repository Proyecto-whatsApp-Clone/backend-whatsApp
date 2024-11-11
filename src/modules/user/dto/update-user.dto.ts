import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    name: string;
    lastName: string;
    email: string;
    number: string;
    password: string;
    age: number;
}
