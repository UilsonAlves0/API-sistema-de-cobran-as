const cadastros = require('../repositories/cadastros');
const response = require('./response');
const verificacao = require('../repositories/verificacao');

const createUser = async (ctx) => {
	const { email = null, nome = null } = ctx.request.body;
	const senha = ctx.state.hash;
	if (!email || !senha || !nome) {
		return response(ctx, 400, { mensagem: 'Requisição mal formulada' });
	}
	const usuarioDB = await verificacao.usuarioCadastrado(email);
	if (usuarioDB > 0) {
		return response(ctx, 400, { mensagem: 'Usuario ja esta cadastrado' });
	}
	const idUser = await cadastros.criarUsuario(email, senha, nome);
	return response(ctx, 201, { idUser });
};

module.exports = createUser;
