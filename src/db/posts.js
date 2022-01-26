var PouchDB = require('pouchdb').default;
PouchDB.plugin(require('pouchdb-find').default);
PouchDB.plugin(require('relational-pouch'));

var posts = new PouchDB('posts');

export default posts;