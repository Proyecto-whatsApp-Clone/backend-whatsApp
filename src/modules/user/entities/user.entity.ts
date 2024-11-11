import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
@Unique(['number'])
export class User {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @Length(3, 50, { message: 'El nombre debe tener entre 3 y 50 caracteres' })
    name: string;

    @Column()
    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    @Length(3, 50, { message: 'El apellido debe tener entre 3 y 50 caracteres' })
    lastName: string;
    
    @Column()
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
    @IsEmail({}, { message: 'El correo electrónico debe tener un formato válido' })
    email: string;
    
    @Column()
    @IsNotEmpty({ message: 'El teléfono es obligatorio' })
    @Length(10, 10, { message: 'El teléfono debe tener 10 dígitos' })
    number: string;
    
    @Column()
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @Length(8, 20, { message: 'La contraseña debe tener entre 8 y 20 caracteres' })
    password: string;
    
    @Column()
    @IsNotEmpty({ message: 'La edad es obligatoria' })
    age: number
}
