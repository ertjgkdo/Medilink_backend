const express = require('express');
const depAdminRouter = express.Router();
const auth = require('../../authentication/middlewares/auth'); // Middleware to authenticate the token
const depAdminController = require('../controllers/depAdminController');

// Route to create a doctor under a specific department
depAdminRouter.post('/:departmentId/doctors', auth, depAdminController.createDoctor);

module.exports = depAdminRouter;
