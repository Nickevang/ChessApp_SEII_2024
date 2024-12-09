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
// GET /group/findAvailable tests
// ------------------------------------------------------------------------------------------
test("GET /group/findAvailable returns groups within price range and correctly sorted", async (t) => {
    const response = await got(`http://localhost:${serverPort}/group/findAvailable?price_min=30&price_max=60&level=Beginner&sortBy=price%28desc.%29`, {
        throwHttpErrors: false,
        responseType: 'json'
    });

    t.is(response.statusCode, 200);
    t.deepEqual(response.body, [
        {
            maxMembers: 6,
            groupID: 1,
            members: [{ name: "Alicent", id: 6 }, { name: "Rhaenyra", id: 8 }],
            name: "Beginner Group",
            price: 50,
            level: "Beginner",
        },
        {
            maxMembers: 3,
            groupID: 2,
            members: [{ name: "Criston", id: 9 }],
            name: "Beginner Group for brokies",
            price: 30,
            level: "Beginner",
        }
    ]);
});

test("GET /group/findAvailable returns error for invalid query (out-of-range price)", async (t) => {
    const response = await got(`http://localhost:${serverPort}/group/findAvailable?price_min=50&price_max=20&level=Beginner&sortBy=price%28desc.%29`, {
        throwHttpErrors: false,
        responseType: 'json'
    });

    t.is(response.statusCode, 400);
    t.deepEqual(response.body, {
        message: "Input is missing or faulty"
    });
});

test("GET /group/findAvailable returns not found for price range not matching to any groups", async (t) => {
    const response = await got(`http://localhost:${serverPort}/group/findAvailable?price_min=10&price_max=20&level=Beginner&sortBy=price%28desc.%29`, {
        throwHttpErrors: false,
        responseType: 'json'
    });

    t.is(response.statusCode, 404);
    t.deepEqual(response.body, {
        message: "Groups not found"
    });
});

test("GET /group/findAvailable returns correct groups for group level", async (t) =>{
    const response = await got(`http://localhost:${serverPort}/group/findAvailable?level=Advanced`, {
        throwHttpErrors: false,
        responseType: 'json'
    });

    t.is(response.statusCode, 200);
    t.deepEqual(response.body, [
        {
            maxMembers: 8,
            groupID: 2,
            members: [{ name: "Otto", id: 7 }],
            name: "Advanced Group",
            price: 100,
            level: "Advanced",
        }
    ]);
})