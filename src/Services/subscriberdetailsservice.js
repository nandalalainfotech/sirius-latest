import db from "../models/main.js";

import nodemailer from "nodemailer";

import hbs from "nodemailer-express-handlebars";

import path from "path";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

const Login001mb = db.login001mb;

const Person001mb = db.person001mb

const Subscriberdetails001wb = db.subscriberdetails001wb

export const list = async (req, res) => {
    Subscriberdetails001wb.find(function (err, subscriberdetails001wb) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting subscriberdetails001wb.',
                error: err
            });
        }

        return res.json(subscriberdetails001wb);
    });
};

export const show = async (req, res) => {
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
};


export const create = async (req, res) => {
  
    

    const subscriberdetails001wb = new Subscriberdetails001wb();
    subscriberdetails001wb.payid = req.body.payid;
    subscriberdetails001wb.subpid = req.body.subpid;
    subscriberdetails001wb.personid = req.body.personid;
    subscriberdetails001wb.contentid = req.body.contentid;
    subscriberdetails001wb.horoscope = req.body.horoscope;
    subscriberdetails001wb.subscdesc = req.body.subscdesc;
    subscriberdetails001wb.subscapproval = req.body.subscapproval;
    subscriberdetails001wb.approvedby = req.body.approvedby;
    subscriberdetails001wb.approvedon = req.body.approvedon;
    subscriberdetails001wb.inserteduser = req.body.inserteduser;
    subscriberdetails001wb.inserteddatetime = req.body.inserteddatetime;
    subscriberdetails001wb.updateduser = req.body.updateduser;
    subscriberdetails001wb.updateddatetime = req.body.updateddatetime;
    subscriberdetails001wb.save()
      .then((result) => {
        return res.json({ message: "Subscription Master Details created!" });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });

};

export const verify = async (req, res) => {
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
};

export const update = async (req, res) => {
  
    var id = req.body._id;

    Subscriberdetails001wb.findOne({ _id: id },function (err, subscriberdetails001wb) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting subscriberdetails001wb",
            error: err,
          });
        }
  
        if (!subscriberdetails001wb) {
          return res.status(404).json({
            message: "No such subscriberdetails001wb",
          });
        }
        subscriberdetails001wb.horoscope = req.body.horoscope ? req.body.horoscope: subscriberdetails001wb.horoscope;
        subscriberdetails001wb.subscdesc = req.body.subscdesc ? req.body.subscdesc: subscriberdetails001wb.subscdesc;
        subscriberdetails001wb.subscapproval = req.body.subscapproval ? req.body.subscapproval: subscriberdetails001wb.subscapproval;
        subscriberdetails001wb.approvedon = req.body.approvedon ? req.body.approvedon : subscriberdetails001wb.approvedon;
        subscriberdetails001wb.approvedby = req.body.approvedby ? req.body.approvedby: subscriberdetails001wb.approvedby;

        subscriberdetails001wb.inserteduser = req.body.inserteduser ? req.body.inserteduser : subscriberdetails001wb.inserteduser;
        subscriberdetails001wb.inserteddatetime = req.body.inserteddatetime ? req.body.inserteddatetime : subscriberdetails001wb.inserteddatetime;
        subscriberdetails001wb.updateduser = req.body.updateduser ? req.body.updateduser : subscriberdetails001wb.updateduser;
        subscriberdetails001wb.updateddatetime = req.body.updateddatetime ? req.body.updateddatetime : subscriberdetails001wb.updateddatetime;
  
        subscriberdetails001wb.save(function (err, subscriberdetails001wb) {
          if (err) {
            return res.status(500).json({
              message: "Error when updating subscriberdetails001wb.",
              error: err,
            });
          }
  
          return res.json(subscriberdetails001wb);
        });
      }
    );
};


export const remove = async (req, res) => {

    var id = req.params._id;

    Subscriberdetails001wb.findByIdAndRemove(id,function (err, subscriberdetails001wb) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the subscriberdetails001wb.",
          error: err,
        });
      }

      return res.json({ message: "Deleted Sucessfully" });
    }
  );
};
