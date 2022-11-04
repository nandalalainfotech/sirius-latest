import * as statussettingservice from "../Services/statussettingservice.js";
import express from 'express';

const router = express.Router();

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

router.get('/list', statussettingservice.list);
router.get('/:id', statussettingservice.show);
router.post('/create', statussettingservice.create);
router.put('/update', statussettingservice.update);
router.delete('/delete/:_id', statussettingservice.remove);

export default router;
