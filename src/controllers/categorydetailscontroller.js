
import * as categorydetailsservice from "../Services/categorydetailsservice.js";
// import * as countryservice from "../services/cityservice.js";
import express from 'express';

const router = express.Router();

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

router.get('/list', categorydetailsservice.list);
router.get('/:id', categorydetailsservice.show);
router.post('/create', categorydetailsservice.create);
router.put('/update', categorydetailsservice.update);
router.delete('/delete/:_id', categorydetailsservice.remove);

export default router;