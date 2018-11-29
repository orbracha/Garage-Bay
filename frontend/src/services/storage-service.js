'use strict';

export const LOGGEDIN_USER_KEY = 'loggedInUser'

function loadFromStorage(key) {
    var val = localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
}

function saveToStorage(key, val) {
    localStorage[key] = JSON.stringify(val);
}

function clearStorage(key) {
    localStorage.removeItem(key);
}

export default {
    load: loadFromStorage,
    save: saveToStorage,
    clear: clearStorage
};