import db from "../models/main.js";

const Status001mb = db.status001mb;

export const list = async(req, res) => {
    Status001mb.find(function(err, status001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting status001mb.',
                error: err
            });
        }

        return res.json(status001mb);
    });
};


export const show = async(req, res) => {
    var id = req.params.id;

    Status001mb.findOne({ _id: id }, function(err, status001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting status001mb.',
                error: err
            });
        }

        if (!status001mb) {
            return res.status(404).json({
                message: 'No such status001mb'
            });
        }

        return res.json(status001mb);
    });
};


export const create = async(req, res) => {    
    const status001mb = new Status001mb()
    
    status001mb.name = req.body.name;
    status001mb.inserteduser = req.body.inserteduser;
    status001mb.inserteddatetime = req.body.inserteddatetime;
    status001mb.updateduser = req.body.updateduser;
    status001mb.updateddatetime = req.body.updateddatetime;
    status001mb.save()
        .then((result) => {
                    return res.json({ message: 'categorydetails created!' });
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
};


export const update = async(req, res) => {
    
    var id = req.body._id;

    Status001mb.findOne({ _id: id }, function(err, status001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting status001mb',
                error: err
            });
        }

        if (!status001mb) {
            return res.status(404).json({
                message: 'No such status001mb'
            });
        }
        status001mb.name = req.body.name ? req.body.name : status001mb.name;
        status001mb.inserteduser = req.body.inserteduser ? req.body.inserteduser : status001mb.inserteduser;
        status001mb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : status001mb.inserteddatetime;
        status001mb.updateduser = req.body.updateduser ? req.body.updateduser : status001mb.updateduser;
        status001mb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : status001mb.updateddatetime;

        status001mb.save(function(err, status001mb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating status001mb.',
                    error: err
                });
            }

            return res.json(status001mb);
        });
    });
};
export const remove = async(req, res) => {
    
    var id = req.params._id;

    

    Status001mb.findByIdAndRemove(id, function(err, status001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the status001mb.',
                error: err
            });
        }

        return res.json({ message: 'Deleted Sucessfully' });
    });
};

