import mongoose from "mongoose";

mongoose.pluralize(null);

const role001wb = mongoose.model(
    "role001mb",
    new mongoose.Schema({
        'rlid': String,
        'rolename': String,
        'status': String,
		'inserteduser': String,
		'inserteddatetime': String,
		'updateduser': String,
		'updateddatetime': String
    }, { timestamps: false })
);

export default role001wb;