'use strict';

var utils = require('../utils/writer.js');
var Coach = require('../service/CoachService');

module.exports.getCoach = function getCoach (req, res, next, coachID) {
  Coach.getCoach(coachID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      // Check if the error is a "not found" case
      if (error.code === 404) {
        // Send a 404 error with an appropriate message if coachID is not found
        res.status(404).json({message: "coachID does not exist"});
      } else if (error.code === 400) {
        // Send a 400 error with an appropriate message if coachID is not integer
        res.status(400).json({message: "coachID is invalid"});
      }
      else {
        // Handle other errors
        res.status(500).send({
          message: "Internal Server Error: " + error.message
        });
      }
    });
    
};

module.exports.postCoach = function postCoach (req, res, next, body) {
  Coach.postCoach(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
