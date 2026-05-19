# Usa uma imagem oficial do Node super leve
FROM node:20-alpine

# Cria a pasta onde a aplicação vai morar dentro do container
WORKDIR /usr/src/app

# Copia apenas os arquivos de dependência primeiro (melhora a velocidade do build)
COPY package*.json ./

# Instala as dependências de produção
RUN npm install

# Copia o restante do código da API
COPY . .

# Expõe a porta que a aplicação usa
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["npm", "start"]