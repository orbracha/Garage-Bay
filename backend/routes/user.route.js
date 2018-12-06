
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
    app.post('/api/user/logout', (req, res)=>{
        req.session.destroy()
        res.end()
        
    })


    app.get('/api/user/logout', (req, res) => {
        console.log('About to destroy Server Session for', req.session.loggedinUser);
        req.session.destroy();
        res.end();
    });
    // app.get('/api/user/dibs/:userId', (req, res) => {
    //     const userId = req.params.userId;
    //     console.log('userid', userId)
    //     return userService.getById(userId)
    //         .then(user => {
    //             console.log('user with dibs to send', user);

    //             return res.json(user)
    //         })
    // });

    app.get('/api/user/:userId', (req, res) => {
        const userId = req.params.userId;
        userService.getById(userId)
            .then(user => res.json(user))

    })

    app.get('/api/user', (req, res) => {
        userService.getUsers()
            .then(users => res.json(users))

    })

    app.post('/api/user/sign/user', (req, res) => {
        const userName = req.body.userName;
        userService.getByName(userName)
            .then(user => {
                res.json(user)
            })
    })

    app.get('/api/user/wishlist/:userId', (req, res) => {
        const userId = req.params.userId;
        
        userService.getUserWishlist(userId)
            .then(user => {
           

                res.json(user)
            })
    })


    app.post('/api/user/sign', (req, res) => {
        const user = req.body;

        userService.add(user)
            .then(user => res.json(user))
    })

    app.put('/api/user', (req, res) => {
        const user = req.body;
        userService.update(user)
            .then(user => res.json(user))
    })


}



module.exports = addRoutes