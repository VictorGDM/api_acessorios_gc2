# 📱 VictorGDM - API de Acessórios

> Projeto prático desenvolvido para a disciplina de **Gestão de Configuração II**.

Esta é uma API RESTful minimalista construída com **Node.js** e **Express**, projetada para o gerenciamento de um estoque de acessórios.

O objetivo principal deste repositório é aplicar e demonstrar boas práticas de controle de versão, qualidade de código, testes automatizados e fluxo de trabalho colaborativo.

---

## 🚀 Funcionalidades da API

A aplicação expõe os seguintes endpoints:

- **`GET /api/acessorios`**: Retorna a lista completa de acessórios cadastrados.
- **`POST /api/acessorios`**: Recebe um payload JSON e armazena um novo acessório no sistema.
- **`DELETE /api/acessorios/:id`**: Remove um acessório específico pelo seu ID.
  - Retorna **`204 No Content`** em caso de sucesso.
  - Retorna **`404 Not Found`** caso o acessório não seja encontrado.

---

## 🛡️ Qualidade e Automação CI/CD

Este projeto possui foco em qualidade de código, testes automatizados e integração contínua.

### Testes Automatizados

Os testes foram implementados utilizando:

- **Jest**
- **Supertest**

A API possui cobertura de testes de **100%**, superando a meta mínima de **90%** estabelecida para a baseline do projeto.

### Padronização de Código

O projeto utiliza **ESLint** para garantir:

- Consistência no estilo do código.
- Organização da base de código.
- Prevenção de erros comuns durante o desenvolvimento.

### GitHub Actions

O projeto possui uma pipeline de CI/CD configurada com **GitHub Actions**.

A pipeline é executada automaticamente a cada:

- Push na branch `main`.
- Pull Request direcionado para a branch `main`.

A automação possui dois jobs principais:

1. **Verificação de estilo do código**
   - Executa o ESLint para validar a padronização do projeto.

2. **Execução dos testes automatizados**
   - Executa os testes com Jest e Supertest.
   - Valida a cobertura de testes da aplicação.

---

## ⚙️ Instruções de Execução

Siga o passo a passo abaixo para rodar a aplicação e os testes no ambiente local.

### 1. Instalando as dependências

```bash
npm install
```

### 2. Configurando as variáveis de ambiente

Localize o arquivo de exemplo chamado:

```bash
.env.example
```

Faça uma cópia desse arquivo e renomeie para:

```bash
.env
```

Depois, certifique-se de que a variável de ambiente está definida corretamente.

Exemplo:

```env
PORT=8080
```

### 3. Iniciando a API

```bash
npm run start
```

### 4. Rodando os testes com relatório de cobertura

```bash
npm run test:cov
```

### 5. Verificando o estilo do código com ESLint

```bash
npm run lint
```

---

## 🔀 Workflow de Desenvolvimento e Regras

O modelo de ramificação adotado no projeto foi o **GitHub Flow**.

Toda nova funcionalidade foi desenvolvida em branches isoladas, utilizando padrões como:

- `feature/*`
- `ci/*`
- `test/*`

As alterações foram integradas à branch principal por meio de **Pull Requests**.

---

## 📌 Políticas Adotadas no Repositório

### Commits Semânticos

Todos os commits seguem o padrão de commits semânticos.

Exemplos:

```bash
feat: adicionar rota para cadastrar acessório
test: adicionar testes da rota DELETE
ci: configurar pipeline do GitHub Actions
docs: atualizar documentação do README
```

### Assinatura de Commits

Os commits são assinados digitalmente, garantindo maior segurança e autenticidade na autoria das alterações.

### Proteção da Branch Main

A branch `main` está protegida e exige que os status checks sejam aprovados antes de qualquer merge.

Os checks obrigatórios incluem:

- Verificação de estilo com ESLint.
- Execução dos testes automatizados.
- Validação da cobertura de testes.

---

## ✅ Resumo das Entregas

Nesta versão do projeto, foram contempladas as principais exigências da atividade:

- Implementação da rota **`DELETE /api/acessorios/:id`**.
- Retorno correto dos status **`204`** e **`404`**.
- Testes automatizados com **Jest** e **Supertest**.
- Cobertura de testes de **100%**.
- Pipeline de CI/CD com **GitHub Actions**.
- Jobs separados para lint e testes.
- Uso de commits semânticos.
- Assinatura digital dos commits.
- Proteção da branch `main`.
- Fluxo de desenvolvimento baseado em **GitHub Flow**.

---

## 🧪 Tecnologias Utilizadas

- Node.js
- Express
- Jest
- Supertest
- ESLint
- Git
- GitHub
- GitHub Actions

---

## 👨‍💻 Autor

Desenvolvido por **Victor Gabriel Dias Machado**.