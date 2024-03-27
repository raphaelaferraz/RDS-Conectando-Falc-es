// Entidade de estudante no banco de dados

import { ong } from "../ong/ong.entity";
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { ManyToOne } from "typeorm";

@Entity()
export class student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    gender: string;

    @Column()
    dateofbirth: string;

    @ManyToOne(() => ong)
    @JoinColumn({ name: "ongId" })
    ong: ong; 

    @Column()
    rg: string;

    @Column()
    cpf: string;

    @Column()
    maritalstatus: string;

    @Column()
    raceethnicity: string;

    @Column()
    address: string;

    @Column()
    state: string;

    @Column()
    city: string;

    @Column()
    phonenumber: string;

    @Column()
    landline: string;

    @Column()
    email: string;
}
  