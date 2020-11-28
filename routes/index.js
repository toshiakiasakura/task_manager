var express = require('express');
var sqlite3 = require('sqlite3');
var router = express.Router();

var db = new sqlite3.Database('./kadai.db');

/* GET home page. */
router.get('/', (req, res, next) => {
  db.serialize(() => {
    db.all('select * from kadaitable', (err, rows) => {
      if (!err && rows) {
        const newRows = rows.map(row => {
          if (row.content) {
            row.content = row.content.replace(/\r?\n/g, '<br>');
          }
          return row;
        });
        console.log(newRows);
        res.render('index', { posts: newRows });
      }
    });
  });
});

module.exports = router;
