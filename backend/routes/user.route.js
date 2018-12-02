
const userService = require('../services/user.service')





function addRoutes(app) {
    app.post('/api/user', (req, res) => {
        return userService.checkUser(req.body.user)
            .then(user => {
                req.session.loggedinUser = user;
                return res.json(user);
            })
            .catch(err => res.status(401).send(err))
    })
    


    app.get('/api/user/logout', (req, res) => {
        console.log('About to destroy Server Session for', req.session.loggedinUser);
        req.session.destroy();
        res.end();
    });

    app.get('/api/user/:userId', (req, res) => {
        const userId = req.params.userId;
        userService.getById(userId)
            .then(user => {
                console.log('user to send', user);

                res.json(user)
            })
    })


    // app.post('/api/user', (req, res) => {
    //     const user = req.body;
    //     userService.add(user)
    //         .then(user => res.json(user))
    // })

    app.put('/api/user', (req, res) => {
        const user = req.body;
        console.log('----------------------out of server-----------------',user)
        userService.update(user)
            .then(user => res.json(user))
    })


}



module.exports = addRoutes