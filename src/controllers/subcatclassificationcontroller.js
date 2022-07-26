// import * as subcatclassificationservice from "../services/subcatclassificationservice.js";
import * as subcatclassificationservice from "../Services/subcatclassificationservice.js";
import express from 'express';

const router = express.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

router.get('/list', subcatclassificationservice.list);
router.get('/:id', subcatclassificationservice.show);
router.post('/create', subcatclassificationservice.create);
router.put('/update', subcatclassificationservice.update);
router.delete('/delete/:_id', subcatclassificationservice.remove);

export default router;