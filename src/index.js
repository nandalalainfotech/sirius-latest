import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import db from "../src/models/main.js";
import countrycontroller from "../src/controllers/countrycontroller.js";
import categorydetailcontroller from "../src/controllers/categorydetailscontroller.js";
import companydetailscontroller from "../src/controllers/companydetailscontroller.js";
import contentmastercontroller from "../src/controllers/contentmastercontroller.js";
import languagecontroller from "../src/controllers/languagecontroller.js";
import regionaldetailscontroller from "../src/controllers/regionaldetailscontroller.js";
import religioncontroller from "../src/controllers/religioncontroller.js";
import subscribercontentcontroller from "../src/controllers/subscribercontentcontroller.js";
import statecontroller from "../src/controllers/statecontroller.js";
import statussettingcontroller from "../src/controllers/statussettingcontroller.js";
import subcatclassificationcontroller from "../src/controllers/subcatclassificationcontroller.js";
import subcategorycontroller from "../src/controllers/subcategorycontroller.js";
import subscribercontentauthcontroller from "../src/controllers/subscribercontentauthcontroller.js";
import subscriberpersonalinfocontroller from "../src/controllers/subscriberpersonalinfocontroller.js";
import subscriberprofessionalinfocontroller from "../src/controllers/subscriberprofessionalinfocontroller.js";
import subscriptionmastercontroller from "../src/controllers/subscriptionmastercontroller.js"
import usersamplecontroller from "../src/controllers/usersamplecontroller.js";
import reviewcontroller from "../src/controllers/reviewcontroller.js"
import photocontroller from "../src/controllers/photocontroller.js"
import videocontroller from "../src/controllers/videocontroller.js"
import userscontroller from "../src/controllers/userscontroller.js"
import rolecontroller from "../src/controllers/rolecontroller.js";
import subscriberdetailscontroller from "../src/controllers/subscriberdetailscontroller.js";
import citycontroller from "../src/controllers/citycontroller.js";
import audiocontroller from "../src/controllers/audiocontroller.js";
import personcontroller from "../src/controllers/personcontroller.js";
import logincontroller from "../src/controllers/logincontroller.js";
import swaggerUi from "swagger-ui-express";
import swaggerjsdoc from "swagger-jsdoc";
import paymentcontroller from "../src/controllers/paymentcontroller.js";
import verifyToken from "../src/middleware/auth.js";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rolebaseauth from "../src/middleware/roleauth.js";
import upload from "../src/middleware/upload.js";
import videoUpload from "../src/middleware/videoupload.js";
import audio from "../src/middleware/audio.js";
// import path from 'path';
const __dirname = path.resolve();

const app = express();


if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
// dotenv.config({ path: `${__dirname}/../env/.env.${process.env.NODE_ENV.trim()}` });


// app.get('/', (req, res) => {
//     res.sendFile('index.html', { root: `${__dirname}/public/dist/sirius` });
// });

// if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
// // dotenv.config({ path: `${__dirname}/../env/.env.${process.env.NODE_ENV.trim()}` });

// // this.middlewares();
// app.get('/', (req, res) => {
//     //   res.sendFile('index.html', { root: `${__dirname}/public/dist/omega` });
//     res.sendFile(path.resolve(path.dirname('./src/public/dist/sirius')));
// });
app.get('*', (req, res) => {
    res.sendFile(
        path.join(__dirname, './src/public/dist/sirius')
    );
});
app.use(
    express.static(path.join(__dirname, './src/public/dist/sirius'), {
        maxAge: '1y',
    })
);
// app.use(express.static(path.resolve(path.dirname('./src/public/dist/sirius'))));

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(`${__dirname}/public/dist/omega`));

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(path.dirname('./src/public/dist/sirius')));
// })


// const express = require('express'); nor needed
app.use(express.json());

// not needed
app.get('/', (req, res) => {
    res.send('Backend welcomes you');

    // res.sendFile(path.join(__dirname, 'public/src/index.html'));
});

// not needed
app.get('/', (req, res) => {
    res.send('Backend welcomes you');

    // res.sendFile(path.join(__dirname, 'public/src/index.html'));
});

// needed


app.use(cors());
dotenv.config();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS, HEAD")
    next();
});
app.use(bodyParser.json());

const Country001mb = db.country001mb;
const Categorydetails001mb = db.categorydetails001mb;
const Companydetails001mb = db.companydetails001mb;
const Contentmaster001mb = db.contentmaster001mb;
const Language001mb = db.language001mb;
const Regionaldetails001mb = db.regionaldetails001mb;
const Religion001mb = db.religion001mb;
const Subscriberdetails001wb = db.subscriberdetails001wb;
const State001mb = db.state001mb;
const Status001mb = db.status001mb;
const Subcatclassification001mb = db.subcatclassification001mb;
const Subcategory001mb = db.subcategory001mb;
const Subscribercontent001wb = db.subscribercontent001wb;
const Subscribercontentauth001wb = db.subscribercontentauth001wb;
const Subscriberpersonalinfo001wb = db.subscriberpersonalinfo001wb;
const Subscriberprofessionalinfo002wb = db.subscriberprofessionalinfo002wb;
const Subscriptionmaster001mb = db.subscriptionmaster001mb;
const Usersample001mb = db.usersample001mb;
const Review001mb = db.review001mb;
const Users001wb = db.users001wb;
const Photo001wb = db.photo001wb;
const Video001wb = db.video001wb;
const Role001mb = db.role001mb;
const City001mb = db.city001mb;
const Audio001wb = db.audio001wb;
const Person001mb = db.person001mb;
const Login001mb = db.login001mb;
const Payment001mb = db.payment001mb;

app.use(bodyParser.urlencoded({ extended: true }));

function initial() {

    Login001mb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Login001mb.insertMany([{
                'logintype': "mobile no ",
                'password': "xyz",
                'inserteduser': "raj",
                'inserteddatetime': 11 / 12 / 22,
                'updateddatetime': 11 / 12 / 22,
                'updateduser': "raj",

            },])
                .then(() => { })
                .catch((err) => console.log("error", err));
        }
    });
    Country001mb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Country001mb.insertMany([{
                'countryid': 123,
                'countryname': "palls",
                'countrydesc': "good",
                'status': "good",
                'inserteduser': "raj",
                'inserteddatetime': 11 / 12 / 22,
                'updateddatetime': 11 / 12 / 22,
                'updateduser': "raj",

            },])
                .then(() => { })
                .catch((err) => console.log("error", err));
        }
    });
    City001mb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            City001mb.insertMany([{
                'cityid': 123,
                'cityname': "xyz",
                'citydesc': "good",
                'status': "good",
                'inserteduser': "raj",
                'inserteddatetime': 11 / 12 / 22,
                'updateddatetime': 11 / 12 / 22,
                'updateduser': "raj",

            },])
                .then(() => { })
                .catch((err) => console.log("error", err));
        }
    });
    Categorydetails001mb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Categorydetails001mb.insertMany([{
                'catcode': "T867",
                'catname': "C22",
                'status': "GOOD",
                'inserteduser': "raj",
                'inserteddatetime': 11 / 12 / 2021,
                'updateduser': "raj",
                'updateddatetime': 11 / 12 / 2021
            }

            ])
                .then(() => { })
                .catch((err) => console.log("error", err));
        }
    });
    Companydetails001mb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Companydetails001mb.insertMany([{
                'companycode': "S33",
                'companyname': "XYZ",
                'address': "street",
                'phonenumber': 78778876,
                'regionalid': 98,
                'status': "good",
                'inserteduser': "raj",
                'inserteddatetime': 11 / 12 / 2021,
                'updateduser': "raj",
                'updateddatetime': 11 / 12 / 2021
            }

            ])
                .then(() => { })
                .catch((err) => console.log("error", err));
        }
    });
    Contentmaster001mb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Contentmaster001mb.insertMany([{
                'contentid': 6767,
                'name': "RAJ",
                'description': "good",
                'size': "222",
                'quality': "good",
                'format': "size",
                'status': "good",
                'discountflag': true,
                'inserteduser': "raj",
                'inserteddatetime': 11 / 12 / 2021,
                'updateduser': "raj",
                'updateddatetime': 11 / 12 / 2021
            }

            ])
                .then(() => { })
                .catch((err) => console.log("error", err));
        }
    });
    Language001mb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Language001mb.insertMany([{
                'languageid': 77,
                'languagename': "raj",
                'languagedesc': "ok",
                'status': "good",
                'inserteduser': "raj",
                'inserteddatetime': 11 / 12 / 2021,
                'updateduser': "raj",
                'updateddatetime': 11 / 12 / 2021
            }

            ])
                .then(() => { })
                .catch((err) => console.log("error", err));
        }
    });
    Regionaldetails001mb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Regionaldetails001mb.insertMany([{
                'regionalid': 544,
                'regionalname': "RAJ",
                'regionaldesc': "good",
                'status': "good",
                'inserteduser': "raj",
                'inserteddatetime': 11 / 12 / 2021,
                'updateduser': "raj",
                'updateddatetime': 11 / 12 / 2021
            }

            ])
                .then(() => { })
                .catch((err) => console.log("error", err));
        }
    });
    Religion001mb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Religion001mb.insertMany([{
                'regionalid': 666,
                'regionalname': "RAJ",
                'regionaldesc': "good",
                'status': "good",
                'inserteduser': "raj",
                'inserteddatetime': 11 / 12 / 2021,
                'updateduser': "raj",
                'updateddatetime': 11 / 12 / 2021
            }

            ])
                .then(() => { })
                .catch((err) => console.log("error", err));
        }
    });
    Subscriberdetails001wb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Subscriberdetails001wb.insertMany([{
                'regionalid': 434,
                'companycode': 3443,
                'catcode': 4343,
                'subcatcode': 4343,
                'categoryid': 4343,
                'subscid': 434,
                'subscname': "RAJ",
                '  classificationid': 898,
                'sex': "male",
                'subscdesc': "good",
                'aboutme': "good",
                'address': "street",
                'phoneno': 77787,
                'subscapproval': true,
                'approvedby': "raj",
                'approvedon': 11 / 12 / 2021,
                'subscsubspid': 786,
                'subscstatus': "good",
                'inserteduser': "raj",
                'inserteddatetime': 11 / 12 / 2021,
                'updateduser': "raj",
                'updateddatetime': 11 / 12 / 2021
            }

            ])
                .then(() => { })
                .catch((err) => console.log("error", err));
        }
    });
    State001mb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            State001mb.insertMany([{
                'stateid': 123,
                'statename': "sri",
                'statedesc': "good",
                'status': "active",
                'inserteduser': "aravindh",
                'inserteddatetime': 11 / 12 / 22,
                'updateduser': "sam",
                'updateddatetime': 9 / 12 / 22,
            }

            ])
                .then(() => {

                })
                .catch((err) => console.log("error", err));
        }
    });
    Subcatclassification001mb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Subcatclassification001mb.insertMany([{
                'catcode': "ab12",
                'subcatcode': "ab13",
                'classificationid': 1234,
                'classificationname': "dass",
                'status': "good",
                'inserteduser': "aravindh",
                'inserteddatetime': 11 / 12 / 22,
                'updateduser': "chandru",
                'updateddatetime': 6 / 12 / 22
            }

            ])
                .then(() => {

                })
                .catch((err) => console.log("error", err));
        }
    });
    Subcategory001mb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Subcategory001mb.insertMany([{
                'catcode': "a2b",
                'subcatcode': "s21",
                'subcatname': "sri",
                'subcatstatus': "active",
                'status': "good",
                'inserteduser': "aravind",
                'inserteddatetime': 11 / 12 / 22,
                'updateduser': "chandru",
                'updateddatetime': 9 / 12 / 22
            }

            ])
                .then(() => {

                })
                .catch((err) => console.log("error", err));
        }
    });
    Usersample001mb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Usersample001mb.insertMany([{
                'username': "Raj",
                'password': "****",
                'securityquestion': "xys",
                'securityanswer': "xys"

            }

            ])
                .then(() => {

                })
                .catch((err) => console.log("error", err));
        }
    });
    Review001mb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Review001mb.insertMany([{
                'comments': "good",
                'rating': "9",
                'status': "good"
            }])
                .then(() => {

                })
                .catch((err) => console.log("error", err));
        }
    });
    Subscribercontent001wb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Subscribercontent001wb.insertMany([{
                'subscid': 123,
                'subsccontentid1': 12,
                'subsccontentidattach1': 123,
                'subsccontentidappovalflag1': true,
                'subsccontentidattach2': 34,
                'subsccontentidappovalflag2': false,
                'subsccontentidattachn': 12,
                'subsccontentidappovalflagn': false,
                'inserteduser': "wedas",
                'inserteddatetime': 11 / 12 / 22,
                'updateduser': "fsdf",
                'updateddatetime': 8 / 12 / 22
            }

            ])
                .then(() => {

                })
                .catch((err) => console.log("error", err));
        }
    });
    Subscribercontentauth001wb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Subscribercontentauth001wb.insertMany([{
                'subscid': 123,
                'subscsubpid': 12,
                'subscsubpstatus': "good",
                'subscsubpstartdate': 1 / 12 / 22,
                'subscsupbenddate': 2 / 12 / 22,
                'inserteduser': "aravindh",
                'inserteddatetime': 3 / 12 / 22,
                'updateduser': "chandru",
                'updateddatetime': 4 / 12 / 22
            }

            ])
                .then(() => {

                })
                .catch((err) => console.log("error", err));
        }
    });
    Subscriberpersonalinfo001wb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Subscriberpersonalinfo001wb.insertMany([{
                'subcid': 12,
                'personaldetails': "my details?",
                'hobbies': "playing",
                'flex1': "flex1",
                'flex2': "flex2",
                'flex3': "flex3",
                'flex4': "flex4",
                'flex5': "flex5",
                'flex6': "flex6",
                'flex7': "flex7",
                'flex8': "flex8",
                'flex9': "flex9",
                'flex10': "flex10",
                'flex11': "flex11",
                'flex12': "flex12",
                'inserteduser': "aravindh",
                'inserteddatetime': 3 / 11 / 22,
                'updateduser': "chandru",
                'updateddatetime': 4 / 12 / 22
            }

            ])
                .then(() => {

                })
                .catch((err) => console.log("error", err));
        }
    });
    Subscriberprofessionalinfo002wb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Subscriberprofessionalinfo002wb.insertMany([{
                'subcid': 12,
                'professionaldetails': "hi",
                'job': "engineer",
                'flex1': "flex1",
                'flex2': "flex2",
                'flex3': "flex3",
                'flex4': "flex4",
                'flex5': "flex5",
                'flex6': "flex6",
                'flex7': "flex7",
                'flex8': "flex8",
                'flex9': "flex9",
                'flex10': "flex10",
                'flex11': "flex11",
                'flex12': "flex12",
                'inserteduser': "raj",
                'inserteddatetime': 3 / 11 / 22,
                'updateduser': "sri",
                'updateddatetime': 4 / 12 / 22
            }

            ])
                .then(() => {

                })
                .catch((err) => console.log("error", err));
        }
    });
    Video001wb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Video001wb.insertMany([{
                'category': "s222",
                'filename': "img.png",
                'originalfilename': "video",
                'status': "active",
                'content': "678667",
                'inserteduser': "raj",
                'inserteddatetime': 6 / 11 / 22,
                'updateduser': "raju",
                'updateddatetime': 7 / 11 / 22
            }

            ])
                .then(() => {

                })
                .catch((err) => console.log("error", err));
        }
    });
    Photo001wb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Photo001wb.insertMany([{
                'category': "s222",
                'filename': "img.png",
                'originalname': "photo",
                'content': "678667",
                'status': "active",
                'inserteduser': "raj",
                'inserteddatetime': 6 / 11 / 22,
                'updateduser': "raju",
                'updateddatetime': 7 / 11 / 22
            }

            ])
                .then(() => {

                })
                .catch((err) => console.log("error", err));
        }
    });
    Person001mb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Person001mb.insertMany([{
                'status': "active",
                'inserteduser': "raj",
                'inserteddatetime': 5 / 11 / 22,
                'updateduser': "raju",
                'updateddatetime': 12 / 11 / 22
            }

            ])
                .then(() => {

                })
                .catch((err) => console.log("error", err));
        }
    });
    Payment001mb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Payment001mb.insertMany([{
                'subpid': 7878,
                'payid': 88,
                'payment': "card",
                'status': "active",
                'inserteduser': "raj",
                'inserteddatetime': 5 / 11 / 22,
                'updateduser': "raju",
                'updateddatetime': 12 / 11 / 22
            }

            ])
                .then(() => {

                })
                .catch((err) => console.log("error", err));
        }
    });
    Users001wb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Users001wb.insertMany([{
                'firstname': "RAJ",
                'lasttname': "d",
                'zipcode': 1223243,
                'employeeid': 8778,
                'dob': 3 / 11 / 2000,
                'email': "xyz@gmail.com",
                'confirmemail': "xyz@gmail.com",
                'sex': "male",
                'address1': "xyz",
                'address2': "xyz",
                'address3': "xyz",
                'city': "chennai",
                'state': "tn",
                'country': "india",
                'mobile': 76886797974,
                'landline': 423321211,
                'status': "active",
                'inserteduser': "raj",
                'inserteddatetime': 5 / 11 / 22,
                'updateduser': "raju",
                'updateddatetime': 12 / 11 / 22
            }

            ])
                .then(() => {

                })
                .catch((err) => console.log("error", err));
        }
    });
    Subscriptionmaster001mb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Subscriptionmaster001mb.insertMany([{
                'subpid': 1212,
                'subpname': "sri",
                'description': "good",
                'tenure': "3 years",
                'amount': 23,
                'status': "active",
                'discountflag': true,
                'inserteduser': "aravindh",
                'inserteddatetime': 3 / 11 / 22,
                'updateduser': "selvam",
                'updateddatetime': 3 / 11 / 22
            }

            ])
                .then(() => {

                })
                .catch((err) => console.log("error", err));
        }
    });
    Role001mb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Role001mb.insertMany([{
                'rolename': "farmer",
                'status': "active",
                'discountflag': true,
                'inserteduser': "aravindh",
                'inserteddatetime': 3 / 11 / 22,
                'updateduser': "selvam",
                'updateddatetime': 3 / 11 / 22
            }])
                .then(() => { })
                .catch((err) => console.log("error", err));
        }
    });
    Audio001wb.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            Audio001wb.insertMany([{
                'category': "s222",
                'filename': "img.mp3",
                'originalfilename': "audio",
                'content': "678667",
                'status': "active",
                'inserteduser': "raj",
                'inserteddatetime': 6 / 11 / 22,
                'updateduser': "raju",
                'updateddatetime': 7 / 11 / 22
            }])
                .then(() => { })
                .catch((err) => console.log("error", err));
        }
    });
}

