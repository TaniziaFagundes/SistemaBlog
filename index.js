const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connection = require("./database/database");

const CategoriesController = require("./categories/CategoriesController")
const ArticlesController = require("./articles/ArticlesController")

const Article = require("./articles/Articles")
const Categories = require("./categories/Category")

connection.authenticate()
        .then(()=> {
            console.log("conexão com mysql realizada com sucesso")
        }).catch((error) => {
            console.log(error);
        });



app.use("/", CategoriesController);  //rodando as rotas importadas do arquivo categoriescontroller
app.use("/", ArticlesController)

//view enginer
app.set('view engine', 'ejs');

//Static
app.use(express.static('public')); 

//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, resp) => {
    resp.render("index")
})

app.listen(8080,()=>{
    console.log("o servidor está rodando")
})