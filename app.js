
// core Modules

const path = require('path');

const database = require('./database.js');
const Employee = require(__dirname + '/public/models/employee.js');
const Employer = require(__dirname + '/public/models/employer.js');
const Booking = require(__dirname + '/public/models/order.js');
const Admin = require(__dirname + '/public/models/admin.js');

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

app.get('/dashboard', isAuth, async (req, res) => {

    if (req.session.userp.level == 'employee') {
        const book = await Booking.find({ employee: req.session.userp.username });
        // console.log(book);
        const details = { d: req.session.userp, udata: book }
        return res.render('employee_profile', { d: req.session.userp, udata: book });

        // return res.render('employee_profile', { d: req.session.userp, book });
    } else {
        const book = await Booking.find({ employer: req.session.userp.username });
        const details = { d: req.session.userp, udata: book }

        return res.render('employer_profile', { d: req.session.userp, udata: book });
    }

})

app.get('/contact-us', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contactUS.html'));
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
        console.log(employee);
        const admin = await Admin.findOne({ username: thisUsername });
        if (admin != null) {
            const employee = await Employee.find({ level: 'employee' });
            const employer = await Employer.find({ level: 'employer' });
            const order = await Booking.find({});
            console.log(order);

            req.session.userp = admin;
            return res.render('admin', { route: "/", name: thisUsername, userData: employee, uData: employer, order });
        }

        // console.log(employee);
        // console.log(employer);
        if (employee == null && employer == null) {
            return res.render('login', { data: "User is not regiterd yet" });
        }
        if (employee != null) {
            if (employee.password === thisPassword) {
                req.session.userp = employee;
                req.session.isAuth = true;
                return res.status(201).redirect('/');


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

        const employer = await Employer.findOne({ username: req.session.userp.username });
        res.render('update_employer', req.session.userp);
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
        return res.redirect('/dashboard');
    }

    if (req.session.userp.level == 'employer') {
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


        // console.log(Newemployer);
        const Newemployer = await Employer.findOne({ username: req.session.userp.username });
        const employer = await Employer.updateOne({ username: req.session.userp.username }, newvalues);

        req.session.userp = Newemployer;

        // console.log(employer)
        return res.redirect('/dashboard');
    }


})

app.post('/search', async (req, res) => {


    const searchDetail = {
        // pincode: req.body.pincode,
        pincode: { $in: [req.body.pincode] },
        Skills: req.body.skills
    }

    const allemployee = await Employee.find(searchDetail);

    res.render('search_page', { userData: allemployee, skill: req.body.skills });
})




app.get('/payments', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'paymentdetails.html'));
})

app.post('/payments/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'success.html'));
})














//booking

app.post('/booking', async (req, res) => {
    // console.log(req.body.username);

    const employr = await Employer.findOne({ username: req.session.userp.username });
    const employe = await Employee.findOne({ username: req.body.username });
    const employee = employe.username;
    const employer = employr.username;
    // console.log(employe, employee);
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

    const timeslot = req.body.slot;
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
        return res.redirect("/payments");


    }



})


app.post('/order/cancel', async (req, res) => {
    const status = 'cancel';
    var newvalues = {
        $set: {
            status
        }
    }

    const book = await Booking.updateOne({ employee: req.body.username, timeslot: req.body.timeslot }, newvalues);
    // console.log(book)

    res.redirect('/dashboard');
})


app.post('/order/complete', async (req, res) => {

    const status = 'complete';
    var newvalues = {
        $set: {
            status
        }
    }

    const book = await Booking.updateOne({ employee: req.body.username, timeslot: req.body.timeslot }, newvalues);
    // console.log(book)

    res.redirect('/dashboard');
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