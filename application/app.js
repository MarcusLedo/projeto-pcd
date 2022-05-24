const csv = require('csv-parser');
const fs = require('fs');           //File System
const results = [];                 //Array of objects

const uf_path = '/home/marcusledo/Documents/atividade2/CSVs/uf.csv';
const empresas_path = '/home/marcusledo/Documents/atividade2/CSVs/empresas_bahia.csv';
const cidade_siafi_path = '/home/marcusledo/Documents/atividade2/CSVs/cidade_siafi.csv';
const cidade_populacao_path = '/home/marcusledo/Documents/atividade2/CSVs/cidade_populacao.csv';

fs.createReadStream(cidade_populacao_path).pipe(csv()).on('data', (row) => {
    const properties = Object.getOwnPropertyNames(row);
    console.log(row[properties[0]]);
})

console.log(results[0]);