app.use("/api/logincontroller", logincontroller);
app.use("/api/countrycontroller", countrycontroller);
app.use("/api/categorydetailcontroller", categorydetailcontroller);
app.use("/api/companydetailscontroller", companydetailscontroller);
app.use("/api/contentmastercontroller", contentmastercontroller);
app.use("/api/languagecontroller", languagecontroller);
app.use("/api/regionaldetailscontroller", regionaldetailscontroller);
app.use("/api/religioncontroller", religioncontroller);
app.use("/api/statussettingcontroller", statussettingcontroller);
app.use("/api/statecontroller", statecontroller);
app.use("/api/subcatclassificationcontroller", subcatclassificationcontroller);
app.use("/api/subcategorycontroller", subcategorycontroller);
app.use("/api/subscribercontentauthcontroller", subscribercontentauthcontroller);
app.use("/api/subscribercontentcontroller", subscribercontentcontroller);
app.use("/api/subscriberpersonalinfocontroller", subscriberpersonalinfocontroller);
app.use("/api/subscriberprofessionalinfocontroller", subscriberprofessionalinfocontroller);
app.use("/api/subscriptionmastercontroller", subscriptionmastercontroller);
app.use("/api/usersamplecontroller", usersamplecontroller);
app.use("/api/reviewcontroller", reviewcontroller);
app.use("/api/userscontroller", userscontroller);
app.use("/api/photocontroller", photocontroller);
app.use("/api/videocontroller", videocontroller);
app.use("/api/rolecontroller", rolecontroller);
app.use("/api/subscriberdetailscontroller", subscriberdetailscontroller);
app.use("/api/citycontroller", citycontroller);
app.use("/api/audiocontroller", audiocontroller);
app.use("/api/personcontroller", personcontroller);
app.use("/api/paymentcontroller", paymentcontroller);
app.use("/api/verifyToken", verifyToken);

const PORT = process.env.PORT || 80;

