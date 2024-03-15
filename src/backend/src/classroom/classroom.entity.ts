import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { workshop } from "../workshop/workshop.entity";


// Entidade de Turma no banco de dados
@Entity({name: 'classroom'})
export class classroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  day: number;

  @Column()
  starttime: string;
  
  @Column()
  endtime: string;

  @ManyToOne(() => workshop)
    @JoinColumn({ name: "workshop" })
    workshop: workshop; 
}
