
const itemService = require('../services/item.service')
const userService = require('../services/user.service')

function requireAuth(req, res, next) {
    const user = req.session.loggedinUser

    // if (!user) return res.status(401).send('Something broke!')
    // else next()
    next()
}
function addRoutes(app) {
    app.get('/api/item', (req, res) => {
        return itemService.query()
            .then(items =>res.json(items))
    })

    app.get('/api/item/:itemId', requireAuth, (req, res) => {
        const itemId = req.params.itemId;
        itemService.getById(itemId)
            .then(item => res.json(item))
    })
    app.post('/api/item/add-item', (req, res) => {
        const item = req.body;
        return itemService.add(item)
            .then(item => res.json(item))
    })
    app.put('/api/item', requireAuth, (req, res) => {
        const item = req.body;
        itemService.update(item)
            .then(item => res.json(item))
    })

    app.delete('/api/item/:itemId/:sellerId', requireAuth, (req, res) => {
        const itemId = req.params.itemId;
        const sellerId=req.params.sellerId
        console.log('params', itemId, sellerId);
        
        itemService.remove(itemId)
        .then(()=>{
            userService.getById(sellerId)
            .then(user=>res.json(user))
        })
       
    })

    app.get('/api/search', (req, res) => {
        return itemService.getCatagories()
            .then(catagories => {
                res.json(catagories)
            })
    })
    app.get('/api/filter/', (req, res) => {
        return itemService.filterItems(req.query)
            .then(data => {
                res.send(data)
            })
    })
    app.post('/api/item/add-image', (req, res) => {
        const img = req.body;
        itemService.saveImgToCloudinary(img)
            .then(url => res.json(url))

    })

}



module.exports = addRoutes