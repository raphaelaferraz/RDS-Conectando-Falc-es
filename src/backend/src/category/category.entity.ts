// Entidade que representa a categoria de oficinas
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'category'})
export class category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    color: string;
}