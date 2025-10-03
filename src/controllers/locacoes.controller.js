const db = require("../data/connection");

const listarLocacoes = async (req, res) => {
    const lista = await db.query("SELECT * FROM locacoes");
    res.json(lista[0]).end();
};

const buscarLocacao = async (req, res) => {
    const idLocacao = req.params.id;
    const locacao = await db.query("SELECT * FROM locacoes WHERE id = " + idLocacao);
    res.json(locacao[0][0]).end();
};

const cadastrarLocacao = async (req, res) => {
    const {cliente_id, filme_id, data_locacao, status, preco} = req.body;

    try{
        const novaLocacao = await db.query("INSERT INTO locacoes VALUES (DEFAULT, ?, ?, ?, ?, ?)", [cliente_id, filme_id, data_locacao, status, preco]);

        const locacao = {
            cliente : cliente_id,
            filme : filme_id,
            preco: preco
        };

        res.json(locacao).status(201).end();
    }catch(error){
        const info = {msg:""};

        if(error.errno === 1452){
            info.msg = "Usuario ou Filme não está cadastrado";
        }
        res.status(500).json(info).end();
    }
};

const excluirLocacao = async (req, res) => {
    const idLocacao = req.params.id;

    try{
        const delLocacao = await db.query("DELETE FROM locacoes WHERE id = ?", [idLocacao]);

        const info = {msg:""};

        if(delLocacao[0].affectedRows === 1){
            info.msg = "Excluido com Sucesso";
        } else if(delLocacao[0].affectedRows === 0){
            info.msg = "Locacão não encontrada";
        }

        res.status(200).json(info).end();
    }catch(error){
        console.log(error);
    }
};

const atualizarLocacao = async (req, res) => {
    const {id, cliente_id, filme_id, data_locacao, status, preco} = req.body;
    
    try{
        const atualiza = await db.query("UPDATE locacoes SET cliente_id = ?, filme_id = ?, data_locacao = ?, status = ?, preco = ? WHERE id = ?", [cliente_id, filme_id, data_locacao, status, preco, id]);

        const info = {msg:""};

        if(atualiza[0].affectedRows === 0){
            info.msg = "Nenhuma locacao encontrada";
        }else if(atualiza[0].affectedRows === 1){
            info.msg = "Locacao atualizada com sucesso";
        }

        res.status(200).json(info).end();
    }catch(error){
        // console.log(error);

        // if(errno === 1064){

        // }
        
        res.status(500).end();
    }
};


module.exports = {
    listarLocacoes,
    buscarLocacao,
    cadastrarLocacao,
    excluirLocacao,
    atualizarLocacao,
};