'use strict';


var utils = require('../utils/writer.js');
var Group = require('../service/GroupService');

module.exports.createGroup = function createGroup(req, res, next, body)
{
  Group.createGroup(body)
    .then(function (response)
    {
      utils.writeJson(res, response);
    })
    .catch(function (response)
    {
      utils.writeJson(res, response);
    });
};

module.exports.deleteGroup = function deleteGroup(req, res, next, groupID)
{
  Group.deleteGroup(groupID)
    .then(function (response)
    {
      utils.writeJson(res, response);
    })
    .catch(function (response)
    {
      utils.writeJson(res, response);
    });
};



module.exports.getGroup = function getGroup(req, res, next)
{
  // Parse the groupID from request parameters and validate it
  const groupID = parseInt(req.params.groupID, 10); // Added the radix parameter for clarity

  if (isNaN(groupID))
  {
    return res.status(400).json({ message: "Invalid group ID format" });
  }

  GroupService.getGroup(groupID)
    .then(group =>
    {
      res.status(200).json(group);
    })
    .catch(error =>
    {
      // Error handling depending on the custom error handling setup in GroupService
      res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
    });
};





