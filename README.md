# Sistema de Gestão de Contatos - Comércio S.A.
## Por Henrique Hida

Este é um sistema de gestão de contatos para a empresa Comércio S.A. O projeto consiste em um backend construído em Java com Spring Boot, um frontend desenvolvido em React e um banco de dados PostgreSQL.

## Tecnologias Utilizadas

### Backend:
- **Java 17**
- **Spring Boot**
- **PostgreSQL**
- **Lombok**
- **Gradle**

### Frontend:
- **React**
- **Axios**
- **React Router**

### Banco de Dados:
- **PostgreSQL**

## Estrutura do Projeto

### Backend (`/backend`)
```
backend/agenda
│── src/
│   ├── main/java/com/agenda/contatos/
│   │   ├── controller/   # Controladores REST
│   │   ├── service/      # Serviços de regra de negócio
│   │   ├── repository/   # Interfaces de acesso ao banco de dados
│   │   ├── model/        # Entidades JPA
│   │   ├── config/       # Configurações gerais do sistema
|   |   ├── AgendaApplication.java  # Classe principal do Spring Boot
│   ├── resources/
│   │   ├── application.properties  # Configurações do Spring Boot
│── build.gradle   # Configuração do Gradle
```

### Frontend (`/frontend`)
```
frontend/
│── src/
│   ├── pages/       # Páginas principais do sistema
│   ├── services/    # Serviço para consumo da API
│   ├── styles/      # Estilizações das páginas
|   ├── App.js       # Componente raiz
|   ├── Index.js     # Ponto de entrada da aplicação
│── package.json     # Dependências do frontend
```

## Configuração e Execução do Projeto

### 1. Configuração do Banco de Dados
Certifique-se de ter o **PostgreSQL** instalado e crie um banco de dados:
```sql
CREATE DATABASE agenda_contatos;
```
Para popular o banco com dados iniciais, execute o script `scripts/init.sql`:
```sql
psql -U seu_usuario -d agenda_contatos -f scripts/init.sql
```

### 2. Executando o Backend
1. Navegue até a pasta do backend:
   ```sh
   cd backend
   ```
2. Configure o `application.properties` com suas credenciais do banco de dados.
3. Compile e inicie o servidor:
   ```sh
   ./gradlew bootRun
   ```
O backend rodará na porta `8080` por padrão.

### 3. Executando o Frontend
1. Navegue até a pasta do frontend:
   ```sh
   cd frontend
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Inicie o servidor:
   ```sh
   npm start
   ```
O frontend rodará na porta `3000` por padrão.

## API - Endpoints Disponíveis

### Clientes (`/clientes`)
- **POST** `/clientes` → Cadastrar um novo cliente.
- **PUT** `/clientes/{id}` → Editar um cliente existente.
- **DELETE** `/clientes/{id}` → Excluir um cliente.
- **GET** `/clientes` → Listar todos os clientes.
- **GET** `/clientes/buscar?nome={nome}&cpf={cpf}` → Buscar clientes por nome ou CPF.

## Contatos (`/contatos`)
- **POST** `/contatos` → Cadastrar um novo contato para um cliente.
- **PUT** `/contatos/{id}` → Editar um contato existente.
- **DELETE** `/contatos/{id}` → Excluir um contato.

## Licença
Este projeto é distribuído sob a licença GPL-3.0. Veja o arquivo `LICENSE` para mais detalhes.
