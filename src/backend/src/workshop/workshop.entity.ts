// Importa a entidade de turma e de categoria
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { classroom } from "src/classroom/classroom.entity";
import { category } from "src/category/category.entity";
import { ong } from "src/ong/ong.entity";

// Entidade de Oficina no banco de dados
@Entity({name: 'classroom'})
export class workshop {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => ong)
  @JoinColumn({ name: "ongid" })
  ong: ong;

  @ManyToOne(() => category)
  @JoinColumn({ name: "categoryid" })
  category: category;
}
