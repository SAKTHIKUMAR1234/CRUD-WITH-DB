const bcrypt = require('bcrypt')

const saltRound=10;

const encryptor = async (password) =>{
    const res=await bcrypt.hash(String.toString(password),saltRound);
    return res;
}

module.exports=encryptor