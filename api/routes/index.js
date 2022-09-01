const router = require('express').Router();
const { middleware, mc } = require('../libs/middleware');
const logger = require('../libs/logger');
const fetch = require('../libs/fetch');
const { apikey, baseURl } = require('../const');

router.use('/txs', middleware, async (req, res) => {
  const { a = '0xeb2a81e229b68c1c22b6683275c00945f9872d90', page = 1, offset = 10, sort = 'asc' } = req.query;
  const uri = `${baseURl}address=${a}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=${sort}&apikey=${apikey}`;
  try {
    const response = await fetch({ uri });
    mc.set(req.url, response, { expires: 0 }, (error, success) => {
      if (error === null && success) {
        const result = JSON.parse(response);
        res.send({ fromCache: false, ...result });
      }
    });
  } catch (error) {
    logger.error(error);
    res.send({ code: 400, error });
  }
});

module.exports = router;
