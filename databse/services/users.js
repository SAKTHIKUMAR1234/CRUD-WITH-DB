const models = require("../models");

const dbinstance = require("../models").instance();

const createUser = async (data) => {

    try {
        await dbinstance.query("insert into users values(DEFAULT,$1,$2,$3,$4)", data);
    } catch (error) {
        return error;
    }
}

const getUser = async (id) =>{
    try{
        const data=await dbinstance.query("select * from users where email=$1",[id]);
        return data;
    } catch (error){
        return error;
    }
}

module.exports={createUser,getUser}
