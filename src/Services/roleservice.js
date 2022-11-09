import db from "../models/main.js";

const Role001mb = db.role001mb;

export const list = async(req, res) => {
    Role001mb.find(function(err, role001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting role001mb.',
                error: err
            });
        }

        return res.json(role001mb);
    });
};

export const show = async(req, res) => {
    var id = req.params.id;

    Role001mb.findOne({ _id: id }, function(err, role001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting role001mb.',
                error: err
            });
        }

        if (!role001mb) {
            return res.status(404).json({
                message: 'No such role001mb'
            });
        }

        return res.json(role001mb);
    });
};

export const create = (req, res) => {

    const role001mb = new Role001mb();
    
    role001mb.rlid = req.body.rlid;
    role001mb.rolename = req.body.rolename;
    role001mb.status = req.body.status;
    role001mb.inserteduser = req.body.inserteduser;
    role001mb.inserteddatetime = req.body.inserteddatetime;
    role001mb.updateduser = req.body.updateduser;
    role001mb.updateddatetime = req.body.updateddatetime;
    console.log("role001mb", role001mb);
    role001mb.save()
        .then((result) => {
                    return res.json({ message: 'categorydetails created!' });
        })
        .catch((error) => {
            return res.status(500).json({ error });
    });
};

export const update = async(req, res) => {


    var id = req.body._id;

    Role001mb.findOne({ _id: id }, function(err, role001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting role001mb',
                error: err
            });
        }

        if (!role001mb) {
            return res.status(404).json({
                message: 'No such role001mb'
            });
        }

        role001mb.rlid = req.body.rlid ? req.body.rlid : role001mb.rlid;
        role001mb.rolename = req.body.rolename ? req.body.rolename : role001mb.rolename;
        role001mb.status = req.body.status ? req.body.status : role001mb.status;
        role001mb.inserteduser = req.body.inserteduser ? req.body.inserteduser : role001mb.inserteduser;
        role001mb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : role001mb.inserteddatetime;
        role001mb.updateduser = req.body.updateduser ? req.body.updateduser : role001mb.updateduser;
        role001mb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : role001mb.updateddatetime;

        role001mb.save(function(err, role001mb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating role001mb.',
                    error: err
                });
            }

            return res.json(role001mb);
        });
    });
};


export const remove = async(req, res) => {

    var id = req.params._id;

    Role001mb.findByIdAndRemove(id, function(err, role001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the role001mb.',
                error: err
            });
        }

        return res.json({ message: 'Deleted Sucessfully' });
    });
};