db.mongoose
    .connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {

        console.log(`Successfully connect to MongoDB .`);
        if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

        // not need
        // dotenv.config({ path: `${__dirname}/../env/.env.${process.env.NODE_ENV.trim()}` });
        // this.app = express();
        // this.middlewares();

        // not need

        app.get('/', (req, res) => {
            res.sendFile('index.html', { root: path.resolve(path.dirname('./src/public/dist/sirius')) });
        });

        app.get('*', (req, res) => {
            res.sendFile(path.resolve(path.dirname('./src/public/dist/sirius')));
        })

        // initial();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    })
    .catch((err) => {
        console.error("Connection error", err);
        process.exit();
    });


//     console.log(`Successfully connect to MongoDB .`);
//     initial();
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}.`);
//     });
// })
// .catch((err) => {
//     console.error("Connection error", err);
//     process.exit();
// });




const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Sirius Matrimony API Generation',
            version: '1.0.0'
        },
        servers: [
            {
                url: "https://siriusmatrimony.herokuapp.com",
            },
        ],
        tags: [{
            name: " API Generation",
        }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer"
                },
            },
        },
    },
    apis: ['./src/index.js'],
};
const specs = swaggerjsdoc(options);
app.use('/index', swaggerUi.serve, swaggerUi.setup(specs));

// **********************role001mb schema method****************//
/** 
 * @swagger
 * components:
 *    schemas:
 *      rolemaster:
 *            type: object
 *            properties:
 *             rolename:
 *                 type: string       
 */
/**
 * @swagger
 * /api/role001mb:
 *   get:
 *     tags: [rolemaster]
 *     summary: Get Method
 *     description: Retrieve the list of data
 *     security:
 *       - bearerAuth: []    
 *     responses:
 *       200:
 *         description: Sucess
 *         content:
 *             application/json:
 *                       schema:
 *                           $ref: '#/components/schemas/rolemaster'
 */
app.get('/api/role001mb', (req, res) => {
    Role001mb.find(function (err, role001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting role001mb.',
                error: err
            });
        }

        return res.json(role001mb);
    });
});

/**
 * @swagger
 * /api/role001mb/{id}:
 *   get:
 *     tags: [rolemaster]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     securityDefinitions:
 *      authentication:
 *        type: apiKey
 *        name: Authorization
 *        in: header
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                           $ref: '#/components/schemas/rolemaster'
 */

app.get('/api/role001mb/:id', (req, res) => {
    var id = req.params.id;

    Role001mb.findOne({ _id: id }, function (err, role001mb) {
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
});

/**
 * @swagger
 * /api/role001mb/role:
 *   post:
 *    tags: [rolemaster]  
 *    summary: Post Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/rolemaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */

app.post('/api/role001mb/role', (req, res) => {

    const role001mb = new Role001mb();
    role001mb.rolename = req.body.rolename;
    role001mb.save(function (err, role001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when creating role001mb',
                error: err
            });
        }

        return res.status(201).json('role001mb Created!');
    });

})


/**
 * @swagger
 * /api/role001mb/{id}:
 *   put:
 *    tags: [rolemaster]
 *    summary: Put Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                         $ref: '#/components/schemas/rolemaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/rolemaster'
 */

app.put('/api/role001mb/:id', (req, res) => {
    var id = req.params.id;

    Role001mb.findOne({ _id: id }, function (err, role001mb) {
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
        role001mb.rolename = req.body.rolename ? req.body.rolename : role001mb.rolename;
        role001mb.save(function (err, role001mb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating role001mb.',
                    error: err
                });
            }

            return res.json(role001mb);
        });
    });
});



/**
 * @swagger
 * /api/role001mb/{id}:
 *   delete:
 *    tags: [rolemaster]
 *    summary: Delete Method
 *    description: Delete the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */
app.delete('/api/role001mb/:id', (req, res) => {
    var id = req.params.id;

    Role001mb.findByIdAndRemove(id, function (err, role001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the role001mb.',
                error: err
            });
        }

        return res.json({ message: 'Deleted Sucessfully' });
    });
});


// ********************** country schema method****************//
/** 
 * @swagger
 * components:
 *    schemas:
 *      countrymaster:
 *            type: object
 *            properties:
 *             countryname:
 *                 type: string  
 *             countrydesc:
 *                 type: string 
 *             status:
 *                 type: string
 *             inserteduser:
 *                 type: string
 *             inserteddatetime:
 *                 type: string
 *             updateduser:
 *                 type: string
 *             updateddatetime:
 *                 type: string
 *             stateid:
 *                type: array    
 */
// **********************get method****************//
/**
 * @swagger
 * /api/country001mb:
 *   get:
 *     tags: [countrymaster]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/countrymaster'
 */

app.get('/api/country001mb', (req, res) => {
    Country001mb.find(function (err, country001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting country001mb.',
                error: err
            });
        }
        return res.json(country001mb);
    });
});

/**
 * @swagger
 * /api/country001mb/{id}:
 *   get:
 *     tags: [countrymaster]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                           $ref: '#/components/schemas/countrymaster'
 */

app.get('/api/country001mb/:id', (req, res) => {
    var id = req.params.id;

    Country001mb.findOne({ _id: id }, function (err, country001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting country001mb.',
                error: err
            });
        }

        if (!country001mb) {
            return res.status(404).json({
                message: 'No such country001mb'
            });
        }

        return res.json(country001mb);
    });
});

/**
 * @swagger
 * /api/country001mb/country:
 *   post:
 *    tags: [countrymaster]  
 *    summary: Post Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/countrymaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */

app.post('/api/country001mb/country', (req, res) => {
    const country001mb = new Country001mb();
    country001mb.countryname = req.body.countryname;
    country001mb.countrydesc = req.body.countrydesc;
    country001mb.status = req.body.status;
    country001mb.inserteduser = req.body.inserteduser;
    country001mb.inserteddatetime = req.body.inserteddatetime;
    country001mb.updateddatetime = req.body.updateddatetime;
    country001mb.updateduser = req.body.updateduser;
    country001mb.save()
        .then((result) => {
            return res.json({ message: 'country created' });
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
})


/**
 * @swagger
 * /api/country001mb/{id}:
 *   put:
 *    tags: [countrymaster]
 *    summary: Put Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                         $ref: '#/components/schemas/countrymaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                            $ref: '#/components/schemas/countrymaster'
 */

app.put('/api/country001mb/:id', (req, res) => {
    var id = req.params.id;

    Country001mb.findOne({ _id: id }, function (err, country001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting country001mb',
                error: err
            });
        }

        if (!country001mb) {
            return res.status(404).json({
                message: 'No such country001mb'
            });
        }
        country001mb.countryname = req.body.countryname ? req.body.countryname : country001mb.countryname;
        country001mb.countrydesc = req.body.countrydesc ? req.body.countrydesc : country001mb.countrydesc;
        country001mb.status = req.body.status ? req.body.status : country001mb.status;
        country001mb.inserteduser = req.body.inserteduser ? req.body.inserteduser : country001mb.inserteduser;
        country001mb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : country001mb.inserteddatetime;
        country001mb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : country001mb.updateddatetime;
        country001mb.updateduser = req.body.updateduser ? req.body.updateduser : country001mb.updateduser;

        country001mb.save(function (err, country001mb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating country001mb.',
                    error: err
                });
            }

            return res.json(country001mb);
        });
    });
});



/**
 * @swagger
 * /api/country001mb/{id}:
 *   delete:
 *    tags: [countrymaster]
 *    summary: Delete Method
 *    description: Delete the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */
app.delete('/api/country001mb/:id', (req, res) => {
    var id = req.params.id;

    Country001mb.findByIdAndRemove(id, function (err, country001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the country001mb.',
                error: err
            });
        }

        return res.json({ message: 'Deleted Sucessfully' });
    });
});


// ********************** state schema method****************//
/** 
 * @swagger
 * components:
 *    schemas:
 *      statemaster:
 *            type: object
 *            properties:
 *             statename:
 *                 type: string  
 *             statedesc:
 *                 type: string 
 *             status:
 *                 type: string
 *             inserteduser:
 *                 type: string
 *             inserteddatetime:
 *                 type: string
 *             updateduser:
 *                 type: string
 *             updateddatetime:
 *                 type: string
 *             cityid:
 *                type: array 
 *             countryid:
 *                type: object
 *                properties:
 *                    id: 
 *                      type: string      
 */
// ********************** state001mb get method****************//
/**
 * @swagger
 * /api/state001mb:
 *   get:
 *     tags: [statemaster]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                           $ref: '#/components/schemas/statemaster'
 */

app.get('/api/state001mb', (req, res) => {
    State001mb.find(function (err, state001mbs) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting state001mb.',
                error: err
            });
        }

        return res.json(state001mbs);
    });
});

/**
 * @swagger
 * /api/state001mb/{id}:
 *   get:
 *     tags: [statemaster]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                           $ref: '#/components/schemas/statemaster'
 */

app.get('/api/state001mb/:id', (req, res) => {
    var id = req.params.id;

    State001mb.findOne({ _id: id }, function (err, state001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting state001mb.',
                error: err
            });
        }

        if (!state001mb) {
            return res.status(404).json({
                message: 'No such state001mb'
            });
        }

        return res.json(state001mb);
    });
});

/**
 * @swagger
 * /api/state001mb/state:
 *   post:
 *    tags: [statemaster]  
 *    summary: Post Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/statemaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */

app.post('/api/state001mb/state', (req, res) => {
    const state001mb = new State001mb();
    state001mb.countryid = req.body.countryid.id;
    state001mb.statename = req.body.statename;
    state001mb.statedesc = req.body.statedesc;
    state001mb.status = req.body.status;
    state001mb.inserteduser = req.body.inserteduser;
    state001mb.inserteddatetime = req.body.inserteddatetime;
    state001mb.updateduser = req.body.updateduser;
    state001mb.updateddatetime = req.body.updateddatetime;
    Country001mb.findOne({ _id: state001mb.countryid }, (err, user) => {
        if (user) {
            user.stateid.push(state001mb);
            user.save();
            state001mb.save()
            return res.json({ message: 'state created!' });
        } else {
            return res.status(500).json({
                message: 'Error when creating state001mb'
            });
        }
    });
})


/**
 * @swagger
 * /api/state001mb/{id}:
 *   put:
 *    tags: [statemaster]
 *    summary: Put Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                         $ref: '#/components/schemas/statemaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                           $ref: '#/components/schemas/statemaster'
 */

app.put('/api/state001mb/:id', (req, res) => {
    var id = req.params.id;

    State001mb.findOne({ _id: id }, function (err, state001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting state001mb',
                error: err
            });
        }

        if (!state001mb) {
            return res.status(404).json({
                message: 'No such state001mb'
            });
        }
        state001mb.countryid = req.body.countryid.id ? req.body.countryid.id : state001mb.countryid;
        state001mb.stateid = req.body.stateid ? req.body.stateid : state001mb.stateid;
        state001mb.statename = req.body.statename ? req.body.statename : state001mb.statename;
        state001mb.statedesc = req.body.statedesc ? req.body.statedesc : state001mb.statedesc;
        state001mb.status = req.body.status ? req.body.status : state001mb.status;
        state001mb.inserteduser = req.body.inserteduser ? req.body.inserteduser : state001mb.inserteduser;
        state001mb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : state001mb.inserteddatetime;
        state001mb.updateduser = req.body.updateduser ? req.body.updateduser : state001mb.updateduser;
        state001mb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : state001mb.updateddatetime;
        state001mb.save(function (err, state001mb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating state001mb.',
                    error: err
                });
            }

            return res.json(state001mb);
        });
    });
});



/**
 * @swagger
 * /api/state001mb/{id}:
 *   delete:
 *    tags: [statemaster]
 *    summary: Delete Method
 *    description: Delete the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */
app.delete('/api/state001mb/:id', (req, res) => {
    var id = req.params.id;

    State001mb.findByIdAndRemove(id, function (err, state001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the state001mb.',
                error: err
            });
        }

        return res.json({ message: 'Deleted Sucessfully' });
    });
});

// ********************** city schema method****************//
/** 
 * @swagger
 * components:
 *    schemas:
 *      citymaster:
 *            type: object
 *            properties:
 *             cityname:
 *                 type: string  
 *             citydesc:
 *                 type: string 
 *             status:
 *                 type: string
 *             inserteduser:
 *                 type: string
 *             inserteddatetime:
 *                 type: string
 *             updateduser:
 *                 type: string
 *             updateddatetime:
 *                 type: string
 *             stateid:
 *                type: object 
 *                properties:
 *                   id:
 *                    type: string    
 */


// ********************** city001mb get method****************//
/**
 * @swagger
 * /api/city001mb:
 *   get:
 *     tags: [citymaster]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/citymaster'
 */

app.get('/api/city001mb', (req, res) => {
    City001mb.find(function (err, city001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting city001mb.',
                error: err
            });
        }

        return res.json(city001mb);
    });
});

/**
 * @swagger
 * /api/city001mb/{id}:
 *   get:
 *     tags: [citymaster]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/citymaster'
 */

app.get('/api/city001mb/:id', (req, res) => {
    var id = req.params.id;

    City001mb.findOne({ _id: id }, function (err, city001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting city001mb.',
                error: err
            });
        }

        if (!city001mb) {
            return res.status(404).json({
                message: 'No such city001mb'
            });
        }

        return res.json(city001mb);
    });
});

/**
 * @swagger
 * /api/city001mb/city:
 *   post:
 *    tags: [citymaster]  
 *    summary: Post Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/citymaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */

app.post('/api/city001mb/city', (req, res) => {
    const city001mb = new City001mb();

    city001mb.stateid = req.body.stateid.id;
    city001mb.cityname = req.body.cityname;
    city001mb.citydesc = req.body.citydesc;
    city001mb.status = req.body.status;
    city001mb.inserteduser = req.body.inserteduser;
    city001mb.inserteddatetime = req.body.inserteddatetime;
    city001mb.updateddatetime = req.body.updateddatetime;
    city001mb.updateduser = req.body.updateduser;
    State001mb.findOne({ _id: city001mb.stateid }, (err, user) => {
        if (user) {
            user.cityid.push(city001mb);
            user.save();
            city001mb.save()
            return res.json({ message: 'city created!' });
        } else {
            return res.status(500).json({
                message: 'Error when creating state001mb'
            });
        }
    });
})


/**
 * @swagger
 * /api/city001mb/{id}:
 *   put:
 *    tags: [citymaster]
 *    summary: Put Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                         $ref: '#/components/schemas/citymaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                           $ref: '#/components/schemas/citymaster'
 */

app.put('/api/city001mb/:id', (req, res) => {
    var id = req.params.id;
    City001mb.findOne({ _id: id }, function (err, city001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting city001mb',
                error: err
            });
        }

        if (!city001mb) {
            return res.status(404).json({
                message: 'No such city001mb'
            });
        }
        city001mb.stateid = req.body.stateid.id ? req.body.stateid.id : city001mb.stateid;
        city001mb.cityname = req.body.cityname ? req.body.cityname : city001mb.cityname;
        city001mb.citydesc = req.body.citydesc ? req.body.citydesc : city001mb.citydesc;
        city001mb.status = req.body.status ? req.body.status : city001mb.status;
        city001mb.inserteduser = req.body.inserteduser ? req.body.inserteduser : city001mb.inserteduser;
        city001mb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : city001mb.inserteddatetime;
        city001mb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : city001mb.updateddatetime;
        city001mb.updateduser = req.body.updateduser ? req.body.updateduser : city001mb.updateduser;

        city001mb.save(function (err, country001mb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating country001mb.',
                    error: err
                });
            }

            return res.json(city001mb);
        });
    });
});



/**
 * @swagger
 * /api/city001mb/{id}:
 *   delete:
 *    tags: [citymaster]
 *    summary: Delete Method
 *    description: Delete the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */
app.delete('/api/city001mb/:id', (req, res) => {
    var id = req.params.id;

    City001mb.findByIdAndRemove(id, function (err, city001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the city001mb.',
                error: err
            });
        }

        return res.json({ message: 'Deleted Sucessfully' });
    });
});


// ********************** photo001wb schema method****************//
/** 
 * @swagger
 * components:
 *    schemas:
 *      photoworkbase:
 *            type: object
 *            properties:
 *             fieldname:
 *                type: string
 *                description: (value is retrieve from content.No need to add value here)
 *             filename:
 *                 type: string
 *                 description: (value is retrieve from content.No need to add value here) 
 *             originalname:
 *                 type: string
 *                 description: (value is retrieve from content.No need to add value here)
 *             content:
 *                 type: file
 *                 format: binary 
 *             status:
 *                 type: string
 *             inserteduser:
 *                 type: string
 *             inserteddatetime:
 *                 type: string
 *             updateduser:
 *                 type: string
 *             updateddatetime:
 *                 type: string
 *             contentid:
 *                type: string   
 *                format: uuid
 */
// ********************** photo001wb get method****************//
/**
 * @swagger
 * /api/photo001wb:
 *   get:
 *     tags: [photoworkbase]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/photoworkbase'
 */

app.get('/api/photo001wb', (req, res) => {
    Photo001wb.find({ id: req.params.id }, function (err, results) {
        if (err) {
            res.send(`error: ${err}`);
        } else {
            res.send(results);
        }
    });
});

/**
 * @swagger
 * /api/photo001wb/{id}:
 *   get:
 *     tags: [photoworkbase]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/photoworkbase'
 */

app.get('/api/photo001wb/:id', (req, res) => {
    var id = req.params.id;
    Photo001wb.findOne({ _id: id }, function (err, photo001wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting photo001wb.',
                error: err
            });
        }

        if (!photo001wb) {
            return res.status(404).json({
                message: 'No such photo001wb'
            });
        }

        return res.json(photo001wb);
    });
});

/**
 * @swagger
 * /api/photo001wb/photo:
 *   post:
 *    tags: [photoworkbase]  
 *    summary: Post Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *         required: true
 *         content:
 *             multipart/form-data:
 *                       schema:
 *                          $ref: '#/components/schemas/photoworkbase'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *           application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/photoworkbase'
 */

app.post('/api/photo001wb/photo', [upload.single("content")], (req, res) => {
    const photo001wb = new Photo001wb();
    // photo001wb.content = req.file.path;
    photo001wb.fieldname = req.file.fieldname;
    photo001wb.originalname = req.file.originalname;
    photo001wb.filename = req.file.filename;
    photo001wb.status = req.body.status;
    photo001wb.contentid = req.body.contentid;
    photo001wb.inserteduser = req.body.inserteduser;
    photo001wb.inserteddatetime = req.body.inserteddatetime;
    photo001wb.updateduser = req.body.updateduser;
    photo001wb.updateddatetime = req.body.updateddatetime;
    Contentmaster001mb.findOne({ _id: photo001wb.contentid }, (err, user) => {
        if (user) {
            user.photo.push(photo001wb);
            user.save();
            photo001wb.save()
            return res.json({ message: 'photo created!' });
        } else {
            return res.status(500).json({
                message: 'Error when creating photo001wb'
            });
        }
    });
})


/**
 * @swagger
 * /api/photo001wb/{id}:
 *   put:
 *    tags: [photoworkbase]
 *    summary: Put Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    requestBody:
 *         required: true
 *         content:
 *             multipart/form-data:
 *                       schema:
 *                         $ref: '#/components/schemas/photoworkbase'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/photoworkbase'
 */

app.put('/api/photo001wb/:id', [upload.single("content")], (req, res) => {
    var id = req.params.id;
    Photo001wb.findOne({ _id: id }, function (err, photo001wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting photo001wb',
                error: err
            });
        }
        if (!photo001wb) {
            return res.status(404).json({
                message: 'No such photo001wb'
            });
        }
        photo001wb.contentid = req.body.contentid ? req.body.contentid : photo001wb.contentid;
        // photo001wb.content = req.file.path ? req.file.path : photo001wb.content;
        photo001wb.fieldname = req.file.fieldname ? req.file.fieldname : photo001wb.fieldname;
        photo001wb.filename = req.file.filename ? req.file.filename : photo001wb.filename;
        photo001wb.originalname = req.file.originalname ? req.file.originalname : photo001wb.originalname;
        photo001wb.status = req.body.status ? req.body.status : photo001wb.status;
        photo001wb.inserteduser = req.body.inserteduser ? req.body.inserteduser : photo001wb.inserteduser;
        photo001wb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : photo001wb.inserteddatetime;
        photo001wb.updateduser = req.body.updateduser ? req.body.updateduser : photo001wb.updateduser;
        photo001wb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : photo001wb.updateddatetime;

        photo001wb.save(function (err, photo001wb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating photo001wb.',
                    error: err
                });
            }

            return res.json(photo001wb);
        });
    });
});

/**
 * @swagger
 * /api/photo001wb/{id}:
 *   delete:
 *    tags: [photoworkbase]
 *    summary: Delete Method
 *    description: Delete the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */
app.delete('/api/photo001wb/:id', (req, res) => {
    var id = req.params.id;
    Photo001wb.findByIdAndRemove(id, function (err, photo001wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the photo001wb.',
                error: err
            });
        }

        return res.json({ message: 'Deleted Sucessfully' });
    });
});



// ********************** video001wb schema method****************//
/** 
 * @swagger
 * components:
 *    schemas:
 *      videoworkbase:
 *            type: object
 *            properties:
 *             fieldname:
 *                type: string
 *                description: (value is retrieve from content.No need to add value here)
 *             filename:
 *                 type: string
 *                 description: (value is retrieve from content.No need to add value here)  
 *             originalname:
 *                 type: string
 *                 description: (value is retrieve from content.No need to add value here)
 *             content:
 *                 type: file
 *                 format: binary 
 *             status:
 *                 type: string
 *             inserteduser:
 *                 type: string
 *             inserteddatetime:
 *                 type: string
 *             updateduser:
 *                 type: string
 *             updateddatetime:
 *                 type: string
 *             contentid:
 *                type: string 
 *                format: uuid
 */
// ********************** video001wb get method****************//
/**
 * @swagger
 * /api/video001wb:
 *   get:
 *     tags: [videoworkbase]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                           $ref: '#/components/schemas/videoworkbase'
 */

app.get('/api/video001wb', (req, res) => {
    Video001wb.find(function (err, video001wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting video001wb.',
                error: err
            });
        }

        return res.json(video001wb);
    });
});

/**
 * @swagger
 * /api/video001wb/{id}:
 *   get:
 *     tags: [videoworkbase]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                            $ref: '#/components/schemas/videoworkbase'
 */

app.get('/api/video001wb/:id', (req, res) => {
    var id = req.params.id;
    Video001wb.findOne({ _id: id }, function (err, video001wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting video001wb.',
                error: err
            });
        }

        if (!video001wb) {
            return res.status(404).json({
                message: 'No such video001wb'
            });
        }

        return res.json(video001wb);
    });
});

/**
 * @swagger
 * /api/video001wb/video:
 *   post:
 *    tags: [videoworkbase]  
 *    summary: Post Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *         required: true
 *         content:
 *             multipart/form-data:
 *                       schema:
 *                          $ref: '#/components/schemas/videoworkbase'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/videoworkbase'
 */

app.post('/api/video001wb/video', [videoUpload.single("content")], (req, res) => {
    const video001wb = new Video001wb();
    // video001wb.flag = req.body.flag;
    // video001wb.fileid = req.body.fileid;
    video001wb.contentid = req.body.contentid;
    // video001wb.content = req.file.path;
    video001wb.fieldname = req.file.fieldname;
    video001wb.originalname = req.file.originalname;
    video001wb.filename = req.file.filename;
    video001wb.status = req.body.status;
    video001wb.inserteduser = req.body.inserteduser;
    video001wb.inserteddatetime = req.body.inserteddatetime;
    video001wb.updateduser = req.body.updateduser;
    video001wb.updateddatetime = req.body.updateddatetime;
    Contentmaster001mb.findOne({ _id: video001wb.contentid }, (err, user) => {
        if (user) {
            user.video.push(video001wb);
            user.save();
            video001wb.save()
            return res.json({ message: 'Video created!' });
        } else {
            return res.status(500).json({
                message: 'Error when creating video001wb'
            });
        }
    });
})


/**
 * @swagger
 * /api/video001wb/{id}:
 *   put:
 *    tags: [videoworkbase]
 *    summary: Put Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    requestBody:
 *         required: true
 *         content:
 *             multipart/form-data:
 *                       schema:
 *                         $ref: '#/components/schemas/videoworkbase'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/videoworkbase'
 */

app.put('/api/video001wb/:id', [videoUpload.single("content")], (req, res) => {
    var id = req.params.id;

    Video001wb.findOne({ _id: id }, function (err, video001wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting video001wb',
                error: err
            });
        }

        if (!video001wb) {
            return res.status(404).json({
                message: 'No such video001wb'
            });
        }

        video001wb.contentid = req.body.contentid ? req.body.contentid : video001wb.contentid;
        video001wb.fieldname = req.file.fieldname ? req.file.fieldname : video001wb.fieldname;
        video001wb.filename = req.file.filename ? req.file.filename : video001wb.filename;
        video001wb.originalname = req.file.originalname ? req.file.originalname : video001wb.originalname;
        video001wb.status = req.body.status ? req.body.status : video001wb.status;
        // video001wb.content = req.file.path ? req.file.path : video001wb.content;
        video001wb.inserteduser = req.body.inserteduser ? req.body.inserteduser : video001wb.inserteduser;
        video001wb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : video001wb.inserteddatetime;
        video001wb.updateduser = req.body.updateduser ? req.body.updateduser : video001wb.updateduser;
        video001wb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : video001wb.updateddatetime;

        video001wb.save(function (err, video001wb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating video001wb.',
                    error: err
                });
            }

            return res.json(video001wb);
        });
    });
});


/**
 * @swagger
 * /api/video001wb/{id}:
 *   delete:
 *    tags: [videoworkbase]
 *    summary: Delete Method
 *    description: Delete the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */
app.delete('/api/video001wb/:id', (req, res) => {
    var id = req.params.id;
    Video001wb.findByIdAndRemove(id, function (err, video001wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the video001wb.',
                error: err
            });
        }

        return res.json({ message: 'Deleted Sucessfully' });
    });
});


// ********************** audio001wb schema method****************//
/** 
 * @swagger
 * components:
 *    schemas:
 *      audioworkbase:
 *            type: object
 *            properties:
 *             fieldname:
 *                type: string
 *                description: (value is retrieve from content.No need to add value here)
 *             filename:
 *                 type: string  
 *                 description: (value is retrieve from content.No need to add value here)
 *             originalname:
 *                 type: string
 *                 description: (value is retrieve from content.No need to add value here)
 *             content:
 *                 type: file
 *                 format: binary 
 *             status:
 *                 type: string
 *             inserteduser:
 *                 type: string
 *             inserteddatetime:
 *                 type: string
 *             updateduser:
 *                 type: string
 *             updateddatetime:
 *                 type: string
 *             contentid:
 *                type: string 
 *                format: uuid
 */
// ********************** audio001wb get method****************//
/**
 * @swagger
 * /api/audio001wb:
 *   get:
 *     tags: [audioworkbase]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                            $ref: '#/components/schemas/audioworkbase'
 */

app.get('/api/audio001wb', (req, res) => {
    Audio001wb.find(function (err, audio001wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting audio001wb.',
                error: err
            });
        }

        return res.json(audio001wb);
    });
});

/**
 * @swagger
 * /api/audio001wb/{id}:
 *   get:
 *     tags: [audioworkbase]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                           $ref: '#/components/schemas/audioworkbase'
 */

app.get('/api/audio001wb/:id', (req, res) => {
    var id = req.params.id;
    Audio001wb.findOne({ _id: id }, function (err, audio001wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting audio001wb.',
                error: err
            });
        }

        if (!audio001wb) {
            return res.status(404).json({
                message: 'No such audio001wb'
            });
        }

        return res.json(audio001wb);
    });
});

/**
 * @swagger
 * /api/audio001wb/audio:
 *   post:
 *    tags: [audioworkbase]  
 *    summary: Post Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *         required: true
 *         content:
 *             multipart/form-data:
 *                       schema:
 *                          $ref: '#/components/schemas/audioworkbase'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/audioworkbase'
 */

app.post('/api/audio001wb/audio', [audio.single("content")], (req, res) => {
    const audio001wb = new Audio001wb();
    audio001wb.flag = req.body.flag;
    // audio001wb.content = req.file.path;
    audio001wb.fileid = req.body.fileid;
    audio001wb.fieldname = req.file.fieldname;
    audio001wb.fieldname = req.file.fieldname;
    audio001wb.originalname = req.file.originalname;
    audio001wb.filename = req.file.filename;
    audio001wb.status = req.body.status;
    audio001wb.contentid = req.body.contentid;
    audio001wb.inserteduser = req.body.inserteduser;
    audio001wb.inserteddatetime = req.body.inserteddatetime;
    audio001wb.updateduser = req.body.updateduser;
    audio001wb.updateddatetime = req.body.updateddatetime;
    Contentmaster001mb.findOne({ _id: audio001wb.contentid }, (err, user) => {
        if (user) {
            user.audio.push(audio001wb);
            user.save();
            audio001wb.save();
            return res.json({ message: 'Audio created!' });
        } else {
            return res.status(500).json({
                message: 'Error when creating audio001wb'
            });
        }
    });
})

/**
 * @swagger
 * /api/audio001wb/{id}:
 *   put:
 *    tags: [audioworkbase]
 *    summary: Put Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    requestBody:
 *         required: true
 *         content:
 *             multipart/form-data:
 *                       schema:
 *                         $ref: '#/components/schemas/audioworkbase'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                            $ref: '#/components/schemas/audioworkbase'
 */

app.put('/api/audio001wb/:id', [audio.single("content")], (req, res) => {
    var id = req.params.id;

    Audio001wb.findOne({ _id: id }, function (err, audio001wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting audio001wb',
                error: err
            });
        }

        if (!audio001wb) {
            return res.status(404).json({
                message: 'No such audio001wb'
            });
        }
        audio001wb.flag = req.body.flag;
        audio001wb.contentid = req.body.contentid ? req.body.contentid : audio001wb.contentid;
        audio001wb.fileid = req.body.fileid ? req.body.fileid : audio001wb.fileid;
        audio001wb.fieldname = req.file.fieldname ? req.file.fieldname : audio001wb.fieldname;
        audio001wb.filename = req.file.filename ? req.file.filename : audio001wb.filename;
        audio001wb.originalname = req.file.originalname ? req.file.originalname : audio001wb.originalname;
        audio001wb.status = req.body.status ? req.body.status : audio001wb.status;
        // audio001wb.content = req.file.path ? req.file.path : audio001wb.content;
        audio001wb.inserteduser = req.body.inserteduser ? req.body.inserteduser : audio001wb.inserteduser;
        audio001wb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : audio001wb.inserteddatetime;
        audio001wb.updateduser = req.body.updateduser ? req.body.updateduser : audio001wb.updateduser;
        audio001wb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : audio001wb.updateddatetime;

        audio001wb.save(function (err, audio001wb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating audio001wb.',
                    error: err
                });
            }

            return res.json(audio001wb);
        });
    });
});
/**
 * @swagger
 * /api/audio001wb/{id}:
 *   delete:
 *    tags: [audioworkbase]
 *    summary: Delete Method
 *    description: Delete the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */
app.delete('/api/audio001wb/:id', (req, res) => {
    var id = req.params.id;
    Audio001wb.findByIdAndRemove(id, function (err, audio001wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the audio001wb.',
                error: err
            });
        }

        return res.json({ message: 'Deleted Sucessfully' });
    });
});



// ********************** contentmaster001mb schema method****************//
/** 
 * @swagger
 * components:
 *    schemas:
 *      contentmaster:
 *            type: object
 *            properties:
 *             name:
 *                 type: string  
 *             description:
 *                 type: string
 *             size:
 *                 type: string 
 *             quality:
 *                 type: string
 *             format:
 *                 type: string
 *             discountflag:
 *                 type: boolean
 *             status:
 *                 type: string
 *             inserteduser:
 *                 type: string
 *             inserteddatetime:
 *                 type: string
 *             updateduser:
 *                 type: string
 *             updateddatetime:
 *                 type: string
 *             subid:
 *                type: object 
 *                properties:
 *                   id:
 *                    type: string   
 *             audio:
 *                type: array 
 *             video:
 *                type: array 
 *             photo:
 *                type: array 
 */


// ********************** contentmaster001mb get method****************//
/**
 * @swagger
 * /api/contentmaster001mb:
 *   get:
 *     tags: [contentmaster]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                            $ref: '#/components/schemas/contentmaster'
 */

app.get('/api/contentmaster001mb', (req, res) => {
    Contentmaster001mb.find(function (err, contentmaster001mbs) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting contentmaster001mb.',
                error: err
            });
        }

        return res.json(contentmaster001mbs);
    });
});

/**
 * @swagger
 * /api/contentmaster001mb/{id}:
 *   get:
 *     tags: [contentmaster]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                            $ref: '#/components/schemas/contentmaster'
 */

app.get('/api/contentmaster001mb/:id', (req, res) => {
    var id = req.params.id;

    Contentmaster001mb.findOne({ _id: id }, function (err, contentmaster001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting contentmaster001mb.',
                error: err
            });
        }

        if (!contentmaster001mb) {
            return res.status(404).json({
                message: 'No such contentmaster001mb'
            });
        }

        return res.json(contentmaster001mb);
    });
});

/**
 * @swagger
 * /api/contentmaster001mb/master:
 *   post:
 *    tags: [contentmaster]  
 *    summary: Post Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/contentmaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */

app.post('/api/contentmaster001mb/master', (req, res) => {
    const contentmaster001mb = new Contentmaster001mb();
    contentmaster001mb.name = req.body.name;
    contentmaster001mb.description = req.body.description;
    contentmaster001mb.size = req.body.size;
    contentmaster001mb.quality = req.body.quality;
    contentmaster001mb.format = req.body.format;
    contentmaster001mb.status = req.body.status;
    contentmaster001mb.discountflag = req.body.discountflag;
    contentmaster001mb.inserteduser = req.body.inserteduser;
    contentmaster001mb.inserteddatetime = req.body.inserteddatetime;
    contentmaster001mb.updateduser = req.body.updateduser;
    contentmaster001mb.updateddatetime = req.body.updateddatetime;
    contentmaster001mb.subid = req.body.subid.id;
    contentmaster001mb.save(function (err, contentmaster001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when creating contentmaster001mb',
                error: err
            });
        }
        return res.status(201).json('Contentmaster001mb Created! ');
    });
})


/**
 * @swagger
 * /api/contentmaster001mb/{id}:
 *   put:
 *    tags: [contentmaster]
 *    summary: Put Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                         $ref: '#/components/schemas/contentmaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                            $ref: '#/components/schemas/contentmaster'
 */

app.put('/api/contentmaster001mb/:id', (req, res) => {
    var id = req.params.id;

    Contentmaster001mb.findOne({ _id: id }, function (err, contentmaster001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting contentmaster001mb',
                error: err
            });
        }

        if (!contentmaster001mb) {
            return res.status(404).json({
                message: 'No such contentmaster001mb'
            });
        }

        contentmaster001mb.subid = req.body.subid.id ? req.body.subid.id : contentmaster001mb.subid;
        contentmaster001mb.name = req.body.name ? req.body.name : contentmaster001mb.name;
        contentmaster001mb.description = req.body.description ? req.body.description : contentmaster001mb.description;
        contentmaster001mb.size = req.body.size ? req.body.size : contentmaster001mb.size;
        contentmaster001mb.quality = req.body.quality ? req.body.quality : contentmaster001mb.quality;
        contentmaster001mb.format = req.body.format ? req.body.format : contentmaster001mb.format;
        contentmaster001mb.status = req.body.status ? req.body.status : contentmaster001mb.status;
        contentmaster001mb.discountflag = req.body.discountflag ? req.body.discountflag : contentmaster001mb.discountflag;
        contentmaster001mb.inserteduser = req.body.inserteduser ? req.body.inserteduser : contentmaster001mb.inserteduser;
        contentmaster001mb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : contentmaster001mb.inserteddatetime;
        contentmaster001mb.updateduser = req.body.updateduser ? req.body.updateduser : contentmaster001mb.updateduser;
        contentmaster001mb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : contentmaster001mb.updateddatetime;

        contentmaster001mb.save(function (err, contentmaster001mb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating contentmaster001mb.',
                    error: err
                });
            }

            return res.json(contentmaster001mb);
        });
    });
});
/**
 * @swagger
 * /api/contentmaster001mb/{id}:
 *   delete:
 *    tags: [contentmaster]
 *    summary: Delete Method
 *    description: Delete the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */
app.delete('/api/contentmaster001mb/:id', (req, res) => {
    var id = req.params.id;

    Contentmaster001mb.findByIdAndRemove(id, function (err, contentmaster001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the contentmaster001mb.',
                error: err
            });
        }

        return res.json({ message: 'Deleted Sucessfully' });
    });
});



// ********************** categorydetails001mb schema method****************//
/** 
 * @swagger
 * components:
 *    schemas:
 *      categorydetailsmaster:
 *            type: object
 *            properties:
 *             catname:
 *                 type: string  
 *             status:
 *                 type: string
 *             inserteduser:
 *                 type: string
 *             inserteddatetime:
 *                 type: string
 *             updateduser:
 *                 type: string
 *             updateddatetime:
 *                 type: string   
 */
// ********************** categorydetails001mb get method****************//
/**
 * @swagger
 * /api/categorydetails001mb:
 *   get:
 *     tags: [categorydetailsmaster]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/categorydetailsmaster'
 */

app.get('/api/categorydetails001mb', (req, res) => {
    Categorydetails001mb.find(function (err, categorydetails001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting categorydetails001mb.',
                error: err
            });
        }

        return res.json(categorydetails001mb);
    });
});

/**
 * @swagger
 * /api/categorydetails001mb/{id}:
 *   get:
 *     tags: [categorydetailsmaster]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                            $ref: '#/components/schemas/categorydetailsmaster'
 */

app.get('/api/categorydetails001mb/:id', (req, res) => {
    var id = req.params.id;

    Categorydetails001mb.findOne({ _id: id }, function (err, categorydetails001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting categorydetails001mb.',
                error: err
            });
        }

        if (!categorydetails001mb) {
            return res.status(404).json({
                message: 'No such categorydetails001mb'
            });
        }

        return res.json(categorydetails001mb);
    });
});

/**
 * @swagger
 * /api/categorydetails001mb/category:
 *   post:
 *    tags: [categorydetailsmaster]  
 *    summary: Post Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/categorydetailsmaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */

app.post('/api/categorydetails001mb/category', (req, res) => {
    const categorydetails001mb = new Categorydetails001mb()
    categorydetails001mb.catname = req.body.catname;
    categorydetails001mb.status = req.body.status;
    categorydetails001mb.inserteduser = req.body.inserteduser;
    categorydetails001mb.inserteddatetime = req.body.inserteddatetime;
    categorydetails001mb.updateduser = req.body.updateduser;
    categorydetails001mb.updateddatetime = req.body.updateddatetime;
    categorydetails001mb.save()
        .then((result) => {
            return res.json({ message: 'categorydetails created!' });
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
})


/**
 * @swagger
 * /api/categorydetails001mb/{id}:
 *   put:
 *    tags: [categorydetailsmaster]
 *    summary: Put Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                         $ref: '#/components/schemas/categorydetailsmaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/categorydetailsmaster'
 */

app.put('/api/categorydetails001mb/:id', (req, res) => {
    var id = req.params.id;
    Categorydetails001mb.findOne({ _id: id }, function (err, categorydetails001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting categorydetails001mb',
                error: err
            });
        }

        if (!categorydetails001mb) {
            return res.status(404).json({
                message: 'No such categorydetails001mb'
            });
        }
        categorydetails001mb.catname = req.body.catname ? req.body.catname : categorydetails001mb.catname;
        categorydetails001mb.status = req.body.status ? req.body.status : categorydetails001mb.status;
        categorydetails001mb.inserteduser = req.body.inserteduser ? req.body.inserteduser : categorydetails001mb.inserteduser;
        categorydetails001mb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : categorydetails001mb.inserteddatetime;
        categorydetails001mb.updateduser = req.body.updateduser ? req.body.updateduser : categorydetails001mb.updateduser;
        categorydetails001mb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : categorydetails001mb.updateddatetime;

        categorydetails001mb.save(function (err, categorydetails001mb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating categorydetails001mb.',
                    error: err
                });
            }

            return res.json(categorydetails001mb);
        });
    });
});
/**
 * @swagger
 * /api/categorydetails001mb/{id}:
 *   delete:
 *    tags: [categorydetailsmaster]
 *    summary: Delete Method
 *    description: Delete the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */
app.delete('/api/categorydetails001mb/:id', (req, res) => {
    var id = req.params.id;

    Categorydetails001mb.findByIdAndRemove(id, function (err, categorydetails001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the categorydetails001mb.',
                error: err
            });
        }

        return res.json({ message: 'Deleted Sucessfully' });
    });
});

// ********************** companydetails001mb schema method****************//
/** 
 * @swagger
 * components:
 *    schemas:
 *      companydetailsmaster:
 *            type: object
 *            properties:
 *             companyname:
 *                 type: string  
 *             phonenumber:
 *                type: number  
 *             address:
 *                 type: string   
 *             status:
 *                 type: string
 *             inserteduser:
 *                 type: string
 *             inserteddatetime:
 *                 type: string
 *             updateduser:
 *                 type: string
 *             updateddatetime:
 *                 type: string
 *             regionalid:
 *                type: object
 *                properties:
 *                    id: 
 *                      type: string      
 */
// ********************** companydetails001mb get method****************//
/**
 * @swagger
 * /api/companydetails001mb:
 *   get:
 *     tags: [companydetailsmaster]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/companydetailsmaster'
 */

app.get('/api/companydetails001mb', (req, res) => {
    Companydetails001mb.find(function (err, companydetails001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting companydetails001mb.',
                error: err
            });
        }

        return res.json(companydetails001mb);
    });
});

/**
 * @swagger
 * /api/companydetails001mb/{id}:
 *   get:
 *     tags: [companydetailsmaster]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                           $ref: '#/components/schemas/companydetailsmaster'
 */

app.get('/api/companydetails001mb/:id', (req, res) => {
    var id = req.params.id;
    Companydetails001mb.findOne({ _id: id }, function (err, companydetails001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting companydetails001mb.',
                error: err
            });
        }

        if (!companydetails001mb) {
            return res.status(404).json({
                message: 'No such companydetails001mb'
            });
        }

        return res.json(companydetails001mb);
    });
});

/**
 * @swagger
 * /api/companydetails001mb/company:
 *   post:
 *    tags: [companydetailsmaster]  
 *    summary: Post Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/companydetailsmaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */

app.post('/api/companydetails001mb/company', (req, res) => {
    const companydetails001mb = new Companydetails001mb();
    companydetails001mb.regionalid = req.body.regionalid.id;
    companydetails001mb.companyname = req.body.companyname;
    companydetails001mb.address = req.body.address;
    companydetails001mb.phonenumber = req.body.phonenumber;
    companydetails001mb.status = req.body.status;
    companydetails001mb.inserteduser = req.body.inserteduser;
    companydetails001mb.inserteddatetime = req.body.inserteddatetime;
    companydetails001mb.updateduser = req.body.updateduser;
    companydetails001mb.updateddatetime = req.body.updateddatetime;
    companydetails001mb.save()
        .then((result) => {
            return res.json({ message: 'companydetails created!' });
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
})
/**
 * @swagger
 * /api/companydetails001mb/{id}:
 *   put:
 *    tags: [companydetailsmaster]
 *    summary: Put Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                         $ref: '#/components/schemas/companydetailsmaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/companydetailsmaster'
 */

app.put('/api/companydetails001mb/:id', (req, res) => {
    var id = req.params.id;

    Companydetails001mb.findOne({ _id: id }, function (err, companydetails001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting companydetails001mb',
                error: err
            });
        }

        if (!companydetails001mb) {
            return res.status(404).json({
                message: 'No such companydetails001mb'
            });
        }
        companydetails001mb.companyname = req.body.companyname ? req.body.companyname : companydetails001mb.companyname;
        companydetails001mb.address = req.body.address ? req.body.address : companydetails001mb.address;
        companydetails001mb.phonenumber = req.body.phonenumber ? req.body.phonenumber : companydetails001mb.phonenumber;
        companydetails001mb.regionalid = req.body.regionalid.id ? req.body.regionalid.id : companydetails001mb.regionalid;
        companydetails001mb.status = req.body.status ? req.body.status : companydetails001mb.status;
        companydetails001mb.inserteduser = req.body.inserteduser ? req.body.inserteduser : companydetails001mb.inserteduser;
        companydetails001mb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : companydetails001mb.inserteddatetime;
        companydetails001mb.updateduser = req.body.updateduser ? req.body.updateduser : companydetails001mb.updateduser;
        companydetails001mb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : companydetails001mb.updateddatetime;
        companydetails001mb.save(function (err, companydetails001mb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating companydetails001mb.',
                    error: err
                });
            }

            return res.json(companydetails001mb);
        });
    });
});
/**
 * @swagger
 * /api/companydetails001mb/{id}:
 *   delete:
 *    tags: [companydetailsmaster]
 *    summary: Delete Method
 *    description: Delete the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */
app.delete('/api/companydetails001mb/:id', (req, res) => {
    var id = req.params.id;
    Companydetails001mb.findByIdAndRemove(id, function (err, companydetails001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the companydetails001mb.',
                error: err
            });
        }

        return res.json({ message: 'Deleted Sucessfully' });
    });
});

// ********************** language001mb schema method****************//
/** 
 * @swagger
 * components:
 *    schemas:
 *      languagemaster:
 *            type: object
 *            properties:
 *             languagename:
 *                 type: string
 *             languagedesc:
 *                 type: string      
 *             status:
 *                 type: string
 *             inserteduser:
 *                 type: string
 *             inserteddatetime:
 *                 type: string
 *             updateduser:
 *                 type: string
 *             updateddatetime:
 *                 type: string   
 */

// ********************** language001mb get method****************//
/**
 * @swagger
 * /api/language001mb:
 *   get:
 *     tags: [languagemaster]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/languagemaster'
 */

app.get('/api/language001mb', (req, res) => {
    Language001mb.find(function (err, language001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting language001mb.',
                error: err
            });
        }

        return res.json(language001mb);
    });
});

/**
 * @swagger
 * /api/language001mb/{id}:
 *   get:
 *     tags: [languagemaster]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/languagemaster'
 */

app.get('/api/language001mb/:id', (req, res) => {
    var id = req.params.id;

    Language001mb.findOne({ _id: id }, function (err, language001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting language001mb.',
                error: err
            });
        }

        if (!language001mb) {
            return res.status(404).json({
                message: 'No such language001mb'
            });
        }

        return res.json(language001mb);
    });
});

/**
 * @swagger
 * /api/language001mb/language:
 *   post:
 *    tags: [languagemaster]  
 *    security:
 *        - bearerAuth: []
 *    summary: Post Method
 *    description: Retrieve the list of data
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/languagemaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */

app.post('/api/language001mb/language', verifyToken, rolebaseauth(["admin","superadmin"]), (req, res) => {
    const language001mb = new Language001mb()
    language001mb.languagename = req.body.languagename;
    language001mb.languagedesc = req.body.languagedesc;
    language001mb.status = req.body.status;
    language001mb.inserteduser = req.body.inserteduser;
    language001mb.inserteddatetime = req.body.inserteddatetime;
    language001mb.updateduser = req.body.updateduser;
    language001mb.updateddatetime = req.body.updateddatetime;

    language001mb.save()
        .then((result) => {
            return res.json({ message: 'language created!' });
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
})
/**
 * @swagger
 * /api/language001mb/{id}:
 *   put:
 *    tags: [languagemaster]
 *    summary: Put Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                         $ref: '#/components/schemas/languagemaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/languagemaster'
 */

app.put('/api/language001mb/:id', (req, res) => {
    var id = req.params.id;

    Language001mb.findOne({ _id: id }, function (err, language001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting language001mb',
                error: err
            });
        }
        if (!language001mb) {
            return res.status(404).json({
                message: 'No such language001mb'
            });
        }
        language001mb.languagename = req.body.languagename ? req.body.languagename : language001mb.languagename;
        language001mb.languagedesc = req.body.languagedesc ? req.body.languagedesc : language001mb.languagedesc;
        language001mb.status = req.body.status ? req.body.status : language001mb.status;
        language001mb.inserteduser = req.body.inserteduser ? req.body.inserteduser : language001mb.inserteduser;
        language001mb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : language001mb.inserteddatetime;
        language001mb.updateduser = req.body.updateduser ? req.body.updateduser : language001mb.updateduser;
        language001mb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : language001mb.updateddatetime;
        language001mb.save(function (err, language001mb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating language001mb.',
                    error: err
                });
            }

            return res.json(language001mb);
        });
    });
});
/**
 * @swagger
 * /api/language001mb/{id}:
 *   delete:
 *    tags: [languagemaster]
 *    summary: Delete Method
 *    description: Delete the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */
app.delete('/api/language001mb/:id', (req, res) => {
    var id = req.params.id;

    Language001mb.findByIdAndRemove(id, function (err, language001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the language001mb.',
                error: err
            });
        }

        return res.json({ message: 'Deleted Sucessfully' });
    });
});




// ********************** regionaldetails001mb schema method****************//
/** 
 * @swagger
 * components:
 *    schemas:
 *      regionaldetailsmaster:
 *            type: object
 *            properties:
 *             regionalname:
 *                 type: string
 *             regionaldesc:
 *                 type: string      
 *             status:
 *                 type: string
 *             inserteduser:
 *                 type: string
 *             inserteddatetime:
 *                 type: string
 *             updateduser:
 *                 type: string
 *             updateddatetime:
 *                 type: string   
 */

// ********************** regionaldetails001mb get method****************//
/**
 * @swagger
 * /api/regionaldetails001mb:
 *   get:
 *     tags: [regionaldetailsmaster]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/regionaldetailsmaster'
 */

app.get('/api/regionaldetails001mb', (req, res) => {
    Regionaldetails001mb.find(function (err, regionaldetails001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting regionaldetails001mb.',
                error: err
            });
        }

        return res.json(regionaldetails001mb);
    });
});

/**
 * @swagger
 * /api/regionaldetails001mb/{id}:
 *   get:
 *     tags: [regionaldetailsmaster]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/regionaldetailsmaster'
 */

app.get('/api/regionaldetails001mb/:id', (req, res) => {
    var id = req.params.id;

    Regionaldetails001mb.findOne({ _id: id }, function (err, regionaldetails001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting regionaldetails001mb.',
                error: err
            });
        }

        if (!regionaldetails001mb) {
            return res.status(404).json({
                message: 'No such regionaldetails001mb'
            });
        }

        return res.json(regionaldetails001mb);
    });
});

/**
 * @swagger
 * /api/regionaldetails001mb/regional:
 *   post:
 *    tags: [regionaldetailsmaster]  
 *    summary: Post Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/regionaldetailsmaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */

app.post('/api/regionaldetails001mb/regional', (req, res) => {
    const regionaldetails001mb = new Regionaldetails001mb();
    regionaldetails001mb.regionalname = req.body.regionalname;
    regionaldetails001mb.regionaldesc = req.body.regionaldesc;
    regionaldetails001mb.status = req.body.status;
    regionaldetails001mb.inserteduser = req.body.inserteduser;
    regionaldetails001mb.inserteddatetime = req.body.inserteddatetime;
    regionaldetails001mb.updateduser = req.body.updateduser;
    regionaldetails001mb.updateddatetime = req.body.updateddatetime;
    regionaldetails001mb.save()
        .then((result) => {
            return res.json({ message: 'regionaldetails created!' });
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
})
/**
 * @swagger
 * /api/regionaldetails001mb/{id}:
 *   put:
 *    tags: [regionaldetailsmaster]
 *    summary: Put Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                         $ref: '#/components/schemas/regionaldetailsmaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/regionaldetailsmaster'
 */

app.put('/api/regionaldetails001mb/:id', (req, res) => {
    var id = req.params.id;

    Regionaldetails001mb.findOne({ _id: id }, function (err, regionaldetails001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting regionaldetails001mb',
                error: err
            });
        }

        if (!regionaldetails001mb) {
            return res.status(404).json({
                message: 'No such regionaldetails001mb'
            });
        }
        regionaldetails001mb.regionalname = req.body.regionalname ? req.body.regionalname : regionaldetails001mb.regionalname;
        regionaldetails001mb.regionaldesc = req.body.regionaldesc ? req.body.regionaldesc : regionaldetails001mb.regionaldesc;
        regionaldetails001mb.status = req.body.status ? req.body.status : regionaldetails001mb.status;
        regionaldetails001mb.inserteduser = req.body.inserteduser ? req.body.inserteduser : regionaldetails001mb.inserteduser;
        regionaldetails001mb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : regionaldetails001mb.inserteddatetime;
        regionaldetails001mb.updateduser = req.body.updateduser ? req.body.updateduser : regionaldetails001mb.updateduser;
        regionaldetails001mb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : regionaldetails001mb.updateddatetime;

        regionaldetails001mb.save(function (err, regionaldetails001mb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating regionaldetails001mb.',
                    error: err
                });
            }

            return res.json(regionaldetails001mb);
        });
    });
});
/**
 * @swagger
 * /api/regionaldetails001mb/{id}:
 *   delete:
 *    tags: [regionaldetailsmaster]
 *    summary: Delete Method
 *    description: Delete the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */
app.delete('/api/regionaldetails001mb/:id', (req, res) => {
    var id = req.params.id;

    Regionaldetails001mb.findByIdAndRemove(id, function (err, regionaldetails001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the regionaldetails001mb.',
                error: err
            });
        }

        return res.json({ message: 'Deleted Sucessfully' });
    });
});


// ********************** login001mb schema method****************//
/** 
 * @swagger
 * components:
 *    schemas:
 *      loginmaster:
 *            type: object
 *            properties:
 *             username:
 *                type: string
 *             password:
 *                 type: string  
 *             token:
 *                 type: string
 *                 example: Generate from JWT
 *             personid:
 *                type: object
 *                properties:
 *                    id: 
 *                      type: string
 *             roleid:
 *                type: object
 *                properties:
 *                    id: 
 *                      type: string 
 *             status:
 *                 type: string
 *             inserteduser:
 *                 type: string
 *             inserteddatetime:
 *                 type: string
 *             updateduser:
 *                 type: string
 *             updateddatetime:
 *                 type: string   
 */

// ********************** login001mb get method****************//
/**
 * @swagger
 * /api/login001mb:
 *   get:
 *     tags: [loginmaster]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/loginmaster'
 */

app.get('/api/login001mb', (req, res) => {
    Login001mb.find(function (err, login001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting login001mb.',
                error: err
            });
        }

        return res.json(login001mb);
    });
});

/**
 * @swagger
 * /api/login001mb/{id}:
 *   get:
 *     tags: [loginmaster]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/loginmaster'
 */

app.get('/api/login001mb/:id', (req, res) => {
    var id = req.params.id;
    Login001mb.findOne({ _id: id }, function (err, login001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting login001mb.',
                error: err
            });
        }

        if (!login001mb) {
            return res.status(404).json({
                message: 'No such login001mb'
            });
        }

        return res.json(login001mb);
    });
});


// ********************** loginauth  get method****************//
/**
 * @swagger
 * /api/login001mb/{username}/{password}:
 *  get:
 *     tags: [loginmaster]
 *     summary: Retrieve a data by username and password.
 *     description: Retrieve a data by username and password.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Retrive a data by Username.
 *         schema:
 *           type: string
 *       - in: path
 *         name: password
 *         required: true
 *         description: Retrive a data by password.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                            $ref: '#/components/schemas/loginmaster'
 */


app.get('/api/login001mb/:username/:password', async (req, res) => {
    var username = req.params.username;
    var password = req.params.password;
    const loginperson = await Login001mb.findOne({ username: username }).populate({ path: 'roleid', model: Role001mb });
    if (loginperson) {
        const security = await bcrypt.compare(password, loginperson.password)
        if (security) {
            const person = await Person001mb.findOne({ _id: loginperson.personid });
            const token = jwt.sign({ username: loginperson.username, rolename: loginperson.roleid.rolename }, process.env.TOKEN_KEY,
                {
                    expiresIn: "6h",
                }
            );
            return res.json({
                data: { person: person, token: token }
            });

        } else {
            return res.status(500).json({
                message: 'invalid password'
            });
        }
    } else {
        return res.status(500).json({
            message: 'invalid username'
        });
    }
});
// ********************** person001mb schema method****************//
/** 
 * @swagger
 * components:
 *    schemas:
 *      personmaster:
 *            type: object
 *            properties:
 *             firstname:
 *                   type: string
 *             lasttname:
 *                   type: string
 *             sex:
 *               type: string
 *             phoneno:
 *                  type: number
 *             landline:
 *                  type: number
 *             address:
 *                   type: string
 *             zipcode:                     
 *                   type: number
 *             dob: 
 *                   type: string
 *             email:
 *                   type: string 
 *             confirmemail:
 *                   type: string
 *             verified:
 *                  type: boolean
 *                  default: false
 *             token:
 *                   type: string
 *                   example: Generate from JWT
 *             countryid:
 *                type: object
 *                properties:
 *                    id: 
 *                      type: string 
 *             cityid:
 *                type: object
 *                properties:
 *                    id: 
 *                      type: string  
 *             stateid:
 *                type: object
 *                properties:
 *                    id: 
 *                      type: string 
 *             roleid:
 *                 type: object
 *                 properties:
 *                    id: 
 *                      type: string 
 *             contentid:
 *                  type: object
 *                  properties:
 *                    id: 
 *                      type: string 
 *             religionid:
 *                  type: object
 *                  properties:
 *                    id: 
 *                      type: string 
 *             classificationid:
 *                  type: object
 *                  properties:
 *                    id: 
 *                      type: string 
 *             subscsubspid:
 *                  type: object
 *                  properties:
 *                    id: 
 *                      type: string 
 *             regionalid:
 *                  type: object
 *                  properties:
 *                    id: 
 *                      type: string 
 *             subcatcode:
 *                  type: object
 *                  properties:
 *                    id: 
 *                      type: string 
 *             professionalid:
 *                  type: object
 *                  properties:
 *                    id: 
 *                      type: string 
 *             categoryid:
 *                  type: object
 *                  properties:
 *                    id: 
 *                      type: string 
 *             languageid:
 *                  type: object
 *                  properties:
 *                    id: 
 *                      type: string 
 *             personalid:
 *                  type: object
 *                  properties:
 *                    id: 
 *                      type: string 
 *             companycode:
 *                type: object
 *                properties:
 *                    id: 
 *                      type: string 
 *             status:
 *                 type: string
 *             inserteduser:
 *                 type: string
 *             inserteddatetime:
 *                 type: string
 *             updateduser:
 *                 type: string
 *             updateddatetime:
 *                 type: string   
 */

// ********************** person001mb get method****************//
/**
 * @swagger
 * /api/person001mb:
 *   get:
 *     tags: [personmaster]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/personmaster'
 */

app.get('/api/person001mb', (req, res) => {
    Person001mb.find(function (err, person001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting person001mb.',
                error: err
            });
        }

        return res.json(person001mb);
    });
});

/**
 * @swagger
 * /api/person001mb/{id}:
 *   get:
 *     tags: [personmaster]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/personmaster'
 */

app.get('/api/person001mb/:id', (req, res) => {
    var id = req.params.id;
    Person001mb.findOne({ _id: id }, function (err, person001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting person001mb.',
                error: err
            });
        }

        if (!person001mb) {
            return res.status(404).json({
                message: 'No such person001mb'
            });
        }

        return res.json(person001mb);
    });
});
// ********************** religion001mb schema method****************//
/** 
 * @swagger
 * components:
 *    schemas:
 *      religionmaster:
 *            type: object
 *            properties: 
 *             religionname:
 *                 type: string
 *             religiondesc:
 *                 type: string
 *             status:
 *                 type: string
 *             inserteduser:
 *                 type: string
 *             inserteddatetime:
 *                 type: string
 *             updateduser:
 *                 type: string
 *             updateddatetime:
 *                 type: string   
 */

// ********************** religion001mb get method****************//
/**
 * @swagger
 * /api/religion001mb:
 *   get:
 *     tags: [religionmaster]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/religionmaster'
 */

app.get('/api/religion001mb', (req, res) => {
    Religion001mb.find(function (err, religion001mbs) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting religion001mb.',
                error: err
            });
        }

        return res.json(religion001mbs);
    });
});

/**
 * @swagger
 * /api/religion001mb/{id}:
 *   get:
 *     tags: [religionmaster]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/religionmaster'
 */

app.get('/api/religion001mb/:id', (req, res) => {
    var id = req.params.id;
    Religion001mb.findOne({ _id: id }, function (err, religion001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting religion001mb.',
                error: err
            });
        }

        if (!religion001mb) {
            return res.status(404).json({
                message: 'No such religion001mb'
            });
        }

        return res.json(religion001mb);
    });
});

/**
 * @swagger
 * /api/religion001mb/religion:
 *   post:
 *    tags: [religionmaster]  
 *    summary: Post Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/religionmaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */

app.post('/api/religion001mb/religion', (req, res) => {
    const religion001mb = new Religion001mb();
    religion001mb.religionname = req.body.religionname;
    religion001mb.religiondesc = req.body.religiondesc;
    religion001mb.status = req.body.status;
    religion001mb.inserteduser = req.body.inserteduser;
    religion001mb.inserteddatetime = req.body.inserteddatetime;
    religion001mb.updateduser = req.body.updateduser;
    religion001mb.updateddatetime = req.body.updateddatetime;

    religion001mb.save()
        .then((result) => {
            return res.json({ message: 'religion created!' });
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
})
/**
 * @swagger
 * /api/religion001mb/{id}:
 *   put:
 *    tags: [religionmaster]
 *    summary: Put Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                         $ref: '#/components/schemas/religionmaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/religionmaster'
 */

app.put('/api/religion001mb/:id', (req, res) => {
    var id = req.params.id;

    Religion001mb.findOne({ _id: id }, function (err, religion001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting religion001mb',
                error: err
            });
        }

        if (!religion001mb) {
            return res.status(404).json({
                message: 'No such religion001mb'
            });
        }
        religion001mb.religionname = req.body.religionname ? req.body.religionname : religion001mb.religionname;
        religion001mb.religiondesc = req.body.religiondesc ? req.body.religiondesc : religion001mb.religiondesc;
        religion001mb.status = req.body.status ? req.body.status : religion001mb.status;
        religion001mb.inserteduser = req.body.inserteduser ? req.body.inserteduser : religion001mb.inserteduser;
        religion001mb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : religion001mb.inserteddatetime;
        religion001mb.updateduser = req.body.updateduser ? req.body.updateduser : religion001mb.updateduser;
        religion001mb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : religion001mb.updateddatetime;

        religion001mb.save(function (err, religion001mb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating religion001mb.',
                    error: err
                });
            }

            return res.json(religion001mb);
        });
    });
});
/**
 * @swagger
 * /api/religion001mb/{id}:
 *   delete:
 *    tags: [religionmaster]
 *    summary: Delete Method
 *    description: Delete the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */
app.delete('/api/religion001mb/:id', (req, res) => {
    var id = req.params.id;
    Religion001mb.findByIdAndRemove(id, function (err, religion001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the religion001mb.',
                error: err
            });
        }

        return res.json({ message: 'Deleted Sucessfully' });

    });
});


// ********************** subcatclassification001mb schema method****************//
/** 
 * @swagger
 * components:
 *    schemas:
 *      subcatclassificationmaster:
 *            type: object
 *            properties: 
 *              subcatcode:
 *                 type: object
 *                 properties:
 *                    id: 
 *                      type: string 
 *              catcode:
 *                 type: object
 *                 properties:
 *                    id: 
 *                      type: string    
 *              classificationname:
 *                 type: string
 *              status:
 *                 type: string
 *              inserteduser:
 *                 type: string
 *              inserteddatetime:
 *                 type: string
 *              updateduser:
 *                 type: string
 *              updateddatetime:
 *                 type: string   
 */

// ********************** subcatclassification001mb get method****************//
/**
 * @swagger
 * /api/subcatclassification001mb:
 *   get:
 *     tags: [subcatclassificationmaster]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/subcatclassificationmaster'
 */

app.get('/api/subcatclassification001mb', (req, res) => {
    Subcatclassification001mb.find(function (err, subcatclassification001mbs) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting subcatclassification001mb.',
                error: err
            });
        }

        return res.json(subcatclassification001mbs);
    });
});

/**
 * @swagger
 * /api/subcatclassification001mb/{id}:
 *   get:
 *     tags: [subcatclassificationmaster]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/subcatclassificationmaster'
 */

app.get('/api/subcatclassification001mb/:id', (req, res) => {
    var id = req.params.id;
    Subcatclassification001mb.findOne({ _id: id }, function (err, subcatclassification001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting subcatclassification001mb.',
                error: err
            });
        }

        if (!subcatclassification001mb) {
            return res.status(404).json({
                message: 'No such subcatclassification001mb'
            });
        }

        return res.json(subcatclassification001mb);
    });
});

/**
 * @swagger
 * /api/subcatclassification001mb/subcatclassification:
 *   post:
 *    tags: [subcatclassificationmaster]  
 *    summary: Post Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/subcatclassificationmaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */

app.post('/api/subcatclassification001mb/subcatclassification', (req, res) => {
    const subcatclassification001mb = new Subcatclassification001mb();
    subcatclassification001mb.subcatcode = req.body.subcatcode.id;
    subcatclassification001mb.catcode = req.body.catcode.id,
        subcatclassification001mb.classificationname = req.body.classificationname;
    subcatclassification001mb.status = req.body.status;
    subcatclassification001mb.inserteduser = req.body.inserteduser;
    subcatclassification001mb.inserteddatetime = req.body.inserteddatetime;
    subcatclassification001mb.updateduser = req.body.updateduser;
    subcatclassification001mb.updateddatetime = req.body.updateddatetime;
    subcatclassification001mb.save()
        .then((result) => {
            return res.json({ message: 'subcatclassification created!' });
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
})
/**
 * @swagger
 * /api/subcatclassification001mb/{id}:
 *   put:
 *    tags: [subcatclassificationmaster]
 *    summary: Put Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                         $ref: '#/components/schemas/subcatclassificationmaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/subcatclassificationmaster'
 */

app.put('/api/subcatclassification001mb/:id', (req, res) => {
    var id = req.params.id;

    Subcatclassification001mb.findOne({ _id: id }, function (err, subcatclassification001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting subcatclassification001mb',
                error: err
            });
        }

        if (!subcatclassification001mb) {
            return res.status(404).json({
                message: 'No such subcatclassification001mb'
            });
        }
        subcatclassification001mb.subcatcode = req.body.subcatcode.id ? req.body.subcatcode.id : subcatclassification001mb.subcatcode;
        subcatclassification001mb.catcode = req.body.catcode.id ? req.body.catcode.id : subcatclassification001mb.catcode;
        subcatclassification001mb.classificationname = req.body.classificationname ? req.body.classificationname : subcatclassification001mb.classificationname;
        subcatclassification001mb.status = req.body.status ? req.body.status : subcatclassification001mb.status;
        subcatclassification001mb.inserteduser = req.body.inserteduser ? req.body.inserteduser : subcatclassification001mb.inserteduser;
        subcatclassification001mb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : subcatclassification001mb.inserteddatetime;
        subcatclassification001mb.updateduser = req.body.updateduser ? req.body.updateduser : subcatclassification001mb.updateduser;
        subcatclassification001mb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : subcatclassification001mb.updateddatetime;
        subcatclassification001mb.save(function (err, subcatclassification001mb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating subcatclassification001mb.',
                    error: err
                });
            }

            return res.json(subcatclassification001mb);
        });
    });
});
/**
 * @swagger
 * /api/subcatclassification001mb/{id}:
 *   delete:
 *    tags: [subcatclassificationmaster]
 *    summary: Delete Method
 *    description: Delete the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */
app.delete('/api/subcatclassification001mb/:id', (req, res) => {
    var id = req.params.id;
    Subcatclassification001mb.findByIdAndRemove(id, function (err, subcatclassification001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the subcatclassification001mb.',
                error: err
            });
        }

        return res.json({ message: 'Deleted Sucessfully' });
    });
});

// ********************** subcategory001mb schema method****************//
/** 
 * @swagger
 * components:
 *    schemas:
 *      subcategorymaster:
 *            type: object
 *            properties:
 *             catcode:
 *                type: object
 *                properties:
 *                    id: 
 *                      type: string     
 *             subcatname:
 *                 type: string
 *             subcatstatus:
 *                 type: string
 *             status:
 *                 type: string
 *             inserteduser:
 *                 type: string
 *             inserteddatetime:
 *                 type: string
 *             updateduser:
 *                 type: string
 *             updateddatetime:
 *                 type: string   
 */

// ********************** subcategory001mb get method****************//
/**
 * @swagger
 * /api/subcategory001mb:
 *   get:
 *     tags: [subcategorymaster]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/subcategorymaster'
 */

app.get('/api/subcategory001mb', (req, res) => {
    Subcategory001mb.find(function (err, subcategory001mbs) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting subcategory001mb.',
                error: err
            });
        }

        return res.json(subcategory001mbs);
    });
});

/**
 * @swagger
 * /api/subcategory001mb/{id}:
 *   get:
 *     tags: [subcategorymaster]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/subcategorymaster'
 */

app.get('/api/subcategory001mb/:id', (req, res) => {
    var id = req.params.id;
    Subcategory001mb.findOne({ _id: id }, function (err, subcategory001mb) {
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
});

/**
 * @swagger
 * /api/subcategory001mb/subcategory:
 *   post:
 *    tags: [subcategorymaster]  
 *    summary: Post Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/subcategorymaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */

app.post('/api/subcategory001mb/subcategory', (req, res) => {
    console.log("called", req.body.inserteduser);
    const subcategory001mb = new Subcategory001mb();
    subcategory001mb.catcode = req.body.catcode.id;
    subcategory001mb.subcatname = req.body.subcatname;
    subcategory001mb.subcatstatus = req.body.subcatstatus;
    subcategory001mb.status = req.body.status;
    subcategory001mb.inserteduser = req.body.inserteduser;
    subcategory001mb.inserteddatetime = req.body.inserteddatetime;
    subcategory001mb.updateduser = req.body.updateduser;
    subcategory001mb.updateddatetime = req.body.updateddatetime;
    console.log("subcategory001mb", subcategory001mb);
    subcategory001mb.save()
        .then((result) => {
            console.log("result", result);
            return res.json({ message: 'subcategory001mb created!' });
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
})
/**
 * @swagger
 * /api/subcategory001mb/{id}:
 *   put:
 *    tags: [subcategorymaster]
 *    summary: Put Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                         $ref: '#/components/schemas/subcategorymaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/subcategorymaster'
 */

app.put('/api/subcategory001mb/:id', (req, res) => {
    var id = req.params.id;

    Subcategory001mb.findOne({ _id: id }, function (err, subcategory001mb) {
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
        subcategory001mb.catcode = req.body.catcode.id ? req.body.catcode.id : subcategory001mb.catcode;
        subcategory001mb.subcatname = req.body.subcatname ? req.body.subcatname : subcategory001mb.subcatname;
        subcategory001mb.subcatstatus = req.body.subcatstatus ? req.body.subcatstatus : subcategory001mb.subcatstatus;
        subcategory001mb.status = req.body.status ? req.body.status : subcategory001mb.status;
        subcategory001mb.inserteduser = req.body.inserteduser ? req.body.inserteduser : subcategory001mb.inserteduser;
        subcategory001mb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : subcategory001mb.inserteddatetime;
        subcategory001mb.updateduser = req.body.updateduser ? req.body.updateduser : subcategory001mb.updateduser;
        subcategory001mb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : subcategory001mb.updateddatetime;
        subcategory001mb.save(function (err, subcategory001mb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating subcategory001mb.',
                    error: err
                });
            }

            return res.json(subcategory001mb);
        });
    });
});
/**
 * @swagger
 * /api/subcategory001mb/{id}:
 *   delete:
 *    tags: [subcategorymaster]
 *    summary: Delete Method
 *    description: Delete the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */
app.delete('/api/subcategory001mb/:id', (req, res) => {
    var id = req.params.id;
    Subcategory001mb.findByIdAndRemove(id, function (err, subcategory001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the subcategory001mb.',
                error: err
            });
        }

        return res.json({ message: 'Deleted Sucessfully' });
    });
});

// ********************** subscribercontentauth001wb schema method****************//
/** 
 * @swagger
 * components:
 *    schemas:
 *      subscribercontentauthworkbase:
 *            type: object
 *            properties:    
 *             subscsubpstatus:
 *                 type: string
 *             subscsubpstartdate:
 *                 type: string
 *             subscsubpenddate:
 *                 type: string
 *             status:
 *                 type: string
 *             inserteduser:
 *                 type: string
 *             inserteddatetime:
 *                 type: string
 *             updateduser:
 *                 type: string
 *             updateddatetime:
 *                 type: string   
 */

// ********************** subscribercontentauth001wb get method****************//
/**
 * @swagger
 * /api/subscribercontentauth001wb:
 *   get:
 *     tags: [subscribercontentauthworkbase]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/subscribercontentauthworkbase'
 */

app.get('/api/subscribercontentauth001wb', (req, res) => {
    Subscribercontentauth001wb.find(function (err, subscribercontentauth001wbs) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting subscribercontentauth001wb.',
                error: err
            });
        }

        return res.json(subscribercontentauth001wbs);
    });
});

/**
 * @swagger
 * /api/subscribercontentauth001wb/{id}:
 *   get:
 *     tags: [subscribercontentauthworkbase]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/subscribercontentauthworkbase'
 */

app.get('/api/subscribercontentauth001wb/:id', (req, res) => {
    var id = req.params.id;
    Subscribercontentauth001wb.findOne({ _id: id }, function (err, subscribercontentauth001wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting subscribercontentauth001wb.',
                error: err
            });
        }

        if (!subscribercontentauth001wb) {
            return res.status(404).json({
                message: 'No such subscribercontentauth001wb'
            });
        }

        return res.json(subscribercontentauth001wb);
    });
});

/**
 * @swagger
 * /api/subscribercontentauth001wb/subscribercontent:
 *   post:
 *    tags: [subscribercontentauthworkbase]  
 *    summary: Post Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/subscribercontentauthworkbase'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */

app.post('/api/subscribercontentauth001wb/subscribercontent', (req, res) => {
    const subscribercontentauth001wb = new Subscribercontentauth001wb();
    subscribercontentauth001wb.subscsubpstatus = req.body.subscsubpstatus;
    subscribercontentauth001wb.subscsubpstartdate = req.body.subscsubpstartdate;
    subscribercontentauth001wb.subscsubpenddate = req.body.subscsubpenddate;
    subscribercontentauth001wb.inserteduser = req.body.inserteduser;
    subscribercontentauth001wb.inserteddatetime = req.body.inserteddatetime;
    subscribercontentauth001wb.updateduser = req.body.updateduser;
    subscribercontentauth001wb.status = req.body.status;
    subscribercontentauth001wb.updateddatetime = req.body.updateddatetime;
    subscribercontentauth001wb.save()
        .then((result) => {
            return res.json({ message: 'subscribercontentauth created!' });
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
})
/**
 * @swagger
 * /api/subscribercontentauth001wb/{id}:
 *   put:
 *    tags: [subscribercontentauthworkbase]
 *    summary: Put Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                         $ref: '#/components/schemas/subscribercontentauthworkbase'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/subscribercontentauthworkbase'
 */

app.put('/api/subscribercontentauth001wb/:id', (req, res) => {
    var id = req.params.id;

    Subscribercontentauth001wb.findOne({ _id: id }, function (err, subscribercontentauth001wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting subscribercontentauth001wb',
                error: err
            });
        }

        if (!subscribercontentauth001wb) {
            return res.status(404).json({
                message: 'No such subscribercontentauth001wb'
            });
        }
        subscribercontentauth001wb.subscsubpstatus = req.body.subscsubpstatus ? req.body.subscsubpstatus : subscribercontentauth001wb.subscsubpstatus;
        subscribercontentauth001wb.subscsubpstartdate = req.body.subscsubpstartdate ? req.body.subscsubpstartdate : subscribercontentauth001wb.subscsubpstartdate;
        subscribercontentauth001wb.subscsubpenddate = req.body.subscsubpenddate ? req.body.subscsubpenddate : subscribercontentauth001wb.subscsupbenddate;
        subscribercontentauth001wb.inserteduser = req.body.inserteduser ? req.body.inserteduser : subscribercontentauth001wb.inserteduser;
        subscribercontentauth001wb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : subscribercontentauth001wb.inserteddatetime;
        subscribercontentauth001wb.updateduser = req.body.updateduser ? req.body.updateduser : subscribercontentauth001wb.updateduser;
        subscribercontentauth001wb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : subscribercontentauth001wb.updateddatetime;
        subscribercontentauth001wb.status = req.body.status ? req.body.status : subscribercontentauth001wb.status;
        subscribercontentauth001wb.save(function (err, subscribercontentauth001wb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating subscribercontentauth001wb.',
                    error: err
                });
            }

            return res.json(subscribercontentauth001wb);
        });
    });
});
/**
 * @swagger
 * /api/subscribercontentauth001wb/{id}:
 *   delete:
 *    tags: [subscribercontentauthworkbase]
 *    summary: Delete Method
 *    description: Delete the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */
app.delete('/api/subscribercontentauth001wb/:id', (req, res) => {
    var id = req.params.id;
    Subscribercontentauth001wb.findByIdAndRemove(id, function (err, subscribercontentauth001wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the subscribercontentauth001wb.',
                error: err
            });
        }

        return res.json({ message: 'Deleted Sucessfully' });
    });
});

// ********************** subscriberdetails001wb schema method****************//
/** 
 * @swagger
 * components:
 *   schemas:
 *     subscriberdetailsworkbase:
 *        allOf:
 *           - $ref: '#/components/schemas/personmaster'
 *           - $ref: '#/components/schemas/loginmaster'
 *        type: object
 *        properties:
 *             horoscope:
 *                 type: string    
 *             subscdesc:
 *                 type: string
 *             aboutme:
 *                 type: string
 *             approvedby:
 *                 type: string
 *             subscapproval:
 *                 type: boolean
 *             approvedon:
 *                 type: string
 *             subpid:
 *                type: object
 *                properties:
 *                    id: 
 *                      type: string 
 *             payid:
 *                type: array 
 *             personid:
 *                type: object
 *                example: Automatically Generated from person001mb 
 *                properties:
 *                    id: 
 *                      type: string                    
 *             contentid:
 *                type: object
 *                properties:
 *                    id: 
 *                      type: string
 *             status:
 *                 type: string
 *             inserteduser:
 *                 type: string
 *             inserteddatetime:
 *                 type: string
 *             updateduser:
 *                 type: string
 *             updateddatetime:
 *                 type: string
 *       
 *           
 */
// ********************** subscriberdetails001wb get method****************//
/**
 * @swagger
 * /api/subscriberdetails001wb:
 *   get:
 *     tags: [subscriberdetailsworkbase]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/subscriberdetailsworkbase'
 *                        
 */

app.get('/api/subscriberdetails001wb', (req, res) => {
    Subscriberdetails001wb.find(function (err, subscriberdetails001wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting subscriberdetails001wb.',
                error: err
            });
        }

        return res.json(subscriberdetails001wb);
    });
});
/**
 * @swagger
 * /api/subscriberdetails001wb/verify:
 *   get:
 *     tags: [subscriberdetailsworkbase]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/subscriberdetailsworkbase'
 */

app.get('/api/subscriberdetails001wb/verify', async (req, res) => {
    const token = req.query.token;
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.verifydecode = decoded;
        const person = await Person001mb.findOne({ email: decoded.email, rolename: decoded.rolename, });
        if (person.verified) {
            return res.status(401).send({ message: " Account Verified Please Login" });
        } else {
            person.verified = true;
            person.save();
            return res.status(200).send({ message: "Account Verified" });
        }
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
});

/**
 * @swagger
 * /api/subscriberdetails001wb/{id}:
 *   get:
 *     tags: [subscriberdetailsworkbase]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/subscriberdetailsworkbase'
 */

app.get('/api/subscriberdetails001wb/:id', (req, res) => {
    var id = req.params.id;
    Subscriberdetails001wb.findOne({ _id: id }, function (err, subscriberdetails001wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting subscriberdetails001wb.',
                error: err
            });
        }

        if (!subscriberdetails001wb) {
            return res.status(404).json({
                message: 'No such subscriberdetails001wb'
            });
        }

        return res.json(subscriberdetails001wb);
    });
});

/**
 * @swagger
 * /api/subscriberdetails001wb/subscriberdetails:
 *   post:
 *    tags: [subscriberdetailsworkbase]  
 *    summary: Post Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                            $ref: '#/components/schemas/subscriberdetailsworkbase'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */

app.post('/api/subscriberdetails001wb/subscriberdetails', async (req, res) => {
    const person001mb = new Person001mb();
    person001mb.subcatcode = req.body.subcatcode.id;
    person001mb.professionalid = req.body.professionalid.id;
    person001mb.categoryid = req.body.categoryid.id;
    person001mb.languageid = req.body.languageid.id;
    person001mb.personalid = req.body.personalid.id;
    person001mb.religionid = req.body.religionid.id;
    person001mb.classificationid = req.body.classificationid.id;
    person001mb.subscsubspid = req.body.subscsubspid.id;
    person001mb.regionalid = req.body.regionalid.id;
    person001mb.companycode = req.body.companycode.id;
    person001mb.countryid = req.body.countryid.id;
    person001mb.cityid = req.body.cityid.id;
    person001mb.stateid = req.body.stateid.id;
    person001mb.roleid = req.body.roleid.id;
    person001mb.firstname = req.body.firstname;
    person001mb.lasttname = req.body.lasttname;
    person001mb.zipcode = req.body.zipcode;
    person001mb.dob = req.body.dob;
    person001mb.confirmemail = req.body.confirmemail;
    person001mb.email = req.body.email;
    person001mb.age = req.body.age;
    person001mb.verified = false;
    person001mb.sex = req.body.sex;
    person001mb.address = req.body.address;
    person001mb.phoneno = req.body.phoneno;
    person001mb.landline = req.body.landline;
    person001mb.inserteduser = req.body.inserteduser;
    person001mb.inserteddatetime = req.body.inserteddatetime;
    person001mb.updateduser = req.body.updateduser;
    person001mb.updateddatetime = req.body.updateddatetime;
    person001mb.status = req.body.status;
    if (!(person001mb.email && person001mb.firstname && person001mb.roleid)) {
        return res.status(402).json("Enter a Required Field");
    }
    const oldUser = await Person001mb.findOne({ email: person001mb.email, firstname: person001mb.firstname, roleid: person001mb.roleid });
    if (oldUser) {
        return res.status(409).send("User Already Exist");
    }
    const token = jwt.sign({ email: person001mb.email, roleid: person001mb.roleid }, process.env.TOKEN_KEY,
        {
            expiresIn: "6h",
        }
    );
    person001mb.token = token;
    let person = await person001mb.save();

    const login001mb = new Login001mb()
    login001mb.username = req.body.username;
    login001mb.password = bcrypt.hashSync(req.body.password, 10);
    login001mb.roleid = req.body.roleid.id;
    login001mb.inserteduser = req.body.inserteduser;
    login001mb.inserteddatetime = req.body.inserteddatetime;
    login001mb.updateduser = req.body.updateduser;
    login001mb.status = req.body.status;
    login001mb.personid = person._id;
    await login001mb.save()

    const subscriberdetails001wb = new Subscriberdetails001wb();
    subscriberdetails001wb.personid = person._id;
    subscriberdetails001wb.contentid = req.body.contentid.id;
    subscriberdetails001wb.subpid = req.body.subpid.id;
    subscriberdetails001wb.subscdesc = req.body.subscdesc;
    subscriberdetails001wb.aboutme = req.body.aboutme;
    subscriberdetails001wb.subscstatus = req.body.subscstatus;
    subscriberdetails001wb.horoscope = req.body.horoscope;
    subscriberdetails001wb.subscapproval = req.body.subscapproval;
    subscriberdetails001wb.approvedby = req.body.approvedby;
    subscriberdetails001wb.approvedon = req.body.approvedon;
    subscriberdetails001wb.inserteduser = req.body.inserteduser;
    subscriberdetails001wb.inserteddatetime = req.body.inserteddatetime;
    subscriberdetails001wb.updateduser = req.body.updateduser;
    subscriberdetails001wb.status = req.body.status;
    await subscriberdetails001wb.save()
    // user: 'siriusmatrimoney@gmail.com',
    // pass: 'Welcome!23'
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'siriusmatrimoney@gmail.com',
            pass: 'omhwphrccuelcgsa'
        }
    });
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./src/templates'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./src/templates'),
        extName: ".handlebars"
    };
    transporter.use('compile', hbs(handlebarOptions))
    const mailOptions = {
        from: 'siriusmatrimoney@gmail.com',
        to: person001mb.email,
        subject: 'Sirius Matrimony Confirmation',
        template: 'mail',
        context: {
            name: "Sirius Matrimony",
            url: `https://siriusmatrimony.herokuapp.com/api/subscriberdetailscontroller/verify?token=${token}`
        }
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            return res.status(401).json({ message: 'email not created!' });
        } else {
            return res.json({ message: 'email created!' });
        }
    })
})
/**
 * @swagger
 * /api/subscriberdetails001wb/{personid}/{loginid}/{subid}:
 *   put:
 *    tags: [subscriberdetailsworkbase]
 *    summary: Put Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: personid
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *      - in: path
 *        name: loginid
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *      - in: path
 *        name: subid
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                         $ref: '#/components/schemas/subscriberdetailsworkbase'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/subscriberdetailsworkbase'
 */

