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


// Creating the test to pass
test('test', (t) =>
{
    t.pass();
});

// Test for valid groupID (GET)
test('GET /group/{groupID} - valid ID', async t => 
{
    try
    {
        const groupID = 1; // Assuming 1 is a valid ID
        const response = await got(`http://localhost:${serverPort}/group/${groupID}`, {
            throwHttpErrors: false,
            responseType: 'json'
        });

        t.is(response.statusCode, 200);
        t.deepEqual(response.body, {
            maxMembers: 6,
            groupID: 1,
            members: [{ name: "Alice", id: 1 }, { name: "Bob", id: 2 }],
            name: "Chess Club A"
        });
    } catch (error)
    {
        t.fail(`API call failed: ${error.message}`);
    }
});


// Test for invalid groupID (GET)

test('GET /group/{groupID} - invalid ID', async t =>
{
    const groupID = 'abc'; // Non-integer value
    const response = await got(`http://localhost:${serverPort}/group/${groupID}`, {
        throwHttpErrors: false,
        responseType: 'json'
    });
    t.is(response.statusCode, 400);
});



// Test for successful deletion
test('DELETE /group/{groupID} - successful deletion', async t =>
{
    const groupID = 1; // Assuming '1' is a valid ID for deletion
    const response = await got.delete(`http://localhost:${serverPort}/group/${groupID}`, {
        throwHttpErrors: false,
        responseType: 'json'
    });
    t.is(response.statusCode, 200, 'Should return status 200 on successful deletion');
});


// Test for deletion with an invalid ID
test('DELETE /group/{groupID} - invalid ID', async t =>
{
    const groupID = 'invalid-id'; // Non-integer or nonexistent group ID
    const response = await got.delete(`http://localhost:${serverPort}/group/${groupID}`, {
        throwHttpErrors: false,
        responseType: 'json'
    });
    t.is(response.statusCode, 400, 'Should return status 400 for an invalid group ID');
});


