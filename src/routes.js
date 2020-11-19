const Router = require('koa-router');
const router = new Router();

const usuarios = require('../src/controllers/usuario');
const Password = require('../src/middleware/encrypt');
const Auth = require('../src/controllers/auth');
const clientes = require('../src/controllers/clientes');
const Session = require('../src/middleware/session');

router.post('/auth', Auth.auth);
router.post('/usuarios', Password, usuarios);
router.post('/clientes', Session, clientes.criarCliente);
router.put('/clientes', clientes.editarCliente);
router.get('/clientes', clientes.getClientes);

module.exports = router;
