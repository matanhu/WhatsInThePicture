var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    sss:'sss'
  })
});

module.exports = router;
