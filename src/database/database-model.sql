-- CREATING STRUCTURE
CREATE TABLE ONG (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    email TEXT NOT NULL,
    cnpj TEXT NOT NULL
);
CREATE TABLE Teacher(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    gender TEXT NOT NULL,
    maritalStatus TEXT NOT NULL,
    raceEthnicity TEXT NOT NULL,
    dateOfBirth TIMESTAMPTZ NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    phoneNumber TEXT NOT NULL,
    landline TEXT,
    email TEXT NOT NULL,
    rg TEXT,
    cpf TEXT
);
CREATE TABLE AppUser (
    id SERIAL PRIMARY KEY,
    role TEXT NOT NULL,
    ongId INTEGER REFERENCES ONG(id) NOT NULL,
    teacherId INTEGER REFERENCES Teacher(id),
    email TEXT NOT NULL,
    password TEXT NOT NULL
);
CREATE TABLE Student(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    gender TEXT NOT NULL,
    maritalStatus TEXT NOT NULL,
    raceEthnicity TEXT NOT NULL,
    dateOfBirth TIMESTAMPTZ NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    phoneNumber TEXT NOT NULL,
    landline TEXT,
    email TEXT NOT NULL,
    rg TEXT,
    cpf TEXT,
    ongId INTEGER REFERENCES ONG(id) NOT NULL
);
CREATE TABLE Category(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT NOT NULL
);
CREATE TABLE Workshop(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    ongId INTEGER REFERENCES ONG(id),
    categoryId INTEGER REFERENCES Category(id) NOT NULL
);
CREATE TABLE Classroom(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    day INTEGER NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    workshopId INTEGER REFERENCES Workshop(id) NOT NULL
);
CREATE TABLE Teacher_Classroom(
    id SERIAL PRIMARY KEY,
    teacherId INTEGER REFERENCES Teacher(id) NOT NULL,
    classroomId INTEGER REFERENCES Classroom(id) NOT NULL
);
CREATE TABLE Student_Classroom(
    id SERIAL PRIMARY KEY,
    studentId INTEGER REFERENCES Student(id) NOT NULL,
    classroomId INTEGER REFERENCES Classroom(id) NOT NULL
);
CREATE TABLE Class(
    id SERIAL PRIMARY KEY,
    dateTime date NOT NULL,
    classroomId INTEGER REFERENCES Classroom(id) NOT NULL
);
CREATE TABLE Presence(
    id SERIAL PRIMARY KEY,
    presence BOOLEAN NOT NULL,
    classId INTEGER REFERENCES Class(id) NOT NULL,
    studentId INTEGER REFERENCES Student(id) NOT NULL
);
-- INSERTING TEMPLATE DATA

INSERT INTO ONG (name, address, email, cnpj) VALUES ('Crisálidas', 'Rua A, 123', 'ongCrisalidas@gmail.com', '12345678901234');
INSERT INTO ONG (name, address, email, cnpj) VALUES ('Instituto Ebenézer', 'Rua B, 456', 'institutoebenezer@gmail.com', '12345678901234');

INSERT INTO Teacher (name, gender, maritalStatus, raceEthnicity, dateOfBirth, address, city, state, phoneNumber, landline, email, rg, cpf) VALUES ('Matheus Rocha', 'M', 'Casado', 'Branco', '1990-01-01', 'Rua A, 123', 'São Paulo', 'SP', '11999998888', '1122223333', 'matheus.rocha@gmail.com', '123456789', '12345678901');
INSERT INTO Teacher (name, gender, maritalStatus, raceEthnicity, dateOfBirth, address, city, state, phoneNumber, landline, email, rg, cpf) VALUES ('Sandra Martins', 'F', 'Casado', 'Negro', '1990-01-01', 'Rua A, 123', 'São Paulo', 'SP', '11999998888', '1122223333', 'sandra.martins@gmail.com', '123456789', '12345678901');

