const test = require('ava');
const got = require('got');
const http = require('http');
const path = require('path');
const expressAppConfig = require('oas3-tools').expressAppConfig;
const serverPort = 8080;

// Define the server configuration for testing
const options = {
    routing: {
        controllers: path.join(__dirname, '../controllers'), // Directory for controllers
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


/////////////////// Test GET/group/{groupID}/classroom //////////////////

// Test GET/group/{groupID}/classroom Successful Operation
test('Test GET/group/{groupID}/classroom Successful Operation', async (t) => {
    try {
        // Make an HTTP request to the API for valid ID: 2
        const response = await got(`http://localhost:${serverPort}/group/2/classroom`, { responseType: 'json' });

        // Assert the response status code
        t.is(response.statusCode, 200);

        // Assert the response body
        t.deepEqual(response.body, {
            editingStudentID: 7,
            id: 2,
            users: [4, 5, 6],
        });
    } catch (error) {
        t.fail(`API call failed: ${error.message}`);
    }
});

// Test GET/group/{groupID}/classroom non-existent ID
test('Test GET/group/{groupID}/classroom non-existent ID', async (t) => {
    try {
        // Make an HTTP request to the API for non-existent ID: 4
        const response = await got(`http://localhost:${serverPort}/group/4/classroom`, { responseType: 'json' });

        // This should not be reached, since the ID is non-existent and should return 404
        t.fail('Request should have failed with 404, but it succeeded.');
    } catch (error) {
        // Assert the response status code is 404
        t.is(error.response.statusCode, 404);

        // Directly access the message from error.response.body
        t.is(error.response.body.message, 'Response code 404 (Not Found): groupID does not exist');
    }
});


// Test GET/group/{groupID}/classroom non-integer ID
test('Test GET/group/{groupID}/classroom non-integer ID', async (t) => {
    try {
        // Make an HTTP request to the API for non-integer ID: f
        const response = await got(`http://localhost:${serverPort}/group/f/classroom`, { responseType: 'json' });

        // This should not be reached, since the ID is non-integer and should return 400
        t.fail('Request should have failed with 400, but it succeeded.');
    } catch (error) {
        // Assert the response status code is 400
        t.is(error.response.statusCode, 400);

        // Directly access the message from error.response.body
        t.is(error.response.body.message, 'request.params.groupID should be integer');
    }
});
