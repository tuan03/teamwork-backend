const express = require('express');
const { createUser } = require('./demoController');
const { createUserValidation } = require('./demoValidations');

const router = express.Router();

router.post('/demo', createUserValidation, createUser);
// router.post('/demo', createUser);
router.get('/ahihi/:id',(req,res)=>{})
module.exports = router;
