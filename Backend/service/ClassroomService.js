'use strict';

/**
 * Get classroom by ID
 * FR8 - The group participants must be able to join the classroom
 *
 * groupID Long Classroom ID to get
 * returns Classroom
 **/

const utils = require("../utils/writer.js"); 

// Tests for GET classroom
exports.getClassroom = function (groupID) {
  return new Promise((resolve, reject) => {
    // Check if the groupID is integer and non-negative
    if (!Number.isInteger(groupID) || groupID < 0) {
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
 * Update the classroom
 * FR12 - The coach must be able to change who has the permission to edit the chessboard
 *
 * body Classroom Classroom object with the updated user list and/or editing permission owner
 * groupID Long 
 * returns Classroom
 **/

// Test for update (PUT) classroom
exports.updateClassroom = function (body, groupID) {
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
    }
  };
  return new Promise((resolve, reject) => {
    // Check if the groupID is integer and non-negative
    if (!Number.isInteger(groupID) || groupID < 0) {
      return reject({
        code: 400
      });
    }

    // Check if the editingStudentID is integer and non-negative
    if (!Number.isInteger(body.editingStudentID) || body.editingStudentID < 0) {
      return reject({
        code: 400
      });
    }

    // Check if users is not an array or it contains elements that are not non-negative numbers
    if (!Array.isArray(body.users) || !body.users.every(user => typeof user === 'number' && user >= 0)) {
      return reject({
        code: 400
      });
    }

    // Check if the classroom exists for the given groupID
    const classroomExists = classroomData[groupID];
    if (classroomExists) {
      // Update the new classroom data
      classroomData[groupID].editingStudentID = body.editingStudentID;
      classroomData[groupID].users = body.users;
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

// Test for update (POST) classroom editingstudent's id
exports.groupGroupIDClassroomSetEditorPOST = function(body,groupID) {
  // Dummy data
  const classroomData = {
    1: {
      editingStudentID: 6,
      id: 1,
      users: [1, 2, 3, 5, 6],
    },
    2: {
      editingStudentID: 7,
      id: 2,
      users: [7, 8, 9],
    }
  };
  
  return new Promise(function(resolve, reject)  {
    // Check if the groupID is integer and non-negative
    if (!Number.isInteger(groupID) || groupID < 0) {
      return reject({
        code: 400
      });
    }

    // Check if the editing StudentID is integer
    if (!Number.isInteger(body.studentID)) {
      return reject({
        code: 400
      });
    }

    // Check if the classroom exists for the given groupID
    const classroomExists = classroomData[groupID];
    if (!classroomExists) {
      return reject({
        code: 404
      });
    }

    // Check if the studentID is included in users
    if (!classroomExists.users.includes(body.studentID)) {
      return reject({
        code: 422
      });
    }

    // Update the new classroom data
    classroomExists.editingStudentID = body.studentID;
    resolve(classroomExists); // Return the updated data for the specific groupID
  });
};
