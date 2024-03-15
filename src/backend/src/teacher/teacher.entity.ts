// Importa a entidade de ONG e de Workshop
import { ong } from "src/ong/ong.entity";
import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity({name: 'teacher'})
export class teacher {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  dateOfBirth: string;

  @Column()
  maritalStatus: string;

  @Column()
  raceEthnicity: string;

  @Column()
  address: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  phoneNumber: string;

  @Column()
  landline: string;

  @Column()
  email: string;
  
  @Column()
  rg: string;

  @Column()
  cpf: string;

}
