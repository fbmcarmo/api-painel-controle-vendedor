const express = require('express')
const router = express.Router()
const produtosController = require('../controllers/produtos')
const produtosMiddleware = require('../middlewares/produtos')
const authMiddleware = require('../middlewares/auth')

router.get(
    '/produtos',
    produtosController.getProdutos
)
router.get(
    '/produtos/:id',
    produtosMiddleware.validateGetProdutoById,
    produtosController.getProdutoById
)
router.get(
    '/user-produtos/:id',
    produtosMiddleware.validateGetProdutoById,
    produtosController.getProdutosByUserId
)
router.post(
    '/produtos',
    authMiddleware.validateToken,
    produtosMiddleware.validateCreateProduto,
    produtosController.createProduto
)
router.put(
    '/produtos/:id',
    authMiddleware.validateToken,
    produtosMiddleware.validateUpdateProduto,
    produtosController.updateProduto
)
router.delete(
    '/produtos/:id',
    authMiddleware.validateToken,
    produtosMiddleware.validateDeleteProduto,
    produtosController.deleteProduto
)

module.exports = router;