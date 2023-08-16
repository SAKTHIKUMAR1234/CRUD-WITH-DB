const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const router = require('../../router/index');
const connect = require('../models/index.js');
const seeding =async () => {
    const con = connect.instance();
    const row =await con.query("select * from empdetails order by empid asc");
    if (row.rows.length==0) {
        fs.readdirSync(__dirname)
            .filter(file => {
                return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
            })
            .forEach(async file => {
                const data = require(path.join(__dirname, file));
                data.data.forEach(async rm=>{
                    try {
                        rowData=[rm.name,rm.sal,rm.des,rm.city];
                        await con.query("insert into empdetails values(nextval('myseq'),$1,$2,$3,$4)", rowData);
                    } catch (error) {
                        console.log(error);
                    }
                })
            })
    }
}

module.exports={
    seeding
}
