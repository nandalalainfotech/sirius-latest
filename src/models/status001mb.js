import mongoose from "mongoose";

mongoose.pluralize(null);
const status001mb = mongoose.model(
	"status001mb",
	new mongoose.Schema(
		{
			'name': String,
			'inserteduser': String,
			'inserteddatetime': String,
			'updateduser': String,
			'updateddatetime': String
		},
		{ timestamps: false }
	)
);
export default status001mb;

