'use strict';

var utils = require('../utils/writer.js');
var Student = require('../service/StudentService');

module.exports.getStudent = function getStudent (req, res, next, studentID) {
  Student.getStudent(studentID)
    .then(function (response) {
      utils.writeJson(res, response);  // Send the student data back
    })
    .catch(function (error) {
      // Handle error based on statusCode and send the appropriate response
      if (error.statusCode) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        // Generic error handler
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });
};
