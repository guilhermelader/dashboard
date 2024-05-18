# Dashboard de Funcionários

Este é um sistema de gerenciamento de funcionários desenvolvido em React.js com Next.js no frontend e Node.js com Express.js no backend. Ele permite visualizar, adicionar, editar e excluir informações de funcionários.

## Tecnologias Utilizadas

### Frontend
- React.js
- Next.js
- Chakra UI (para a interface do usuário)
- Axios (para requisições HTTP)

### Backend
- Node.js
- Express.js
- MongoDB (para o banco de dados)
- Mongoose (para modelagem de dados)

## Configuração do Projeto


### Pré-requisitos
- Node.js instalado em sua máquina
- MongoDB instalado e em execução

### Passo a Passo

1. **Clonar o repositório:**

   ```bash
   git clone https://github.com/guilhermelader/dashboard.git

  cd dashboard
  ```

2. **Instalar as dependências do frontend:**

  ```bash
  cd frontend
  npm install
  ```

3. **Instalar as dependências do backend:**

  ```bash
  cd backend
  npm install
  ```

4. **Configurar as variáveis de ambiente:**

  Crie um arquivo `.env` na pasta `backend` e defina as seguintes variáveis de ambiente:

  ```
  PORT=3000
  MONGODB_URI=mongodb://localhost:27017/employees
  ```

5. **Iniciar o servidor do backend:**

  ```bash
  npm run start
  ```

6. **Iniciar o servidor do frontend:**

  ```bash
  npm run dev
  ```

7. **Acessar o aplicativo no navegador:**

  Abra o navegador e visite `http://localhost:3000`.


