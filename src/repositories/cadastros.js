const database = require('../utils/database');

const criarUsuario = async (
	email = null,
	senha = null,
	nomeDoUsuario = null
) => {
	if ((!email, !senha, !nomeDoUsuario)) {
		return null;
	}
	const query = `INSERT INTO users (email, senha, nome) VALUES ($1, $2, $3) RETURNING id`;

	const result = await database.query({
		text: query,
		values: [email, senha, nomeDoUsuario],
	});
	return result.rows;
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
	const query = `INSERT INTO customers (nome, cpf, email, telefone) VALUES ($1, $2, $3, $4) RETURNING id`;
	const result = await database.query({
		text: query,
		values: [nome, cpf, email, telefone],
	});
	return result.rows;
};

module.exports = { criarUsuario, criarClientes };
