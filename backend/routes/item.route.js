
const itemService = require('../services/item.service')

function requireAuth(req, res, next) {
    const user = req.session.loggedinUser
    console.log('user',user)
    // if (!user) return res.status(401).send('Something broke!')
    // else next()
    next()
}
function addRoutes(app) {
    app.get('/api/item', (req, res) => {
        return itemService.query()
            .then(items => res.json(items))
    })

    app.get('/api/item/:itemId',requireAuth, (req, res) => {
        const itemId = req.params.itemId;
        itemService.getById(itemId)
            .then(item => res.json(item))
    })
    app.post('/api/item',requireAuth, (req, res) => {
        const item = req.body;
        itemService.add(item)
            .then(item => res.json(item))
    })
    app.put('/api/item',requireAuth, (req, res) => {
        const item = req.body;
        itemService.update(item)
            .then(item => res.json(item))
    })

    app.delete('/api/item/:itemId',requireAuth, (req, res) => {
        const itemId = req.params.itemId;
        itemService.remove(itemId)
            .then(() => res.end())
    })

    app.get('/api/search',(req, res)=>{
        return itemService.getCatagories()
        .then(catagories=>{
            res.json(catagories)    
        })
    })
    app.get('/api/filter/',(req, res)=>{
     return  itemService.filterItems(req.query)
        .then(data=>{
            // console.log('data in routes', data);
            res.send(data)
        })
    })

}



module.exports = addRoutes