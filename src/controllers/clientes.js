const verificacao = require('../repositories/verificacao');
const cadastros = require('../repositories/cadastros');
const response = require('./response');
const cliente = require('../repositories/clientes');

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

const editarCliente = async (ctx) => {
	const {
		id = null,
		nome = null,
		cpf = null,
		email = null,
	} = ctx.request.body;
	if (!id || !nome || !cpf || !email) {
		return response(ctx, 400, { mensagem: 'Requisição mal formulada' });
	}
	const clienteEditado = await cliente.editClient(nome, cpf, email, id);
	if (clienteEditado) {
		return response(ctx, 200, { clienteEditado });
	}
	return response(ctx, 200, { mensagem: 'Pedido mal formulado' });
};

const getClientes = async (ctx) => {
	const busca = ctx.query.busca;
	const clientesPorPagina = ctx.request.query.clientesPorPagina;
	const offset = ctx.request.query.offset;

	if (busca) {
		if (!busca || !clientesPorPagina || !offset) {
			return response(ctx, 400, { mensagem: 'Requisição mal formulada' });
		}
		const clientesDB = await cliente.getClients(
			busca,
			offset,
			clientesPorPagina
		);
		const clientesBusca = clientesDB.map((client) => {
			return {
				nome: client.nome,
				email: client.email,
				cobrancasFeitas: 2000,
				cobrancasRecebidas: 10000,
				estaInadiplente: true,
			};
		});
		return response(ctx, 200, { clientesBusca });
	}
	if (!clientesPorPagina || !offset) {
		return response(ctx, 400, { mensagem: 'Requisição mal formulada' });
	}
	const clientesDB = await cliente.listClients(clientesPorPagina, offset);
	const clientes = clientesDB.map((client) => {
		return {
			nome: client.nome,
			email: client.email,
			cobrancasFeitas: 2000,
			cobrancasRecebidas: 10000,
			estaInadiplente: true,
		};
	});
	return response(ctx, 200, { clientes });
};

module.exports = {
	criarCliente,
	editarCliente,
	getClientes,
};
