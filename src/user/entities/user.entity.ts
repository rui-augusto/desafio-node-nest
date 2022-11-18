import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column() // {name: 'first_name', width: 20}
    firstName: string;

    @Column() // {name: 'last_name', width: 20}
    lastName: string;

    @Column( {width: 12})
    password: string;

    @Column({default: ""})
    email: string;

    @Column({ default: true })
    isActive: boolean;
}