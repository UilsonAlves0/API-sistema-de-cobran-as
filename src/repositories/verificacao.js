const database = require('../utils/database');

const usuarioCadastrado = async (email = null) => {
	if (!email) {
		return null;
	}
	const queryUsuario = `SELECT * from users WHERE email = $1`;
	const resultUsuario = await database.query({
		text: queryUsuario,
		values: [email],
	});
	return resultUsuario.rows;
};

const clienteCadastrado = async (cpf = null) => {
	if (!cpf) {
		return null;
	}
	const queryCliente = `SELECT * FROM customers WHERE cpf = $1`;
	const resultCliente = await database.query({
		text: queryCliente,
		values: [cpf],
	});
	return resultCliente.rows;
};

module.exports = { usuarioCadastrado, clienteCadastrado };
