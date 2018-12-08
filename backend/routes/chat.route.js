
msgService = require('../services/msg.service')
roomService = require('../services/room.service')
userService = require('../services/user.service')
function addRoute(app, server) {
    var loggedInUsers = {};
    var currRoom;
    var io = require('socket.io').listen(server);
    io.on('connection', function (socket) {
        socket.on('inline', userId => {
            console.log(userId, 'is online')
            loggedInUsers = { [socket.id]: userId };
            userService.userAvailableStatus(userId, true)
        })
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
        socket.on('disconnect', () => {
            console.log(loggedInUsers[socket.id], 'is offline')
            userService.userAvailableStatus(loggedInUsers[socket.id], false)
        })
        socket.on('dibs', (userId, item) => {
            userService.updateUserDibs(item.sellerId, { item: item, from: userId }).then(() => {
                io.emit('got-dibs', userId, item);
            })
        })
        socket.on('cancelDibReq', dib => {
            userService.removeUserDib(dib).then(() => {
                io.emit('got-cancle-dib', dib);
            })
        })
        socket.on('sendAns', (ans) => {
            userService.updateUserDibsAns(ans.dib.from, ans).then(() => {
                io.emit('got-ans', ans);
            })
        })
        socket.on('chat-newMsg', (msg, room) => {
            userService.userOfflineMsgs(room.userId, room.userDest, msg)
            roomService.addMsgToRoom(msg, room).then(() => {
                io.to(room._id).emit('newMsg', msg)
            })
        })
    });

    app.get('/api/msg', (req, res) => {
        var { userId, userDest } = req.query
        if (!userDest) {
            return roomService.query(userId)
                .then(rooms => res.json(rooms))
        }
        return roomService.findRoom(userId, userDest)
            .then(room => {
                if (room) return res.json(room.historyMsgs)
                return room;
            })
    })

    app.put('/api/msg', (req, res) => {
        const user = req.body;
        msgService.updateUserChat(user)
            .then(msg => res.json(msg))
    })
}

module.exports = addRoute;