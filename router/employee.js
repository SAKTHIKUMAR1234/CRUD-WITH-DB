const express = require('express')
const router = express.Router();
const  employeeDatabaseService  = require('../databse/services/employee');
const responseOfData = require('../util/responce');


router.get('/getData/',async (req,res)=>{
    res.status(200).send(await employeeDatabaseService.getData())
});
router.post('/saveData/',async (req,res)=>{
    const data=[req.body.name,req.body.sal,req.body.desc,req.body.city];
    
    await employeeDatabaseService.insertData(data).then((result)=>{
        res.status(responseOfData.getStatus(result)).json({"message":responseOfData.getMessage(result)});
    });

    
});
router.put('/updateData/',async (req,res)=>{
    const data=[req.body.name,req.body.sal,req.body.desc,req.body.city,req.body.id];
    await employeeDatabaseService.updateData(data).then((result)=>{
        res.status(responseOfData.getStatus(result)).json({"message":responseOfData.getMessage(result)});
    });
});
router.put('/deleteData/',async (req,res)=>{
    await employeeDatabaseService.deleteData(req.body.id).then((result)=>{
        res.status(responseOfData.getStatus(result)).json({"message":responseOfData.getMessage(result)});
    });
});

module.exports = router;
