const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const multer = require('multer');
//const upload = multer({dest: 'uploads/'});

// image path
const imgPath = '/path/to/some/img.png';

//connect to mongo
//mongoose.connect("http://localhost:5000/api/items");

//example schema
const item = new ItemSchema(
    { img: 
        { data: Buffer, contentType: String }
    }
  );

  // model
  var A = mongoose.model('A', schema);

  mongoose.connection.on('open', function () {
    console.error('mongo is open');
  
    // empty the collection
    A.remove(function (err) {
      if (err) throw err;
  
      console.error('removed old docs');
  
      // store an img in binary in mongo
      var a = new A;
      a.img.data = fs.readFileSync(imgPath);
      a.img.contentType = 'image/png';
      a.save(function (err, a) {
        if (err) throw err;
  
        console.error('saved img to mongo');
  
        // start a demo server
        var server = express.createServer();
        server.get('/', function (req, res, next) {
          A.findById(a, function (err, doc) {
            if (err) return next(err);
            res.contentType(doc.img.contentType);
            res.send(doc.img.data);
          });
        });
  
        server.on('close', function () {
          console.error('dropping db');
          mongoose.connection.db.dropDatabase(function () {
            console.error('closing db connection');
            mongoose.connection.close();
          });
        });
  
        server.listen(3333, function (err) {
          var address = server.address();
          console.error('server listening on http://localhost:5000/api/items', address.address, address.port);
          console.error('press CTRL+C to exit');
        });
  
        process.on('SIGINT', function () {
          server.close();
        });
      });
    });
  
  });