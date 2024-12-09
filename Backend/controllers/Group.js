'use strict';

var utils = require('../utils/writer.js');
var Group = require('../service/GroupService');

module.exports.createGroup = function createGroup (req, res, next, body) {
  Group.createGroup(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteGroup = function deleteGroup (req, res, next, groupID) {
  Group.deleteGroup(groupID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.enrollStudent = function enrollStudent (req, res, next, body) {
  Group.enrollStudent(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findAvailableGroups = function findAvailableGroups (req, res, next, price_min, price_max, level, sortBy) {
  Group.findAvailableGroups(price_min, price_max, level, sortBy)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      // Check if the error is a "not found" case
      if (error.code === 404) {
        // Send a 404 error with an appropriate message if coachID is not found
        res.status(404).json({message: "Groups not found"});
      } else if (error.code === 400) {
        // Send a 400 error with an appropriate message if coachID is not integer
        res.status(400).json({message: "Input is missing or faulty"});
      }
      else {
        // Handle other errors
        res.status(500).send({
          message: "Internal Server Error: " + error.message
        });
      }
    });
};

module.exports.getGroup = function getGroup (req, res, next, groupID) {
  Group.getGroup(groupID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.unenrollStudent = function unenrollStudent (req, res, next, body) {
  Group.unenrollStudent(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
