# Creación de la BD
DROP DATABASE IF EXISTS gestorJardin;
CREATE DATABASE gestorJardin;
USE gestorJardin;

DROP TABLE IF EXISTS plantas;
CREATE TABLE plantas (
	id int unique not null auto_increment,
	nombre varchar(30) not null,
    tipo varchar(30) not null,
    frecuenciaRiego int not null,
    ultimoRiego date,
    proximoRiego date);

ALTER TABLE plantas ADD PRIMARY KEY (id);