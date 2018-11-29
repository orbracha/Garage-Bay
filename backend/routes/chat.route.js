
msgService = require('../services/msg.service')
roomService = require('../services/room.service')
var currRoom;
function addRoute(app, server) {
    var io = require('socket.io').listen(server);
    io.on('connection', function (socket) {
        console.log('a user connected');
        socket.on('roomRequested', (userId, userDest) => {
            return roomService.findRoom(userId, userDest).then(room => {
                if (room) {
                    currRoom = room;
                    socket.join(room._id);
                    console.log('exist', currRoom)
                    io.to(currRoom._id).emit('usersConnected', currRoom);
                }
                else roomService.addRoom(userId, userDest).then(res => {
                    currRoom = res.ops[0];
                    socket.join(currRoom._id);
                    console.log('add', currRoom)
                    io.to(currRoom._id).emit('usersConnected', currRoom);
                })

            });

        });

        io.to(currRoom).on('chat-newMsg', (msg) => {
            io.to(currRoom).emit('newMsg', msg)
        })
    });

    app.get('/api/msg/:userId', (req, res) => {
        return msgService.query()
            .then(msgs => res.json(msgs))
    })

    app.put('/api/msg', (req, res) => {
        const user = req.body;
        console.log(user)
        msgService.updateUserChat(user)
            .then(msg => res.json(msg))
    })
}

module.exports = addRoute;