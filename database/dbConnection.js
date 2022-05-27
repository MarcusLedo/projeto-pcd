function nextElem(array){
    let i = 0;
    const interator = {
        next: () => {
            let element = array[i];
            i++;
            return element;
        }
    }

    return interator;
}

var mysql = require('mysql');
const csv = require('csv-parser');
const fs = require('fs');

const uf = [];
const cidade = [];
const empresa = [];

const uf_path = "/home/marcusledo/Documents/atividade2/CSVs/uf_DB.csv";
const cidade_path = "/home/marcusledo/Documents/atividade2/CSVs/cidade_DB.csv";
const empresa_path = "/home/marcusledo/Documents/atividade2/CSVs/empresa_DB.csv";

var con = mysql.createConnection({
    host: "megazord.cbjpuzkhqslx.sa-east-1.rds.amazonaws.com",
    user: "admin",
    password: "ixBzf38fY8",
    database: "progcd"
});



fs.createReadStream(uf_path).pipe(csv()).on('data', (row) => {
    const properties = Object.getOwnPropertyNames(row);
    const ufObj = {};

    ufObj.id = row[properties[0]];
    ufObj.sigla = row[properties[1]];
    ufObj.nome_uf = row[properties[2]];

    uf.push(ufObj);
}).on('end', () => {
    
    con.connect((err) => {
        if(err) throw err;
        console.log("Connected");

        let sql = "INSERT INTO Uf (id, sigla, nome_uf) VALUES ?";
        let values = [];
        const walkerUf = nextElem(uf);
        let ufElem = walkerUf.next();
        while(ufElem){
            values.push(Object.values(ufElem));
            ufElem = walkerUf.next();
        }

        con.query(sql, [values], (err, result) => {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });
    });
    
});

fs.createReadStream(cidade_path).pipe(csv()).on('data', (row) => {
    const properties = Object.getOwnPropertyNames(row);
    const cidadeObj = {};

    cidadeObj.id = row[properties[0]];
    cidadeObj.uf_id = row[properties[1]];
    cidadeObj.nome = row[properties[2]];
    cidadeObj.populacao = row[properties[3]];
    cidadeObj.latitude = row[properties[4]];
    cidadeObj.longitude = row[properties[5]];
    cidadeObj.cod_ibge = row[properties[6]];
    cidadeObj.cod_siafi = row[properties[7]];

    cidade.push(cidadeObj);
}).on('end', () => {
    //console.log(cidade);
    /*
    con.connect((err) => {
        if(err) throw err;
        console.log("Connected");

        let sql = "INSERT INTO Cidade (id, uf_id, nome, populacao, latitude, longitude, cod_ibge, cod_siafi) VALUES ?";
        let values = [];
        const walkerCidade = nextElem(cidade);
        let cidadeElem = walkerCidade.next();

        while(cidadeElem){
            values.push(Object.values(cidadeElem));
            cidadeElem = walkerCidade.next();
        }

        con.query(sql, [values], (err, result) => {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });
    });
    */
})

fs.createReadStream(empresa_path).pipe(csv()).on('data', (row) => {
    const properties = Object.getOwnPropertyNames(row);
    const empresaObj = {};

    empresaObj.id = row[properties[0]];
    empresaObj.cidade_id = row[properties[1]];
    empresaObj.slug = row[properties[2]];
    empresaObj.nome_fantasia = row[properties[3]];
    empresaObj.dt_inicio_atividade = row[properties[4]];
    empresaObj.cnae_fiscal = row[properties[5]];
    empresaObj.cep = row[properties[6]];
    empresaObj.porte = row[properties[7]];

    empresa.push(empresaObj);
}).on('end', () => {
    /*
    con.connect((err) => {
        if(err) throw err;
        console.log("Connected");

        let sql = "INSERT INTO Empresa (id, cidade_id, slug, nome_fantasia, dt_inicio_atividade, cnae_fiscal, cep, porte) VALUES ?";
        let values = [];
        const walkerEmpresa = nextElem(empresa);
        let empresaElem = walkerEmpresa.next();

        while(empresaElem){
            values.push(Object.values(empresaElem));
            empresaElem = walkerEmpresa.next();
        }

        con.query(sql, [values], (err, result) => {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });
    });
    */
})