app.put('/api/subscriberdetails001wb/:personid/:loginid/:subid', async (req, res) => {
    var personid = req.params.personid;
    var loginid = req.params.loginid;
    var subid = req.params.subid;
    const person001mb = await Person001mb.findOne({ _id: personid });
    if (person001mb) {
        person001mb.personalid = req.body.personalid.id ? req.body.personalid.id : person001mb.personalid;
        person001mb.subcatcode = req.body.subcatcode.id ? req.body.subcatcode.id : person001mb.subcatcode;
        person001mb.professionalid = req.body.professionalid.id ? req.body.professionalid.id : person001mb.professionalid;
        person001mb.categoryid = req.body.categoryid.id ? req.body.categoryid.id : person001mb.categoryid;
        person001mb.languageid = req.body.languageid.id ? req.body.languageid.id : person001mb.languageid;
        person001mb.religionid = req.body.religionid.id ? req.body.religionid.id : person001mb.religionid;
        person001mb.classificationid = req.body.classificationid.id ? req.body.classificationid.id : person001mb.classificationid;
        person001mb.subscsubspid = req.body.subscsubspid.id ? req.body.subscsubspid.id : person001mb.subscsubspid;
        person001mb.regionalid = req.body.regionalid.id ? req.body.regionalid.id : person001mb.regionalid;
        person001mb.companycode = req.body.companycode.id ? req.body.companycode.id : person001mb.companycode;
        person001mb.email = req.body.email ? req.body.email : person001mb.email;
        person001mb.contentid = req.body.contentid.id ? req.body.contentid.id : person001mb.contentid;
        person001mb.cityid = req.body.cityid.id ? req.body.cityid.id : person001mb.cityid;
        person001mb.stateid = req.body.stateid.id ? req.body.stateid.id : person001mb.stateid;
        person001mb.roleid = req.body.roleid.id ? req.body.roleid.id : person001mb.roleid;
        person001mb.age = req.body.age ? req.body.age : person001mb.age;
        person001mb.sex = req.body.sex ? req.body.sex : person001mb.sex;
        person001mb.countryid = req.body.countryid.id ? req.body.countryid.id : person001mb.countryid;
        person001mb.address = req.body.address ? req.body.address : person001mb.address;
        person001mb.phoneno = req.body.phoneno ? req.body.phoneno : person001mb.phoneno;
        person001mb.inserteduser = req.body.inserteduser ? req.body.inserteduser : person001mb.inserteduser;
        person001mb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : person001mb.inserteddatetime;
        person001mb.updateduser = req.body.updateduser ? req.body.updateduser : person001mb.updateduser;
        person001mb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : person001mb.updateddatetime;
        person001mb.firstname = req.body.firstname ? req.body.firstname : person001mb.firstname;
        person001mb.lasttname = req.body.lasttname ? req.body.lasttname : person001mb.lasttname;
        person001mb.zipcode = req.body.zipcode ? req.body.zipcode : person001mb.zipcode;
        person001mb.dob = req.body.dob ? req.body.dob : person001mb.dob;
        person001mb.confirmemail = req.body.confirmemail ? req.body.confirmemail : person001mb.confirmemail;
        person001mb.landline = req.body.landline ? req.body.landline : person001mb.landline;
        person001mb.status = req.body.status ? req.body.status : person001mb.status;
        let person = person001mb.save();

        const login001mb = await Login001mb.findOne({ _id: loginid });
        login001mb.personid = person._id ? person._id : login001mb.personid;
        login001mb.username = req.body.username ? req.body.username : login001mb.username;
        login001mb.password = req.body.password ? bcrypt.hashSync(req.body.password, 10) : login001mb.password;
        login001mb.roleid = req.body.roleid.id ? req.body.roleid.id : login001mb.roleid;
        login001mb.status = req.body.status ? req.body.status : login001mb.status
        login001mb.inserteduser = req.body.inserteduser ? req.body.inserteduser : login001mb.inserteduser;
        login001mb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : login001mb.inserteddatetime;
        login001mb.updateduser = req.body.updateduser ? req.body.updateduser : login001mb.updateduser;
        login001mb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : login001mb.updateddatetime;
        login001mb.save();

        const subscriberdetails001wb = await Subscriberdetails001wb.findOne({ _id: subid });
        subscriberdetails001wb.subpid = req.body.subpid.id ? req.body.subpid.id : subscriberdetails001wb.subpid;
        subscriberdetails001wb.horoscope = req.body.horoscope ? req.body.horoscope : subscriberdetails001wb.horoscope;
        subscriberdetails001wb.contentid = req.body.contentid.id ? req.body.contentid.id : subscriberdetails001wb.contentid;
        subscriberdetails001wb.personid = person._id ? person._id : subscriberdetails001wb.personid;
        subscriberdetails001wb.subscdesc = req.body.subscdesc ? req.body.subscdesc : subscriberdetails001wb.subscdesc;
        subscriberdetails001wb.aboutme = req.body.aboutme ? req.body.aboutme : subscriberdetails001wb.aboutme;
        subscriberdetails001wb.status = req.body.status ? req.body.status : subscriberdetails001wb.status
        subscriberdetails001wb.inserteduser = req.body.inserteduser ? req.body.inserteduser : subscriberdetails001wb.inserteduser;
        subscriberdetails001wb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : subscriberdetails001wb.inserteddatetime;
        subscriberdetails001wb.updateduser = req.body.updateduser ? req.body.updateduser : subscriberdetails001wb.updateduser;
        subscriberdetails001wb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : subscriberdetails001wb.updateddatetime;
        subscriberdetails001wb.subscapproval = req.body.subscapproval;
        subscriberdetails001wb.approvedby = req.body.approvedby ? req.body.approvedby : subscriberdetails001wb.approvedby;
        subscriberdetails001wb.approvedon = req.body.approvedon ? req.body.approvedon : subscriberdetails001wb.approvedon;
        subscriberdetails001wb.save(function (err, subscriberdetails001wb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating subscriberdetails001wb.',
                    error: err
                });
            }

            return res.json('subscriberdetails001wb updated');
        });
    }
});
/**
 * @swagger
 * /api/subscriberdetails001wb/{personid}/{loginid}/{subid}:
 *   delete:
 *    tags: [subscriberdetailsworkbase]
 *    summary: Delete Method
 *    description: Delete the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: personid
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *      - in: path
 *        name: loginid
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *      - in: path
 *        name: subid
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */
app.delete('/api/subscriberdetails001wb/:personid/:loginid/:subid', async (req, res) => {
    var subid = req.params.subid;
    var loginid = req.params.loginid;
    var personid = req.params.personid;
    if (subid && loginid && personid) {
        await Person001mb.findByIdAndRemove({ _id: personid });
        await Login001mb.findByIdAndRemove({ _id: loginid });
        await Subscriberdetails001wb.findByIdAndRemove({ _id: subid });
        return res.json('subscriberdetails001wb deleted');
    } else {
        return res.status(500).json({
            message: 'Error when deleting subscriberdetails001wb.',
            error: err
        });
    }
});


