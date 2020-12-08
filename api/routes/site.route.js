// permission.route.js

const express = require('express');
const app = express();
const siteRoutes = express.Router();


// Require permission model in our routes module
let Site = require('../models/Site');

// Defined store route
siteRoutes.route('/add').post(async function(req, res) {
    let check = await Site.findOne({ projectName: req.body.projectName, siteName: req.body.siteName }).lean()

    if (!check) {
        let saveStatus = new Site(req.body);
        saveStatus.save()
            .then(saveStatus => {
                res.status(200).json({ status: 'success', message: 'Site has been added successfully' });
            })
            .catch(err => {
                res.status(500).json({ message: 'unable to save to database' });
            });
    } else {
        res.status(422).send({
            status: 'fail',
            message: 'Already exists'
        })
    }
});

// Defined get data(index or listing) route
siteRoutes.route('/').get(function(req, res) {
    Site.find(function(err, sites) {
        if (err) {
            console.log(err);
        } else {
            return res.status(200).json(sites);
        }
    });
});

// Defined edit route
siteRoutes.route('/edit/:id').get(function(req, res) {
    let id = req.params.id;
    Site.findById(id, function(err, sites) {
        return res.status(200).json(sites);
    });
});

//  Defined update route
siteRoutes.route('/update/:id').post(function(req, res) {
    Site.findById(req.params.id, function(err, sites) {
        if (!sites)
            res.status(404).send("Record not found");
        else {
            sites.projectName = req.body.projectName;
            sites.siteName = req.body.siteName;
            sites.latitude = req.body.latitude;
            sites.longitude = req.body.longitude;

            sites.save().then(sites => {
                    res.status(200).json({ status: 'success', message: 'Site has been updated' });
                })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

siteRoutes.route('/view/:projectName').get(function(req, res) {

    let projectName = req.params.projectName;

    Site.find({ projectName: projectName }, function(err, sites) {
        // Return if cvsValue not found in database:
        if (err) throw err;
        else return res.status(200).json(sites);
    })
});

module.exports = siteRoutes;