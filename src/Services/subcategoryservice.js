import db from "../models/main.js";

const Subcategory001mb = db.subcategory001mb

export const list = async(req, res) => {
    Subcategory001mb.find(function(err, subcategory001mbs) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting subcategory001mb.',
                error: err
            });
        }

        return res.json(subcategory001mbs);
    });
};
export const show = async(req, res) => {
    var id = req.params.id;

    Subcategory001mb.findOne({ _id: id }, function(err, subcategory001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting subcategory001mb.',
                error: err
            });
        }

        if (!subcategory001mb) {
            return res.status(404).json({
                message: 'No such subcategory001mb'
            });
        }

        return res.json(subcategory001mb);
    });
};

export const create = async(req, res) => {
 
    const subcategory001mb = new Subcategory001mb();
    subcategory001mb.catcode = req.body.catcode;
    subcategory001mb.subcatname = req.body.subcatname;
    subcategory001mb.subcatstatus = req.body.subcatstatus;
    subcategory001mb.status = req.body.status;
    subcategory001mb.inserteduser = req.body.inserteduser;
    subcategory001mb.inserteddatetime = req.body.inserteddatetime;
    subcategory001mb.updateduser = req.body.updateduser;
    subcategory001mb.updateddatetime = req.body.updateddatetime;
    subcategory001mb.save()
        .then((result) => {
                    return res.json({ message: 'subcategory001mb created!' });
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
};


export const update = async(req, res) => {

    var id = req.body._id;

    Subcategory001mb.findOne({ _id: id }, function(err, subcategory001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting subcategory001mb',
                error: err
            });
        }

        if (!subcategory001mb) {
            return res.status(404).json({
                message: 'No such subcategory001mb'
            });
        }
        subcategory001mb.catcode = req.body.catcode ? req.body.catcode : subcategory001mb.catcode;
        subcategory001mb.subcatname = req.body.subcatname ? req.body.subcatname : subcategory001mb.subcatname;
        subcategory001mb.subcatstatus = req.body.subcatstatus ? req.body.subcatstatus : subcategory001mb.subcatstatus;
        subcategory001mb.status = req.body.status ? req.body.status : subcategory001mb.status;
        subcategory001mb.inserteduser = req.body.inserteduser ? req.body.inserteduser : subcategory001mb.inserteduser;
        subcategory001mb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : subcategory001mb.inserteddatetime;
        subcategory001mb.updateduser = req.body.updateduser ? req.body.updateduser : subcategory001mb.updateduser;
        subcategory001mb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : subcategory001mb.updateddatetime;
        subcategory001mb.save(function(err, subcategory001mb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating subcategory001mb.',
                    error: err
                });
            }

            return res.json(subcategory001mb);
        });
    });
};
export const remove = async(req, res) => {

    var id = req.params._id;

    Subcategory001mb.findByIdAndRemove(id, function(err, subcategory001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the subcategory001mb.',
                error: err
            });
        }

        return res.json({ message: 'Deleted Sucessfully' });
    });
};