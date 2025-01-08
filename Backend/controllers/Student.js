'use strict';

const utils = require('../utils/writer.js');
const Student = require('../service/StudentService');

/**
 * Retrieves student details based on studentID.
 */
module.exports.getStudent = function getStudent(_req, res, _next, studentID) {
  Student.getStudent(studentID)
    .then((response) => {
      // Send the student details with status 200
      utils.writeJson(res, response);
    })
    .catch((error) => {
      if (error.statusCode) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    });
};
