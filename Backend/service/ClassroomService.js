'use strict';


/**
 * Get classroom by ID
 * FR8 - The group participants must be able to join the classroom
 *
 * groupID Long Classroom ID to get
 * returns Classroom
 **/
exports.getClassroom = function(groupID) {
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

