const jwt = require('jsonwebtoken');
const secretKey = SECRET_KEY=123456;

class authenticationService {
   
    //o método (createToken) recebe um endereço de e-mail como parâmetro, cria um objeto payload contendo o e-mail como assunto (sub), e então usa a biblioteca jsonwebtoken para assinar esse payload com uma chave secreta (secretKey). O resultado é um token JWT assinado, que é retornado pela função.
    createToken(email) {
        return jwt.sign({sub: email}, secretKey);
    }

    //o método (validateToken) verifica se o token JWT é válido usando uma chave secreta (secretKey). Inclui tratamento de erro para lidar com possíveis falhas na verificação do token. 
    validateToken(token) {
        try {
            return jwt.verify(token, secretKey);
        } catch (error) {
            
            console.error('Falha na verificação do token:', error);
            return null; 
        }
    }
}

//este middleware assegura que as requisições somente prossigam para rotas ou middlewares subsequentes se apresentarem um token de autorização válido no cabeçalho "Authorization". Caso contrário, retorna códigos de status indicando problemas de autenticação.

authenticationService = new AuthenticationService();
function authentication(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.sendStatus(401);
  
    const token = authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    let decodedToken;

    try {
        decodedToken = autorizacaoService.validateToken(token);
    } catch (e) {
        return res.sendStatus(403);
    }

    if (decodedToken == null) return res.sendStatus(403);

    req.token = decodedToken;
    next();
}


module.exports = { authenticationService };