// ********************** subscriberpersonalinfo001wb schema method****************//
/** 
 * @swagger
 * components:
 *    schemas:
 *      subscriberpersonalinfoworkbase:
 *            type: object
 *            properties:    
 *             personaldetails:
 *                 type: string
 *             hobbies:
 *                 type: string
 *             flex1:
 *                 type: string
 *             flex2:
 *                 type: string
 *             flex3:
 *                 type: string
 *             flex4:
 *                 type: string
 *             flex5:
 *                 type: string
 *             flex6:
 *                 type: string
 *             flex7:
 *                 type: string
 *             flex8:
 *                 type: string
 *             flex9:
 *                 type: string
 *             flex10:
 *                 type: string
 *             flex11:
 *                 type: string
 *             flex12:
 *                 type: string
 *             status:
 *                 type: string
 *             inserteduser:
 *                 type: string
 *             inserteddatetime:
 *                 type: string
 *             updateduser:
 *                 type: string
 *             updateddatetime:
 *                 type: string   
 */

// ********************** subscriberpersonalinfo001wb get method****************//
/**
 * @swagger
 * /api/subscriberpersonalinfo001wb:
 *   get:
 *     tags: [subscriberpersonalinfoworkbase]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/subscriberpersonalinfoworkbase'
 */

app.get('/api/subscriberpersonalinfo001wb', (req, res) => {
    Subscriberpersonalinfo001wb.find(function (err, subscriberpersonalinfo001wbs) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting subscriberpersonalinfo001wb.',
                error: err
            });
        }

        return res.json(subscriberpersonalinfo001wbs);
    });
});

