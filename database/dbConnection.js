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

async function insertUf(){
    let sql = "INSERT INTO Uf (id, sigla, nome_uf) VALUES ?";
    let values = [];
    const walkerUf = nextElem(uf);
    let ufElem = walkerUf.next();
    let resultado;

    while(ufElem){
        values.push(Object.values(ufElem));
        ufElem = walkerUf.next();
    }

    con.query(sql, [values], (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        resultado = result.affectedRows;
    });

    return resultado;
}

async function insertCidade(){

    let sql = "INSERT INTO Cidade (id, uf_id, nome, populacao, latitude, longitude, cod_ibge, cod_siafi) VALUES ?";
    let values = [];

    let resultado;

    for(let i = 0; i < cidade.length; i++){
        //console.log(i);
        values.push(Object.values(cidade[i]));
    }
    

    con.query(sql, [values], (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        resultado = result.affectedRows;
    });

    return resultado;
}

async function insertEmpresa(){

    let sql = "INSERT INTO Empresa (id, cidade_id, slug, nome_fantasia, dt_inicio_atividade, cnae_fiscal, cep, porte) VALUES ?";
    let values = [];
    const walkerEmpresa = nextElem(empresa);
    let empresaElem = walkerEmpresa.next();
    let resultado;

    while(empresaElem){
        values.push(Object.values(empresaElem));
        empresaElem = walkerEmpresa.next();
    }

    con.query(sql, [values], (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        resultado = result.affectedRows;
    });

    return resultado;
}


async function readUf(){
    fs.createReadStream(uf_path).pipe(csv()).on('data', (row) => {
        const properties = Object.getOwnPropertyNames(row);
        const ufObj = {};
    
        ufObj.id = row[properties[0]];
        ufObj.sigla = row[properties[1]];
        ufObj.nome_uf = row[properties[2]];
    
        uf.push(ufObj);
    }).on('end', () => {
        console.log("end UF, insert em seguida");
        insertUf();
        console.log("uf terminou");
    });
}

async function readCidade(){
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
        //console.log(cidade.length);
    }).on('end', () => {
        console.log("end cidade, insert em seguida");
        insertCidade();
        console.log("cidade terminou");
    });
}

async function readEmpresa(){
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
        console.log("end empesa, insert em seguida");
        insertEmpresa();
        //console.log("empresa terminou");
    });
}

async function insert(){
    await readUf();
    await readCidade();
    console.log("AWAIT CIDADE TERMINOU")
    await readEmpresa();
    
    //await insertCidade();
    //await insertEmpresa();

    return "";
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

con.connect((err) => {
    if(err) throw err;
    console.log("Connected");
});


insert();