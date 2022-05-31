function isALargeCity(row){
    const properties = Object.getOwnPropertyNames(row);

    if((row[properties[2]] == "Salvador") || (row[properties[2]] == "Feira de Santana") || (row[properties[2]] == "Vitória da Conquista") || (row[properties[2]] == "Camaçari"))
        return true;
    else
        return false;
}

function addCity(row){
    const properties = Object.getOwnPropertyNames(row);
    const city = {};

    city.id = row[properties[0]];
    city.latitude = row[properties[4]];
    city.longitude = row[properties[5]];

    return city;
}

var mysql = require('mysql');
const csv = require('csv-parser');
const fs = require('fs');

const cidade_path = "/home/marcusledo/Documents/atividade2/CSVs/cidade_DB.csv";
const empresa_path = "/home/marcusledo/Documents/atividade2/CSVs/empresa_DB.csv";

const maiores_cidades = [];

fs.createReadStream(cidade_path).pipe(csv()).on('data', (row) => {

    if(isALargeCity(row))
        maiores_cidades.push(addCity(row));

}).on('end', () => {
    console.log(maiores_cidades);

})