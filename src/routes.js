const Router = require('koa-router');
const router = new Router();

const usuarios = require('../src/controllers/usuario');
const Password = require('../src/middleware/encrypt');
const Auth = require('../src/controllers/auth');
const clientes = require('../src/controllers/clientes');

router.post('/auth', Auth.auth);
router.post('/usuarios', Password, usuarios);
router.post('/clientes', clientes);

module.exports = router;
