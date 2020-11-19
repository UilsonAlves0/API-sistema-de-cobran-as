const database = require('../utils/database');

const editClient = async (nome = null, cpf = null, email = null, id = null) => {
	if (!id || !nome || !cpf || !email) {
		return null;
	}
	const query = `UPDATE customers 
    SET nome = $1,
    cpf = $2,
    email = $3 
    WHERE id = $4
    RETURNING *`;
	const result = await database.query({
		text: query,
		values: [nome, cpf, email, id],
	});
	console.log(result.rows);
	return result.rows.shift();
};

const listClients = async (limit = null, offset = null) => {
	const query = `SELECT * FROM customers OFFSET $1 LIMIT $2`;
	const result = await database.query({
		text: query,
		values: [offset, limit],
	});

	return result.rows;
};

const getClients = async (nome = null, offset = null, limit) => {
	if (!nome || !offset || !limit) {
		return null;
	}
	const query = `SELECT * FROM customers WHERE nome = $1 OFFSET $2 LIMIT $3`;
	const result = await database.query({
		text: query,
		values: [nome, offset, limit],
	});
	return result.rows;
};
module.exports = { editClient, listClients, getClients };
