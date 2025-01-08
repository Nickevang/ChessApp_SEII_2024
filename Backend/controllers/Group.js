'use strict';

const utils = require('../utils/writer.js');
const Group = require('../service/GroupService');

/**
 * Creates a new group.
 */
module.exports.createGroup = function createGroup(_req, res, _next, body) {
  Group.createGroup(body)
    .then((response) => {
      // Send the newly created group details with status 200
      utils.writeJson(res, response);
    })
    .catch((response) => {
      // Handle error response
      utils.writeJson(res, response);
    });
};

/**
 * Deletes a group based on groupID.
 */
module.exports.deleteGroup = function deleteGroup(_req, res, _next, groupID) {
  Group.deleteGroup(groupID)
    .then((response) => {
      // Send success response with status 200
      utils.writeJson(res, response);
    })
    .catch((error) => {
      if (error.code === 404) {
        res.status(404).json({
          message: "Response code 404 (Not Found): groupID does not exist",
        });
      } else if (error.code === 400) {
        res.status(400).json({ message: "Invalid request" });
      } else {
        res.status(500).json({
          message: "Internal Server Error: " + error.message,
        });
      }
    });
};

/**
 * Enrolls a student in a group.
 */
module.exports.enrollStudent = function enrollStudent(_req, res, _next, body) {
  Group.enrollStudent(body)
    .then((response) => {
      utils.writeJson(res, response);
    })
    .catch((error) => {
      if (error.code === 404) {
        res.status(404).json({
          message: "Response code 404 (Not Found): groupID or student ID does not exist",
        });
      } else if (error.code === 400) {
        // Send a 400 error for Bad Request
        res.status(400).json({
          message: "Invalid request",
        });
      } else if (error.code === 409) {
        res.status(409).json({
          message: "Student is already enrolled in this group.",
        });
      } else if (error.code === 403) {
        res.status(403).json({
          message: "Group is full. Cannot enroll more members.",
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error: " + error.message,
        });
      }
    });
};

/**
 * Finds available groups based on provided filters.
 */
module.exports.findAvailableGroups = function findAvailableGroups(
  _req,
  res,
  _next,
  price_min,
  price_max,
  level,
  sortBy
) {
  Group.findAvailableGroups(price_min, price_max, level, sortBy)
    .then((response) => {
      // Send the list of available groups with status 200
      utils.writeJson(res, response);
    })
    .catch((error) => {
      if (error.code === 404) {
        // No groups found matching the criteria
        res.status(404).json({ message: "Groups not found" });
      } else if (error.code === 400) {
        // Invalid input provided
        res.status(400).json({ message: "Input is missing or faulty" });
      } else {
        // Generic server error
        res.status(500).send({
          message: "Internal Server Error: " + error.message,
        });
      }
    });
};

/**
 * Retrieves group details based on groupID.
 */
module.exports.getGroup = function getGroup(_req, res, _next, groupID) {
  Group.getGroup(groupID)
    .then((response) => {
      // Send the group details with status 200
      utils.writeJson(res, response);
    })
    .catch((error) => {
      if (error.code === 404) {
        // Group not found
        res.status(404).json({
          message: "Response code 404 (Not Found): Group not found.",
        });
      } else if (error.code === 400) {
        // Invalid groupID
        res.status(400).json({
          message: "request.params.groupID should be integer",
        });
      } else {
        // Generic server error
        res.status(500).json({
          message: "Internal Server Error: " + error.message,
        });
      }
    });
};

/**
 * Unenrolls a student from a group.
 */
module.exports.unenrollStudent = function unenrollStudent(_req, res, _next, body) {
  Group.unenrollStudent(body)
    .then((response) => {
      // Send success response with status 200
      utils.writeJson(res, response);
    })
    .catch((response) => {
      // Handle error response
      utils.writeJson(res, response);
    });
};
