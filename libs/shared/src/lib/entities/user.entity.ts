import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        unique: true,
        nullable: false,
    })
    username: string;
    @Column({
        nullable: false,
        length: 10,
        select: false,
    })
    password: string;
}