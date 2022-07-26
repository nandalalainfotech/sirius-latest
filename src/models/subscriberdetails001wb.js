import mongoose from "mongoose";

mongoose.pluralize(null);

const subscriberdetails001wb = mongoose.model(
    "subscriberdetails001wb",
    new mongoose.Schema({
        'personid': {
            type: mongoose.Types.ObjectId,
            ref: 'person001mb'
        },
        'subpid': {
            type: mongoose.Types.ObjectId,
            ref: 'subscriptionmaster001mb'
        },
        'payid': {
            type: mongoose.Types.ObjectId,
            ref: 'payment001mb'
        },
        'contentid': {
            type: mongoose.Types.ObjectId,
            ref: 'contentmaster001mb'
        },
        'horoscope': String,
        'subscdesc': String,
        'status': String,
        'subscapproval': String,
        'approvedby': String,
        'approvedon': String,
        'inserteduser': String,
        'inserteddatetime': String,
        'updateddatetime': String,
        'updateduser': String,
    },
        { timestamps: false }));

export default subscriberdetails001wb;