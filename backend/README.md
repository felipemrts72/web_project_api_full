#AroundB API

📌 Descrição | Description

##PT-BR
Este é um projeto de backend desenvolvido com Node.js, Express.js e MongoDB, que simula uma rede social simples. Usuários podem se cadastrar, editar seus perfis, adicionar cartões (posts com links de imagem), curtir ou descurtir cartões, e deletá-los. O projeto utiliza middlewares personalizados para controle de erros e identificação de usuário.

##EN
This is a backend project built with Node.js, Express.js, and MongoDB that simulates a simple social network. Users can register, edit their profiles, add cards (posts with image links), like or dislike cards, and delete them. The project uses custom middlewares for error handling and user identification.

##⚙️ Funcionalidades | Features

🧑 Usuários | Users

🔍 Listar todos os usuáriosGET /usersLista todos os usuários cadastrados.

🖎️ Obter um usuário por IDGET /users/:idRetorna os dados de um usuário específico.

📝 Criar novo usuárioPOST /usersCria um novo usuário com nome, sobre e avatar.

✏️ Atualizar perfil do usuário logadoPATCH /users/meAtualiza nome e descrição do usuário simulado.

🖼️ Atualizar avatar do usuário logadoPATCH /users/me/avatarAtualiza o link do avatar do usuário simulado.

🃏 Cartões | Cards

🧾 Listar todos os cartõesGET /cardsLista todos os cartões existentes.

➕ Criar um novo cartãoPOST /cardsCria um cartão com nome e link da imagem, associando ao usuário atual.

❌ Deletar um cartão por IDDELETE /cards/:idDeleta o cartão correspondente ao ID.

❤️ Curtir um cartãoPUT /cards/:cardId/likesAdiciona um like ao cartão se ainda não tiver curtido.

💔 Descurtir um cartãoDELETE /cards/:cardId/likesRemove o like do cartão.

🚧 Middleware & Validações | Middleware & Validation

errorHandler: Tratamento centralizado de erros com status codes adequados.

##🧱 Tecnologias | Technologies

Node.js

Express.js

MongoDB & Mongoose

JavaScript (ESModules)

Validação com RegEx

Middleware personalizado

##📦 Instalação | Installation

git clone https://github.com/felipemrts72/aroundb.git
cd aroundb
npm install
npm start

Certifique-se de ter o MongoDB rodando localmente na porta padrão (mongodb://localhost:27017/aroundb).

##📄 Licença | License

Este projeto é licenciado sob a Licença MIT.

This project is licensed under the MIT License.
