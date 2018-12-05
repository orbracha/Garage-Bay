const express = require('express')
const bodyParser = require('body-parser')
const addItemRoutes = require('./routes/item.route')
const addUserRoutes = require('./routes/user.route')
const addChatRoutes = require('./routes/chat.route')

const session = require('express-session')
const app = express()

const cors = require('cors')
app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true // enable set cookie
}));

app.use(bodyParser.urlencoded({
    limit: '5mb',
    parameterLimit: 100000,
    extended: false 
}));

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(session({
    secret: 'sxjbijxixszaixsax76x87a6sxbash',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


app.use(express.static('public'));

const port = process.env.PORT || 3000;
var server = app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});

addItemRoutes(app)
addUserRoutes(app)
addChatRoutes(app, server)
