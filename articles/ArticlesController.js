const express = require("express");
const router = express.Router();

router.get("/articles", (req, resp) => {
    resp.send("Rota de artigos")
});

router.get("/admin/articles/new",(req, resp) => {
    resp.send("rota para criar novo artigo")
});

module.exports = router;