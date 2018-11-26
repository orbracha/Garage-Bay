



var users = [_createUser('avi bobi', '1234'), _createUser('yarden hachla', '4343'), _createUser('elad yogurt', '5675')];
export default {
    users
}
function _createUser(nickname, password) {
    return {
        _id=_makeId(),
        nickname,
        password,
        itemList=[],
        wishList=[],
        historyChat=[],
    }
}




function _makeId(length = 3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}