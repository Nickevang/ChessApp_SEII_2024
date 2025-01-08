'use strict';

const utils = require('../utils/writer.js');
const Coach = require('../service/CoachService');

/**
 * Retrieves coach details based on coachID.
 */
module.exports.getCoach = function getCoach(_req, res, _next, coachID) {
  Coach.getCoach(coachID)
    .then((response) => {
      // Send the coach details with status 200
      utils.writeJson(res, response);
    })
    .catch((error) => {
      if (error.code === 404) {
        res.status(404).json({ message: "coachID does not exist" });
      } else if (error.code === 400) {
        res.status(400).json({ message: "coachID is invalid" });
      } else {
        res.status(500).json({
          message: "Internal Server Error: " + error.message,
        });
      }
    });
};

/**
 * Creates a new coach entry.
 */
module.exports.postCoach = function postCoach(_req, res, _next, body) {
  Coach.postCoach(body)
    .then((response) => {
      // Send the created coach details with status 200
      utils.writeJson(res, response);
    })
    .catch((response) => {
      // Handle error response
      utils.writeJson(res, response);
    });
};
