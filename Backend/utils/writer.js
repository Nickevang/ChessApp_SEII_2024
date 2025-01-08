/**
 * Constructs a ResponsePayload object that encapsulates an HTTP response code and a payload.
 */
var ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
};

/**
 * Creates a new ResponsePayload object with the specified HTTP status code and payload.
 */
exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
};

/**
 * Sends an HTTP response as JSON, with an optional status code.
 * The response payload is automatically serialized to JSON if it is an object.
 */
var writeJson = exports.writeJson = function(response, arg1, arg2) {
  var code;
  var payload;

  // If arg1 is a ResponsePayload object, recursively call with extracted payload and code
  if (arg1 && arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  // Determine the HTTP status code
  if (arg2 && Number.isInteger(arg2)) {
    code = arg2;
  } else if (arg1 && Number.isInteger(arg1)) {
    code = arg1;
  }

  // Determine the response payload
  if (code && arg1) {
    payload = arg1;
  } else if (arg1) {
    payload = arg1;
  }

  // Default to HTTP 200 if no status code is provided
  if (!code) {
    code = 200;
  }

  // Serialize the payload to JSON if it's an object
  if (typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }

  // Write the HTTP response with the appropriate headers and payload
  response.writeHead(code, { 'Content-Type': 'application/json' });
  response.end(payload);
};