INSERT INTO AppUser (role, ongId, email, password) VALUES ('Leader', 1, 'lider1@gmail.com', 'teste');
INSERT INTO AppUser (role, ongId, email, password) VALUES ('Leader', 2, 'lider2@gmail.com', 'teste');
INSERT INTO AppUser (role, ongId, teacherId, email, password) VALUES ('Teacher', 1,  1, 'professor@gmail.com', 'teste');

INSERT INTO Student (name, gender, maritalStatus, raceEthnicity, dateOfBirth, address, city, state, phoneNumber, landline, email, rg, cpf, ongId) VALUES ('João', 'M', 'Solteiro', 'Pardo', '2000-01-01', 'Rua A, 123', 'São Paulo', 'SP', '11999998888', '1122223333', 'aluno1@gmail.com', '123456789', '12345678901', 1);
INSERT INTO Student (name, gender, maritalStatus, raceEthnicity, dateOfBirth, address, city, state, phoneNumber, landline, email, rg, cpf, ongId) VALUES ('Maria', 'F', 'Solteiro', 'Branca', '2000-05-01', 'Rua B, 123', 'São Paulo', 'SP', '11999998888', '1122223333', 'aluno2@gmail.com', '123456789', '12345678901', 1);

INSERT INTO Category (name, color) VALUES ('Esportes', '#F5821E');
INSERT INTO Category (name, color) VALUES ('Qualificação Profissional', '#01AEEF');
INSERT INTO Category (name, color) VALUES ('Cultura', '#F5C630');
INSERT INTO Category (name, color) VALUES ('Empreendedorismo', '#2F3192');
INSERT INTO Category (name, color) VALUES ('Dança', '#EB1C68');
INSERT INTO Category (name, color) VALUES ('Cursos', '#63236F');

INSERT INTO Workshop (name, description, ongId, categoryId) VALUES ('Futebol', 'Oficina para ensinar futebol para crianças de até 8 anos', 1, 1);
INSERT INTO Workshop (name, description, ongId, categoryId) VALUES ('Basquete', 'Oficina para ensinar basquete para crianças de até 8 anos', 1, 1);
INSERT INTO Workshop (name, description, ongId, categoryId) VALUES ('Administração de Empresas', 'Oficina para ensinar administração de empresas para jovens de 15 a 18 anos', 1, 2);
INSERT INTO Workshop (name, description, ongId, categoryId) VALUES ('Desenho', 'Oficina para ensinar desenho para crianças de até 8 anos', 1, 3);
INSERT INTO Workshop (name, description, ongId, categoryId) VALUES ('Como montar um negócio', 'Oficina para ensinar como montar um negócio para jovens de 15 a 18 anos', 1, 4);
INSERT INTO Workshop (name, description, ongId, categoryId) VALUES ('Balé', 'Oficina para ensinar balé para crianças de até 8 anos', 1, 5);
INSERT INTO Workshop (name, description, ongId, categoryId) VALUES ('Inglês', 'Oficina para ensinar inglês para jovens de 15 a 18 anos', 1, 6);

INSERT INTO Classroom (name, day, startTime, endTime, workshopId) VALUES ('Turma 1', 1, '08:00:00', '10:00:00', 1);
INSERT INTO Classroom (name, day, startTime, endTime, workshopId) VALUES ('Turma 2', 1, '10:00:00', '12:00:00', 1);
INSERT INTO Classroom (name, day, startTime, endTime, workshopId) VALUES ('Turma 3', 1, '14:00:00', '16:00:00', 1);
INSERT INTO Classroom (name, day, startTime, endTime, workshopId) VALUES ('Turma 1', 2, '10:00:00', '12:00:00', 2);
INSERT INTO Classroom (name, day, startTime, endTime, workshopId) VALUES ('Turma 2', 4, '10:00:00', '12:00:00', 2);
INSERT INTO Classroom (name, day, startTime, endTime, workshopId) VALUES ('Turma 1', 1, '16:00:00', '18:00:00', 3);
INSERT INTO Classroom (name, day, startTime, endTime, workshopId) VALUES ('Turma 1', 2, '16:00:00', '18:00:00', 4);
INSERT INTO Classroom (name, day, startTime, endTime, workshopId) VALUES ('Turma 1', 3, '16:00:00', '18:00:00', 5);
INSERT INTO Classroom (name, day, startTime, endTime, workshopId) VALUES ('Turma 1', 4, '16:00:00', '18:00:00', 6);
INSERT INTO Classroom (name, day, startTime, endTime, workshopId) VALUES ('Turma 1', 5, '16:00:00', '18:00:00', 7);

