
// core Modules
const path = require('path');

const database = require('./database.js');
const Employee = require(__dirname + '/public/models/employee.js');
const Employer = require(__dirname + '/public/models/employer.js');
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
// const Register = require('./register.js');




// const {RegiterE, RegisterER} = require(__dirname + '/register.js');

// const RegiterE =  Register.RegiterE;
// const RegiterER =  Register.RegiterER;
//Third-pary modules
const express = require('express');






const app = express();
app.set("view engine", "ejs");

const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/lep',
    collection: "Sessions",
});


app.use(
    session({
        secret: "this is top secret",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);


app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
// all get requests


const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect("/login");
    }
};


app.get('/', (req, res) => {


    if (req.session.isAuth) {

        return res.render('index', { name: req.session.userp.username, route: '/dashboard' });
    }

    // req.session.isAuth = true;
    res.render('index', { name: 'Sign Up/Log In', route: '/login' });


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

app.get('/dashboard', isAuth, (req, res) => {

    res.render('UserProfile', req.session.userp);

})

app.get('/contact-us', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contactUS.html'));
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
        const employer = await Employer.findOne({ username: thisUsername });
        const employee = await Employee.findOne({ username: thisUsername });

        // console.log(employee);
        // console.log(employer);
        if (employee == null && employer == null) {
            return res.render('login', { data: "User is not regiterd yet" });
        }
        if (employee != null) {
            if (employee.password === thisPassword) {
                req.session.userp = employee;
                req.session.isAuth = true;
                return res.status(201).redirect('/dashboard');


            } else {
                return res.render('login', { data: "Invalid Password " });
            }
        } else if (employer != null) {
            if (employer.password === thisPassword) {
                req.session.userp = employer;
                req.session.isAuth = true;
                return res.status(201).redirect('/');


            } else {
                return res.render('login', { data: "Invalid Password " });
            }
        }
        // console.log(user);
        // if (user == null) {
        //     user = await Employee.findOne({ username: thisUsername });
        //     console.log(user);
        // }

        // if (user == null) {
        //     res.render('login', { data: "Invalid username or user is not regiterd yet" });
        // }
        // else if (user.password === thisPassword) {
        //     req.session.userp = user;
        //     req.session.isAuth = true;
        //     res.status(201).redirect('/');


        // } else {
        //     res.render('login', { data: "Invalid Password " });
        // }


    }
    catch (err) {
        res.status(400).send('you hava the error');
    }
}
)

app.post("/logout", (req, res) => {
    req.session.destroy();
    res.render('index', { name: 'Sign Up/Log In', route: '/login' });
})


app.use('/', (req, res) => {
    res.status(404).send("<h1>page doesn't find</h1>");
})


app.listen(3000, () => {

    console.log("Server is started");


})








