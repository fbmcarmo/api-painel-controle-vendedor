const { Produtos } = require('../models')

async function getProdutos(req, res) {
    try {
        const produtos = await Produtos.findAll()

        return res.send(produtos)
        
    } catch (error) {
        console.error(error)
        return res.status(500).send('Erro ao buscar produtos')
    }
}

async function getProdutoById(req, res) {
    const { id } = req.params;

    try {
        const produto = await Produtos.findByPk(id);

        if (!produto) {
            return res.status(404).send('Produto não encontrado');
        }

        return res.send(produto);

    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao buscar produto');
    }
}

async function getProdutosByUserId(req, res) {
    const { id } = req.params;

    try {
        const produtos = await Produtos.findAll({
            where: {
                userId: id
            }
        });

        if (!produtos) {
            return res.status(404).send('Produtos não encontrados');
        }

        return res.send(produtos);

    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao buscar produto');
    }
}


async function createProduto(req, res) {
    try {
        const produto = await Produtos.create(req.body)

        return res.status(201).send(produto)
        
    } catch (error) {
        console.error(error)
        return res.status(500).send('Erro ao criar produto')
    }
}

async function deleteProduto(req, res){
    const { id } = req.params;
    try {
        await Produtos.destroy({
            where: {
                id: id
            }
        })

        return res.status(202).send('Produto deletado com sucesso')
    } catch (error) {
        console.error(error)
        return res.status(500).send('Erro ao deletar produto')
    }
}

async function updateProduto(req, res) {
    const { id } = req.params;

    try {
        const [updated] = await Produtos.update(req.body, {
            where: { id: id }
        });

        if (!updated) {
            return res.status(404).send('Produto não encontrado');
        }

        const produtoAtualizado = await Produtos.findByPk(id);
        return res.send(produtoAtualizado);
        
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao atualizar produto');
    }
}


module.exports = {
    getProdutos,
    getProdutoById,
    getProdutosByUserId,
    createProduto,
    deleteProduto,
    updateProduto
}