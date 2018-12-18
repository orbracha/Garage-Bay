
msgService = require('../services/msg.service')
roomService = require('../services/room.service')
userService = require('../services/user.service')
function addRoute(app, server) {
    var loggedInUsers = {};
    var logginRooms = {};
    var currRoom;
    var io = require('socket.io').listen(server);
    io.on('connection', function (socket) {
        socket.on('inline', userId => {
            userService.userAvailableStatus(userId, true)
            loggedInUsers = { [socket.id]: userId };
        })
        socket.on('roomRequested', (userId, userDest) => {
            return roomService.findRoom(userId, userDest).then(room => {
                if (room) {
                    currRoom = room;
                    socket.join(room._id);
                    if (logginRooms[room._id]) logginRooms[room._id].push(userId)
                    else logginRooms[room._id] = [userId];
                    io.to(currRoom._id).emit('usersConnected', currRoom);
                }
                else roomService.addRoom(userId, userDest).then(res => {
                    currRoom = res.ops[0];
                    socket.join(currRoom._id);
                    if (logginRooms[room._id]) logginRooms[room._id].push(userId)
                    else logginRooms[room._id] = [userId];
                    io.to(currRoom._id).emit('usersConnected', currRoom);
                })

            });

        });
        socket.on('disconnect-room', (userId, room) => {
            var idx = (logginRooms[room._id]).indexOf(userId)
            var currRoom = logginRooms[room._id]
            currRoom.splice(idx, 1)
            logginRooms[room._id] = currRoom;
            console.log('all rooms', logginRooms)
        })
        socket.on('disconnect', () => {
            // console.log(loggedInUsers[socket.id], 'is offline')
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
            roomService.addMsgToRoom(msg, room).then(() => {
                const userDestId = ((room.userId === msg.from._id) ?
                    room.userDest : room.userId)
                if (logginRooms[room._id].indexOf(userDestId) !== -1) {
                    io.to(room._id).emit('newMsg', msg)
                }
                else {
                    console.log('out')
                    userService.userOfflineMsgs(userDestId, msg).then(() => {
                        io.emit('newMsg', msg)
                    })
                }
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
    app.post('/api/msg/chat/connect', (req, res) => {
        const { user } = req.body;
        return userService.userAvailableStatus(user._id, true).then(user => {
            return res.json(user)
        })
    })
    app.post('/api/msg/chat/disconnect', (req, res) => {
        const { user } = req.body;
        return userService.userAvailableStatus(user._id, false).then(user => {
            return res.json(user)
        })
    })
}

module.exports = addRoute;