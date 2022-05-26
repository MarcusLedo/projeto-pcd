function writeToCSVFile(array, name, extract) {
    const filename = name;
    fs.writeFile(filename, extract(array), err => {
      if (err) {
        console.log('Error writing to csv file', err);
      } else {
        console.log(`saved as ${filename}`);
      }
    });
}

function extractAsCSV(array) {
    const header = ["id, sigla, nome_uf"];
    const rows = array.map(uf =>
       `${uf.id},${uf.sigla},${uf.nome_uf}`
    );
    return header.concat(rows).join("\n");
}

function extractAsCSVCidade(array) {
    const header = ["id, uf_id, nome, populacao, latitude, longitude, cod_ibge, cod_siafi"];
    const rows = array.map(cidade =>
       `${cidade.id},${cidade.uf_id},${cidade.nome},${cidade.populacao},${cidade.latitude},${cidade.longitude},${cidade.cod_ibge},${cidade.cod_siafi}`
    );
    return header.concat(rows).join("\n");
}

function extractAsCSVEmpresa(array) {
    const header = ["id, cidade_id, slug, nome_fantasia, dt_inicio_atividade, cnae_fiscal, cep, porte"];
    const rows = array.map(empresa =>
       `${empresa.id},${empresa.cidade_id},${empresa.slug},${empresa.nome_fantasia},${empresa.dt_inicio_atividade},${empresa.cnae_fiscal},${empresa.cep},${empresa.porte}`
    );
    return header.concat(rows).join("\n");
}


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

function getNameUf(cod){
    switch(cod){
        case '11':
            return 'Rondônia'
        case '12':
            return 'Acre';
        case '13':
            return 'Amazonas';
        case '14':
            return 'Roraima';
        case '15':
            return 'Pará';
        case '16':
            return 'Amapá';
        case '17':
            return 'Tocantins';
        case '21':
            return 'Maranhão';
        case '22':
            return 'Piauí';
        case '23':
            return 'Ceará';
        case '24':
            return 'Rio Grande do Norte';
        case '25':
            return 'Paraíba';
        case '26':
            return 'Pernambuco';
        case '27':
            return 'Alagoas';
        case '28':
            return 'Sergipe';
        case '29':
            return 'Bahia';
        case '31':
            return 'Minas Gerais';
        case '32':
            return 'Espírito Santo';
        case '33':
            return 'Rio de Janeiro';
        case '35':
            return 'São Paulo';
        case '41':
            return 'Paraná';
        case '42':
            return 'Santa Catarina';
        case '43':
            return 'Rio Grande do Sul';
        case '50':
            return 'Mato Grosso do Sul';
        case '51':
            return 'Mato Grosso';
        case '52':
            return 'Goiás';
        case '53':
            return 'Distrito Federal';
    }
}

const slugg = require('slug');
const csv = require('csv-parser');
const fs = require('fs');           //File System

const UFs = [];                 //Array of objects
const empresas = [];
const cidades_siafi = [];
const cidades_populacao = [];

const ufDB = [];
const cidadeDB = [];
const empresaDB = [];

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
        municipio: row[properties[4]],
        porte: row[properties[5]]
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
    const walkerUF = nextElem(UFs);
    let elementUF = walkerUF.next();
    let id = 1;
    //console.log(UFs);
    while(elementUF){
        const ufObj = {};
        ufObj.id = id;
        ufObj.sigla = elementUF.uf;
        ufObj.nome_uf = getNameUf(elementUF.codigo_uf);
        ufObj.codigo_uf = elementUF.codigo_uf; 
        ufDB.push(ufObj);
        id++;

        elementUF = walkerUF.next();
    }

    //console.log(ufDB);
    writeToCSVFile(ufDB, "uf_DB.csv", extractAsCSV);

    const walkerCidadeSiafi = nextElem(cidades_siafi);
    let elementSiafi = walkerCidadeSiafi.next();
    id = 1;
    while(elementSiafi){
        const cidadeObj = {};
        cidadeObj.id = id;
        cidadeObj.nome = elementSiafi.nome;
        cidadeObj.latitude = elementSiafi.latitude;
        cidadeObj.longitude = elementSiafi.longitude;
        cidadeObj.cod_ibge = elementSiafi.codigo_ibge;
        cidadeObj.cod_siafi = elementSiafi.siafi_id;
        let tempObj = {};
        let tempObjUF = {};
        for(let i = 0; i < cidades_populacao.length; i++){
            tempObj = cidades_populacao[i];
            if(elementSiafi.codigo_ibge == tempObj.cod_ibge)
                break;
        }

        for(let i = 0; i < ufDB.length; i++){
            tempObjUF = ufDB[i];
            if(String(cidadeObj.cod_ibge).slice(0, 2) == tempObjUF.codigo_uf)
                break;      
        }

       cidadeObj.uf_id = tempObjUF.id; 
       cidadeObj.populacao = tempObj.populacao;
       cidadeDB.push(cidadeObj);
       id++;
       elementSiafi = walkerCidadeSiafi.next();
    }

    //console.log(cidadeDB);
    writeToCSVFile(cidadeDB, "cidade_DB.csv", extractAsCSVCidade);
    
    const walkerEmpresa = nextElem(empresas);
    let elementEmpresa = walkerEmpresa.next();
    id = 1;
    let cont = 1;
    while(elementEmpresa){
        const empresaObj = {};
        empresaObj.id = id;
        empresaObj.slug = slugg(elementEmpresa.nome_fantasia);
        empresaObj.nome_fantasia = elementEmpresa.nome_fantasia;

        let yyyy = elementEmpresa.dt_inicio_atividades.slice(0, 4);
        let mm = elementEmpresa.dt_inicio_atividades.slice(4, 6);
        let dd = elementEmpresa.dt_inicio_atividades.slice(6, 8);
        empresaObj.dt_inicio_atividade = yyyy + "-" + mm + "-" + dd;

        empresaObj.cnae_fiscal = elementEmpresa.cnae_fiscal;
        empresaObj.cep = elementEmpresa.cep;
        empresaObj.porte = elementEmpresa.porte;
        let tempObjCidade = {};

        for(let i = 0; i < cidadeDB.length; i++){
            tempObjCidade = cidadeDB[i];
            if(tempObjCidade.cod_siafi == elementEmpresa.municipio)
                break;  
        }

        empresaObj.cidade_id = tempObjCidade.id;

        empresaDB.push(empresaObj);
        id++;

        elementEmpresa = walkerEmpresa.next();
    }

    writeToCSVFile(empresaDB, "empresa_DB.csv", extractAsCSVEmpresa);
    
})