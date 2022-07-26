// import * as subscriberdetails from "../services/subscriberdetailsservice.js";
import * as subscriberdetails from "../Services/subscriberdetailsservice.js";
import express from 'express';

const router = express.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

router.get('/verify',subscriberdetails.verify)
router.get('/list', subscriberdetails.list);
router.get('/:id', subscriberdetails.show);
router.post('/create', subscriberdetails.create);
router.put('/update', subscriberdetails.update);
router.delete('/delete/:_id', subscriberdetails.remove);

export default router;