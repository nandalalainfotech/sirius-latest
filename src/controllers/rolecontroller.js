// import * as roleservice from "../services/roleservice.js";
import * as roleservice from "../Services/roleservice.js";
import express from 'express';

const router = express.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

router.get('/list', roleservice.list);
router.get('/:id', roleservice.show);
router.post('/create', roleservice.create);
router.put('/update', roleservice.update);
router.delete('/delete/:_id', roleservice.remove);

export default router;