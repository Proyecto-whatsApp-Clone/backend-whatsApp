import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    readonly name?: string;
    readonly lastName?: string;
    readonly email?: string;
    readonly number?: string;
    readonly password?: string;
    readonly age?: number;
}
