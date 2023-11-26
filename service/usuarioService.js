const { usuarioModel } = require('../model/usuarioModel');

class usuarioService {
   
    //método (findByEmail) é usado para procurar um usuário no banco de dados com base no endereço de e-mail fornecido. Se um usuário correspondente for encontrado, ele será retornado, caso contrário, será retornado nulo.
    async findByEmail(email) {
        return await usuarioModel.findOne({
            where: {
                email: email
            }
        });
    }

    //método (create) verifica se um usuário com o email fornecido já existe, cria um objeto de usuário com o email e a senha fornecidos, salva no banco de dados e, em seguida, retorna o objeto de usuário. 
    async create(email, senha) {
        if (await this.findByEmail(email) != null) 
        {throw new Error("Este usuário já está cadastrado")};

        const usuario = usuarioModel.build({
            email: email,
            senha: senha
        });

        await usuario.save();
        return usuario;
    }
}

module.exports = { usuarioService };