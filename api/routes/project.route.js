// permission.route.js

const express = require('express');
const app = express();
const projectRoutes = express.Router();


// Require permission model in our routes module
let Project = require('../models/Project');

// Defined store route
projectRoutes.route('/add').post(async function(req, res) {

    let isSlotExists = await Project.findOne({ projectName: req.body.projectName }).lean()

    if (!isSlotExists) {
        let saveSatus = new Project(req.body);
        saveSatus.save()
            .then(saveSatus => {
                res.status(200).json({
                    status: 'success',
                    message: 'Project has been added successfully'
                });
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });

    } else {

        res.status(422).send({
            status: 'fail',
            message: 'Project already exists'
        })
    }


});

// Defined get data(index or listing) route
projectRoutes.route('/').get(function(req, res) {
    Project.find(function(err, projects) {
        if (err) {
            console.log(err);
        } else {
            return res.status(200).json(projects);
        }
    });
});


module.exports = projectRoutes;