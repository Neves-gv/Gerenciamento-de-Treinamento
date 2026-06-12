-- Remover tabelas existentes (ordem segura para respeitar FK)
DROP TABLE IF EXISTS certificados CASCADE;
DROP TABLE IF EXISTS treinamento CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS setores CASCADE;

-- Tabela de Setores
CREATE TABLE setores (
    id_setores SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    imagem_url TEXT,
    data_criacao DATE
);

-- Tabela de Usuários
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(20),
    ativo BOOLEAN DEFAULT TRUE,
    id_setor INT,
    FOREIGN KEY (id_setor) REFERENCES setores(id_setores)
);

-- Tabela de Treinamento
CREATE TABLE treinamento (
    id_treinamento SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_criacao DATE,
    obrigatorio VARCHAR(3),
    id_setor INT,
    FOREIGN KEY (id_setor) REFERENCES setores(id_setores) 
);

-- Tabela de Certificados
CREATE TABLE certificados (
    id_certificados SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(1),
    arquivo_url TEXT,
    data_emissao DATE,
    valido DATE,
    id_usuario INT,
    id_treinamento INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_treinamento) REFERENCES treinamento(id_treinamento) 
);