const express = require('express');
const router = express.Router();

// Other imports
import {
    getAllElectricCars,
    getElectricCarByID,
    createElectricCars,
    updateElectricCars,
    deleteElectricCars,
    searchCar,
} from '../controller/carController';

// 🔍 Search route
router.get('/cars/search', searchCar);

// Route definitions
router.get('/cars', getAllElectricCars);
router.get('/cars/:id', getElectricCarByID);
router.post('/cars', createElectricCars);
router.patch('/cars/:id', updateElectricCars);
router.delete('/cars/:id', deleteElectricCars);


module.exports = router;