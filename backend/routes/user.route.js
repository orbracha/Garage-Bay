
const userService = require('../services/user.service')





function addRoutes(app) {
    app.post('/api/user', (req, res) => {
        return userService.checkuser(req.body.user)
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
            .then(user => res.json(user))
    })
    app.post('/api/user', (req, res) => {
        const toy = req.body;
        userService.add(toy)
            .then(Toy => res.json(Toy))
    })
    // app.put('/api/Toy', (req, res) => {
    //     const toy = req.body;
    //     userService.update(toy)
    //         .then(Toy => res.json(Toy))
    // })

    // app.delete('/api/Toy/:ToyId', (req, res) => {
    //     const ToyId = req.params.ToyId;
    //     userService.remove(ToyId)
    //         .then(() => res.end())
    // })

}



module.exports = addRoutes