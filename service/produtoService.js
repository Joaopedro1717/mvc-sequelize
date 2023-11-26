const { FLOAT } = require('sequelize');
const { produtoModel } = require('../model/produtoModel');

class produtoService {
    // o método (create) cria um objeto, preenchido com os valores fornecidos, salvo no banco de dados e, em seguida, retornado. 
    async create(produto, descricao, preco) {
        const newProduto = produtoModel.build({produto: produto, descricao: descricao, preco: preco});
        await newProduto.save();
        return newProduto;
    }

    // o metodo (getById) faz a busca pelo produto, assim que encontrado, o retorna se utilizando do ID.
    async getById(id) {
        return await produtoModel.findByPk(id);
    }
}

module.exports = { produtoService }