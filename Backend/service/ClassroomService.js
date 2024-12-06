'use strict';

/**
 * Get classroom by ID
 * FR8 - The group participants must be able to join the classroom
 *
 * groupID Long Classroom ID to get
 * returns Classroom
 **/

const utils = require("../utils/writer.js"); 


exports.getClassroom = function (groupID, response) {
  return new Promise((resolve, reject) => {
    // Check if the groupID is integer
    if (!Number.isInteger(groupID)) {
      return reject({
        code: 400
      })
    }

    // Dummy data
    const classroomData = {
      1: {
        editingStudentID: 6,
        id: 1,
        users: [1, 2, 3],
      },
      2: {
        editingStudentID: 7,
        id: 2,
        users: [4, 5, 6],
      },
    };
    
    // Check if the classroom exists for the given groupID
    const classroomExists = classroomData[groupID];
    if (classroomExists) {
      resolve(classroomData[groupID]); // Return only the data for the specific groupID
    } else {
      return reject({
        code: 404
      });
    }
  });
};


/**
 * Update studentID of the student who is allowed to edit the chessboard
 * FR10 - The coach must be able to change the ID of the student in control of the Chessboard
 *
 * body Classroom_setEditor_body JSON object with the studentID
 * groupID Long Classroom ID for the specific group
 * no response value expected for this operation
 **/
exports.groupGroupIDClassroomSetEditorPOST = function(body,groupID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update the classroom
 * FR12 - The coach must be able to change who has the permission to edit the chessboard
 *
 * body Classroom Classroom object with the updated user list and/or editing permission owner
 * groupID Long 
 * returns Classroom
 **/
exports.updateClassroom = function(body,groupID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "editingStudentID" : 6,
  "id" : 0,
  "users" : [ 1, 1 ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

