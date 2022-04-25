
// core Modules

const path = require('path');

const database = require('./database.js');
const Employee = require(__dirname + '/public/models/employee.js');
const Employer = require(__dirname + '/public/models/employer.js');
const Booking = require(__dirname + '/public/models/order.js');

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

    res.render('employer_registration', { uEror: "" })

})
app.get('/employee-registration', (req, res) => {

    res.sendFile(path.join(__dirname, 'views', 'employee_registration.html'));

})

app.get('/dashboard', isAuth, (req, res) => {
    if (req.session.userp.level == 'employee') {
        return res.render('employee_profile', req.session.userp);
    } else {
        return res.render('employer_profile', req.session.userp);
    }
})

app.get('/contact-us', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contactUS.html'));
})


app.get('/search', (req, res) => {
    res.render('search_page', { username: "fdsgfds", Skills: 'dsf' })
})

//all post requests



app.post('/employee-registration', async (req, res) => {
    console.log(req.body)
    const {
        username,
        level,
        email,
        fname,
        lname,
        Gender,
        birthday,
        address,
        Pincode1,
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
            pincode: Pincode1,
            phone: pnum,
            Skills,
            Exp: Experience,
            password
        })

        console.log(registerEmployee);

        const registered = await registerEmployee.save();
        // console.log(registered);
        res.redirect('/login');
    }
    catch (error) {
        res.status(400).send(error);
    }

    // }
})


app.post('/employer-registration', async (req, res) => {

    const thisUsername = req.body.username;
    const thisPassword = req.body.password;

    const employer = await Employer.findOne({ username: thisUsername });
    const employee = await Employee.findOne({ username: thisUsername });

    if (employee == null && employer == null) {
        const {
            username,
            level,
            email,
            fname,
            lname,
            Gender,
            birthday,
            address,
            Pincode,
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
                pincode: Pincode,
                phone: pnum,
                password
            })

            const registered = await registerEmployer.save();
            // console.log(registered);
            res.redirect('/login');
        }


        catch (error) {
            res.status(400).send("there is an error");
        }
    }

    res.render('employer_registration', { uEror: "User name is already registered" })


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



app.post('/delete', async (req, res) => {
    if (req.session.userp.level == 'employee') {

        const employee = await Employee.deleteOne({ username: req.session.userp.username });
        console.log(employee)
    }
    else {
        const employer = await Employer.deleteOne({ username: req.session.userp.username });
        console.log(employer)
    }
    req.session.destroy();
    res.render('index', { name: 'Sign Up/Log In', route: '/login' });
})



app.post('/update-user', async (req, res) => {
    if (req.session.userp.level == 'employee') {

        const employee = await Employee.findOne({ username: req.session.userp.username });
        console.log(employee);
        res.render('update_employee', req.session.userp);
    }
    else {
        const employer = await Employer.deleteOne({ username: req.session.userp.username });
        console.log(employer)
    }


})
app.post('/update', async (req, res) => {
    // console.log(req.body)
    if (req.session.userp.level == 'employee') {
        const {
            username,
            level,
            email,
            fname,
            lname,
            Gender,
            birthday,
            address,
            Pincode1,
            pnum,
            Skills,
            Experience,
            password
        } = req.body;

        var newvalues = {
            $set: {
                username,
                level,
                email,
                fname,
                lname,
                gender: Gender,
                dob: birthday,
                address,
                pincode: Pincode1,
                phone: pnum,
                Skills,
                Exp: Experience,
                password

            }
        };
        const employee = await Employee.updateOne({ username: req.session.userp.username }, newvalues);
        const Newemployee = await Employee.findOne({ username: req.session.userp.username });
        req.session.userp = Newemployee;
        // console.log(employee);

    }
    else {
        const {
            username,
            level,
            email,
            fname,
            lname,
            Gender,
            birthday,
            address,
            Pincode,
            pnum,
            password
        } = req.body;


        var newvalues = {
            $set: {
                username,
                level,
                email,
                fname,
                lname,
                gender: Gender,
                dob: birthday,
                address,
                pincode: Pincode,
                phone: pnum,
                password
            }
        };


        const employer = await Employer.updateOne({ username: req.session.userp.username }, newvalues);

        const Newemployer = await Employer.findOne({ username: req.session.userp.username });
        req.session.userp = Newemployer;
        console.log(employer)
    }

    res.redirect('/dashboard');
})

app.post('/search', async (req, res) => {
    const searchDetail = {
        // pincode: req.body.pincode,
        pincode: { $in: [req.body.pincode] },
        Skills: req.body.skills
    }

    const allemployee = await Employee.find(searchDetail);
    console.log(req.url);
    res.render('search_page', { userData: allemployee });
})

















//booking

app.post('/booking', async (req, res) => {

    const employe = await Employer.findOne({ username: req.session.userp.username });
    const employr = await Employee.findOne({ username: req.body.username });
    const employee = employe.username;
    const employer = employr.username;
    console.log()
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

    const timeslot = req.body.timeslot;
    const book = await Booking.findOne({ employee, timeslot });
    if (book == null) {

        const booking = new Booking({
            employee,
            employer,
            date,
            timeslot
        })

        console.log(booking)
        const registered = await booking.save();
        return res.send("data is send");


    }

    res.send("boooking is not avilable");

})


app.post('/order/cancel', async (req, res) => {

    const book = await Booking.deleteOne({ employee: req.body.employee, timeslot: req.body.timeslot });


})


app.post('/order/complete', (req, res) => {

    const book = await Booking.updateOne({ employee: req.body.employee, timeslot: req.body.timeslot }, {
        $set: {
            status: 'complete',
        }
    });
})




app.post('/admin', (req, res) => {

})















// app.use('/', (req, res) => {
//     res.status(404).send("<h1>page doesn't find</h1>");
// })


app.listen(3000, () => {

    console.log("Server is started");


})






// * Pandiing work


//! Add to cart