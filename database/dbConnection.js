var mysql = require('mysql');

var con = mysql.createConnection({
    host: "sql10.freemysqlhosting.net",
    user: "sql10494587",
    password: "ixBzf38fY8",
    database: "sql10494587"
});

con.connect((err) => {
    if(err) throw err;
    console.log("Connected");

    let sql = "CREATE TABLE IF NOT EXISTS My_Tets_Table (name VARCHAR(80), code INTEGER)";
    
    con.query(sql, (err, result) => {
        if(err) throw err;
        console.log("Created!");
    })
});