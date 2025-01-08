'use strict';

/**
 * Retrieves a coach by their ID.
 * coachID - The ID of the coach to retrieve.
 */
exports.getCoach = function (coachID) {
  return new Promise(function (resolve, reject) {
    const coaches = {
      1: { id: 1, name: "Guardiola" },
      2: { id: 2, name: "Xavi" },
      3: { id: 3, name: "Flick" },
    };

    if (coaches[coachID]) {
      // Coach exists; resolve with the coach's data
      return resolve(coaches[coachID]);
    } else if (!coaches[coachID]) {
      // Coach not found; reject with a 404 error code
      return reject({ code: 404 });
    } else {
      // Invalid request; reject with a 400 error code
      return reject({ code: 400 });
    }
  });
};

/**
 * Creates a new coach using the provided details.
 * body - JSON object containing the new coach's details.
 */
exports.postCoach = function (body) {
  return new Promise(function (resolve, _reject) {
    const examples = {
      'application/json': {
        name: "name",
        id: 0,
      },
    };

    if (Object.keys(examples).length > 0) {
      // Return the first example object as the response
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      // Resolve without returning any data if no examples are available
      resolve();
    }
  });
};
