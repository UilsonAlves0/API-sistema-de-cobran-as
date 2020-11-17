const jwt = require('jsonwebtoken');
const Autentica = require('../repositories/auth');
const response = require('./response');
const password = require('../utils/password');

require('dotenv').config();

const auth = async (ctx) => {
	const { email = null, senha = null } = ctx.request.body;
	if (!email || !senha) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}
	const emailAuth = await Autentica(email);
	if (emailAuth) {
		const comparison = await password.check(senha, emailAuth.senha);
		if (comparison) {
			const token = await jwt.sign(
				{ id: emailAuth.id, email: emailAuth.email },
				process.env.JWT_SECRET || 'login',
				{
					expiresIn: '1h',
				}
			);
			return response(ctx, 200, { token });
		}
	}
	return response(ctx, 200, { mensagem: 'Email ou senha incorreto' });
};

module.exports = { auth };
