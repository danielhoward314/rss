const router = require('express').Router();
const { Feed } = require('../db/models');
module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    const newFeed = await Feed.create(req.body);
    res.json(newFeed);
  } catch (err) {
      console.log(err);
  }
});

router.get('/:uuid', async (req, res, next) => {
  try {
    const feeds = await Feed.findAll({
      where: {
        userUuid: req.params.uuid
      },
      order: [
        ['updatedAt', 'DESC'],
  ]
    });
    res.json(feeds);
  } catch (err) {
    next(err);
  }
});
