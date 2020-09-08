const express = require("express");
const router = express.Router(); //usar router ao invés de app (só muda o nome mesmo)
const Category = require("./Category"); //category tabela do banco
const slugify = require("slugify");



router.get("/admin/categories/new",(req,res) => {
    res.render("admin/categories/new");
});

router.post("/categories/save",(req, res) => {  //method post para form
    var title = req.body.title;

    if(title != undefined && title != " "){
        Category.create({
            title: title,
            slug: slugify(title.toString()) // title= tecnologia da informacao slug= tecnologia-da-informacao
            
        }).then(()=>{
            res.redirect("/admin/categories");
        })

    }else{
        res.redirect("/admin/categories/new");
    }
});

router.get("/admin/categories", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index",{categories: categories})
    })
});

router.post("/admin/categories/delete" , (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){ //se for numerico delete
            Category.destroy({
                where:{id:id}
            }).then(() => {
                res.redirect("/admin/categories")
            })

        }else{ //se não for numerico redirect
            res.redirect("/admin/categories");
        }
    }else{ //se for nullo redirect
        res.redirect("/admin/categories");
    }
})

router.get("/admin/categories/edit/:id", (req,res) => {
    var id = req.params.id;  //use the params here

    Category.findByPk(id).then(category => {
        if(category != undefined && !isNaN(id)){ 
            res.render("admin/categories/edit",{category: category});
        }else{
             res.redirect("/admin/categories")
        }
    }).catch(erro => {
        
        res.redirect("/admin/categories")
    })
});

router.post("/admin/categories/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;

    Category.update({title: title, slug: slugify(title)},{
        where:{id:id}
    }).then(() => {
        res.redirect("/admin/categories")
    })
})


module.exports = router; //esportando o arquivo com as rotas