

function query() {
    return Promise.resolve(items);
}


function getById({ itemId }) {
    var item = items.find(item => item._id === itemId)
    return Promise.resolve(item);
}

export default {
    query,
    getById
}

// title, price, desc, createAt, sellerId, location, category


var items = [
    {
      "_id": "9cO",
      "img": "http://lorempixel.com/640/480/food/1",
      "title": "Chair",
      "price": "383.00",
      "desc": "Handmade Wooden Mouse",
      "createAt": "2018-07-13T08:28:12.081Z",
      "sellerId": "123",
      "location": "32.053292, 34.761452",
      "category": "Tools",
      "condition": "Used"
    },
    {
      "_id": "sEk",
      "img": "http://lorempixel.com/640/480/fashion/2",
      "title": "Chair",
      "price": "856.00",
      "desc": "Licensed Soft Sausages",
      "createAt": "2018-09-27T17:43:14.530Z",
      "sellerId": "456",
      "location": "32.053292, 34.761452",
      "category": "Home",
      "condition": "Used"
    },
    {
      "_id": "gPE",
      "img": "http://lorempixel.com/640/480/technics/3",
      "title": "Pizza",
      "price": "611.00",
      "desc": "Intelligent Plastic Table",
      "createAt": "2018-11-05T11:46:08.909Z",
      "sellerId": "678",
      "location": "32.053292, 34.761452",
      "category": "Baby",
      "condition": "Used"
    },
    {
      "_id": "V6f",
      "img": "http://lorempixel.com/640/480/food/4",
      "title": "Cheese",
      "price": "58.00",
      "desc": "Sleek Metal Sausages",
      "createAt": "2017-12-12T20:22:53.459Z",
      "sellerId": "678",
      "location": "32.053292, 34.761452",
      "category": "Automotive",
      "condition": "Used"
    },
    {
      "_id": "45z",
      "img": "http://lorempixel.com/640/480/food/5",
      "title": "Chips",
      "price": "151.00",
      "desc": "Small Granite Mouse",
      "createAt": "2018-05-15T01:33:11.366Z",
      "sellerId": "678",
      "location": "32.053292, 34.761452",
      "category": "Automotive",
      "condition": "Used"
    },
    {
      "_id": "2cN",
      "img": "http://lorempixel.com/640/480/food/6",
      "title": "Towels",
      "price": "913.00",
      "desc": "Tasty Metal Cheese",
      "createAt": "2018-09-19T01:37:18.129Z",
      "sellerId": "456",
      "location": "32.053292, 34.761452",
      "category": "Baby",
      "condition": "Used"
    },
    {
      "_id": "zYJ",
      "img": "http://lorempixel.com/640/480/food/7",
      "title": "Mouse",
      "price": "191.00",
      "desc": "Practical Plastic Sausages",
      "createAt": "2018-10-23T15:50:59.802Z",
      "sellerId": "456",
      "location": "32.053292, 34.761452",
      "category": "Movies",
      "condition": "Used"
    },
    {
      "_id": "thA",
      "img": "http://lorempixel.com/640/480/food/8",
      "title": "Fish",
      "price": "598.00",
      "desc": "Licensed Granite Sausages",
      "createAt": "2018-01-23T18:05:18.127Z",
      "sellerId": "123",
      "location": "32.053292, 34.761452",
      "category": "Books",
      "condition": "Used"
    },
    {
      "_id": "NRt",
      "img": "http://lorempixel.com/640/480/fashion/9",
      "title": "Chicken",
      "price": "63.00",
      "desc": "Unbranded Plastic Sausages",
      "createAt": "2018-04-23T09:28:44.807Z",
      "sellerId": "456",
      "location": "32.053292, 34.761452",
      "category": "Clothing",
      "condition": "Used"
    },
    {
      "_id": "cV8",
      "img": "http://lorempixel.com/640/480/food/10",
      "title": "Hat",
      "price": "755.00",
      "desc": "Awesome Metal Towels",
      "createAt": "2018-07-26T15:48:35.840Z",
      "sellerId": "678",
      "location": "32.053292, 34.761452",
      "category": "Movies",
      "condition": "Used"
    },
    {
      "_id": "Rpd",
      "img": "http://lorempixel.com/640/480/fashion/11",
      "title": "Mouse",
      "price": "501.00",
      "desc": "Handcrafted Wooden Cheese",
      "createAt": "2018-01-11T08:02:18.840Z",
      "sellerId": "456",
      "location": "32.053292, 34.761452",
      "category": "Electronics",
      "condition": "Used"
    },
    {
      "_id": "N2E",
      "img": "http://lorempixel.com/640/480/food/14",
      "title": "Car",
      "price": "489.00",
      "desc": "Handcrafted Cotton Shoes",
      "createAt": "2018-09-22T14:00:31.229Z",
      "sellerId": "123",
      "location": "32.053292, 34.761452",
      "category": "Industrial",
      "condition": "Used"
    },
    {
      "_id": "OMt",
      "img": "http://lorempixel.com/640/480/food/45",
      "title": "Table",
      "price": "212.00",
      "desc": "Small Plastic Shirt",
      "createAt": "2017-12-10T19:07:08.937Z",
      "sellerId": "456",
      "location": "32.053292, 34.761452",
      "category": "Tools",
      "condition": "Used"
    },
    {
      "_id": "gIp",
      "img": "http://lorempixel.com/640/480/food/15",
      "title": "Salad",
      "price": "325.00",
      "desc": "Refined Metal Car",
      "createAt": "2018-07-08T04:13:34.544Z",
      "sellerId": "678",
      "location": "32.053292, 34.761452",
      "category": "Electronics",
      "condition": "Used"
    },
    {
      "_id": "RxJ",
      "img": "http://lorempixel.com/640/480/food/13",
      "title": "Towels",
      "price": "313.00",
      "desc": "Handmade Plastic Fish",
      "createAt": "2018-11-16T02:36:00.809Z",
      "sellerId": "456",
      "location": "32.053292, 34.761452",
      "category": "Books",
      "condition": "Used"
    },
    {
      "_id": "2KH",
      "img": "http://lorempixel.com/640/480/fashion/16",
      "title": "Computer",
      "price": "380.00",
      "desc": "Unbranded Wooden Pizza",
      "createAt": "2018-01-31T18:56:52.471Z",
      "sellerId": "123",
      "location": "32.053292, 34.761452",
      "category": "Clothing",
      "condition": "Used"
    },
    {
      "_id": "yiy",
      "img": "http://lorempixel.com/640/480/food/18",
      "title": "Fish",
      "price": "786.00",
      "desc": "Handmade Wooden Shoes",
      "createAt": "2018-01-14T00:09:40.580Z",
      "sellerId": "456",
      "location": "32.053292, 34.761452",
      "category": "Baby",
      "condition": "Used"
    },
    {
      "_id": "GWG",
      "img": "http://lorempixel.com/640/480/food/19",
      "title": "Pants",
      "price": "988.00",
      "desc": "Tasty Steel Fish",
      "createAt": "2018-07-12T09:21:17.956Z",
      "sellerId": "678",
      "location": "32.053292, 34.761452",
      "category": "Tools",
      "condition": "Used"
    },
    {
      "_id": "b1w",
      "img": "http://lorempixel.com/640/480/food/20",
      "title": "Soap",
      "price": "38.00",
      "desc": "Tasty Granite Gloves",
      "createAt": "2018-07-27T10:10:43.553Z",
      "sellerId": "123",
      "location": "32.053292, 34.761452",
      "category": "Industrial",
      "condition": "Used"
    },
    {
      "_id": "MXW",
      "img": "http://lorempixel.com/640/480/food/19",
      "title": "Ball",
      "price": "49.00",
      "desc": "Small Steel Salad",
      "createAt": "2018-02-03T00:18:35.410Z",
      "sellerId": "456",
      "location": "32.053292, 34.761452",
      "category": "Industrial",
      "condition": "Used"
    }
  ];