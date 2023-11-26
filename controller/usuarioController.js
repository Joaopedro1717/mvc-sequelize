const { usuarioService, usuarioService } = require('../service/usuarioService');
const { authenticationService, authenticationService } = require('../service/authenticationService');
const usuarioService = new usuarioService();
const authenticationService = new authenticationService();

const express = require('express');
const usuarioCotroller = express.Router();

// o endpoint de login extrai as informações do corpo da requisição, logo após verifica se o email e senha foram fornecidos valida as credenciais usando o serviço de usuário
// se as credenciais são válidas, cria um token de autorização e então retorna o token como resposta bem-sucedida caso contrário retorna Status Forbidden se as credenciais não são válidas
async function login(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.sendStatus(400); // Bad Request se email ou senha estão ausentes
        }

        const isValidCredentials = await usuarioService.validateCredentials(email, senha);

        if (isValidCredentials) {
            
            const token = autorizacaoService.createToken(email);

           
            return res.status(200).json({ 'access_token': token });
        }

        return res.sendStatus(403);
    } catch (error) {
        console.error('Erro durante o login:', error);
        return res.status(500).send('Erro interno do servidor');
    }

    // o endpoint (register) xxtrai o email e a senha do corpo da requisição, verifica se o email ou a senha estão ausentes na requisição caso estejam retorna status 400 (Bad Request) se o email ou a senha estão ausentes
    // tenta criar um novo usuário usando, verifica se o usuário foi criado com sucesso cao não, retorna status 400 se o usuário não foi criado com sucesso
    // retorna uma resposta de sucesso com um objeto JSON indicando que o usuário foi criado, captura e trata qualquer exceção lançada durante o processo por fim, retorna status 400 se houver uma exceção

async function register(req, res) {
        const email = req.body.email;
        const senha = req.body.senha;
    
        if (!email || !senha) {
            return res.sendStatus(400);
        }
    
        usuarioService.create(email, senha)
            .then(usuario => {
                if (!usuario) {
                    return res.sendStatus(400);
                }
    
                return res.send({ "status": "Usuario Criado" });
            })
            .catch(error => {
                console.error(error);
                return res.sendStatus(400);
            });
    }
    
}

usuarioController.post('/login', login);
usuarioController.post('/usuarios/registrar', register);

module.exports = { usuarioController };
