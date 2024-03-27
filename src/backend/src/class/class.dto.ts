// DTO da entidade de aula

export class ClassDTO {
    datetime: string;
    presence: { studentid: number, presence: boolean }[];
}

