# Desafio Técnico — CRUD de Usuários

Este repositório contém um pequeno sistema de cadastro de usuários dividido em duas partes:

- `backend/` — API em Node.js + Express que persiste dados em PostgreSQL.
- `frontend/` — cliente em Nuxt 4 (Vue 3 + Pinia) com páginas para listar, criar, editar e excluir usuários.

O objetivo deste README é explicar rapidamente a arquitetura, como executar o projeto localmente e onde procurar as principais partes do código.

## Visão geral

- Usuário: { name, email, password, cpf, birthDate, avatarUrl }
- O `avatarUrl` é armazenado como uma data URL (base64) no banco de dados para este exercício.
- Rotas principais:
  - GET `/users` — lista usuários
  - POST `/users` — cria usuário
  - PUT `/users/:id` — atualiza usuário
  - DELETE `/users/:id` — remove usuário

## Estrutura do projeto

```
desafioTecnico/
├─ backend/
│  ├─ src/index.ts       # API Express
│  ├─ init.sql           # esquema inicial do banco
│  └─ package.json
├─ frontend/
│  ├─ pages/             # rotas Nuxt (index, users/*)
│  ├─ components/        # UserForm.vue
│  ├─ stores/            # Pinia store (useUsers.ts)
│  └─ services/api.ts    # axios + baseURL
└─ docker-compose.yml
```

## Requisitos

- Node.js (16+ recomendado)
- npm
- PostgreSQL rodando localmente ou via Docker

> Nota: o projeto padrão usa as credenciais e porta definidas em `backend/src/index.ts` (user: `postgres`, password: `123456`, database: `cruddb`, port: `5432`). Ajuste conforme sua máquina.

## Como rodar (Windows / PowerShell)

1. Inicie o banco de dados PostgreSQL (local ou via Docker). Se preferir Docker compose:

```powershell
# na raiz do repositório
docker-compose up -d
```

2. Backend

```powershell
cd C:\Users\desco\desafioTecnico\backend
npm install
npm run dev
```

O backend irá iniciar em http://localhost:4000

3. Frontend

```powershell
cd C:\Users\desco\desafioTecnico\frontend
npm install
npm run dev
```

O Nuxt normalmente roda em http://localhost:3000 (o terminal mostra a porta exata).

## Observações sobre imagens

- No formulário de cadastro, ao escolher uma imagem o cliente converte para Data URL (base64) e envia no campo `avatarUrl`.
- O backend aceita esse campo como `TEXT` no PostgreSQL (coluna `avatarUrl`) e retorna o mesmo valor no JSON. Em produção é preferível salvar arquivos reais (S3 / disco) e retornar URLs curtas.
- Para evitar problemas com payloads grandes, o backend já está configurado com um limite de 10MB para `express.json()` e `express.urlencoded()`.

## Principais arquivos e responsabilidades

- `backend/src/index.ts` — definição das rotas e map de colunas do banco para camelCase (para compatibilidade com o frontend).
- `backend/init.sql` — script de criação da tabela `users`.
- `frontend/services/api.ts` — instância axios com `baseURL` apontando para `http://localhost:4000`.
- `frontend/stores/useUsers.ts` — store Pinia que contém `fetchUsers`, `createUser`, `update`, `deleteUser` e aliases `add`/`remove`.
- `frontend/components/UserForm.vue` — componente apresentacional para criar/editar usuários; emite `submit` para o pai.
- `frontend/pages/users/index.vue` — lista de usuários; exibe avatar (se houver) ou placeholder com iniciais.


## Como revisar o código rapidamente (******* Para Recrutador ******)

- Rode `npm run dev` no backend e frontend e abra a interface em `/users`.
- Veja `frontend/components/UserForm.vue` para entender como o formulário constrói o payload.
- Veja `frontend/stores/useUsers.ts` para a lógica de comunicação com a API.
- Veja `backend/src/index.ts` para entender os endpoints e o mapeamento de colunas.

---
