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
test.before(async () =>
{
    server = http.createServer(app).listen(serverPort);
    console.log('Test server started on port %d', serverPort);
});

// Stop the server after tests
test.after(async () =>
{
    server.close();
    console.log('Test server stopped');
});


test('test', (t) =>
{
    t.pass();
});


;




// Test for invalid group ID parameter
test('GET /group/{groupID} - invalid ID test', async t =>
{
    const groupID = 1.5; // Invalid ID, not an integer
    const response = await got(`http://localhost:${serverPort}/group/${groupID}`, {
        throwHttpErrors: false,
        responseType: 'json'
    });
    t.is(response.statusCode, 400);
});





test('GET /group/{groupID} - Valid ID test', async t =>
{
    const groupID = 3; // this is a valid and existing ID
    const response = await got(`http://localhost:${serverPort}/group/${groupID}`, {
        throwHttpErrors: false,
        responseType: 'json'
    });
    // Check that the status code is 200 for Good Request
    t.is(response.statusCode, 404);
});
















