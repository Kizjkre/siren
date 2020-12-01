const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(403);
});

module.exports = router;