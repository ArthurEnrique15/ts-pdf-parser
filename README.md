# Parser de Faturas da CEMIG em typescript (Node.js + React)

Este projeto recebe faturas da CEMIG e utiliza um parser de pdf para extrair as informações importantes da fatura, armazenando em um banco de dados postgresql.

O projeto foi hospedado no seguinte link: https://pdf-parser-frontend.onrender.com/

Porém, caso queira executar localmente, basta seguir o passo a passo abaixo:

## Passo a passo para execução do projeto

Pré requisitos: Node.js v18 e PostgreSQL v15 instalados

### Execução do backend

Primeiramente, navegue até a pasta /backend e crie um arquivo .env na raiz da pasta, baseado no arquivo .env.example. Substitua os valores DB_USERNAME e DB_PASSWORD na url pelo user e senha de acesso do seu usuário do postgres. O DB_HOST deve ser localhost e o DB_NAME pode ser à sua escolha. 

Em seguida, execute o comando `npm install` e `npx prisma migrate dev --name init`

Assim que as migrations terminarem de executar, o banco já estará devidamente criado e com a tabela invoice. Agora basta executar o comando `npm run dev`, e o servidor estará rodando.

Obs: O servidor executa na porta 3333, então garanta que ela está livre.

### Execução do frontend

Navegue até a pasta /frontend e crie um arquivo .env baseado no .env.example. A url não precisa ser alterada pois é no localhost:3333 que o backend estará executando.

Execute o comando `npm install`, aguarde a instalação das bibliotecas e em seguida execute o comando `npm run dev`

Obs: O frontend executa na porta 5173 (padrão do vite), então garanta que ela está livre

Com o frontend rodando, acesse o link http://localhost:5173/