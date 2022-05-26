var mysql = require('mysql');

var con = mysql.createConnection({
    host: "megazord.cbjpuzkhqslx.sa-east-1.rds.amazonaws.com",
    user: "admin",
    password: "ixBzf38fY8",
});

con.connect((err) => {
    if(err) throw err;
    console.log("Connected");
    
    let sql1 = "DROP DATABASE progcd";
    
    con.query(sql1, (err, result) => {
        if(err) throw err;
        console.log("Created!");
    })
    
});