const crypto = require('crypto');

const acessorios = [
  {
    id: crypto.randomUUID(),
    nome: "Capinha",
    modelo: "Samsung S26 Ultra",
    cor: "preto",
    quantidade: 2,
    precoCompra: 5.00,
    precoVenda: 10.00
  }
];

module.exports = acessorios;