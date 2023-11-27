const { authenticationService } = require('../service/authenticationService');
const { produtoService, produtoService } = require('../service/produtoService');
const produtoService = new produtoService();
const express = require('express');

const produtoController = express.Router();

//O endpoint (criarProduto) recebe uma solicitação para criar um produto, extrai os dados da solicitação, chama uma função assíncrona para criar o produto usando esses dados e retorna a resposta ao cliente. 
async function criarProduto(req, res) {
    try {
        const { produto, descricao, preco } = req.body;
        const novoProduto = await produtoService.criarProduto(produto, descricao, preco);
        res.send(novoProduto);
    } catch (error) {
        console.error("Erro ao criar produto:", error);
        res.status(500).send("Erro Interno do Servidor");
    }
}

//Extrai o ID da solicitação HTTP. Verifica se o ID foi fornecido, se não, retorna um status 400 (Bad Request) após usa um serviço assíncrono (produtoService.getProdutoById) para obter as informações do produto com base no ID.
//Se o produto não existe, retorna um status 404 (Not Found). Se o produto existe, responde com as informações do produto, se ocorrer um erro durante o processo, registra no console e retorna um status 500 (Internal Server Error).

async function getProductById(req, res) {
    try {
        const id = req.params.id;

        if (!id) {
            return res.sendStatus(400);
        }

        const produto = await produtoService.getProdutoById(id);

        if (!produto) {
            return res.sendStatus(404);
        }

        return res.send(produto);
    } catch (error) {
        console.error('Erro ao obter produto por ID:', error);
        return res.status(500).send('Erro interno do servidor');
    }
}

produtoController.post('produto', authenticationService.authentication, criarProduto);
produtoController.get('produto/:id', authenticationService.authentication, getProductById);

module.exports = { produtoController };

