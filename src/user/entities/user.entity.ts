import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() // {name: 'first_name', width: 20}
    firstName: string;

    @Column() // {name: 'last_name', width: 20}
    lastName: string;

    @Column( {width: 12})
    password: string;

    @Column()
    email: string;

    @Column({ default: true })
    isActive: boolean;
}