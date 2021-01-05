const mdbConn = require('../models/mariaDBConn');

exports.test = async function (req, res, next) {
  try {
    mdbConn.test().then((rows) => res.json(rows));
    // .catch((err) => console.error(err));
  } catch (e) {
    res.status(400).send(e);
    next();
  }
};

exports.saveCell = async function (req, res, next) {
  try {
    mdbConn.saveLog(req.body).then((result) => {
      res.json(result);
    });
    // .catch((err) => console.error(err));
  } catch (e) {
    res.status(400).send(e);
    next();
  }
};
