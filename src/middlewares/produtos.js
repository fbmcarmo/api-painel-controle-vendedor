function validateCreateProduto(req, res, next){
    const { banner, titulo, preco, descricao, categoria } = req.body;

    if(!banner || !titulo || !preco ||!descricao ||!categoria){
        return res. status(400).send('Todos os campos são obrigatórios')
    }

    if(titulo.length > 100){
        return res.status(400).send('O nome do produto não pode ter mais de 100 caracteres')
    }

    if(categoria.length > 50){
        return res.status(400).send('Categoria não pode ter mais de 50 caracteres')
    }

    next();
}

function validateGetProdutoById(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send('ID do produto é obrigatório');
    }

    next();
}

function validateDeleteProduto(req, res, next){
    const { id } = req.params;

    if(!id){
        return res.status(400).send('ID do produto é obrigatório')
    }

    next();
}

function validateUpdateProduto(req, res, next) {
    const { banner, titulo, preco, descricao, categoria } = req.body;

    if (!banner || !titulo || !preco || !descricao || !categoria) {
        return res.status(400).send('Todos os campos são obrigatórios para atualização');
    }

    if (titulo.length > 100) {
        return res.status(400).send('O nome do produto não pode ter mais de 100 caracteres');
    }

    if (categoria.length > 50) {
        return res.status(400).send('Categoria não pode ter mais de 50 caracteres');
    }

    next();
}

module.exports = {
    validateCreateProduto,
    validateGetProdutoById,
    validateDeleteProduto,
    validateUpdateProduto
}