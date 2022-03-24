
//Third-pary modules
const express = require('express');
const bodyParser = require('body-parser');


// core Modules
const path = require('path');

app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));



    

app.get('/',(req, res) => {
   
})
app.get('/login',(req, res) => {
    res.sendFile(path.join(__dirname,'views', 'login.html'));
})
app.get('/registration-choice',(req, res) => {
    res.sendFile(path.join(__dirname,'views', 'RegisterChoice.html'));
})

app.get('/employer-registration',(req, res)=>{

    res.sendFile(path.join(__dirname,'views', 'employer_registration.html'));

})
app.get('/employee-registration',(req, res)=>{

    res.sendFile(path.join(__dirname,'views', 'employee_registration.html'));
    
})




app.post('/',(req, res) => {

    
})
app.post('/registration-choice',(req, res) => {

   })


app.post('/employee-registration',(req, res)=>{
    console.log(req.body);
    res.redirect('/login');  
    })
    
    
app.post('/employer-registration',(req, res)=>{
    console.log(req.body);
    res.redirect('/login');  
})


// app.use('/',(req, res)=>{
//     res.status(404).send("<h1>page doesn't find</h1>");
// })


app.listen(3000,()=>{

    console.log("Server is started");
})