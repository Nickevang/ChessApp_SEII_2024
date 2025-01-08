'use strict';

/**
 * Get student by ID
 * studentID Long Student ID to get
 * returns Student
 **/
exports.getStudent = function(studentID) {
  return new Promise(function(resolve, reject) {
    // Validate if studentID is an integer
    if (!Number.isInteger(studentID)) {
      return reject({
        statusCode: 400,
        message: 'studentID should be an integer'
      });
    }

    // Validate if studentID is a positive number
    if (studentID < 1) {
      return reject({
        statusCode: 400,
        message: 'studentID should be a positive integer'
      });
    }

    // Mock data (replace with actual DB logic or data)
    const students = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ];

    // Look for the student with the given ID
    const student = students.find(s => s.id === studentID);

    // If the student is not found, return a 404 error
    if (!student) {
      return reject({
        statusCode: 404,
        message: 'studentID does not exist'
      });
    }

    // Return the student if found
    resolve(student);
  });
}
