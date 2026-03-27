require('dotenv').config();
const app = require('./app');

const PORT = process.env.SERVER_PORTA || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando perfeitamente na porta ${PORT}`);
}).on('error', (error) => {
    console.log(`Erro ao iniciar servidor na porta ${PORT}`);
    console.error(`Error: ${error.message}`);
});