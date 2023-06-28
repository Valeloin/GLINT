const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


const saucesCtrl = require('../controllers/saucesControllers');

router.post('/', auth, multer,saucesCtrl.postsauce);
router.get('/', auth, saucesCtrl.getsauces);
router.get('/:id', auth, saucesCtrl.getsauce);
router.put('/:id', auth, multer, saucesCtrl.updatesauce);
router.delete('/:id', auth, saucesCtrl.deletesauce);
router.post('/:id/like', saucesCtrl.likesauce);


module.exports = router;