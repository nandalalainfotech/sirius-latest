// import * as subscriptionmasterservice from "../services/subscriptionmasterservice.js";
import * as subscriptionmasterservice from "../Services/subscriptionmasterservice.js";
import express from 'express';

const router = express.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

router.get('/list', subscriptionmasterservice.list);
router.get('/:id', subscriptionmasterservice.show);
router.post('/create', subscriptionmasterservice.create);
router.put('/update', subscriptionmasterservice.update);
router.delete('/delete/:_id', subscriptionmasterservice.remove);

export default router;