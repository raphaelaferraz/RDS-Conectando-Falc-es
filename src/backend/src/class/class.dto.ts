// DTO da entidade de aula

export class ClassDTO {
    idClassroom: number;
    dateTime: string;
    idTeacher: number;
    presence: number[];
    absent: number[];
}

