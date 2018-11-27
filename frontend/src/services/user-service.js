



var users = [_createUser('avi bobi', '1234', '123', 'user.jpg' ,["9cO","thA","N2E","2KH","b1w",]),
_createUser('yarden hachla', '4343', '456', 'user.jpg',["sEk","2cN","zYJ","NRt","Rpd","OMt","RxJ", "yiy","MXW"]),
_createUser('elad yogurt', '5675', '678', 'user.jpg',["gPE","V6f","45z","cV8","gIp","GWG"])];


function getById(userId) {
    var user = users.find(user => user._id === userId)
    return Promise.resolve(user);
}







export default {
    users,
    getById
}


function _createUser(nickname, password, _id, img, itemList) {
    return {
        _id,
        nickname,
        password,
        itemList,
        wishList: [],
        historyChat: [],
        img
    }
}

