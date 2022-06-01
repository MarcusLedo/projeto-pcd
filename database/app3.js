function isALargeCity(row){
    const properties = Object.getOwnPropertyNames(row);

    if((row[properties[2]] == "Salvador") || (row[properties[2]] == "Feira de Santana") || (row[properties[2]] == "Vitória da Conquista") || (row[properties[2]] == "Camaçari"))
        return true;
    else
        return false;
}

function getCity(row){
    const properties = Object.getOwnPropertyNames(row);
    const city = {};

    city.id = row[properties[0]];
    city.nome = row[properties[2]];
    city.lat = row[properties[4]];
    city.lng = row[properties[5]];

    return city;
}

function getCompany(row){
    const properties = Object.getOwnPropertyNames(row);
    const company = {};

    company.nome = row[properties[0]];
    company.lat = row[properties[7]];
    company.lng = row[properties[8]];

    return company;
}

function calculateDistanceUsingLatLonInKm(company, city) {
    "use strict";
    //console.log(city.lat + ", " + city.lon);
    var deg2rad = function (deg) { return deg * (Math.PI / 180); },
        R = 6371,
        dLat = deg2rad(city.lat - company.lat),
        dLng = deg2rad(city.lng - company.lng),
        a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(deg2rad(company.lat))
            * Math.cos(deg2rad(company.lat))
            * Math.sin(dLng / 2) * Math.sin(dLng / 2),
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return ((R * c *1000).toFixed()) / 1000;
}

function insertDistancesIntoCompanies(empresa){
    let sql = `UPDATE Empresa SET 
        dist_1 = ?,
        dist_2 = ?,
        dist_3 = ?,
        dist_4 = ?
        WHERE nome_fantasia = ?`;

    let values = [empresa.dist1, empresa.dist2, empresa.dist3, empresa.dist4, empresa.nome];

}

//_____________________________________________________________________________________________________________________________________

var mysql = require('mysql');
const csv = require('csv-parser');
const fs = require('fs');

const cidade_path = "/home/marcusledo/Documents/atividade2/CSVs/cidade_DB.csv";
const empresa_saida_path = "/home/marcusledo/Documents/atividade2/CSVs/saida.csv";

const maiores_cidades = [];
const empresas = [];
const empresas_distancias = [];

var con = mysql.createConnection({
    host: "megazord.cbjpuzkhqslx.sa-east-1.rds.amazonaws.com",
    user: "admin",
    password: "ixBzf38fY8",
    database: "progcd"
});

fs.createReadStream(cidade_path).pipe(csv()).on('data', (row) => {

    if(isALargeCity(row))
        maiores_cidades.push(getCity(row));

}).on('end', () => {
    fs.createReadStream(empresa_saida_path).pipe(csv()).on('data', (row) => {
        empresas.push(getCompany(row));
    }).on('end', () => {
        //console.log("empresa: " + empresas[0].lat + "   " + empresas[0].lng);
        //console.log("cidade: " + maiores_cidades[2].lat + "   " + maiores_cidades[2].lng);

        for(let i = 0; i < empresas.length; i++){
            empresas[i].dist1 = calculateDistanceUsingLatLonInKm(empresas[i], maiores_cidades[2]); //Salvador
            empresas[i].dist2 = calculateDistanceUsingLatLonInKm(empresas[i], maiores_cidades[1]); //Feira de Santana
            empresas[i].dist3 = calculateDistanceUsingLatLonInKm(empresas[i], maiores_cidades[3]); //Vitoria de Conquista
            empresas[i].dist4 = calculateDistanceUsingLatLonInKm(empresas[i], maiores_cidades[0]); //Camaçari
        }

        //console.log(empresas);

        con.connect((err) => {
            if(err) throw err;
            console.log("Connected");
        });


    })
})