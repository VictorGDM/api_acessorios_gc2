const { Router } = require('express');
const { v7: uuidv7 } = require('uuid');
const acessoriosMock = require('../mocks/acessorios.mock');

const router = Router();

router.get('/', (req, res) => {
  res.json(acessoriosMock);
});

router.post('/', (req, res) => {
  const { nome, modelo, cor, quantidade, precoCompra, precoVenda } = req.body;

  const novoAcessorio = {
    id: uuidv7(),
    nome,
    modelo,
    cor,
    quantidade,
    precoCompra,
    precoVenda
  };

  acessoriosMock.push(novoAcessorio);

  res.status(201).json({
    mensagem: "Acessório adicionado com sucesso!",
    acessorio: novoAcessorio
  });
});

module.exports = router;