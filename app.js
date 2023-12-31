const express = require('express')
const path = require('path');
const bodyparser = require('body-parser')
const cors = require("cors");
const app = express()
const port = 3000
const router = require("./router")
const database = require("./databse/models")
const seed=require('./databse/seeder/index')
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}))



app.use(express.static('frontend'))

app.get('/',(req,res)=>{
    //console.log("Hello");
    res.sendFile(path.join(__dirname,'./frontend/login.html'))
})

app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'./frontend/signup.html'))
})

app.use(router)


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })


database.connect().then(()=>{
    seed.seeding().then(()=>{
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    })
},err=>{
    console.log(err)
    process.exit(1);
})






