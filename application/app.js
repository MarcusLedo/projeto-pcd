const csv = require('csv-parser');
const fs = require('fs');           //File System
const UFs = [];                 //Array of objects
const empresas = [];
const cidades_siafi = [];
const cidades_populacao = [];

const uf_path = '/home/marcusledo/Documents/atividade2/CSVs/uf.csv';
const empresas_path = '/home/marcusledo/Documents/atividade2/CSVs/empresas_bahia.csv';
const cidade_siafi_path = '/home/marcusledo/Documents/atividade2/CSVs/cidade_siafi.csv';
const cidade_populacao_path = '/home/marcusledo/Documents/atividade2/CSVs/cidade_populacao.csv';

fs.createReadStream(empresas_path).pipe(csv()).on('data', (row) => {
    const properties = Object.getOwnPropertyNames(row);
    const empresa = {
        nome_fantasia: row[properties[0]],
        dt_inicio_atividades: row[properties[1]],
        cnae_fiscal: row[properties[2]],
        cep: row[properties[3]],
        municipio: row[properties[4]]
    };

    empresas.push(empresa);
})

fs.createReadStream(uf_path).pipe(csv()).on('data', (row) => {
    const properties = Object.getOwnPropertyNames(row);
    const uf = {
        codigo_uf: row[properties[0]],
        uf: row[properties[1]]
    };

    UFs.push(uf);
})

fs.createReadStream(cidade_siafi_path).pipe(csv()).on('data', (row) => {
    const properties = Object.getOwnPropertyNames(row);
    const cidade_s = {
        codigo_ibge: row[properties[0]],
        nome: row[properties[1]],
        latitude: row[properties[2]],
        longitude: row[properties[3]],
        codigo_uf: row[properties[4]],
        siafi_id: row[properties[5]]
    };

    cidades_siafi.push(cidade_s);
})

fs.createReadStream(cidade_populacao_path).pipe(csv()).on('data', (row) => {
    const properties = Object.getOwnPropertyNames(row);
    const cidade_p = {
        cod_ibge: row[properties[0]],
        nome_cidade: row[properties[1]],
        nome_uf: row[properties[2]],
        populacao: row[properties[3]]
    };

    cidades_populacao.push(cidade_p);
}).on('end', () =>{
    console.log(UFs);

})