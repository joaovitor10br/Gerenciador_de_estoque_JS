# 📦 Gerenciador de Estoque de Componentes

Um sistema simples e eficiente para gerenciamento de estoque de componentes eletrônicos, desenvolvido para substituir uma arquitetura legada em Java por uma solução ágil em **Node.js**.

## 🚀 Sobre o Projeto
Este projeto foi criado para resolver a necessidade de catalogar componentes de hardware e eletrônica. Ele permite o cadastro, listagem em tempo real e exclusão de itens, garantindo que não haja duplicidade de nomes no banco de dados.

### 🛠 Tecnologias Utilizadas
* **Backend:** [Node.js](https://nodejs.org/) com [Express](https://expressjs.com/)
* **Banco de Dados:** [MySQL](https://www.mysql.com/)
* **Frontend:** HTML5, CSS3 e JavaScript (Vanilla)
* **Ambiente:** Desenvolvido e testado em Linux Mint

---

## 📋 Funcionalidades
- [x] Cadastro de componentes (Nome, Categoria, Quantidade).
- [x] Listagem automática de itens cadastrados.
- [x] Prevenção de duplicidade (Unique Key no Banco de Dados).
- [x] Exclusão de componentes com confirmação.
- [x] Feedback visual ao usuário durante o salvamento.

---

## 🔧 Como Rodar o Projeto

### 1. Pré-requisitos
Certifique-se de ter o Node.js e o MySQL instalados na sua máquina Linux.

### 2. Configuração do Banco de Dados
Acesse seu terminal MySQL e execute os seguintes comandos para preparar o ambiente:

```sql
CREATE DATABASE estoque_db;
USE estoque_db;

CREATE TABLE componente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    categoria VARCHAR(100),
    quantidade INT,
    datasheet VARCHAR(255)
);