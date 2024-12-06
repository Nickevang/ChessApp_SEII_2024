'use strict';


/**
 * Get coach by ID
 *
 * coachID Long Coach ID to get
 * returns Coach
 **/
exports.getCoach = function(coachID) {
  return new Promise(function(resolve, reject) {
    const coaches = {
      1: {id:1, name: "Guardiola"},
      2: {id:2, name: "Xavi"},
      3: {id:3, name: "Flick"}
    };

    if (coaches[coachID]){
      resolve(coaches[coachID]);
    } else if (coachID === null || coachID === undefined) {
      reject({message: "Invalid coach ID"});
    } else {
      reject({message: 'Coach with ID ${coachID} not found.'});
    }
    examples['application/json'] = {
  "name" : "name",
  "id" : 0  
  };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
    
}


/**
 * Create a new coach given their name
 *
 * body Coach JSON object with the studentID and groupID
 * returns Coach
 **/
exports.postCoach = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "name",
  "id" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

