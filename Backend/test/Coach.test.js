const test = require('ava');
const got = require('got');
const http = require('http');
const path = require('path');
const expressAppConfig = require('oas3-tools').expressAppConfig;
const serverPort = 8080;


const options = {
    routing: {
        controllers: path.join(__dirname, '../controllers'), 
    },
};

const openApiPath = path.join(__dirname, '../api/openapi.yaml');
const expressApp = expressAppConfig(openApiPath, options);
const app = expressApp.getApp();

let server;

// Start the server before tests
test.before(async () => {
    server = http.createServer(app).listen(serverPort);
    console.log('Test server started on port %d', serverPort);
});

// Stop the server after tests
test.after(async () => {
    server.close();
    console.log('Test server stopped');
});

// ------------------------------------------------------------------------------------------
// GET /coach/{coachID} tests
// ------------------------------------------------------------------------------------------

test("GET /coach/{coachID} returns correct coach for valid ID", async (t) => {
    const response = await got(`http://localhost:${serverPort}/coach/1`, {
        throwHttpErrors: false,
        responseType: 'json'
    });
    t.is(response.statusCode, 200);
    t.deepEqual(response.body, {
       id: 1, 
       name: "Guardiola"
    });
});

test("GET /coach/{coachID} returns error for invalid ID (Coach Not Found)", async (t) => {
    const response = await got(`http://localhost:${serverPort}/coach/666`, {
        throwHttpErrors: false,
        responseType: 'json'
    });
    t.is(response.statusCode, 404);
    t.deepEqual(response.body.message, 'coachID does not exist');
});

test("GET /coach/{coachID} rejects with an error for a null ID", async (t) => {
    const response = await got(`http://localhost:${serverPort}/coach/${null}`, {
        throwHttpErrors: false,
        responseType: 'json'
    });
    t.is(response.statusCode, 400);
    t.deepEqual(response.body.message, "request.params.coachID should be integer");
});

test("GET /coach/{coachID} rejects with an error for an undefined ID", async (t) => {
    const response = await got(`http://localhost:${serverPort}/coach/undefined`, {
        throwHttpErrors: false,
        responseType: 'json'
    });
    t.is(response.statusCode, 400);
    t.deepEqual(response.body.message, "request.params.coachID should be integer");
});


// ------------------------------------------------------------------------------------------
// POST /coach tests
// ------------------------------------------------------------------------------------------

test("POST /coach creates a new coach with valid data", async (t) => {
    const requestBody = { id: 1, name: "New Coach" };

    const response = await got.post(`http://localhost:${serverPort}/coach`, {
        json: requestBody,
        throwHttpErrors: false,
        responseType: 'json',
    });
    t.is(response.statusCode, 200);
    t.deepEqual(response.body, {
        id: 0, 
        name: "name", 
    });
});

test("POST /coach returns error for missing name field", async (t) => {
    const requestBody = { id: 1 }; 
    const response = await got.post(`http://localhost:${serverPort}/coach`, {
        json: requestBody,
        throwHttpErrors: false,
        responseType: 'json',
    });
    t.is(response.statusCode, 400);
    t.deepEqual(response.body.message, "request.body should have required property 'name'");

});

test("POST /coach rejects invalid data types for name field", async (t) => {
    const requestBody = { id: 1, name: 13.76 };


    const response = await got.post(`http://localhost:${serverPort}/coach`, {
        json: requestBody,
        throwHttpErrors: false,
        responseType: 'json',
    });
    t.is(response.statusCode, 400);
    t.deepEqual(response.body.message, "request.body.name should be string"); 
});