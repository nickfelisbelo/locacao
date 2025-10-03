const express = require('express');
const router = express.Router();

const filmesController = require("../controllers/filmes.controller");

router.get("/filmes", filmesController.listarFilmes);
router.get("/filme/:id", filmesController.buscarFilmes);
router.post("/filme", filmesController.cadastrarFilme);
router.delete("/filme/:id", filmesController.deletarFilme);
router.put("/filme", filmesController.atualizarFilme);



module.exports = router;