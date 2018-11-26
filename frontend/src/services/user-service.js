



var users = [_createUser('avi bobi', '1234'), _createUser('yarden hachla', '4343'), _createUser('elad yogurt', '5675')];


function getById(userId) {
    user = users.find(user => user._id === userId)
    return Promise.resolve(user);
}







export default {
    users,
    getById
}



function _makeId(length = 3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}


function _createUser(nickname, password) {
    return {
        _id:_makeId(),
        nickname,
        password,
        itemList:[],
        wishList:[],
        historyChat:[],
    }
}

