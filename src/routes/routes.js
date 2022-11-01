const express = require('express');
const { login } = require('../controllers/login');
const { registerUser } = require('../controllers/users');
const validateRequest = require('../middlewares/validateRequest');
const { authenticationFilter } = require('../middlewares/authentication');
const { listCars, registerCar, updateCar, updateCarImage, deleteCar, deleteCarImage, getCar } = require('../controllers/cars');

const userSchema = require('../validations/userSchema');
const loginSchema = require('../validations/loginSchema');
const carsSchema = require('../validations/carsSchema');

const multer = require('../middlewares/multer');

const routes = express();

routes.post('/usuarios', validateRequest(userSchema), registerUser);
routes.post('/login', validateRequest(loginSchema), login);

routes.use(authenticationFilter);

routes.get('/carros', listCars);
routes.get('/carros/:id', getCar);
routes.post('/carros', multer.single('foto'), validateRequest(carsSchema), registerCar);
routes.put('/carros/:id', validateRequest(carsSchema), updateCar);
routes.delete('/carros/:id', deleteCar);
routes.delete('/carros/:id/foto', deleteCarImage);
routes.patch('/carros/:id/foto', multer.single('foto'), updateCarImage);

module.exports = routes;