/**
 * @swagger
 * /api/subscriberpersonalinfo001wb/{id}:
 *   get:
 *     tags: [subscriberpersonalinfoworkbase]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/subscriberpersonalinfoworkbase'
 */

app.get('/api/subscriberpersonalinfo001wb/:id', (req, res) => {
    var id = req.params.id;
    Subscriberpersonalinfo001wb.findOne({ _id: id }, function (err, subscriberpersonalinfo001wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting subscriberpersonalinfo001wb.',
                error: err
            });
        }

        if (!subscriberpersonalinfo001wb) {
            return res.status(404).json({
                message: 'No such subscriberpersonalinfo001wb'
            });
        }

        return res.json(subscriberpersonalinfo001wb);
    });
});

/**
 * @swagger
 * /api/subscriberpersonalinfo001wb/personal:
 *   post:
 *    tags: [subscriberpersonalinfoworkbase]  
 *    summary: Post Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/subscriberpersonalinfoworkbase'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */

app.post('/api/subscriberpersonalinfo001wb/personal', (req, res) => {
    const subscriberpersonalinfo001wb = new Subscriberpersonalinfo001wb();
    subscriberpersonalinfo001wb.personaldetails = req.body.personaldetails;
    subscriberpersonalinfo001wb.hobbies = req.body.hobbies;
    subscriberpersonalinfo001wb.flex1 = req.body.flex1;
    subscriberpersonalinfo001wb.flex2 = req.body.flex2;
    subscriberpersonalinfo001wb.flex3 = req.body.flex3;
    subscriberpersonalinfo001wb.flex4 = req.body.flex4;
    subscriberpersonalinfo001wb.flex5 = req.body.flex5;
    subscriberpersonalinfo001wb.flex6 = req.body.flex6;
    subscriberpersonalinfo001wb.flex7 = req.body.flex7;
    subscriberpersonalinfo001wb.flex8 = req.body.flex8;
    subscriberpersonalinfo001wb.flex9 = req.body.flex9;
    subscriberpersonalinfo001wb.flex10 = req.body.flex10;
    subscriberpersonalinfo001wb.flex11 = req.body.flex11;
    subscriberpersonalinfo001wb.flex12 = req.body.flex12;
    subscriberpersonalinfo001wb.inserteduser = req.body.inserteduser;
    subscriberpersonalinfo001wb.inserteddatetime = req.body.inserteddatetime;
    subscriberpersonalinfo001wb.updateduser = req.body.updateduser;
    subscriberpersonalinfo001wb.updateddatetime = req.body.updateddatetime;
    subscriberpersonalinfo001wb.save()
        .then((result) => {
            return res.json({ message: 'subscriberpersonalinfo created!' });
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
})
/**
 * @swagger
 * /api/subscriberpersonalinfo001wb/{id}:
 *   put:
 *    tags: [subscriberpersonalinfoworkbase]
 *    summary: Put Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                         $ref: '#/components/schemas/subscriberpersonalinfoworkbase'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/subscriberpersonalinfoworkbase'
 */

app.put('/api/subscriberpersonalinfo001wb/:id', (req, res) => {
    var id = req.params.id;

    Subscriberpersonalinfo001wb.findOne({ _id: id }, function (err, subscriberpersonalinfo001wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting subscriberpersonalinfo001wb',
                error: err
            });
        }

        if (!subscriberpersonalinfo001wb) {
            return res.status(404).json({
                message: 'No such subscriberpersonalinfo001wb'
            });
        }
        subscriberpersonalinfo001wb.personaldetails = req.body.personaldetails ? req.body.personaldetails : subscriberpersonalinfo001wb.personaldetails;
        subscriberpersonalinfo001wb.hobbies = req.body.hobbies ? req.body.hobbies : subscriberpersonalinfo001wb.hobbies;
        subscriberpersonalinfo001wb.flex1 = req.body.flex1 ? req.body.flex1 : subscriberpersonalinfo001wb.flex1;
        subscriberpersonalinfo001wb.flex2 = req.body.flex2 ? req.body.flex2 : subscriberpersonalinfo001wb.flex2;
        subscriberpersonalinfo001wb.flex3 = req.body.flex3 ? req.body.flex3 : subscriberpersonalinfo001wb.flex3;
        subscriberpersonalinfo001wb.flex4 = req.body.flex4 ? req.body.flex4 : subscriberpersonalinfo001wb.flex4;
        subscriberpersonalinfo001wb.flex5 = req.body.flex5 ? req.body.flex5 : subscriberpersonalinfo001wb.flex5;
        subscriberpersonalinfo001wb.flex6 = req.body.flex6 ? req.body.flex6 : subscriberpersonalinfo001wb.flex6;
        subscriberpersonalinfo001wb.flex7 = req.body.flex7 ? req.body.flex7 : subscriberpersonalinfo001wb.flex7;
        subscriberpersonalinfo001wb.flex8 = req.body.flex8 ? req.body.flex8 : subscriberpersonalinfo001wb.flex8;
        subscriberpersonalinfo001wb.flex9 = req.body.flex9 ? req.body.flex9 : subscriberpersonalinfo001wb.flex9;
        subscriberpersonalinfo001wb.flex10 = req.body.flex10 ? req.body.flex10 : subscriberpersonalinfo001wb.flex10;
        subscriberpersonalinfo001wb.flex11 = req.body.flex11 ? req.body.flex11 : subscriberpersonalinfo001wb.flex11;
        subscriberpersonalinfo001wb.flex12 = req.body.flex12 ? req.body.flex12 : subscriberpersonalinfo001wb.flex12;
        subscriberpersonalinfo001wb.inserteduser = req.body.inserteduser ? req.body.inserteduser : subscriberpersonalinfo001wb.inserteduser;
        subscriberpersonalinfo001wb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : subscriberpersonalinfo001wb.inserteddatetime;
        subscriberpersonalinfo001wb.updateduser = req.body.updateduser ? req.body.updateduser : subscriberpersonalinfo001wb.updateduser;
        subscriberpersonalinfo001wb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : subscriberpersonalinfo001wb.updateddatetime;

        subscriberpersonalinfo001wb.save(function (err, subscriberpersonalinfo001wb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating subscriberpersonalinfo001wb.',
                    error: err
                });
            }

            return res.json(subscriberpersonalinfo001wb);
        });
    });
});
/**
 * @swagger
 * /api/subscriberpersonalinfo001wb/{id}:
 *   delete:
 *    tags: [subscriberpersonalinfoworkbase]
 *    summary: Delete Method
 *    description: Delete the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */
