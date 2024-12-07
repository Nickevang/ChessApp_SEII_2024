'use strict';



/**
 * Create a new group
 *
 * body GroupIn FR1 - The coach must be able to create groups
 * returns GroupOut
 * **/


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







// get Group by ID
exports.getGroup = function (groupID)
{
  return new Promise((resolve, reject) =>
  {
    if (!Number.isInteger(groupID) || groupID < 0)
    {
      return reject({
        statusCode: 400,
        body: { error: "Invalid group ID: Must be a positive integer" }
      });
    }

    const groupData = {
      1: {
        maxMembers: 6,
        groupID: 1,
        members: [{ name: "Alice", id: 1 }, { name: "Bob", id: 2 }],
        name: "Chess Club A"
      },
      2: {
        maxMembers: 10,
        groupID: 2,
        members: [{ name: "Charlie", id: 3 }, { name: "David", id: 4 }],
        name: "Chess Club B"
      }
    };

    const group = groupData[groupID];
    if (group)
    {
      resolve(group);  // If found, resolve with the group data
    } else
    {
      reject({
        statusCode: 404,
        body: { error: "Group not found" }  // No group matches the given ID
      });
    }
  });
};











