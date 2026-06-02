# 📱 VictorGDM - API de Acessórios

[![Docker Pulls](https://badgen.net/docker/pulls/vgdm/api-acessorios?icon=docker&label=Pulls)](https://hub.docker.com/r/vgdm/api-acessorios)
[![Docker Image Size](https://badgen.net/docker/size/vgdm/api-acessorios?icon=docker&label=Image%20Size)](https://hub.docker.com/r/vgdm/api-acessorios)

> Projeto prático desenvolvido para a disciplina de **Gestão de Configuração II**.

API RESTful minimalista construída com **Node.js** e **Express**, voltada para o gerenciamento de um estoque de acessórios.

O objetivo deste projeto é demonstrar boas práticas de:

- Controle de versão
- Qualidade de código
- Testes automatizados
- Containerização
- Integração contínua (CI/CD)

---

## 🚀 Funcionalidades da API

Endpoints disponíveis:

- **`GET /api/acessorios`**  
  Retorna todos os acessórios cadastrados.

- **`POST /api/acessorios`**  
  Cria um novo acessório a partir de um payload JSON.

- **`DELETE /api/acessorios/:id`**  
  Remove um acessório pelo ID:
  - `204 No Content` → sucesso  
  - `404 Not Found` → não encontrado  

---

## 🐳 Containerização com Docker

A aplicação está disponível no DockerHub e pode ser executada sem necessidade de instalar Node.js localmente.

### ▶️ Executar com Docker

```bash
docker run -p 8080:8080 SEU_USUARIO_DOCKER/api-acessorios:latest
```

A API ficará disponível em:

```
http://localhost:8080
```

---

## 🛡️ Qualidade e Automação (CI/CD)

O projeto possui uma pipeline estruturada para garantir qualidade e consistência.

### 🧪 Testes Automatizados

- Frameworks:
  - **Jest**
  - **Supertest**
- Cobertura: **100%** (acima da baseline de 90%)

---

### 📏 Padronização de Código

- Ferramenta: **ESLint**
- Objetivo:
  - Manter consistência
  - Evitar erros comuns
  - Garantir legibilidade

---

### ⚙️ GitHub Actions (Pipeline)

A automação é dividida em dois fluxos principais:

#### 1. Build da Aplicação

- Executado em **todas as branches**
- Garante que:
  - O projeto compila corretamente
  - A imagem Docker é construída com sucesso

#### 2. Publicação no DockerHub

- Executado **apenas na branch `main`**
- Responsável por:
  - Publicar a imagem Docker
  - Garantir que apenas código validado vá para produção

---

## ⚙️ Execução Local (Node.js)

Caso prefira rodar o projeto sem Docker:

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Exemplo de configuração:

```env
PORT=8080
```

---

### 3. Iniciar aplicação

```bash
npm run start
```

---

### 4. Executar testes com cobertura

```bash
npm run test:cov
```

---

## 📦 Infraestrutura Virtualizada com Vagrant

O projeto conta com uma infraestrutura automatizada multi-máquina gerenciada pelo **Vagrant** utilizando o provedor **VirtualBox** e o sistema operacional **Ubuntu 22.04 LTS (Jammy Jellyfish)**.

A arquitetura é dividida em duas máquinas virtuais na mesma rede privada virtual:

- **VM1 (Cliente / Testes):**
  - **Hostname:** `vm1`
  - **IP Privado (Classe C):** `192.168.56.10`
  - **Memória RAM:** `1024 MB`
  - **Função:** Simular o cliente ou ambiente externo realizando chamadas para a API.
  
- **VM2 (Servidor Backend):**
  - **Hostname:** `vm2`
  - **IP Privado (Classe C):** `192.168.56.20`
  - **Memória RAM:** `1024 MB` (suficiente para execução do Node.js)
  - **Função:** Hospedar e executar a aplicação. Possui a pasta local sincronizada com a pasta `/home/vagrant/vagrant_data` na VM. É provisionada automaticamente instalando Node.js v20, npm, dependências e iniciando a API com PM2 em segundo plano na porta `8080`.

---

### 🛠️ Pré-requisitos

Para executar essa infraestrutura, você precisará instalar na sua máquina física:
1. [VirtualBox](https://www.virtualbox.org/)
2. [Vagrant](https://www.vagrantup.com/)

---

### ▶️ Como Executar a Infraestrutura

1. **Subir as máquinas virtuais:**
   Abra o seu terminal na raiz do projeto (onde o arquivo `Vagrantfile` está localizado) e execute:
   ```bash
   vagrant up
   ```
   *Esse processo baixará a imagem base (se não estiver em cache) e configurará ambas as VMs, além de provisionar a VM2.*

2. **Acessar a VM1 (Cliente):**
   Com as máquinas rodando, acesse o shell da **VM1**:
   ```bash
   vagrant ssh vm1
   ```

3. **Testar a rota GET dentro da VM1:**
   Dentro da **VM1**, faça a requisição para a rota GET da API hospedada na **VM2** usando o IP privado dela:
   ```bash
   curl -i http://192.168.56.20:8080/api/acessorios
   ```
   
   Você deve receber uma resposta com o cabeçalho `HTTP/1.1 200 OK` e o JSON com a lista de acessórios cadastrados:
   ```http
   HTTP/1.1 200 OK
   X-Powered-By: Express
   Content-Type: application/json; charset=utf-8
   ...

   [{"id":"...","nome":"Capinha","modelo":"Samsung S26 Ultra","cor":"preto","quantidade":2,"precoCompra":5,"precoVenda":10}]
   ```

---

### ⚙️ Comandos Úteis do Vagrant

- **Verificar status das máquinas:**
  ```bash
  vagrant status
  ```
- **Desligar as máquinas:**
  ```bash
  vagrant halt
  ```
- **Reiniciar/Recarregar configurações:**
  ```bash
  vagrant reload --provision
  ```
- **Destruir as máquinas virtuais:**
  ```bash
  vagrant destroy -f
  ```

---

## 🔀 Workflow e Governança

O projeto segue o modelo **GitHub Flow**.

### 🌿 Estratégia de Branches

- `main` → produção
- `feature/*` → novas funcionalidades
- `ci/*` → melhorias na pipeline
- `test/*` → testes

---

### 🧾 Commits

- Padrão: **Commits Semânticos**
- Exemplos:

```bash
feat: adicionar endpoint DELETE
test: cobertura da rota de remoção
ci: pipeline de build docker
docs: atualização do README
```

- Assinatura:
  - Commits assinados via **SSH**

---

### 🔒 Proteção da Branch Main

A branch `main` possui regras obrigatórias:

- Aprovação de Pull Request
- Status checks obrigatórios:
  - ✅ Lint (ESLint)
  - ✅ Testes automatizados
  - ✅ Cobertura de testes

---

## 🧪 Tecnologias Utilizadas

- Node.js
- Express
- Jest
- Supertest
- ESLint
- Docker
- GitHub Actions

---

## 👨‍💻 Autor

Desenvolvido por **Victor Gabriel Dias Machado**.