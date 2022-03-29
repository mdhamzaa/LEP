
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lep', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connection is successful');
}).catch((eror) => {
    console.log(e);
});