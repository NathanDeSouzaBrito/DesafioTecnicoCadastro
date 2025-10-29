import express from "express";
import cors from "cors";
import { Pool } from "pg";

const app = express();
app.use(cors());
// Aumenta o limite do body parser para aceitar imagens em base64 no payload
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cruddb",
  password: "123456",
  port: 5432,
});

// rotas
// Mapeia colunas do banco para propriedades camelCase esperadas pelo frontend
const mapUserRow = (row: any) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  password: row.password,
  cpf: row.cpf,
  birthDate: row.birthdate ?? row.birthDate,
  avatarUrl: row.avatarurl ?? row.avatarUrl ?? null,
});

app.get("/users", async (_req, res) => {
  const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
  res.json(result.rows.map(mapUserRow));
});

app.post("/users", async (req, res) => {
  const { name, email, password, cpf, birthDate, avatarUrl } = req.body;
  const result = await pool.query(
    "INSERT INTO users (name, email, password, cpf, birthDate, avatarUrl) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [name, email, password, cpf, birthDate, avatarUrl]
  );
  res.json(mapUserRow(result.rows[0]));
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password, cpf, birthDate, avatarUrl } = req.body;
  const result = await pool.query(
    "UPDATE users SET name=$1, email=$2, password=$3, cpf=$4, birthDate=$5, avatarUrl=$6 WHERE id=$7 RETURNING *",
    [name, email, password, cpf, birthDate, avatarUrl, id]
  );
  res.json(mapUserRow(result.rows[0]));
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM users WHERE id=$1", [id]);
  res.sendStatus(204);
});

app.listen(4000, () => {
  console.log("🚀 API rodando em http://localhost:4000");
});
