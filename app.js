
// core Modules
const path = require('path');


const database = require('./database.js');
const Employee = require(__dirname + '/public/models/employee.js');
const Employer = require(__dirname + '/public/models/employer.js');
// const Register = require('./register.js');

// const {RegiterE, RegisterER} = require(__dirname + '/register.js');

// const RegiterE =  Register.RegiterE;
// const RegiterER =  Register.RegiterER;
//Third-pary modules
const express = require('express');
const bodyParser = require('body-parser');



const app = express();
app.set("view engine", "ejs");




app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
// all get requests

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})
app.get('/login', (req, res) => {
    res.render('login', { data: " " });
})
app.get('/login/forget-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'forgetpassword.html'));
})
app.get('/registration-choice', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'RegisterChoice.html'));
})

app.get('/employer-registration', (req, res) => {

    res.sendFile(path.join(__dirname, 'views', 'employer_registration.html'));

})
app.get('/employee-registration', (req, res) => {

    res.sendFile(path.join(__dirname, 'views', 'employee_registration.html'));

})



//all post requests


app.post('/', (req, res) => {

    //send to the search page
})

app.post('/employee-registration', async (req, res) => {

    const {
        username,
        level,
        email,
        fname,
        lname,
        Gender,
        birthday,
        address,
        pincode1,
        pnum,
        Skills,
        Experience,
        password
    } = req.body;

    // let obj1 = await Employee.findOne({ username: username })
    // let obj2 = await Employer.findOne({ username: username })

    // if (obj1 == null && obj2 == null) {
    try {
        const registerEmployee = new Employee({
            username,
            level,
            email,
            fname,
            lname,
            gender: Gender,
            dob: birthday,
            address,
            pincode: pincode1,
            phone: pnum,
            Skills,
            Exp: Experience,
            password
        })

        // console.log(registerEmployee);

        const registered = await registerEmployee.save();
        console.log(registered);
        res.redirect('/login');
    }
    catch (error) {
        res.status(400).send(error);
    }

    // }
})


app.post('/employer-registration', async (req, res) => {



    // let obj1 = await Employee.findOne({ username: username })
    // let obj2 = await Employer.findOne({ username: username })
    // if (obj1 == null && obj2 == null) {
    const {
        username,
        level,
        email,
        fname,
        lname,
        Gender,
        birthday,
        address,
        pincode1,
        pnum,
        password
    } = req.body;
    try {
        const registerEmployer = new Employer({
            username,
            level,
            email,
            fname,
            lname,
            gender: Gender,
            dob: birthday,
            address,
            pincode: pincode1,
            phone: pnum,
            password
        })

        const registered = await registerEmployer.save();
        console.log(registered);
        res.redirect('/login');
    }

    catch (error) {
        res.status(400).send(error);
    }

    // }

})

app.post('/login', async (req, res) => {


    try {
        const thisUsername = req.body.username;
        const thisPassword = req.body.password;
        const user = await Employee.findOne({ username: thisUsername });

        if (user == null) {
            res.render('login', { data: "Invalid username or user is not regiterd yet" });
        }
        else if (user.password === thisPassword) {

            res.status(201).redirect('/');
        } else {
            res.render('login', { data: "Invalid Password " });
        }


    }
    catch (err) {
        res.status(400).send(err);
    }
}
)

app.use('/', (req, res) => {
    res.status(404).send("<h1>page doesn't find</h1>");
})


app.listen(4000, () => {

    console.log("Server is started");


})





