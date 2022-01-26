var PouchDB = require('pouchdb').default;
PouchDB.plugin(require('pouchdb-find').default);
PouchDB.plugin(require('relational-pouch'));

var users = new PouchDB('users');

export default users;