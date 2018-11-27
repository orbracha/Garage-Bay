const express = require('express')
const bodyParser = require('body-parser')
const addItemRoutes = require('./routes/item.route')
const addUserRoutes = require('./routes/user.route')

const session = require('express-session')
const app = express()
app.use(bodyParser.json());
const cors = require('cors')
app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true // enable set cookie
}));
app.use(session({
    secret: 'sxjbijxixszaixsax76x87a6sxbash',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

addItemRoutes(app)
addUserRoutes(app)
app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});