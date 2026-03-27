# 📱 VictorGDM - API de Acessórios

> Projeto prático desenvolvido para a disciplina de **Gestão de Configuração II**.

Esta é uma API RESTful minimalista construída com **Node.js** e **Express**, projetada para o gerenciamento de um estoque de acessórios.
O objetivo principal deste repositório é aplicar e demonstrar boas práticas de **controle de versão**, **estruturação de projeto** e **fluxo de trabalho colaborativo**.

---

## 🚀 Funcionalidades

A API expõe os seguintes endpoints:

### 📌 Listar acessórios

```http
GET /api/acessorios
```

Retorna a lista completa de acessórios cadastrados.

### 📌 Cadastrar novo acessório

```http
POST /api/acessorios
```

Recebe um payload JSON e armazena um novo acessório no sistema (dados em memória).

---

## ⚙️ Como executar o projeto

Siga os passos abaixo para rodar a aplicação localmente:

### 1️⃣ Instalar dependências

No terminal, na raiz do projeto:

```bash
npm install
```

---

### 2️⃣ Configurar variáveis de ambiente

1. Localize o arquivo:

```
.env.example
```

2. Faça uma cópia e renomeie para:

```
.env
```

3. Configure a porta no arquivo:

```env
SERVER_PORTA=8080
```

---

### 3️⃣ Iniciar o servidor

Execute o comando:

```bash
npm run start
```

Se tudo estiver correto, o console exibirá uma mensagem indicando que o servidor está rodando 🚀

---

## 🔀 Workflow de Desenvolvimento

O modelo de ramificação adotado foi o **GitHub Flow**.

### ✅ Justificativa

A escolha pelo GitHub Flow se deu por sua abordagem:

* Simples e direta
* Baseada em branches de features
* Ideal para projetos pequenos e ágeis

Diferente de fluxos mais complexos (como o GitFlow), ele se encaixa perfeitamente no escopo desta API, facilitando o desenvolvimento e a colaboração.
