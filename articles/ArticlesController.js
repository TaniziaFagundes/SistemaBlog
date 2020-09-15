const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");  //INSERIR adminAuth QUANDO ESTIVER FINALIZADO ESSA PAGE ****
const Category = require("../categories/Category");
const Article = require("../articles/Articles");
const slugify = require("slugify");




router.get("/admin/articles", (req, resp) => {
    Article.findAll({
        include: [{model: Category}], order:[['id','ASC']]  //inclua os dados de category na busca
    }).then((articles) => {
        resp.render("admin/articles/index", {articles: articles})
    })
});

router.get("/admin/articles/new",(req, resp) => { //lista as categorias em criar artigo
    Category.findAll().then(categories => {
        resp.render("admin/articles/new", {categories: categories})
    })
    
});

router.post("/articles/save", (req, resp) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        resp.redirect("/admin/articles")
    })
})


//COMO LISTAR NOVAMENTE AS CATEGORY NA EDIÇÃO?


router.get("/admin/articles/edit/:id", (req, resp) => {
    var id = req.params.id;

    Article.findByPk(id).then(article => {
        if(article != undefined && !isNaN(id)){
            Category.findAll().then(categories => {
                resp.render("admin/articles/edit", {article:article, categories:categories})
            })
        }else{
            resp.redirect("/admin/articles");
        }
    }).catch(erro => {
        resp.redirect("/admin/articles");
    })

    
})

router.post("/admin/articles/update", (req, resp) => {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.update({title: title, slug: slugify(title), body: body, categoryId:category},
    {where:{id:id},
    }).then(() =>{
        resp.redirect("/admin/articles")
    })

})

router.post("/admin/articles/delete", (req,resp) => {
    var id = req.body.id;

    if(id != undefined && !isNaN(id)){
        Article.destroy({
            where:{id:id}
        }).then(() => {
            resp.redirect("/admin/articles");
        });
    }
})


module.exports = router;

