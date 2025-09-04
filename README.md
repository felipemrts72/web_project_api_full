🃏 Web Project Fullstack – React + Node.js + MongoDB

🌟 Descrição

Projeto web fullstack com frontend em React + Vite e backend em Node.js/Express, consumindo uma API RESTful com MongoDB.

Funcionalidades principais:

Cadastro/login de usuários com JWT

CRUD de cards (criar, visualizar, curtir/descurtir, excluir)

Atualização de perfil e avatar

Popups interativos para cards e edição de perfil

Estado reativo no frontend (adicionar, deletar, curtir sem recarregar a página)

🖥 Tecnologias

Frontend: React, Vite, JSX, CSS Modules, Context API

Backend: Node.js, Express, Mongoose, MongoDB

Autenticação: JWT

Validação: validator

Outros: fetch API, async/await, ES Modules

⚡ Funcionalidades
Frontend

Adicionar novos cards no início da lista

Deletar apenas cards do usuário atual

Curtir e descurtir cards (sincronizado com backend)

Popups para visualização de imagem, edição de perfil e avatar

Backend

Endpoints principais:

GET /users/me – dados do usuário atual

PATCH /users/me – atualizar perfil

PATCH /users/me/avatar – atualizar avatar

GET /cards – listar cards

POST /cards – criar card

DELETE /cards/:id – deletar card

PUT /cards/:id/likes – curtir

DELETE /cards/:id/likes – descurtir

Protegido com JWT

Validação e tratamento de erros

Banco de Dados

MongoDB

Collections:

users – campos: name, about, avatar, email, password

cards – campos: name, link, owner, likes, createdAt

Cada card pertence a um usuário (owner)

Likes são arrays de user.\_id

📂 Estrutura do Projeto
web_project/
├── backend/
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── app.js
│ ├── index.js
│ └── package.json
└── frontend/
├── src/
│ ├── components/
│ ├── contexts/
│ ├── utils/
│ ├── App.jsx
│ ├── index.jsx
│ └── styles/
├── package.json
└── vite.config.js

🚀 Como rodar
Backend
cd backend
npm install # instala dependências
npm run dev # inicia servidor com nodemon
npm start # iniciar em produção

Frontend
cd frontend
npm install # instala dependências
npm run dev # inicia Vite na porta 5173
npm run build # build de produção

Acesse o frontend em: http://localhost:5173

🔧 Configuração

MongoDB: configure MONGO_URI no backend

JWT: configure JWT_SECRET no backend

CORS: habilite no backend para permitir requisições do frontend

💡 Observações

Cards criados por outros usuários não podem ser deletados

Likes/deslikes atualizam a interface imediatamente

Todos os endpoints sensíveis são protegidos por JWT

Cards são adicionados no início da lista e carregados ordenados por data (createdAt)

🎨 Extras

Você pode melhorar ainda mais o README adicionando:

GIFs mostrando a interface do projeto

Screenshots de popups, cards e perfil

Badges de cobertura de testes ou CI/CD
