// Importa a entidade de ONG e de Workshop
import { workshop } from "src/workshop/workshop.entity";
import { ong } from "src/ong/ong.entity";

// DTO de professor

export class TeacherDTO {
  name: string;
  gender: string;
  dateOfBirth: string;
  maritalStatus: string;
  raceEthnicity: string;
  address: string;
  state: string;
  city: string;
  phoneNumber: string;
  landline: string;
  email: string;
  rg: string;
  cpf: string;
}
