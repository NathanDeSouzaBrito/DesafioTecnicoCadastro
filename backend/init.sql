CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100),
  cpf VARCHAR(20),
  birthDate VARCHAR(20),
  avatarUrl TEXT
);
