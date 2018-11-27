



var items = [_createItem('bamba', 12, 'hjghgjh', 768768768, 'tty', 76876, 'music'),
_createItem('jhgj', 56, 'mbmn,mn,mn', 768768768, 'tty', 76876, 'kids'),
_createItem('hhkjhk', 162, 'sadsads', 768768768, 'tty', 76876, 'home')];





function query() {
    return Promise.resolve(items);
}


function getById({itemId}) {
   var item = items.find(item => item._id === itemId)
    return Promise.resolve(item);
}

export default {
    items,
    query,
    getById
}









function _createItem(title, price, desc, createAt, sellerId, location, category) {
    return {
        _id: _makeId(),
        img: '',
        title,
        price,
        desc,
        createAt,
        sellerId,
        location,
        category,
        condition: 'Used'
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