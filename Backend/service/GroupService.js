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
    members: [{ name: "James Rivers", id: 9 }]
  }
};

/**
 * Create a new group
 * FR1 - The coach must be able to create groups.
 */
exports.createGroup = function (body) {
  return new Promise((resolve, _) => {
    const examples = {
      'application/json': {
        "maxMembers": 6,
        "groupID": 0,
        "members": [{ "name": "name", "id": 1 }],
        "name": "name",
      },
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Delete a group
 * FR2 - The coach must be able to delete groups.
 */
exports.deleteGroup = function (groupID) {
  return new Promise((resolve, reject) => {
    // Validate groupID
    if (!Number.isInteger(groupID) || groupID < 0) {
      return reject({ code: 400 });
    }

    // Check if the group exists
    const groupExists = groupData[groupID];
    if (!groupExists) {
      return reject({ code: 404 });
    }

    // Delete group and return deleted group data
    const deletedGroup = groupExists;
    delete groupData[groupID];
    resolve(deletedGroup);
  });
};

/**
 * Enroll a student in a group
 * FR5 - The student must be able to enroll in an available group.
 */
exports.enrollStudent = function (body) {
  return new Promise((resolve, reject) => {
    const students = {
      1: {name: "Nancy Brown", id: 1 },
      2: { name: "Emma Weasly", id: 2 },
      3: { name: "James Stone", id: 3 },
      4: { name: "Sandy Rivers", id: 4 },
      5: { name: "Eve Adams", id: 5 }
    };    
    const { studentID, groupID } = body;

    // Validate input
    if (!Number.isInteger(groupID) || groupID < 0 || !Number.isInteger(studentID)) {
      return reject({ code: 400 });
    }

    // Check if the group exists
    const group = groupData[groupID];
    if (!group) {
      return reject({ code: 404 });
    }

    // Check if the student exists
    const newStudent = Object.values(students).find((student) => student.id === studentID);
    if (!newStudent) {
      return reject({ code: 404 });
    }

    // Check if the student is already in the group
    const isStudentInGroup = group.members.some((member) => member.id === studentID);
    if (isStudentInGroup) {
      return reject({ code: 409 });
    }

    // Check if the group has capacity
    if (group.members.length >= group.maxMembers) {
      return reject({ code: 403 });
    }

    // Enroll student in the group
    const newMember = { name: newStudent.name, id: studentID };
    group.members.push(newMember);
    resolve(group);
  });
};

/**
 * Find available groups
 * FR3, FR4 - The student must be able to see a list of available groups and filter by attributes.
 */
exports.findAvailableGroups = function (price_min, price_max, level, sortBy) {
  return new Promise((resolve, reject) => {
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

    // Validate price range
    if (price_min > price_max) {
      return reject({ code: 400, message: "Invalid price range" });
    } else {

      // Filter groups by level and price
      const filteredGroups = groups.filter(
        (group) =>
          (price_min === undefined || group.price >= price_min) &&
          (price_max === undefined || group.price <= price_max) &&
          (!level || group.level === level)
      );

      // Apply sorting if specified
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
};

/**
 * Get group by ID
 * FR6 - The user must be able to see the groups they are in.
 */
exports.getGroup = function (groupID) {
  return new Promise((resolve, reject) => {
    // Validate groupID
    if (!Number.isInteger(groupID) || groupID < 0) {
      return reject({ code: 400 });
    }

    // Check if the group exists
    const group = groupData[groupID];
    if (!group) {
      return reject({ code: 404 });
    }

    // Return group data
    resolve(group);
  });
};

/**
 * Unenroll a student from a group
 * FR7 - The student must be able to leave a group.
 */
exports.unenrollStudent = function (body) {
  return new Promise((resolve, _) => {
    const examples = { 'application/json': groupData[2] };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};
