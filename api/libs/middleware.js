const memjs = require('memjs');

const mc = memjs.Client.create();

const middleware = (req, res, next) => {
  const key = req.url;
  mc.get(key, async (err, value) => {
    if (err == null && value != null) {
      const result = JSON.parse(value.toString());
      res.send({ fromCache: true, ...result });
    } else {
      next();
    }
  });
};

module.exports = {
  mc,
  middleware,
};
