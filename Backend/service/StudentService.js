'use strict';


/**
 * Get student by ID
 *
 * studentID Long Student ID to get
 * returns Student
 **/
exports.getStudent = function(studentID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "name",
  "id" : 1
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

