DROP DATABASE IF EXISTS progcd;
CREATE DATABASE progcd;

USE progcd;

CREATE TABLE Uf (
	id INT NOT NULL AUTO_INCREMENT,
	sigla VARCHAR(2),
	nome_uf VARCHAR(50),
	PRIMARY KEY (id)
);

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

CREATE VIEW saida AS (
	SELECT 
	Empresa.nome_fantasia,
	Empresa.slug,
	Empresa.dt_inicio_atividade AS inicio_atividades,
	Empresa.porte AS porte_empresa,
    Cidade.nome AS nome_cidade,
    Uf.sigla AS sigla_uf,
	Cidade.populacao AS populacao_cidade,
	Cidade.latitude AS latitude_cidade,
	Cidade.longitude AS longitude_cidade
    FROM Empresa
    INNER JOIN Cidade ON (Empresa.cidade_id = Cidade.id)
    INNER JOIN Uf ON (Cidade.uf_id = Uf.id)
);


