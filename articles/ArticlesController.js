const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");  //INSERIR adminAuth QUANDO ESTIVER FINALIZADO ESSA PAGE ****

router.get("/articles", (req, resp) => {
    resp.send("Rota de artigos DE TANIZIA")
});

router.get("/admin/articles/new",(req, resp) => {
    resp.send("rota para criar novo artigo")
});

module.exports = router;

