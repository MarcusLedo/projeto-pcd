var express = require("express");
const mysql = require("mysql");
const fastcsv = require("fast-csv");

const app = express();

const fs = require("fs");
const ws = fs.createWriteStream("saida.csv");

// Conectar ao banco de dados

const connection = mysql.createConnection({
    host: "megazord.cbjpuzkhqslx.sa-east-1.rds.amazonaws.com",
    user: "admin",
    password: "ixBzf38fY8",
    database: "progcd"
});

app.get("/exportcsv", (req, res) => {
    connection.query("SELECT * FROM saida", function(err,data){
        if(err) throw err;
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);
        fastcsv
            .write(jsonData, {headers:true})
            .on("finish", function(){
                console.log("Arquivo exportado com sucesso!");
            })
            .pipe(ws);
    });
});

app.listen(3000, function(){
    console.log("Node está em execução...")

})