const csv = require('csv-parser');
const fs = require('fs');           //File System
const UFs = [];                 //Array of objects
const empresas = [];

const uf_path = '/home/marcusledo/Documents/atividade2/CSVs/uf.csv';
const empresas_path = '/home/marcusledo/Documents/atividade2/CSVs/empresas_bahia.csv';
const cidade_siafi_path = '/home/marcusledo/Documents/atividade2/CSVs/cidade_siafi.csv';
const cidade_populacao_path = '/home/marcusledo/Documents/atividade2/CSVs/cidade_populacao.csv';

fs.createReadStream(empresas_path).pipe(csv()).on('data', (row) => {
    const properties = Object.getOwnPropertyNames(row);
    console.log(row[properties[0]]);
    const empresa = {
        nome_fantasia: row[properties[0]],
        dt_inicio_atividades: row[properties[1]],
        cnae_fiscal: row[properties[2]],
        cep: row[properties[3]],
        municipio: row[properties[4]]
    };

    empresas.push(empresa);
});

console.log(empresas);