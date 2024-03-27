import { ong } from "../../ong/ong.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('students')
export class StudentUpdateDTO {
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