INSERT INTO Teacher_Classroom (teacherId, classroomId) VALUES (1, 1);
INSERT INTO Teacher_Classroom (teacherId, classroomId) VALUES (1, 2);
INSERT INTO Teacher_Classroom (teacherId, classroomId) VALUES (1, 3);
INSERT INTO Teacher_Classroom (teacherId, classroomId) VALUES (1, 4);
INSERT INTO Teacher_Classroom (teacherId, classroomId) VALUES (2, 5);
INSERT INTO Teacher_Classroom (teacherId, classroomId) VALUES (2, 6);
INSERT INTO Teacher_Classroom (teacherId, classroomId) VALUES (2, 7);
INSERT INTO Teacher_Classroom (teacherId, classroomId) VALUES (2, 8);
INSERT INTO Teacher_Classroom (teacherId, classroomId) VALUES (2, 9);
INSERT INTO Teacher_Classroom (teacherId, classroomId) VALUES (2, 10);

INSERT INTO Student_Classroom (studentId, classroomId) VALUES (1, 1);
INSERT INTO Student_Classroom (studentId, classroomId) VALUES (1, 2);
INSERT INTO Student_Classroom (studentId, classroomId) VALUES (2, 3);
INSERT INTO Student_Classroom (studentId, classroomId) VALUES (2, 4);
INSERT INTO Student_Classroom (studentId, classroomId) VALUES (1, 5);
INSERT INTO Student_Classroom (studentId, classroomId) VALUES (2, 6);
INSERT INTO Student_Classroom (studentId, classroomId) VALUES (1, 7);
INSERT INTO Student_Classroom (studentId, classroomId) VALUES (2, 8);
INSERT INTO Student_Classroom (studentId, classroomId) VALUES (1, 9);
INSERT INTO Student_Classroom (studentId, classroomId) VALUES (2, 10);

INSERT INTO Class (dateTime, classroomId) VALUES ('2021-01-01', 1);
INSERT INTO Class (dateTime, classroomId) VALUES ('2021-01-01', 2);
INSERT INTO Class (dateTime, classroomId) VALUES ('2021-01-01', 3);
INSERT INTO Class (dateTime, classroomId) VALUES ('2021-01-01', 4);
INSERT INTO Class (dateTime, classroomId) VALUES ('2021-01-01', 5);
INSERT INTO Class (dateTime, classroomId) VALUES ('2021-01-01', 6);
INSERT INTO Class (dateTime, classroomId) VALUES ('2021-01-01', 7);
INSERT INTO Class (dateTime, classroomId) VALUES ('2021-01-01', 8);
INSERT INTO Class (dateTime, classroomId) VALUES ('2021-01-01', 9);
INSERT INTO Class (dateTime, classroomId) VALUES ('2021-01-01', 10);

INSERT INTO Presence (presence, classId, studentId) VALUES (true, 1, 1);
INSERT INTO Presence (presence, classId, studentId) VALUES (true, 2, 1);
INSERT INTO Presence (presence, classId, studentId) VALUES (true, 3, 2);
INSERT INTO Presence (presence, classId, studentId) VALUES (true, 4, 2);
INSERT INTO Presence (presence, classId, studentId) VALUES (true, 5, 1);
INSERT INTO Presence (presence, classId, studentId) VALUES (true, 6, 2);
INSERT INTO Presence (presence, classId, studentId) VALUES (true, 7, 1);
INSERT INTO Presence (presence, classId, studentId) VALUES (true, 8, 2);
INSERT INTO Presence (presence, classId, studentId) VALUES (true, 9, 1);
INSERT INTO Presence (presence, classId, studentId) VALUES (true, 10, 2);


