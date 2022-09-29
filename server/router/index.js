const userController = require('../controllers/userController');
const Router = require('express').Router;
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const dragonsController = require('../controllers/dragonsController');

const router = new Router();

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 4, max: 32 }),
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.post('/sendmail', authMiddleware, userController.sendmail)
router.get('/refresh', userController.refresh);
router.put('/email', authMiddleware, body('email').isEmail(), userController.editEmail);
router.get('/user', authMiddleware, userController.getUserInformation);

router.get('/dragons/favourites', authMiddleware, dragonsController.getFavourites);
router.put('/dragons/favourites', authMiddleware, dragonsController.addFavourite);
router.delete('/dragons/favourites/:id', authMiddleware, dragonsController.deleteFavourite);

module.exports = router;