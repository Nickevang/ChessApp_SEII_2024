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






// Handler for retrieving a group
module.exports.getGroup = function getGroup(req, res, next)
{
  const groupID = parseInt(req.params.groupID, 10);

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
      res.status(error.statusCode).json({ message: error.message });
    });
};


// Handler for deleting a group
module.exports.deleteGroup = function deleteGroup(req, res, next)
{
  const groupID = parseInt(req.params.groupID, 10);

  if (isNaN(groupID))
  {
    return res.status(400).json({ message: "Invalid group ID format" });
  }

  GroupService.deleteGroup(groupID)
    .then(result =>
    {
      res.status(200).json({ message: result.message });
    })
    .catch(error =>
    {
      res.status(error.statusCode).json({ message: error.message });
    });
};
