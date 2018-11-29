
msgService = require('../services/msg.service')
roomService = require('../services/room.service')
function addRoute(app, server) {
    var currRoom;
    var io = require('socket.io').listen(server);
    io.on('connection', function (socket) {
        console.log('a user connected');
        socket.on('roomRequested', (userId, userDest) => {
            return roomService.findRoom(userId, userDest).then(room => {
                if (room) {
                    currRoom = room;
                    socket.join(room._id);
                    io.to(currRoom._id).emit('usersConnected', currRoom);
                }
                else roomService.addRoom(userId, userDest).then(res => {
                    currRoom = res.ops[0];
                    socket.join(currRoom._id);
                    io.to(currRoom._id).emit('usersConnected', currRoom);
                })

            });

        });

        socket.on('chat-newMsg', (msg, room) => {
            roomService.addMsgToRoom(msg, room).then(() => {
                io.to(room._id).emit('newMsg', msg)
            })
        })
    });

    app.get('/api/msg', (req, res) => {
        var { userId, userDest } = req.query
        return roomService.findRoom(userId, userDest)
            .then(room => {
                if (room) return res.json(room.historyMsgs)
                return room;
            })
    })

    app.put('/api/msg', (req, res) => {
        const user = req.body;
        console.log(user)
        msgService.updateUserChat(user)
            .then(msg => res.json(msg))
    })
}

module.exports = addRoute;