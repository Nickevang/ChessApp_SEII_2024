'use strict';

const utils = require('../utils/writer.js');
const Classroom = require('../service/ClassroomService');

/**
 * Retrieves classroom details based on groupID.
 */
module.exports.getClassroom = function getClassroom(_req, res, _next, groupID) {
  Classroom.getClassroom(groupID)
    .then((response) => {
      // Send the classroom details with status 200
      utils.writeJson(res, response);
    })
    .catch((error) => {
      // Handle specific error codes
      if (error.code === 404) {
        res.status(404).json({
          message: "Response code 404 (Not Found): groupID does not exist",
        });
      } else if (error.code == 400) {
        res.status(400).json({
          message: "request.params.groupID should be integer",
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error: " + error.message,
        });
      }
    });
};

/**
 * Updates classroom details for the specified groupID.
 */
module.exports.updateClassroom = function updateClassroom(_req, res, _next, body, groupID) {
  Classroom.updateClassroom(body, groupID)
    .then((response) => {
      // Send the updated classroom details with status 200
      utils.writeJson(res, response);
    })
    .catch((error) => {
      if (error.code === 404) {
        res.status(404).json({
          message: "Response code 404 (Not Found): groupID does not exist",
        });
      } else if (error.code === 400) {
        res.status(400).json({
          message: "Invalid request",
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error: " + error.message,
        });
      }
    });
};

/**
 * Sets the editor for the classroom associated with the given groupID.
 */
module.exports.groupGroupIDClassroomSetEditorPOST = function groupGroupIDClassroomSetEditorPOST(
  _req,
  res,
  _next,
  body,
  groupID
) {
  Classroom.groupGroupIDClassroomSetEditorPOST(body, groupID)
    .then((response) => {
      // Send the updated editor details with status 200
      utils.writeJson(res, response);
    })
    .catch((error) => {
      if (error.code === 404) {
        res.status(404).json({
          message: "Response code 404 (Not Found): groupID does not exist",
        });
      } else if (error.code === 400) {
        res.status(400).json({
          message: "Invalid request",
        });
      } else if (error.code === 422) {
        res.status(422).json({
          message: "This studentID doesn not belong to any member of the classroom",
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error: " + error.message,
        });
      }
    });
};
