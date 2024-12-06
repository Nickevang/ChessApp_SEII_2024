'use strict';

var utils = require('../utils/writer.js');
var Classroom = require('../service/ClassroomService');

'use strict';

module.exports.getClassroom = function getClassroom(req, res, next, groupID) {
  Classroom.getClassroom(groupID)
    .then(function (response) {
      // If the classroom exists, send it back with status 200
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      // Check if the error is a "not found" case
      if (error.code === 404) {
        // Send a 404 error with an appropriate message if the groupID is not found
        res.status(404).json({
          message: "Response code 404 (Not Found): groupID does not exist"
        });
      } else if (error.code == 400) {
        // Send a 400 error with an appropriate message if the groupID is not integer
        res.status(400).json({
          message: "request.params.groupID should be integer"
        });
      }
      else {
        // Handle other errors
        res.status(500).json({
          message: "Internal Server Error: " + error.message
        });
      }
    });
};

module.exports.updateClassroom = function updateClassroom(req, res, next, body, groupID) {
  Classroom.updateClassroom(body, groupID)
    .then(function (response) {
      // If the classroom is updated successfully, send it back with status 200
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
        // Send a 400 error for validation issues, like invalid groupID or body
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



/*
module.exports.groupGroupIDClassroomSetEditorPOST = function groupGroupIDClassroomSetEditorPOST (req, res, next, body, groupID) {
  Classroom.groupGroupIDClassroomSetEditorPOST(body, groupID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateClassroom = function updateClassroom (req, res, next, body, groupID) {
  Classroom.updateClassroom(body, groupID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
*/