const database = require('../utils/database');

const criarUsuario = async (
	email = null,
	senha = null,
	nomeDoUsuario = null
) => {
	if ((!email, !senha, !nomeDoUsuario)) {
		return null;
	}
	const queryUsuario = `INSERT INTO users (email, senha, nome) VALUES ($1, $2, $3) RETURNING id`;

	const resultUsuario = await database.query({
		text: queryUsuario,
		values: [email, senha, nomeDoUsuario],
	});
	return resultUsuario.rows;
};
const criarClientes = async (
	nome = null,
	cpf = null,
	email = null,
	telefone = null
) => {
	if (!nome || !cpf || !email || !telefone) {
		return null;
	}
	const queryCliente = `INSERT INTO customers (nome, cpf, email, telefone) VALUES ($1, $2, $3, $4) RETURNING id`;
	const resultCliente = await database.query({
		text: queryCliente,
		values: [nome, cpf, email, telefone],
	});
	return resultCliente.rows;
};

module.exports = { criarUsuario, criarClientes };
