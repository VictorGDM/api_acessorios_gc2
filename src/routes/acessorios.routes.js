const { Router } = require('express');
const crypto = require('crypto'); // Usando o módulo nativo do Node
const acessoriosMock = require('../mocks/acessorios.mock');

const router = Router();

router.get('/', (req, res) => {
  res.json(acessoriosMock);
});

router.post('/', (req, res) => {
  const { nome, modelo, cor, quantidade, precoCompra, precoVenda } = req.body;

  const novoAcessorio = {
    id: crypto.randomUUID(), // Gerando o ID nativamente
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

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = acessoriosMock.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: "Acessório não encontrado" });
  }

  acessoriosMock.splice(index, 1);
  return res.status(204).send();
});

module.exports = router;