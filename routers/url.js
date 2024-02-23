const express = require('express');
const router = express.Router();
const {Index, Store, Redirect, Delete} = require('../controllers/UrlController')

router.get('/', Index)
router.post('/', Store)
router.post('/delete/:id', Delete)
router.get('/niko/:shortID', Redirect)

module.exports = router