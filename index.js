const Sequelize = require("sequelize");
const express = require("express");
const cors = require("cors");

const app = express(); 
const { create } = require("express-handlebars");
app.use(cors());


const conexaoComBanco = new Sequelize("gerenciamento", "root", "", {
  host: "localhost",
  dialect: "mysql",
});


app.get("/aps/:Nome/:Descricao/:Data/:Funcionarios", function (req, res) {
    res.send({
        nome: req.params.Nome,
        descricao: req.params.Descricao,
        data: req.params.Data,
        funcionarios: req.params.Funcionarios,
    }); 
});


const Projeto = conexaoComBanco.define("projetos", {
  nome: {
      type: Sequelize.STRING,
  },

  descricao: {
      type: Sequelize.STRING,
  },

  data: {
      type: Sequelize.DATE,
  },

  funcionarios: {
      type: Sequelize.STRING,
  },
});


Projeto.sync({ force: false }); 


app.get("/salvar/:nome/:descricao/:data/:funcionarios", async function (req, res) {
  const {nome, descricao, data, funcionarios} = req.params; 

  const novoProjeto = await Projeto.create({ nome, descricao, data, funcionarios }); //função que espera

  try{
      res.json({
          resposta: "Projetos foi criado com sucesso !!!",
          Projeto: novoProjeto,
        }); // Retorna os registros em formato JSON
  }catch(error) {
      res.status(500).json({message: `Erro na criação do Projeto ${error}`})
  }
});

app.get("/mostrar", async function (req, res) {

  try {
      const mostrar = await Projeto.findAll(); // Busca todos os registros
      res.json(mostrar); // Retorna os registros em formato JSON
  }catch(error) {
      res.status(500).json({message:`Erro ao buscar alunos: ${error}`});
  }
  
});


//SEMPRE MANTENHA NO FINAL DO CÒDIGO 
app.listen(3031, function () {
  console.log("Server is running on port 3031");
});