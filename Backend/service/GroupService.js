'use strict';


/**
 * Create a new group
 *
 * body GroupIn FR1 - The coach must be able to create groups
 * returns GroupOut
 **/
exports.createGroup = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "maxMembers" : 6,
  "groupID" : 0,
  "members" : [ {
    "name" : "name",
    "id" : 1
  }, {
    "name" : "name",
    "id" : 1
  } ],
  "name" : "name"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a group
 * FR2 - The coach must be able to delete groups
 *
 * groupID Long Group ID to delete
 * no response value expected for this operation
 **/
exports.deleteGroup = function(groupID) {
  // Dummy group data
  const groupData = {
    1: {
      name: "Group 1",
      maxMembers: 6,
      groupID: 1,
      members: [
        { name: "Nancy Brown", id: 1 },
        { name: "Emma Weasly", id: 2 }
      ]
    },
    2: {
      name: "Group 2",
      maxMembers: 4,
      groupID: 2,
      members: [
        { name: "James Stone", id: 3 },
        { name: "Sandy Rivers", id: 4 }
      ]
    }
  };

  return new Promise(function(resolve, reject) {
    // Check if the groupID is an integer and non-negative
    if (!Number.isInteger(groupID) || groupID < 0) {
      return reject({
        code: 400,
        message: "Invalid groupID. Must be a non-negative integer."
      });
    }

    // Check if the group exists for the given groupID
    const groupExists = groupData[groupID];
    if (!groupExists) {
      return reject({
        code: 404,
        message: "Group not found."
      });
    }

    // Delete group and return the deleted data
    const deletedGroup = groupExists;
    delete groupData[groupID];
    resolve(deletedGroup);
  });
};


/**
 * Enroll a student in a group
 * FR5 - The student must be able to enroll in an available group
 *
 * body Groups_enroll_body JSON object with the studentID and groupID
 * returns groups_enroll_body
 **/
exports.enrollStudent = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "studentID" : 0,
  "groupID" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find available groups
 * FR3, FR4 - The student must be able to see a list of available groups, and filter them by their attributes
 *
 * price_min Long Min price value that needs to be considered for filtering (optional)
 * price_max Long Max price value that needs to be considered for filtering (optional)
 * level String Level that needs to be considered for filtering (optional)
 * sortBy String Sorting method that needs to be considered for filtering (optional)
 * returns List
 **/
exports.findAvailableGroups = function(price_min,price_max,level,sortBy) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "maxMembers" : 6,
  "groupID" : 0,
  "members" : [ {
    "name" : "name",
    "id" : 1
  }, {
    "name" : "name",
    "id" : 1
  } ],
  "name" : "name"
}, {
  "maxMembers" : 6,
  "groupID" : 0,
  "members" : [ {
    "name" : "name",
    "id" : 1
  }, {
    "name" : "name",
    "id" : 1
  } ],
  "name" : "name"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get group by ID
 * FR6 - The user must be able to see the groups they are in
 *
 * groupID Long Group ID to get
 * returns GroupOut
 **/
exports.getGroup = function(groupID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "maxMembers" : 6,
  "groupID" : 0,
  "members" : [ {
    "name" : "name",
    "id" : 1
  }, {
    "name" : "name",
    "id" : 1
  } ],
  "name" : "name"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Unenroll a student from a group
 * FR7 - The student must be able to leave a group
 *
 * body Groups_unenroll_body JSON object with the studentID and groupID
 * returns GroupOut
 **/
exports.unenrollStudent = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "maxMembers" : 6,
  "groupID" : 0,
  "members" : [ {
    "name" : "name",
    "id" : 1
  }, {
    "name" : "name",
    "id" : 1
  } ],
  "name" : "name"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

