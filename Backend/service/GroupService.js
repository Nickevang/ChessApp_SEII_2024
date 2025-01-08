'use strict';
// Dummy group data
const groupData = {
  1: {
    name: "Group 1",
    maxMembers: 2,
    groupID: 1,
    members: [
      { name: "Nancy Brown", id: 1 },
      { name: "Emma Weasly", id: 2 }
    ]
  },
  2: {
    name: "Group 2",
    maxMembers: 5,
    groupID: 2,
    members: [
      { name: "James Stone", id: 3 },
      { name: "Sandy Rivers", id: 4 }
    ]
  },
  3: {
    name: "Group 3",
    maxMembers: 2,
    groupID: 3,
    members: [{ name: "James Rivers", id: 9}]
  }
};

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
  }],
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
  return new Promise(function(resolve, reject) {
    // Check if the groupID is an integer and non-negative
    if (!Number.isInteger(groupID) || groupID < 0) {
      return reject({
        code: 400
      });
    }

    // Check if the group exists for the given groupID
    const groupExists = groupData[groupID];
    if (!groupExists) {
      return reject({
        code: 404
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
  const students = {
    1: {name: "Nancy Brown", id: 1 },
    2: { name: "Emma Weasly", id: 2 },
    3: { name: "James Stone", id: 3 },
    4: { name: "Sandy Rivers", id: 4 },
    5: { name: "Eve Adams", id: 5 }
  };

  return new Promise(function(resolve, reject) {
    const { studentID, groupID} = body;

    // Validate input
    if (!Number.isInteger(groupID) || groupID < 0 || !Number.isInteger(studentID)) {
      return reject({
        code: 400
      });
    }

    // Check if the group exists
    const group = groupData[groupID];
    if (!group) {
      return reject({
        code: 404
      });
    }

    // Check if the student exists
    const newstudent = Object.values(students).find(student => student.id === studentID)
    if (!newstudent) {
      return reject({
        code: 404
      });
    }
    
    // Check if the student is already in the group
    const isStudentInGroup = group.members.some(member => member.id === studentID);
    if (isStudentInGroup) {
      return reject({
        code: 409
      });
    }

    // Check if the group has capacity
    if (group.members.length >= group.maxMembers) {
      return reject({
        code: 403
      });
    }

    // Enroll student in the group
    const studentName = newstudent.name
    const newMember = { name: studentName, id: studentID };
    group.members.push(newMember);
    resolve(group);
  });
};

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
    const groups = [
      {
        maxMembers: 3,
        groupID: 2,
        members: [{ name: "Criston", id: 9 }],
        name: "Beginner Group for brokies",
        price: 30,
        level: "Beginner",
      },
      {
        maxMembers: 6,
        groupID: 1,
        members: [{ name: "Alicent", id: 6 }, { name: "Rhaenyra", id: 8 }],
        name: "Beginner Group",
        price: 50,
        level: "Beginner",
      },
      {
        maxMembers: 8,
        groupID: 2,
        members: [{ name: "Otto", id: 7 }],
        name: "Advanced Group",
        price: 100,
        level: "Advanced",
      }
    ];

    // Simulating errors
    if (price_min > price_max) {
      return reject({ code: 400, message: "Invalid price range" });
    } else {
      // Filter by level and price range
      const filteredGroups = groups.filter(
        (group) =>
          (price_min === undefined || group.price >= price_min) &&
          (price_max === undefined || group.price <= price_max) &&
          (!level || group.level === level)
      );

      // Sort if required
      if (sortBy === "price(asc.)") {
        filteredGroups.sort((a, b) => a.price - b.price);
      } else if (sortBy === "price(desc.)") {
        filteredGroups.sort((a, b) => b.price - a.price);
      } else if (sortBy === "availableSeats(desc.)") {
        filteredGroups.sort(
          (a, b) =>
            b.maxMembers - b.members.length - (a.maxMembers - a.members.length)
        );
      }

      // Return 404 if no groups found
      if (filteredGroups.length === 0) {
        return reject({ code: 404, message: "No groups found" });
      } else {
        resolve(filteredGroups);
      }
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
    const students = {
      1: {name: "Nancy Brown", id: 1 },
      2: { name: "Emma Weasly", id: 2 },
      3: { name: "James Stone", id: 3 },
      4: { name: "Sandy Rivers", id: 4 },
      5: { name: "Eve Adams", id: 5 }
    };
  
    return new Promise(function(resolve, reject) {
      // Validate input
      if (!Number.isInteger(groupID) || groupID < 0) {
        return reject({
          code: 400
        });
      }
  
      // Check if the group exists
      const group = groupData[groupID];
      if (!group) {
        return reject({
          code: 404
        });
      }
  
      //Return group
      resolve(group);
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
  }],
  "name" : "name"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}