app.delete('/api/subscriberpersonalinfo001wb/:id', (req, res) => {
    var id = req.params.id;
    Subscriberpersonalinfo001wb.findByIdAndRemove(id, function (err, subscriberpersonalinfo001wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the subscriberpersonalinfo001wb.',
                error: err
            });
        }

        return res.json({ message: 'Deleted Sucessfully' });
    });
});



// ********************** subscriberprofessionalinfo002wb schema method****************//
/** 
 * @swagger
 * components:
 *    schemas:
 *      subscriberprofessionalinfoworkbase:
 *            type: object
 *            properties:
 *             professionaldetails:
 *                 type: string
 *             job:
 *                 type: string    
 *             flex1:
 *                 type: string
 *             flex2:
 *                 type: string
 *             flex3:
 *                 type: string
 *             flex4:
 *                 type: string
 *             flex5:
 *                 type: string
 *             flex6:
 *                 type: string
 *             flex7:
 *                 type: string
 *             flex8:
 *                 type: string
 *             flex9:
 *                 type: string
 *             flex10:
 *                 type: string
 *             flex11:
 *                 type: string
 *             flex12:
 *                 type: string
 *             status:
 *                 type: string
 *             inserteduser:
 *                 type: string
 *             inserteddatetime:
 *                 type: string
 *             updateduser:
 *                 type: string
 *             updateddatetime:
 *                 type: string   
 */

// ********************** subscriberprofessionalinfo002wb get method****************//
/**
 * @swagger
 * /api/subscriberprofessionalinfo002wb:
 *   get:
 *     tags: [subscriberprofessionalinfoworkbase]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/subscriberprofessionalinfoworkbase'
 */

app.get('/api/subscriberprofessionalinfo002wb', (req, res) => {
    Subscriberprofessionalinfo002wb.find(function (err, subscriberprofessionalinfo002wbs) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting subscriberprofessionalinfo002wb.',
                error: err
            });
        }

        return res.json(subscriberprofessionalinfo002wbs);
    });
});

/**
 * @swagger
 * /api/subscriberprofessionalinfo002wb/{id}:
 *   get:
 *     tags: [subscriberprofessionalinfoworkbase]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/subscriberprofessionalinfoworkbase'
 */

app.get('/api/subscriberprofessionalinfo002wb/:id', (req, res) => {
    var id = req.params.id;
    Subscriberprofessionalinfo002wb.findOne({ _id: id }, function (err, subscriberprofessionalinfo002wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting subscriberprofessionalinfo002wb.',
                error: err
            });
        }

        if (!subscriberprofessionalinfo002wb) {
            return res.status(404).json({
                message: 'No such subscriberprofessionalinfo002wb'
            });
        }

        return res.json(subscriberprofessionalinfo002wb);
    });
});

/**
 * @swagger
 * /api/subscriberprofessionalinfo002wb/professional:
 *   post:
 *    tags: [subscriberprofessionalinfoworkbase]  
 *    summary: Post Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/subscriberprofessionalinfoworkbase'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */

app.post('/api/subscriberprofessionalinfo002wb/professional', (req, res) => {

    const subscriberprofessionalinfo002wb = new Subscriberprofessionalinfo002wb();
    subscriberprofessionalinfo002wb.professionaldetails = req.body.professionaldetails;
    subscriberprofessionalinfo002wb.job = req.body.job;
    subscriberprofessionalinfo002wb.flex1 = req.body.flex1;
    subscriberprofessionalinfo002wb.flex2 = req.body.flex2;
    subscriberprofessionalinfo002wb.flex3 = req.body.flex3;
    subscriberprofessionalinfo002wb.flex4 = req.body.flex4;
    subscriberprofessionalinfo002wb.flex5 = req.body.flex5;
    subscriberprofessionalinfo002wb.flex6 = req.body.flex6;
    subscriberprofessionalinfo002wb.flex7 = req.body.flex7;
    subscriberprofessionalinfo002wb.flex8 = req.body.flex8;
    subscriberprofessionalinfo002wb.flex9 = req.body.flex9;
    subscriberprofessionalinfo002wb.flex10 = req.body.flex10;
    subscriberprofessionalinfo002wb.flex11 = req.body.flex11;
    subscriberprofessionalinfo002wb.flex12 = req.body.flex12;
    subscriberprofessionalinfo002wb.inserteduser = req.body.inserteduser,
        subscriberprofessionalinfo002wb.inserteddatetime = req.body.inserteddatetime,
        subscriberprofessionalinfo002wb.updateduser = req.body.updateduser,
        subscriberprofessionalinfo002wb.updateddatetime = req.body.updateddatetime
    subscriberprofessionalinfo002wb.save()
        .then((result) => {
            return res.json({ message: 'subscriberprofessional created!' });
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
})
/**
 * @swagger
 * /api/subscriberprofessionalinfo002wb/{id}:
 *   put:
 *    tags: [subscriberprofessionalinfoworkbase]
 *    summary: Put Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                         $ref: '#/components/schemas/subscriberprofessionalinfoworkbase'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/subscriberprofessionalinfoworkbase'
 */

app.put('/api/subscriberprofessionalinfo002wb/:id', (req, res) => {
    var id = req.params.id;

    Subscriberprofessionalinfo002wb.findOne({ _id: id }, function (err, subscriberprofessionalinfo002wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting subscriberprofessionalinfo002wb',
                error: err
            });
        }

        if (!subscriberprofessionalinfo002wb) {
            return res.status(404).json({
                message: 'No such subscriberprofessionalinfo002wb'
            });
        }
        subscriberprofessionalinfo002wb.professionaldetails = req.body.professionaldetails ? req.body.professionaldetails : subscriberprofessionalinfo002wb.professionaldetails;
        subscriberprofessionalinfo002wb.job = req.body.job ? req.body.job : subscriberprofessionalinfo002wb.job;
        subscriberprofessionalinfo002wb.flex1 = req.body.flex1 ? req.body.flex1 : subscriberprofessionalinfo002wb.flex1;
        subscriberprofessionalinfo002wb.flex2 = req.body.flex2 ? req.body.flex2 : subscriberprofessionalinfo002wb.flex2;
        subscriberprofessionalinfo002wb.flex3 = req.body.flex3 ? req.body.flex3 : subscriberprofessionalinfo002wb.flex3;
        subscriberprofessionalinfo002wb.flex4 = req.body.flex4 ? req.body.flex4 : subscriberprofessionalinfo002wb.flex4;
        subscriberprofessionalinfo002wb.flex5 = req.body.flex5 ? req.body.flex5 : subscriberprofessionalinfo002wb.flex5;
        subscriberprofessionalinfo002wb.flex6 = req.body.flex6 ? req.body.flex6 : subscriberprofessionalinfo002wb.flex6;
        subscriberprofessionalinfo002wb.flex7 = req.body.flex7 ? req.body.flex7 : subscriberprofessionalinfo002wb.flex7;
        subscriberprofessionalinfo002wb.flex8 = req.body.flex8 ? req.body.flex8 : subscriberprofessionalinfo002wb.flex8;
        subscriberprofessionalinfo002wb.flex9 = req.body.flex9 ? req.body.flex9 : subscriberprofessionalinfo002wb.flex9;
        subscriberprofessionalinfo002wb.flex10 = req.body.flex10 ? req.body.flex10 : subscriberprofessionalinfo002wb.flex10;
        subscriberprofessionalinfo002wb.flex11 = req.body.flex11 ? req.body.flex11 : subscriberprofessionalinfo002wb.flex11;
        subscriberprofessionalinfo002wb.flex12 = req.body.flex12 ? req.body.flex12 : subscriberprofessionalinfo002wb.flex12;
        subscriberprofessionalinfo002wb.inserteduser = req.body.inserteduser ? req.body.inserteduser : subscriberprofessionalinfo002wb.inserteduser;
        subscriberprofessionalinfo002wb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : subscriberprofessionalinfo002wb.inserteddatetime;
        subscriberprofessionalinfo002wb.updateduser = req.body.updateduser ? req.body.updateduser : subscriberprofessionalinfo002wb.updateduser;
        subscriberprofessionalinfo002wb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : subscriberprofessionalinfo002wb.updateddatetime;
        subscriberprofessionalinfo002wb.save(function (err, subscriberprofessionalinfo002wb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating subscriberprofessionalinfo002wb.',
                    error: err
                });
            }

            return res.json(subscriberprofessionalinfo002wb);
        });
    });
});
/**
 * @swagger
 * /api/subscriberprofessionalinfo002wb/{id}:
 *   delete:
 *    tags: [subscriberprofessionalinfoworkbase]
 *    summary: Delete Method
 *    description: Delete the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */
app.delete('/api/subscriberprofessionalinfo002wb/:id', (req, res) => {
    var id = req.params.id;
    Subscriberprofessionalinfo002wb.findByIdAndRemove(id, function (err, subscriberprofessionalinfo002wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the subscriberprofessionalinfo002wb.',
                error: err
            });
        }

        return res.json({ message: 'Deleted Sucessfully' });
    });
});



// ********************** subscriptionmaster001mb schema method****************//
/** 
 * @swagger
 * components:
 *    schemas:
 *      subscriptionmaster:
 *            type: object
 *            properties:    
 *             subpname:
 *                 type: string  
 *             description:
 *                 type: string
 *             tenure:
 *                 type: string
 *             amount:
 *                 type: number
 *             status:
 *                 type: string
 *             discountflag:
 *                 type: boolean
 *             inserteduser:
 *                 type: string
 *             inserteddatetime:
 *                 type: string
 *             updateduser:
 *                 type: string
 *             updateddatetime:
 *                 type: string   
 */

// ********************** subscriptionmaster001mb get method****************//
/**
 * @swagger
 * /api/subscriptionmaster001mb:
 *   get:
 *     tags: [subscriptionmaster]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/subscriptionmaster'
 */

app.get('/api/subscriptionmaster001mb', (req, res) => {
    Subscriptionmaster001mb.find(function (err, subscriptionmaster001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting subscriptionmaster001mb.',
                error: err
            });
        }

        return res.json(subscriptionmaster001mb);
    });
});

/**
 * @swagger
 * /api/subscriptionmaster001mb/{id}:
 *   get:
 *     tags: [subscriptionmaster]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/subscriptionmaster'
 */

app.get('/api/subscriptionmaster001mb/:id', (req, res) => {
    var id = req.params.id;
    Subscriptionmaster001mb.findOne({ _id: id }, function (err, subscriptionmaster001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting subscriptionmaster001mb.',
                error: err
            });
        }

        if (!subscriptionmaster001mb) {
            return res.status(404).json({
                message: 'No such subscriptionmaster001mb'
            });
        }

        return res.json(subscriptionmaster001mb);
    });
});

/**
 * @swagger
 * /api/subscriptionmaster001mb/master:
 *   post:
 *    tags: [subscriptionmaster]  
 *    summary: Post Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/subscriptionmaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */

app.post('/api/subscriptionmaster001mb/master', (req, res) => {
    const subscriptionmaster001mb = new Subscriptionmaster001mb();
    subscriptionmaster001mb.subpname = req.body.subpname;
    subscriptionmaster001mb.description = req.body.description;
    subscriptionmaster001mb.tenure = req.body.tenure;
    subscriptionmaster001mb.amount = req.body.amount;
    subscriptionmaster001mb.status = req.body.status;
    subscriptionmaster001mb.discountflag = req.body.discountflag;
    subscriptionmaster001mb.inserteduser = req.body.inserteduser;
    subscriptionmaster001mb.inserteddatetime = req.body.inserteddatetime;
    subscriptionmaster001mb.updateduser = req.body.updateduser;
    subscriptionmaster001mb.updateddatetime = req.body.updateddatetime;
    subscriptionmaster001mb.save(function (err, subscriptionmaster001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when creating subscriptionmaster001mb',
                error: err
            });
        }

        return res.json("subscriptionmaster001mb created");
    });
})
/**
 * @swagger
 * /api/subscriptionmaster001mb/{id}:
 *   put:
 *    tags: [subscriptionmaster]
 *    summary: Put Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                         $ref: '#/components/schemas/subscriptionmaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/subscriptionmaster'
 */

