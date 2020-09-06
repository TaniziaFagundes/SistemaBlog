const express = require("express");
const router = express.Router(); //usar router ao invés de app (só muda o nome mesmo)

router.get("/categories", (req, resp) => {
    resp.send("rota de categorias")
});

router.get("/admin/categories/new", (req, resp) => {
    resp.send("rota para criar nova categoria")
});


module.exports = router; //esportando o arquivo com as rotas