CREATE DATABASE bakeryapi;

CREATE EXTENSION "uuid-ossp";

CREATE TABLE IF NOT EXISTS categories (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  ean13 VARCHAR(13) NOT NULL UNIQUE,
  description VARCHAR(50) NOT NULL,
  ncm CHAR(8) NOT NULL,
  cost DECIMAL(5,2) NOT NULL,
  st DECIMAL(5,2) NOT NULL DEFAULT 0,
  ipi DECIMAL(5,2) NOT NULL DEFAULT 0,
  price DECIMAL(5,2) NOT NULL,
  stock INT NOT NULL,
  category_id UUID,
  FOREIGN KEY(category_id) REFERENCES categories(id)
);
