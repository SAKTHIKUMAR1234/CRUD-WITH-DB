const express = require('express')
const path = require('path');
const bodyparser = require('body-parser')
const  con  = require('./getConnection')
let cors = require("cors");
const app = express()
app.use(express.json());
const port = 3000
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}))


app.use(express.static('frontend'))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/frontend/index.html'));
})

app.get('/getData/',con.getData);
app.post('/saveData/',con.insertData);
app.put('/updateData/',con.updateData);
app.delete('/deleteData/',con.deleteData);

app.get('',);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})





