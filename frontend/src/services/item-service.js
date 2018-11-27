var faker = require('faker');

var items = [];
creatItems();

function creatItems() {
    for (let i = 0; i < 20; i++) {
        items.push(_createItem(i))
    }
}

// var items = [_createItem('bamba', 12, 'hjghgjh', 768768768, 'tty', 76876, 'music'),
// _createItem('jhgj', 56, 'mbmn,mn,mn', 768768768, 'tty', 76876, 'kids'),
// _createItem('hhkjhk', 162, 'sadsads', 768768768, 'tty', 76876, 'home')];



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

// title, price, desc, createAt, sellerId, location, category

function _createItem(i) {
    return {
        _id: _makeId(),
        img: faker.image.food(),
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        desc: faker.commerce.productName(),
        createAt: faker.date.past(),
        sellerId: _makeId(5),
        location: '32.053292, 34.761452',
        category: faker.commerce.department(),
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