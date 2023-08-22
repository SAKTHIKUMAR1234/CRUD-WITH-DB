const bcrypt = require('bcrypt')

const saltRound=10

const encryptor = async (password) =>{
    const res=await bcrypt.hash(String.toString(password),saltRound)
    return res;
}

const validateUser = async (pwdUser,pwdData) =>{
    return await bcrypt.compare(pwdUser,pwdData)
}

module.exports=encryptor,validateUser