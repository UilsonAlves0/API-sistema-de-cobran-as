const database = require('../utils/database');

const usuarioCadastrado = async (email = null) => {
	if (!email) {
		return null;
	}
	const query = `SELECT * from users WHERE email = $1`;
	const result = await database.query({
		text: query,
		values: [email],
	});
	return result.rows;
};

const clienteCadastrado = async (cpf = null) => {
	if (!cpf) {
		return null;
	}
	const query = `SELECT * FROM customers WHERE cpf = $1`;
	const result = await database.query({
		text: query,
		values: [cpf],
	});
	return result.rows;
};

module.exports = { usuarioCadastrado, clienteCadastrado };
