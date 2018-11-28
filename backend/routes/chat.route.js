
msgService = require('../services/msg.service')

function addRoute(app, server) {
    var io = require('socket.io').listen(server);
    io.on('connection', function (socket) {
        console.log('a user connected');
        // socket.emit('chat newMsg', { type: true })
        // socket.emit('chat history', historyMsgs)

        socket.on('disconnect', function () {
            // socket.emit('chat newMsg', { typeMsg: true })
            console.log('user disconnected');
        });
        socket.on('chat-newMsg', (msg) => {
            socket.emit('newMsg', msg)
        })
    });

    app.get('/api/msg', (req, res) => {
        return msgService.query()
            .then(msgs => res.json(msgs))
    })

    app.post('/api/msg', (req, res) => {
        const msg = req.body;
        msgService.add(msg)
            .then(msg => res.json(msg))
    })
}

module.exports = addRoute;