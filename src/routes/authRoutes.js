const express = require('express');

const authRouter = express.Router();

module.exports = function router(nav) {
  authRouter.route('/signup').post((req, res) => {
    res.json(req.body);
  });

  return authRouter;
};
