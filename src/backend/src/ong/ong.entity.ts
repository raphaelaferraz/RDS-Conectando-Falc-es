import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Entidade que representa a ONG
@Entity({name: 'ong'})
export class ong {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  cnpj: string;
  workshops: any;
}