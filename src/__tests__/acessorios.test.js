const request = require('supertest');
const app = require('../app');

describe('API de Acessórios', () => {
    let acessorioId;

    it('Deve retornar a lista de acessórios (GET /api/acessorios)', async () => {
        const res = await request(app).get('/api/acessorios');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('Deve criar um novo acessório (POST /api/acessorios)', async () => {
        const novoAcessorio = {
            nome: "Fone Bluetooth",
            modelo: "AirPods Pro",
            cor: "Branco",
            quantidade: 5,
            precoCompra: 50.00,
            precoVenda: 150.00
        };

        const res = await request(app).post('/api/acessorios').send(novoAcessorio);
        expect(res.statusCode).toEqual(201);
        expect(res.body.acessorio).toHaveProperty('id');

        // Guarda o ID para testar o DELETE depois
        acessorioId = res.body.acessorio.id;
    });

    it('Deve retornar 404 ao tentar deletar acessório inexistente', async () => {
        const res = await request(app).delete('/api/acessorios/id-falso-123');
        expect(res.statusCode).toEqual(404);
    });

    it('Deve deletar um acessório existente e retornar 204', async () => {
        const res = await request(app).delete(`/api/acessorios/${acessorioId}`);
        expect(res.statusCode).toEqual(204);
    });
});