const dbinstance = require("../models").instance();


const getData = async () => {
    const result = await dbinstance.query("select * from empdetails order by empid asc");
    return result.rows;
}



const insertData = async (data) => {

    try {
        await dbinstance.query("insert into empdetails values(DEFAULT,$1,$2,$3,$4)", data);
    } catch (error) {
        return error;
    }
}

const updateData = async (data) => {

    try {
        await dbinstance.query("update empdetails set empname=$1,sal=$2,des=$3,city=$4 where empid=$5", data);
    } catch (error) {
        throw new Error(error);
    }

}



const deleteData = async (id) => {
    try {
        dbinstance.query("delete from empdetails where empid=$1", [id]);
    } catch (error) {
        return error;
    }
}

module.exports = {
    getData,
    insertData,
    updateData,
    deleteData
}