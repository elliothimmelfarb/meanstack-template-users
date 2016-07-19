const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const request = require('request');

router.route('/')
.get((req, res) => {
  User.find({})
  .select('-password')
  .exec((err, dbUsers) => {
    res.status(err ? 400 : 200).send(err || dbUsers);
  });
});

router.get('/profile', User.authMiddleware, (req, res) => {
  res.send(req.user);
});

router.get('/:id', (req, res) => {
  User.findUserById(req.params.id, (err, dbUser) => {
    res.status(err ? 400 : 200).send(err || dbUser);
  });
});

router.post('/register', (req, res) => {
  User.find({ email: req.body.email }, (err, user) => {
    if (err) return res.status(400).send(err);
    if (user.email) return res.status(401).send({ error: 'Email already in use.' });
    return User.create(req.body, (err, dbUser) => {
      res.send(dbUser);
    });
  });
});

router.post('/login', (req, res) => {
  User.authenticate(req.body, (err, token) => {
    res.status(err ? 400 : 200).send(err || { token });
  });
});

router.post('/facebook', (req, res) => {
  const fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name', 'picture'];
  const accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  const graphApiUrl = `https://graph.facebook.com/v2.5/me?fields=${fields.join(',')}`;
  const params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: process.env.FACEBOOK_SECRET,
    redirect_uri: req.body.redirectUri,
  };
  // Step 1. Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params, json: true }, (err, response, accessToken) => {
    if (response.statusCode !== 200) {
      return res.status(400).send({ message: accessToken.error.message });
    }
    return request.get({
      url: graphApiUrl,
      qs: accessToken,
      json: true,
    }, (err, response, profile) => {
      if (response.statusCode !== 200) {
        return res.status(400).send({ message: profile.error.message });
      }
      return User.findOne({ facebook: profile.id }, (err, dbUser) => {
        if (err) return res.status(400).send(err);
        if (dbUser) {
          // returning dbUser -> generate token and respond with it
          const token = dbUser.generateToken();
          return res.send({ token });
        }
        // new dbUser -> create dbUser, save to database, generate and respond with token
        const newUser = new User({
          email: profile.email,
          username: profile.first_name,
          profile: {
            name: profile.name,
            age: profile.age,
            avatar: profile.picture.data.url,
          },
          facebook: profile.id,
        });
        return newUser.save((err, savedUser) => {
          if (err) return res.status(400).send(err);
          const token = savedUser.generateToken();
          return res.send({ token });
        });
      });
    });
  });
});

router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, dbUser) => {
    const user = dbUser;
    user.password = null;
    res.status(err ? 400 : 200).send(err || user);
  });
});

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, err => {
    res.status(err ? 400 : 200).send(err);
  });
});

module.exports = router;