app.put('/api/subscriptionmaster001mb/:id', (req, res) => {
    var id = req.params.id;

    Subscriptionmaster001mb.findOne({ _id: id }, function (err, subscriptionmaster001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting subscriptionmaster001mb',
                error: err
            });
        }

        if (!subscriptionmaster001mb) {
            return res.status(404).json({
                message: 'No such subscriptionmaster001mb'
            });
        }
        subscriptionmaster001mb.subpname = req.body.subpname ? req.body.subpname : subscriptionmaster001mb.subpname;
        subscriptionmaster001mb.description = req.body.description ? req.body.description : subscriptionmaster001mb.description;
        subscriptionmaster001mb.tenure = req.body.tenure ? req.body.tenure : subscriptionmaster001mb.tenure;
        subscriptionmaster001mb.amount = req.body.amount ? req.body.amount : subscriptionmaster001mb.amount;
        subscriptionmaster001mb.status = req.body.status ? req.body.status : subscriptionmaster001mb.status;
        subscriptionmaster001mb.discountflag = req.body.discountflag ? req.body.discountflag : subscriptionmaster001mb.discountflag;
        subscriptionmaster001mb.inserteduser = req.body.inserteduser ? req.body.inserteduser : subscriptionmaster001mb.inserteduser;
        subscriptionmaster001mb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : subscriptionmaster001mb.inserteddatetime;
        subscriptionmaster001mb.updateduser = req.body.updateduser ? req.body.updateduser : subscriptionmaster001mb.updateduser;
        subscriptionmaster001mb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : subscriptionmaster001mb.updateddatetime;

        subscriptionmaster001mb.save(function (err, subscriptionmaster001mb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating subscriptionmaster001mb.',
                    error: err
                });
            }

            return res.json(subscriptionmaster001mb);
        });
    });
});
/**
 * @swagger
 * /api/subscriptionmaster001mb/{id}:
 *   delete:
 *    tags: [subscriptionmaster]
 *    summary: Delete Method
 *    description: Delete the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */
app.delete('/api/subscriptionmaster001mb/:id', (req, res) => {
    var id = req.params.id;
    Subscriptionmaster001mb.findByIdAndRemove(id, function (err, subscriptionmaster001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the subscriptionmaster001mb.',
                error: err
            });
        }

        return res.json({ message: 'Deleted Sucessfully' });
    });
});

//-----------------user001wb schema method-----------------//
/** 
 * @swagger
 * components:
 *    schemas:                 
 *      usersworkbase:
 *           allOf:
 *            - $ref: '#/components/schemas/personmaster'
 *            - $ref: '#/components/schemas/loginmaster'
 *           type: object
 *           properties:
 *             employeeid:
 *                   type: number
 *             bankname:
 *                   type: string  
 *             accountnumber:
 *                   type: string
 *             insurance:
 *                   type: string  
 *             accounttype:
 *                   type: string
 *             status:
 *                   type: string   
 *             inserteduser:
 *                   type: string
 *             inserteddatetime:
 *                   type: string
 *             updateduser:
 *                   type: string
 *             updateddatetime:
 *                   type: string     
 *             personid:
 *                type: object 
 *                example: Automatically Generated from person001mb
 *                properties:
 *                    id:
 *                     type: string
 *             
 */
// ********************** users001wb get method****************//
/**
 * @swagger
 * /api/users001wb:
 *   get:
 *     tags: [usersworkbase]
 *     summary: Get Method
 *     description: Retrieve the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: failed 
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/usersworkbase'
 */

app.get('/api/users001wb', (req, res) => {
    Users001wb.find(function (err, users001wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting users001wb.',
                error: err
            });
        }
        return res.json(users001wb);
    });
});

/**
 * @swagger
 * /api/users001wb/verify:
 *   get:
 *     tags: [usersworkbase]
 *     summary: Get Method
 *     description: Get the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/usersworkbase'
 */
app.get('/api/users001wb/verify', async (req, res) => {
    const token = req.query.token;
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.verifydecode = decoded;
        const person = await Person001mb.findOne({ email: decoded.email, roleid: decoded.roleid, });
        if (person.verified) {
            return res.status(409).send({ message: " Account Verified Please Login" });
        } else {
            person.verified = true;
            person.save();
            return res.status(200).send({ message: "Account Verified" });
        }
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
});
/**
 * @swagger
 * /api/users001wb/{id}:
 *   get:
 *     tags: [usersworkbase]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed 
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/usersworkbase'
 */
app.get('/api/users001wb/:id', (req, res) => {
    var id = req.params.id;
    Users001wb.findOne({ _id: id }, function (err, users001wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting users001wb.',
                error: err
            });
        }
        if (!users001wb) {
            return res.status(404).json({
                message: 'No such users001wb'
            });
        }
        return res.json(users001wb);
    });
});
/**
 * @swagger
 * /api/users001wb/user:
 *   post:
 *    tags: [usersworkbase]
 *    summary: Post Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/usersworkbase'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */
app.post('/api/users001wb/user', async (req, res) => {
    const person001mb = new Person001mb();
    person001mb.subcatcode = req.body.subcatcode.id;
    person001mb.professionalid = req.body.professionalid.id;
    person001mb.categoryid = req.body.categoryid.id;
    person001mb.languageid = req.body.languageid.id;
    person001mb.personalid = req.body.personalid.id;
    person001mb.religionid = req.body.religionid.id;
    person001mb.classificationid = req.body.classificationid.id;
    person001mb.subscsubspid = req.body.subscsubspid.id;
    person001mb.regionalid = req.body.regionalid.id;
    person001mb.companycode = req.body.companycode.id;
    person001mb.countryid = req.body.countryid.id;
    person001mb.cityid = req.body.cityid.id;
    person001mb.stateid = req.body.stateid.id;
    person001mb.roleid = req.body.roleid.id;
    person001mb.firstname = req.body.firstname;
    person001mb.lasttname = req.body.lasttname;
    person001mb.zipcode = req.body.zipcode;
    person001mb.dob = req.body.dob;
    person001mb.confirmemail = req.body.confirmemail;
    person001mb.email = req.body.email;
    person001mb.subscname = req.body.subscname;
    person001mb.age = req.body.age;
    person001mb.verified = false;
    person001mb.sex = req.body.sex;
    person001mb.subscdesc = req.body.subscdesc;
    person001mb.aboutme = req.body.aboutme;
    person001mb.address = req.body.address;
    person001mb.phoneno = req.body.phoneno;
    person001mb.landline = req.body.landline;
    person001mb.inserteduser = req.body.inserteduser;
    person001mb.inserteddatetime = req.body.inserteddatetime;
    person001mb.updateduser = req.body.updateduser;
    person001mb.updateddatetime = req.body.updateddatetime;
    person001mb.status = req.body.status;

    if (!(person001mb.email && person001mb.firstname && person001mb.roleid)) {
        return res.status(402).json("Enter a Required Field");
    }
    const oldUser = await Person001mb.findOne({ email: person001mb.email, roleid: person001mb.roleid });
    if (oldUser) {
        return res.status(409).send("User Already Exist");
    }
    const token = jwt.sign({ email: person001mb.email, roleid: person001mb.roleid }, process.env.TOKEN_KEY,
        {
            expiresIn: "6h",
        }
    );
    person001mb.token = token;
    let person = await person001mb.save();

    const login001mb = new Login001mb()
    login001mb.username = req.body.username;
    login001mb.password = bcrypt.hashSync(req.body.password, 10);
    login001mb.roleid = req.body.roleid.id;
    login001mb.inserteduser = req.body.inserteduser;
    login001mb.inserteddatetime = req.body.inserteddatetime;
    login001mb.updateduser = req.body.updateduser;
    login001mb.status = req.body.status;
    login001mb.personid = person._id;
    await login001mb.save()


    const users001wb = new Users001wb();
    users001wb.personid = person._id;
    users001wb.employeeid = req.body.employeeid;
    users001wb.bankname = req.body.bankname;
    users001wb.accountnumber = req.body.accountnumber;
    users001wb.insurance = req.body.insurance;
    users001wb.accounttype = req.body.accounttype;
    users001wb.inserteduser = req.body.inserteduser;
    users001wb.inserteddatetime = req.body.inserteddatetime;
    users001wb.updateduser = req.body.updateduser;
    users001wb.status = req.body.status;
    await users001wb.save()

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'siriusmatrimoney@gmail.com',
            pass: 'omhwphrccuelcgsa'
        }
    });
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./src/templates'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./src/templates'),
        extName: ".handlebars"
    };
    transporter.use('compile', hbs(handlebarOptions))
    const mailOptions = {
        from: 'siriusmatrimoney@gmail.com',
        to: person001mb.email,
        subject: 'Sirius Matrimony Confirmation',
        template: 'mail',
        context: {
            name: "Sirius Matrimony",
            url: `https://siriusmatrimony.herokuapp.com/api/userscontroller/verify?token=${token}`
        }
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            return res.json({ message: 'email created!' });
    })
});
/**
 * @swagger
 * /api/users001wb/{personid}/{loginid}/{userid}:
 *   put:
 *    tags: [usersworkbase]
 *    summary: Put Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: personid
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *      - in: path
 *        name: loginid
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *      - in: path
 *        name: userid
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                         $ref: '#/components/schemas/usersworkbase'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed 
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/usersworkbase'
 */
app.put('/api/users001wb/:personid/:loginid/:userid', async (req, res) => {
    var personid = req.params.personid;
    var loginid = req.params.loginid;
    var userid = req.params.userid;
    const person001mb = await Person001mb.findOne({ _id: personid });
    if (person001mb) {
        person001mb.email = req.body.email ? req.body.email : person001mb.email;
        person001mb.personalid = req.body.personalid.id ? req.body.personalid.id : person001mb.personalid;
        person001mb.subcatcode = req.body.subcatcode.id ? req.body.subcatcode.id : person001mb.subcatcode;
        person001mb.professionalid = req.body.professionalid.id ? req.body.professionalid.id : person001mb.professionalid;
        person001mb.categoryid = req.body.categoryid.id ? req.body.categoryid.id : person001mb.categoryid;
        person001mb.languageid = req.body.languageid.id ? req.body.languageid.id : person001mb.languageid;
        person001mb.religionid = req.body.religionid.id ? req.body.religionid.id : person001mb.religionid;
        person001mb.classificationid = req.body.classificationid.id ? req.body.classificationid.id : person001mb.classificationid;
        person001mb.subscsubspid = req.body.subscsubspid.id ? req.body.subscsubspid.id : person001mb.subscsubspid;
        person001mb.regionalid = req.body.regionalid.id ? req.body.regionalid.id : person001mb.regionalid;
        person001mb.companycode = req.body.companycode.id ? req.body.companycode.id : person001mb.companycode;
        person001mb.cityid = req.body.cityid.id ? req.body.cityid.id : person001mb.cityid;
        person001mb.stateid = req.body.stateid.id ? req.body.stateid.id : person001mb.stateid;
        person001mb.roleid = req.body.roleid.id ? req.body.roleid.id : person001mb.roleid;
        person001mb.age = req.body.age ? req.body.age : person001mb.age;
        person001mb.sex = req.body.sex ? req.body.sex : person001mb.sex;
        person001mb.countryid = req.body.countryid.id ? req.body.countryid.id : person001mb.countryid;
        person001mb.address = req.body.address ? req.body.address : person001mb.address;
        person001mb.phoneno = req.body.phoneno ? req.body.phoneno : person001mb.phoneno;
        person001mb.inserteduser = req.body.inserteduser ? req.body.inserteduser : person001mb.inserteduser;
        person001mb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : person001mb.inserteddatetime;
        person001mb.updateduser = req.body.updateduser ? req.body.updateduser : person001mb.updateduser;
        person001mb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : person001mb.updateddatetime;
        person001mb.firstname = req.body.firstname ? req.body.firstname : person001mb.firstname;
        person001mb.lasttname = req.body.lasttname ? req.body.lasttname : person001mb.lasttname;
        person001mb.zipcode = req.body.zipcode ? req.body.zipcode : person001mb.zipcode;
        person001mb.dob = req.body.dob ? req.body.dob : person001mb.dob;
        person001mb.confirmemail = req.body.confirmemail ? req.body.confirmemail : person001mb.confirmemail;
        person001mb.landline = req.body.landline ? req.body.landline : person001mb.landline;
        person001mb.status = req.body.status ? req.body.status : person001mb.status;
        let person = person001mb.save();
        const login001mb = await Login001mb.findOne({ _id: loginid });
        login001mb.personid = person._id ? person._id : login001mb.personid;
        login001mb.username = req.body.username ? req.body.username : login001mb.username;
        login001mb.password = req.body.password ? bcrypt.hashSync(req.body.password, 10) : login001mb.password;
        login001mb.roleid = req.body.roleid.id ? req.body.roleid.id : login001mb.roleid;
        login001mb.status = req.body.status ? req.body.status : login001mb.status
        login001mb.inserteduser = req.body.inserteduser ? req.body.inserteduser : login001mb.inserteduser;
        login001mb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : login001mb.inserteddatetime;
        login001mb.updateduser = req.body.updateduser ? req.body.updateduser : login001mb.updateduser;
        login001mb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : login001mb.updateddatetime;
        login001mb.save();
        const users001wb = await Users001wb.findOne({ _id: userid });
        users001wb.employeeid = req.body.employeeid ? req.body.employeeid : users001wb.employeeid;
        users001wb.personid = person._id ? person._id : users001wb.personid;
        users001wb.bankname = req.body.bankname ? req.body.bankname : users001wb.bankname;
        users001wb.accountnumber = req.body.accountnumber ? req.body.accountnumber : users001wb.accountnumber;
        users001wb.insurance = req.body.insurance ? req.body.insurance : users001wb.insurance;
        users001wb.accounttype = req.body.accounttype ? req.body.accounttype : users001wb.accounttype;
        users001wb.save(function (err, users001wb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating users001wb.',
                    error: err
                });
            }

            return res.json('users001wb updated');
        });
    }
});
/**
 * @swagger
 * /api/users001wb/{personid}/{loginid}/{userid}:
 *   delete:
 *    tags: [usersworkbase]
 *    summary: Delete Method
 *    description: Delete the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: personid
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *      - in: path
 *        name: loginid
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *      - in: path
 *        name: userid
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed 
 */
app.delete('/api/users001wb/:personid/:loginid/:userid', async (req, res) => {
    var userid = req.params.userid;
    var loginid = req.params.loginid;
    var personid = req.params.personid;
    if (userid && loginid && personid) {
        console.log("testing", userid, loginid, personid)
        await Person001mb.findByIdAndRemove({ _id: personid });
        await Login001mb.findByIdAndRemove({ _id: loginid });
        await Users001wb.findByIdAndRemove({ _id: userid });
        return res.json('users001wb deleted');
    } else {
        return res.status(500).json({
            message: 'Error when deleting users001wb.',
            error: err
        });
    }
});

// ********************** payment001mb schema method****************//
/** 
 * @swagger
 * components:
 *    schemas:
 *      paymentmaster:
 *            type: object
 *            properties:    
 *             subpid:
 *                 type: object
 *                 properties:
 *                    id: 
 *                      type: string
 *             subcid:
 *                 type: object
 *                 properties:
 *                    id: 
 *                      type: string 
 *             payment:
 *                 type: string
 *             status:
 *                 type: string
 *             inserteduser:
 *                 type: string
 *             inserteddatetime:
 *                 type: string
 *             updateduser:
 *                 type: string
 *             updateddatetime:
 *                 type: string   
 */
// ********************** payment001mb get method****************//
/**
 * @swagger
 * /api/payment001mb:
 *   get:
 *     tags: [paymentmaster]
 *     summary: Get Method
 *     description: Retrieve the list of data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: failed 
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/paymentmaster'
 */

app.get('/api/payment001mb', (req, res) => {
    Payment001mb.find(function (err, payment001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting payment001mb.',
                error: err
            });
        }
        return res.json(payment001mb);
    });
});
/**
 * @swagger
 * /api/payment001mb/{id}:
 *   get:
 *     tags: [paymentmaster]
 *     summary: Retrieve a data by id.
 *     description: Retrieve a data by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed 
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/paymentmaster'
 */
app.get('/api/payment001mb/:id', (req, res) => {
    var id = req.params.id;
    Payment001mb.findOne({ _id: id }, function (err, payment001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting payment001mb.',
                error: err
            });
        }
        if (!payment001mb) {
            return res.status(404).json({
                message: 'No such payment001mb'
            });
        }
        return res.json(payment001mb);
    });
});

/**
 * @swagger
 * /api/payment001mb/payment:
 *   post:
 *    tags: [paymentmaster]
 *    summary: Post Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/paymentmaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed
 */
app.post('/api/payment001mb/payment', async (req, res) => {
    const payment001mb = new Payment001mb();
    payment001mb.subpid = req.body.subpid.id;
    payment001mb.subcid = req.body.subcid.id;
    payment001mb.payment = req.body.payment;
    payment001mb.status = req.body.status;
    payment001mb.inserteduser = req.body.inserteduser;
    payment001mb.inserteddatetime = req.body.inserteddatetime;
    payment001mb.updateduser = req.body.updateduser;
    payment001mb.updateddatetime = req.body.updateddatetime;
    Subscriberdetails001wb.findOne({ _id: payment001mb.subcid }, (err, user) => {
        if (user) {
            user.payid.push(payment001mb);
            user.save();
            payment001mb.save();
            return res.json({ message: 'payment001mb created!' });
        } else {
            return res.status(500).json({
                message: 'Error when creating payment001mb'
            });
        }

    });
});

/**
 * @swagger
 * /api/payment001mb/{id}:
 *   put:
 *    tags: [paymentmaster]
 *    summary: Put Method
 *    description: Retrieve the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *           type: string
 *    requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                       schema:
 *                         $ref: '#/components/schemas/paymentmaster'
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed 
 *         content:
 *             application/json:
 *                       schema:
 *                             $ref: '#/components/schemas/paymentmaster'
 */
app.put('/api/payment001mb/:id', (req, res) => {

    var id = req.params.id;

    Payment001mb.findOne({ _id: id }, function (err, payment001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting payment001mb',
                error: err
            });
        }

        if (!payment001mb) {
            return res.status(404).json({
                message: 'No such payment001mb'
            });
        }
        payment001mb.payment = req.body.payment ? req.body.payment : payment001mb.payment;
        payment001mb.subcid = req.body.subcid.id ? req.body.subcid.id : payment001mb.subcid;
        payment001mb.subpid = req.body.subpid.id ? req.body.subpid.id : payment001mb.subpid;
        payment001mb.status = req.body.status ? req.body.status : payment001mb.status;
        payment001mb.inserteduser = req.body.inserteduser ? req.body.inserteduser : payment001mb.inserteduser;
        payment001mb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : payment001mb.inserteddatetime;
        payment001mb.updateduser = req.body.updateduser ? req.body.updateduser : payment001mb.updateduser;
        payment001mb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : payment001mb.updateddatetime;
        payment001mb.save(function (err, payment001mb) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating payment001mb.',
                    error: err
                });
            }

            return res.json(payment001mb);
        });
    });
});

/**
 * @swagger
 * /api/payment001mb/{id}:
 *   delete:
 *    tags: [paymentmaster]
 *    summary: Delete Method
 *    description: Delete the list of data
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Sucess
 *       500:
 *         description: failed 
 */
app.delete('/api/payment001mb/:id', (req, res) => {
    var id = req.params.id;
    Payment001mb.findByIdAndRemove(id, function (err, payment001mb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the payment001mb.',
                error: err
            });
        }
        return res.json({ message: 'Deleted successfully' });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './src/public/dist/sirius/index.html'));
});