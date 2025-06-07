const express = require('express');

const {
    getAllElectricCars,
    getElectricCarByID,
    createElectricCars,
    updateElectricCars,
    deleteElectricCars,
    searchCar,
} = require('../controller/carController');

const router = express.Router();

router.get('/cars',getAllElectricCars);
router.get('/cars/:id',getElectricCarByID)
router.post('/cars', createElectricCars);
router.patch('/cars/:id', updateElectricCars);
router.delete('/cars/:id',deleteElectricCars);

router.get('/cars/search',searchCar)


module.exports = router;