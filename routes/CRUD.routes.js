const express = require('express');
const CRUD = require('../models/CRUD');
const router = new express.Router();

router.route('/')
  .get((req, res) => {
    CRUD.find({}, (err, CRUDS) => {
      res.status(err ? 400 : 200).send(err || CRUDS);
    });
  })
  .post((req, res) => {
    CRUD.create(req.body, (err, CRUDS) => {
      res.status(err ? 400 : 200).send(err || CRUDS);
    });
  })
  .delete((req, res) => {
    CRUD.remove({}, (err, confirmation) => {
      res.status(err ? 400 : 200).send(err || confirmation);
    });
  });

router.get('/:id', (req, res) => {
  CRUD.findById(req.params.id, (err, cRUD) => {
    res.status(err ? 400 : 200).send(err || cRUD);
  }).populate('images');
});

router.put('/:id', (req, res) => {
  CRUD.findOneAndModify(req.params.id, req.body, { new: true }, (err, newCRUD) => {
    res.status(err ? 400 : 200).send(err || newCRUD);
  });
});

router.delete('/deleteImage/:cRUD-Id', (req, res) => {
  CRUD.deleteImage(req.params.cRUD-Id, (err, confirmation) => {
    res.status(err ? 400 : 200).send(err || confirmation);
  });
});

module.exports = router;
