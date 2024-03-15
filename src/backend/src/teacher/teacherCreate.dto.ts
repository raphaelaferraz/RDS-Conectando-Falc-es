import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('teacher')
export class TeacherCreateDTO {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  dateofbirth: string;

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
