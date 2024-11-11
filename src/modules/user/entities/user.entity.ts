import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @ObjectIdColumn()
    _id: string;

    @Column()
    name: string;

    @Column()
    lastName: string;
    
    @Column()
    email: string;

    @Column()
    phoneNumber: string;
    
    @Column()
    password: string;
    
    @Column()
    age: number
}
