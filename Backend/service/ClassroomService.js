'use strict';

const utils = require("../utils/writer.js");

/**
 * Retrieves a classroom by its ID.
 * groupID - The ID of the classroom to retrieve.
 */
exports.getClassroom = function (groupID) {
  return new Promise((resolve, reject) => {
    // Validate groupID: Must be a non-negative integer
    if (!Number.isInteger(groupID) || groupID < 0) {
      return reject({ code: 400 });
    }

    // Mock classroom data
    const classroomData = {
      1: { editingStudentID: 6, id: 1, users: [1, 2, 3] },
      2: { editingStudentID: 7, id: 2, users: [4, 5, 6] },
    };

    const classroom = classroomData[groupID];
    if (classroom) {
      resolve(classroom); // Return classroom data
    } else {
      reject({ code: 404 }); // Classroom not found
    }
  });
};

/**
 * Updates a classroom's data.
 * body - The updated classroom data (users and editingStudentID).
 * groupID - The ID of the classroom to update.
 */
exports.updateClassroom = function (body, groupID) {
  const classroomData = {
    1: { editingStudentID: 6, id: 1, users: [1, 2, 3] },
    2: { editingStudentID: 7, id: 2, users: [4, 5, 6] },
  };

  return new Promise((resolve, reject) => {
    // Validate groupID: Must be a non-negative integer
    if (!Number.isInteger(groupID) || groupID < 0) {
      return reject({ code: 400 });
    }

    // Validate editingStudentID: Must be a non-negative integer
    if (!Number.isInteger(body.editingStudentID) || body.editingStudentID < 0) {
      return reject({ code: 400 });
    }

    // Validate users: Must be an array of non-negative integers
    if (!Array.isArray(body.users) || !body.users.every(user => typeof user === 'number' && user >= 0)) {
      return reject({ code: 400 });
    }

    const classroom = classroomData[groupID];
    if (classroom) {
      // Update classroom data
      classroom.editingStudentID = body.editingStudentID;
      classroom.users = body.users;
      resolve(classroom); // Return updated classroom
    } else {
      reject({ code: 404 }); // Classroom not found
    }
  });
};

/**
 * Updates the editing student ID for a specific classroom.
 * body - JSON object containing the new editing student's ID (`studentID`).
 * groupID - The ID of the classroom to update.
 */
exports.groupGroupIDClassroomSetEditorPOST = function (body, groupID) {
  const classroomData = {
    1: { editingStudentID: 6, id: 1, users: [1, 2, 3, 5, 6] },
    2: { editingStudentID: 7, id: 2, users: [7, 8, 9] },
  };

  return new Promise((resolve, reject) => {
    // Validate groupID: Must be a non-negative integer
    if (!Number.isInteger(groupID) || groupID < 0) {
      return reject({ code: 400 });
    }

    // Validate studentID: Must be a non-negative integer
    if (!Number.isInteger(body.studentID)) {
      return reject({ code: 400 });
    }

    const classroom = classroomData[groupID];
    if (!classroom) {
      return reject({ code: 404 }); // Classroom not found
    }

    // Validate that studentID is part of the classroom's users
    if (!classroom.users.includes(body.studentID)) {
      return reject({ code: 422 }); // Student not part of the classroom
    }

    // Update the editing student ID
    classroom.editingStudentID = body.studentID;
    resolve(classroom); // Return updated classroom data
  });
};
