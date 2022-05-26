DROP DATABASE IF EXISTS progcd;
CREATE DATABASE progcd;

USE progcd;

CREATE TABLE Uf (
	id INT NOT NULL AUTO_INCREMENT,
	sigla VARCHAR(2),
	nome_uf VARCHAR(50),
	PRIMARY KEY (id)
);

INSERT INTO Uf
VALUES
	(NULL, 'SP', 'SÃO PAULO'),
	(NULL, 'PE', 'PERNAMBUCO');

CREATE TABLE Cidade (
	id INT NOT NULL AUTO_INCREMENT,
	uf_id INT,
	nome VARCHAR(255),
	populacao INT,
	latitude VARCHAR(255),
	longitude VARCHAR(255),
	cod_ibge VARCHAR(255),
	cod_siafi VARCHAR(255),
	PRIMARY KEY (id),
	CONSTRAINT FK_CidadeUf FOREIGN KEY (uf_id) REFERENCES Uf(id)
);

INSERT INTO Cidade
VALUES 
	(NULL, 1 , 'SOROCABA', 3333, '11.6', '55.4', '32342', '111'),
	(NULL, 1 , 'ATIBAIA', 3343, '13.6', '54.4', '32142', '222');

CREATE TABLE Empresa (
	id INT NOT NULL AUTO_INCREMENT,
	cidade_id INT,
	slug VARCHAR(255),
	nome_fantasia VARCHAR(255),
	dt_inicio_atividade DATE,
	cnae_fiscal VARCHAR(255),
	cep  VARCHAR(255),
	porte INT,
	PRIMARY KEY (id),
	CONSTRAINT FK_EmpresaCidade FOREIGN KEY (cidade_id) REFERENCES Cidade(id)
);

INSERT INTO Empresa
VALUES 
	(NULL, 1, NULL , 'SANTA PADOCA', '2022-05-23', '5555', '111111', 5),
	(NULL, 1, NULL , 'MECANICA', '2023-06-25', '5445', '112341', 3);

CREATE VIEW arquivo AS
	SELECT nome_fantasia FROM Empresa;
	SELECT slug FROM Empresa;
	SELECT dt_inicio_atividade AS inicio_atividades FROM Empresa;
	SELECT porte AS porte_empresa FROM Empresa;
	SELECT nome AS nome_cidade FROM Cidade;
	SELECT sigla AS sigla_uf FROM Uf
		LEFT JOIN Cidade
        ON Uf.id = Cidade.uf_id;
	SELECT populacao AS populacao_cidade FROM Cidade;
	SELECT latitude AS latitude_cidade FROM Cidade;
	SELECT longitude AS longitude_cidade FROM Cidade;
    
CREATE TABLE saida AS
	SELECT nome_fantasia FROM Empresa;
	SELECT slug FROM Empresa;
	SELECT Empresa.*, dt_inicio_atividade AS inicio_atividades FROM Empresa;
	SELECT Empresa.*, porte AS porte_empresa FROM Empresa;
	SELECT Cidade.*, nome AS nome_cidade FROM Cidade;
	SELECT Uf.*, sigla AS sigla_uf FROM Uf;
	SELECT Cidade.*, populacao AS populacao_cidade FROM Cidade;
	SELECT Cidade.*, latitude AS latitude_cidade FROM Cidade;
	SELECT Cidade.*, longitude AS longitude_cidade FROM Cidade;