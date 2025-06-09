# Creación de la BD
DROP DATABASE IF EXISTS gestorJardin;
CREATE DATABASE gestorJardin;
USE gestorJardin;

DROP TABLE IF EXISTS plantas;
CREATE TABLE plantas (
	id int unique not null,
	nombre varchar(30) not null,
    tipo varchar(30) not null,
    frecuenciaRiego int not null,
    ultimoRiego date);

DROP TABLE IF EXISTS jardin;
CREATE TABLE jardin (
	id int unique not null);

ALTER TABLE plantas ADD PRIMARY KEY (id);
ALTER TABLE jardin ADD FOREIGN KEY (id)
	REFERENCES plantas(id);