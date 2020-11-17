const verificacao = require('../repositories/verificacao');
const cadastros = require('../repositories/cadastros');
const response = require('./response');

const criarCliente = async (ctx) => {
	const {
		nome = null,
		cpf = null,
		email = null,
		telefone = null,
	} = ctx.request.body;
	if (!nome || !cpf || !email || !telefone) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}
	const clienteDB = await verificacao.clienteCadastrado(cpf);
	if (clienteDB.length > 0) {
		return response(ctx, 400, { mensagem: 'Cliente ja esta cadastrado' });
	}

	const idCustomer = await cadastros.criarClientes(
		nome,
		cpf,
		email,
		telefone
	);
	return response(ctx, 201, { idCustomer });
};
module.exports = { criarCliente };
