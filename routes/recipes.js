var express = require('express');
var router = express.Router();
var path = require('path');
var assert = require('assert');
var props = require('./utils/properties');
var mongo_helper = require('./utils/mongo_helper');
var multer = require('multer');
var mongoose = require('mongoose');
mongoose.connect(props.getDbUrl(props.defaultDb));
var conn = mongoose.connection;
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = Grid(conn.db);

var imageCol = 'images';

router.get('/', function (req, res, next) {
  mongo_helper.find({}, 'recipe', function (err, dbResults) {
    res.send(dbResults);
  });
});

router.get('/:id', function (req, res, next) {
  receipe_id = req.param('id')
  mongo_helper.find({recipe_id: receipe_id}, 'recipe', function (err, dbResults) {
    res.send(dbResults);
  });
});

router.post('/', function (req, res) {
  var recipe = JSON.parse(req.body.recipe);
  console.log("Param", recipe.title);
  mongo_helper.save({recipe_id: recipe.recipe_id}, recipe, "recipe", function (err, data) {
    if (err) {
      console.log("Error: ", err);
    }
    res.send("{}");
  })
})

var storage = GridFsStorage({
  gfs: gfs,
  filename: function (req, file, cb) {
    cb(null, req.param('recipe_id') + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  },
  metadata: function (req, file, cb) {
    cb(null, {recipe_id: req.param('recipe_id'), type: req.param('image_type')});
  },
  root: imageCol
});

var upload = multer({
  storage: storage
}).single('file');

router.post('/upload/:image_type/:recipe_id', function (req, res) {

  gfs.collection(imageCol);
  if (req.params.image_type === 'main') {
    gfs.files.find({
      'metadata.recipe_id': req.params.recipe_id,
      'metadata.type': req.params.image_type
    }).toArray(function (err, files) {
      if (!files || files.length === 0) {
        upload(req, res, function (err) {
          if (err) {
            res.json({error_code: 1, err_desc: err});
            return;
          }
          res.json({error_code: 0, err_desc: null});
        });
      }
      else {
        return res.status(403).json({
          error_code: 403,
          err_desc: "Image with name " + req.params.recipe_id + " and type " + req.params.image_type + " already exists"
        });
      }
    })
  } else {
    upload(req, res, function (err) {
      if (err) {
        res.json({error_code: 1, err_desc: err});
        return;
      }
      res.json({error_code: 0, err_desc: null});
    });
  }

});

router.get('/file/:image_type/:recipe_id', function (req, res) {
  console.log(req.params.recipe_id, req.params.image_type)
  gfs.collection(imageCol); //set collection name to lookup into

  /** First check if file exists */
  gfs.files.find({
    'metadata.recipe_id': req.params.recipe_id,
    'metadata.type': req.params.image_type
  }).toArray(function (err, files) {
    if (!files || files.length === 0) {
      return res.status(404).json({
        responseCode: 1,
        responseMessage: "error"
      });
    }
    /** create read stream */
    console.log("filename", files[0]._id)
    var readstream = gfs.createReadStream({
      _id: files[0]._id,
      root: imageCol
    });
    /** set the proper content type */
    res.set('Content-Type', files[0].contentType)
    /** return response */
    return readstream.pipe(res);
  });
});

router.get('/file/delete/:image_type/:recipe_id', function (req, res) {
  gfs.collection(imageCol); //set collection name to lookup into

  /** First check if file exists */
  gfs.files.find({
    'metadata.recipe_id': req.params.recipe_id,
    'metadata.type': req.params.image_type
  }).toArray(function (err, files) {
    if (!files || files.length === 0) {
      return res.status(404).json({
        responseCode: 1,
        responseMessage: "error"
      });
    }
    /** create read stream */
    var readstream = gfs.remove({
      filename: files[0].filename,
      root: imageCol
    }, function (err) {
      if (err) {
        res.status(400).json({
          responseCode: 1,
          responseMessage: "Could not delete file"
        });
      } else {
        res.status(200).json({
          responseCode: 0,
          responseMessage: "Successfully deleted"
        });
      }
    });
  });
});

module.exports = router;
