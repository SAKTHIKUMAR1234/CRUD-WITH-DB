const express = require('express')
const router = express.Router();
const  employeeDatabaseService  = require('../databse/services/employee');

router.get('/getData/',async (req,res)=>{
    res.status(200).send(await employeeDatabaseService.getData())
});
router.post('/saveData/',async (req,res)=>{
    const data=[req.body.name,req.body.sal,req.body.desc,req.body.city];
    
    await employeeDatabaseService.insertData(data).then((result)=>{
        if(result instanceof Error){
            res.status(500).json({"message":result});
        }
        else{
            res.status(200).json({"message":result});
        }
    });

    
});
router.put('/updateData/',async (req,res)=>{
    const data=[req.body.name,req.body.sal,req.body.desc,req.body.city,req.body.id];
    await employeeDatabaseService.updateData(data).then((result)=>{
        if(result instanceof Error){
            res.status(500).json({"message":result});
        }
        else{
            res.status(200).json({"message":result});
        }
    });
});
router.put('/deleteData/',async (req,res)=>{
    await employeeDatabaseService.deleteData(req.body.id).then((result)=>{
        if(result instanceof Error){
            res.status(500).json({"message":result});
        }
        else{
            res.status(200).json({"message":result});
        }
    });
});

module.exports = router;
