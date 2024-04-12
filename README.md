# BankInfo

Este é um projeto utilizando Express, EJS, Bootstrap, Prisma, TypeScript e Node.js.

## Configuração do Projeto

Antes de começar, você precisará ter o Node.js e o npm instalados em sua máquina.

### Variáveis de Ambiente

No arquivo `.env`, defina as seguintes variáveis de ambiente:

```plaintext
DATABASE_URL="mysql://root:password@localhost:3306/banks"
PORT=3000
XLS_PATH="./bancos.xls"
```
* **DATABASE_URL:** A URL de conexão com o banco de dados MySQL. Certifique-se de substituir "password" pela senha do seu banco de dados, se necessário.
* **PORT:** A porta em que o servidor será executado
* **XLS_PATH:** O caminho para o arquivo Excel contendo os dados dos bancos.

## Configuração do Prisma
Você pode utilizar o comando `npx prisma db push` para sincronizar seu esquema Prisma com o esquema do seu banco de dados

## Scripts Disponíveis
* `npm run build`: Instala as dependências do projeto.
* `npm run seed`: Transfere os dados da planilha para o banco de dados.
* `npm run start`: Inicia a aplicação

A aplicação ficará disponível por padrão em http://localhost:3000

