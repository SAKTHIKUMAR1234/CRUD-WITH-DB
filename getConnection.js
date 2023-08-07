const { Pool } = require("pg");
const credentials = {
    user: "postgres",
    host: "localhost",
    database: "Employee",
    password: "1234",
    port: 5432,
}
const con=new Pool(credentials);

const getData=(req,res)=>{
    con.query("select * from empdetails order by empid asc",(err,result)=>{
        if(err){
            console.log(err);
        }
        res.json(result.rows);

    })

}


const insertData=async (req,res)=>{
    const data=req.body;
    //console.log(data.name);
    let dat=new Array(data.name,data.sal,data.desc,data.city);
    try {
        await con.query("insert into empdetails values(nextval('myseq'),$1,$2,$3,$4)",dat);
        res.status(200).json({"message":"Value inserted into db"});
    } catch (error) {
        res.status(500).json({"message":error});
    }

}

const updateData=async (req,res)=>{
    const data=req.body;
    const id=req.body.id;
    
    let dat=new Array(data.name,data.sal,data.desc,data.city,id);
    console.log(dat);
    try {
        await con.query("update empdetails set empname=$1,sal=$2,des=$3,city=$4 where empid=$5",dat);
        res.status(200);
        res.json({"message":"success"});
    } catch (error) {
        res.status(500);
        res.json({"message":error});
    }

}


const deleteData=async (req,res)=>{
    const id=[req.body.id];
    //console.log(id);
    try {
        await con.query("delete from empdetails where empid=$1",id);
        res.status(200);
        res.json({"message":"success"});
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({"message":error});
    }
}

module.exports={
    getData,
    insertData,
    updateData,
    deleteData
}