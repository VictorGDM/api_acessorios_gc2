const { Router } = require('express');
const router = Router();

// Rota GET: localhost:8080/api/acessorios
router.get('/', (req, res) => {
  res.json({ mensagem: 'Lista de acessórios estará disponível aqui!' });
});

module.exports = router;