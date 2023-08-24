const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');

router.get('/', mainController.homePage);
router.get('/pokemon/:numero', mainController.pokemonDetails);
router.get('/types', mainController.AllTypes);
router.get('/types/:typeId', mainController.pokemonTypePage);

module.exports = router;