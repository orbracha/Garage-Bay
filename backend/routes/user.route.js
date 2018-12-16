
const userService = require('../services/user.service')
const jwt=require('jsonwebtoken')



function addRoutes(app) {
    app.post('/api/user', (req, res) => {
       var userCred=req.body.user;       
       if(typeof userCred!=='object'){
        var userCred = jwt.verify(userCred, 'mysecretkey')
    }

        return userService.checkUser(userCred)
            .then(user => {
                req.session.loggedinUser = user;
                const userInfo={
                    nickname:user.nickname,
                    password: user.password
                }
                var token=jwt.sign({userInfo},'mysecretkey')
                const userAndToken={
                    user,
                    token
                }

                return res.json(userAndToken);
            })
       
            .catch(err => res.status(401).send(err))
    })


    app.post('/api/user/logout', (req, res) => {
        console.log('About to destroy Server Session for', req.session.loggedinUser);
        req.session.destroy();
        res.end();
    });


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