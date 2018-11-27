'use strict'

var msgs = [
    {
        _id: '3df',
        txt: 'hi fdgdfddf',
        from: { nickname: 'avi bobi', _id: '123' },
    },
    {
        _id: '32f',
        txt: 'hi fdgdfddf',
        from: { nickname: 'boli', _id: '456' },
    }
]



function query() {
    return Promise.resolve(msgs);
}
export default {
    query
}