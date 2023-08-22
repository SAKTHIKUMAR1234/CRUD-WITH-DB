const express = require('express')
const router = express.Router();
const  usersDatabaseService  = require('../databse/services/users');
const responseOfData = require('../util/responce');
const encryptor=require('../util/passwordEncryptor');


router.post('/getUser/',async (req,res)=>{
    await usersDatabaseService.getUser(req.body.email).then((result)=>{
        if(result instanceof Error){
            res.status(500).json({"message":result.message});
        }
        else{
            res.status(responseOfData.getStatus(result)).json({"message":responseOfData.getMessage(result)});
        }
    })
});
router.post('/createUser/',async (req,res)=>{
    const pwd=await encryptor(req.body.pwd);
    const data=[req.body.fname,req.body.lname,req.body.email,pwd];
    
    await usersDatabaseService.createUser(data).then((result)=>{
        res.status(responseOfData.getStatus(result)).json({"message":responseOfData.getMessage(result)});
    });

    
});
module.exports = router;