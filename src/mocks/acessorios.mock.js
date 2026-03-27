const { v7: uuidv7 } = require('uuid');

const acessorios = [
    {
        id: uuidv7(),
        nome: "Capinha",
        modelo: "Samsung S26 Ultra",
        cor: "preto",
        quantidade: 2,
        precoCompra: 5.00,
        precoVenda: 10.00
    }
];

module.exports = acessorios;