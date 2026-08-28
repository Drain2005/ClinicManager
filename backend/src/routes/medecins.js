const router = require('express').Router();
const auth   = require('../middleware/auth');
const ctrl   = require('../controllers/medecinController');
 
router.get('/',       auth, ctrl.getAll);
router.get('/bilan',  auth, ctrl.bilan);
router.post('/',      auth, ctrl.create);
router.put('/:id',    auth, ctrl.update);
router.delete('/:id', auth, ctrl.remove);
 
module.exports = router;
