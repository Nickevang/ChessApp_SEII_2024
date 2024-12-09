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
    .catch(function (error) {
      // Handle specific error codes
      if (error.code === 404) {
        // Send a 404 error if the groupID is not found
        res.status(404).json({
          message: "Response code 404 (Not Found): groupID does not exist",
        });
      } else if (error.code === 400) {
        // Send a 400 error for Bad Request
        res.status(400).json({
          message: "Invalid request",
        });
      } else {
        // Handle other errors
        res.status(500).json({
          message: "Internal Server Error: " + error.message,
        });
      }
    });
};

module.exports.enrollStudent = function enrollStudent (req, res, next, body) {
  Group.enrollStudent(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      console.log(error.code)
      // Handle specific error codes
      if (error.code === 404) {
        // Send a 404 error if the groupID or student ID is not found
        res.status(404).json({
          message: "Response code 404 (Not Found): groupID or student ID does not exist",
        });
      } else if (error.code === 400) {
        // Send a 400 error for Bad Request
        res.status(400).json({
          message: "Invalid request",
        });
      } else if (error.code === 409) {
        // Send a 409 error for already enrolled student
        res.status(409).json({
          message: "Student is already enrolled in this group.",
        });
      } else if (error.code === 403) {
        // Send a 403 error if group is full
        res.status(403).json({
          message: "Group is full. Cannot enroll more members.",
        });
      } else {
        // Handle other errors
        res.status(500).json({
          message: "Internal Server Error: " + error.message,
        });
      }
    });
};

module.exports.findAvailableGroups = function findAvailableGroups (req, res, next, price_min, price_max, level, sortBy) {
  Group.findAvailableGroups(price_min, price_max, level, sortBy)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
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
