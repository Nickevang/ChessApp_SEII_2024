
'use strict';



const utils = require("../utils/writer.js");




exports.createGroup = function (body)
{
  return new Promise(function (resolve, reject)
  {
    // Check for mandatory fields
    if (!body.name || body.maxMembers === undefined)
    {
      reject({
        statusCode: 405, // Method Not Allowed if mandatory fields are missing
        body: { error: 'Invalid input: Missing name or maxMembers.' }
      });
      return; // Early return to prevent further execution
    }

    // Validate maxMembers to be a positive number
    if (body.maxMembers <= 0)
    {
      reject({
        statusCode: 405,
        body: { error: 'Invalid input: maxMembers must be a positive number.' }
      });
      return; // Early return to prevent further execution
    }

    // Check that members, if provided, is an array
    if (body.members && !Array.isArray(body.members))
    {
      reject({
        statusCode: 405,
        body: { error: 'Invalid input: members should be an array.' }
      });
      return; // Early return to prevent further execution
    }

    // All checks passed, simulate successful group creation
    const newGroup = {
      id: Math.floor(Math.random() * 10000), // Simulating a database ID assignment
      name: body.name,
      maxMembers: body.maxMembers,
      members: body.members || [] // Default to empty array if no members provided
    };

    resolve(newGroup);
  });
};






// Simulated data storage for groups
let groupData = {
  1: { maxMembers: 6, groupIDid: 1, members: [{ name: "Alice", id: 1 }, { name: "Bob", id: 2 }], name: "Chess Club A" },
  2: { maxMembers: 10, groupID: 2, members: [{ name: "Charlie", id: 3 }, { name: "David", id: 4 }], name: "Chess Club B" }
};

// Function to get a Group
exports.getGroup = function (groupID)
{
  return new Promise((resolve, reject) =>
  {
    if (!Number.isInteger(groupID) || groupID < 0)
    {
      return reject({
        code: 400
      })
    }

    const group = groupData[groupID];


    if (group)
    {
      resolve(group);
    } else
    {
      return reject({
        code: 404, message: "Group not found" });
    }
  });
};


// Function to delete a Group
exports.deleteGroup = function (groupID)
{
  return new Promise((resolve, reject) =>
  {
    if (group)
    {
      delete groupData[groupID];
      resolve({ code: 200, message: "Group deleted successfully." });
    } else
    {
      reject({ code: 404, message: "Group not found" });
    }
  });
};













