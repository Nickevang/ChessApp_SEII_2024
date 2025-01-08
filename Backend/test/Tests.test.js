const test = require('ava');
const got = require('got');
const http = require('http');
const path = require('path');
const expressAppConfig = require('oas3-tools').expressAppConfig;
const serverPort = 8080;
// Test IDs
const validgroupID = 2;
const nonExistentgroupID = 4;
const nonIntegergroupID = 'f';
const negativegroupID = -2;

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

//Test Functions

//Successful operation
function test_successful_operation(testTitle, method, path, equalBody, requestBody = null) {
    test(`${testTitle} Successful Operation`, async (t) => {
        try {
            let response;
            if (method === 'GET') {
                response = await got.get(path, { responseType: 'json' });
            } else if (method === 'POST') {
                response = await got.post(path, {
                    json: requestBody,
                    responseType: 'json',
                });
            } else if (method === 'PUT') {
                response = await got.put(path, {
                    json: requestBody,
                    responseType: 'json',
                });
            } else if (method === 'DELETE') {
                response = await got.delete(path, { responseType: 'json' });
            } else {
                throw new Error(`Unsupported HTTP method: ${method}`);
            }

            t.is(response.statusCode, 200);
            t.deepEqual(response.body, equalBody);
        } catch (error) {
            t.fail(`API call failed: ${error.message}`);
        }
    });
}

function test_unsuccessful_operation(testTitle, method, path, requestBody, expectedStatusCode, failureMessage) {
    test(`${testTitle}`, async (t) => {
        try {
            if (method === 'PUT') {
                await got.put(path, {
                    json: requestBody,
                    responseType: 'json',
                });
            } else if (method === 'POST') {
                await got.post(path, {
                    json: requestBody,
                    responseType: 'json',
                });
            } else if (method === 'GET') {
                await got.get(path, { responseType: 'json' });
            } else if (method === 'DELETE') {
                await got.delete(path, { responseType: 'json' });
            } else {
                throw new Error(`Unsupported HTTP method: ${method}`);
            }

            t.fail(`Request should have failed with ${expectedStatusCode}, but it succeeded.`);
        } catch (error) {
            t.is(error.response.statusCode, expectedStatusCode);
            t.is(error.response.body.message, failureMessage);
        }
    });
}

//////////////////////////////CLASSROOM//////////////////////////////////

/////////////////// Test GET/group/{groupID}/classroom //////////////////

// Test GET/group/{groupID}/classroom Successful Operation
test_successful_operation(
    'GET/group/{groupID}/classroom',
    'GET',
    `http://localhost:${serverPort}/group/${validgroupID}/classroom`,
    {
        editingStudentID: 7,
        id: 2,
        users: [4, 5, 6],
    }
);

// Test GET/group/{groupID}/classroom non-existent ID
test_unsuccessful_operation(
    'Test GET/group/{groupID}/classroom non-existent ID',
    'GET',
    `http://localhost:${serverPort}/group/${nonExistentgroupID}/classroom`,
    null,
    404,
    'Response code 404 (Not Found): groupID does not exist'
);

// Test GET/group/{groupID}/classroom non-integer ID
test_unsuccessful_operation(
    'Test GET/group/{groupID}/classroom non-integer ID',
    'GET',
    `http://localhost:${serverPort}/group/${nonIntegergroupID}/classroom`,
    null,
    400,
    'request.params.groupID should be integer'
);

// Test GET/group/{groupID}/classroom negative ID
test('Test GET/group/{groupID}/classroom negative ID', async (t) => {
    try {
        await got(`http://localhost:${serverPort}/group/${negativegroupID}/classroom`, { responseType: 'json' });
        t.fail('Request should have failed with 400, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 400);
        t.is(error.response.body.message, 'request.params.groupID should be integer');
    }
});

/////////////////// Test PUT/group/{groupID}/classroom //////////////////

// Test PUT/group/{groupID}/classroom Successful Operation
test_successful_operation(
    'Test PUT/group/{groupID}/classroom',
    'PUT',
    `http://localhost:${serverPort}/group/${validgroupID}/classroom`,
    {
        editingStudentID: 8,
        id: 2,
        users: [10, 11, 12],
    },
    { 
        editingStudentID: 8, 
        id: validgroupID, 
        users: [10, 11, 12] 
    }
);

// Test PUT/group/{groupID}/classroom non-existent ID
test_unsuccessful_operation(
    'Test PUT/group/{groupID}/classroom non-existent ID',
    'PUT',
    `http://localhost:${serverPort}/group/${nonExistentgroupID}/classroom`,
    {editingStudentID: 8, id: nonExistentgroupID, users: [10, 11, 12] },
    404,
    'Response code 404 (Not Found): groupID does not exist'
);

// Test PUT/group/{groupID}/classroom non-integer ID
test_unsuccessful_operation(
    'Test PUT/group/{groupID}/classroom non-integer ID',
    'PUT',
    `http://localhost:${serverPort}/group/${nonIntegergroupID}/classroom`,
    {editingStudentID: 8, id: nonIntegergroupID, users: [10, 11, 12] },
    400,
    'request.params.groupID should be integer, request.body.id should be integer'
);

// Test PUT/group/{groupID}/classroom negative ID
test_unsuccessful_operation(
    'Test PUT/group/{groupID}/classroom negative ID',
    'PUT',
    `http://localhost:${serverPort}/group/${negativegroupID}/classroom`,
    {editingStudentID: 8, id: negativegroupID, users: [10, 11, 12] },
    400,
    'Invalid request'
);


// Test PUT/group/{groupID}/classroom for non-integer editingStudentID
test_unsuccessful_operation(
    'Test PUT/group/{groupID}/classroom non-integer editingStudentID',
    'PUT',
    `http://localhost:${serverPort}/group/${validgroupID}/classroom`,
    { editingStudentID: 'a', id: validgroupID, users: [10, 11, 12] },
    400,
    'request.body.editingStudentID should be integer'
);

// Test PUT/group/{groupID}/classroom for non-array users
test_unsuccessful_operation(
    'Test PUT/group/{groupID}/classroom non-array users',
    'PUT',
    `http://localhost:${serverPort}/group/${validgroupID}/classroom`,
    { editingStudentID: 7, id: validgroupID, users: 'c' },
    400,
    'request.body.users should be array'
);


/////////////////// Test POST/group/{groupID}/classroom/setEditor //////////////////

// Test POST/group/{groupID}/classroom/setEditor Successful Operation
test_successful_operation(
    'Test POST/group/{groupID}/classroom/setEditor',
    'POST',
    `http://localhost:${serverPort}/group/${validgroupID}/classroom/setEditor`,
    {
        editingStudentID: 8,
        id: 2,
        users: [7, 8, 9],
    },
    {
        studentID: 8
    }
);

// Test POST/group/{groupID}/classroom/setEditor non-existent group ID
test_unsuccessful_operation(
    'Test POST/group/{groupID}/classroom/setEditor non-existent group ID',
    'POST',
    `http://localhost:${serverPort}/group/${nonExistentgroupID}/classroom/setEditor`,
    {
        studentID: 8
    },
    404,
    'Response code 404 (Not Found): groupID does not exist'
);

// Test POST/group/{groupID}/classroom/setEditor non-integer group ID
test_unsuccessful_operation(
    'Test POST/group/{groupID}/classroom/setEditor non-integer group ID',
    'POST',
    `http://localhost:${serverPort}/group/${nonIntegergroupID}/classroom/setEditor`,
    {
        studentID: 7
    },
    400,
    'request.params.groupID should be integer'
);

// Test POST/group/{groupID}/classroom/setEditor non-integer student ID
test_unsuccessful_operation(
    'Test POST/group/{groupID}/classroom/setEditor non-integer student ID',
    'POST',
    `http://localhost:${serverPort}/group/${validgroupID}/classroom/setEditor`,
    {
        studentID: 'a'
    },
    400,
    'request.body.studentID should be integer'
);

// Test POST/group/{groupID}/classroom/setEditor student ID not in group
test_unsuccessful_operation(
    'Test POST/group/{groupID}/classroom/setEditor student ID not in group',
    'POST',
    `http://localhost:${serverPort}/group/${validgroupID}/classroom/setEditor`,
    {
        studentID: 3
    },
    422,
    'This studentID doesn not belong to any member of the classroom'
);

////////////////////////////////GROUP////////////////////////////////////

////////////////////Test DELETE/group/{groupID}//////////////////////////

// Test DELETE/group/{groupID} Successful Operation
test_successful_operation(
    'Test DELETE/group/{groupID}',
    'DELETE',
    `http://localhost:${serverPort}/group/3`,
    { 
        name: "Group 3", 
        maxMembers: 2, 
        groupID: 3, 
        members: [
            { name: "James Rivers", id: 9 },
        ] 
    }
);

// Test DELETE/group/{groupID} non-existent ID
test_unsuccessful_operation(
    'Test DELETE/group/{groupID} non-existent ID',
    'DELETE',
    `http://localhost:${serverPort}/group/${nonExistentgroupID}`,
    null,
    404,
    'Response code 404 (Not Found): groupID does not exist'
);

// Test DELETE/group/{groupID} non-integer ID
test_unsuccessful_operation(
    'Test DELETE/group/{groupID} non-integer ID',
    'DELETE',
    `http://localhost:${serverPort}/group/${nonIntegergroupID}`,
    null,
    400,
    'request.params.groupID should be integer'
);

////////////////////Test POST/groups/enroll//////////////////////////

// Test POST/groups/enroll Successful Operation
test_successful_operation(
    'Test POST/groups/enroll',
    'POST',
    `http://localhost:${serverPort}/groups/enroll`,
    { 
        name: "Group 2", 
        maxMembers: 5, 
        groupID: 2,
        members: [
            { name: "James Stone", id: 3 },
            { name: "Sandy Rivers", id: 4 },
            { name: "Eve Adams", id: 5 }
        ]
    },
    {
        studentID: 5,
        groupID: validgroupID
    }
);

// Test POST/groups/enroll non-existent groupID
test_unsuccessful_operation(
    'Test POST/groups/enroll non-existent groupID',
    'POST',
    `http://localhost:${serverPort}/groups/enroll`,
    {
        studentID: 5,
        groupID: nonExistentgroupID
    },
    404,
    'Response code 404 (Not Found): groupID or student ID does not exist'
);

// Test POST/groups/enroll non-integer groupID
test_unsuccessful_operation(
    'Test POST/groups/enroll non-integer groupID',
    'POST',
    `http://localhost:${serverPort}/groups/enroll`,
    {
        studentID: 5,
        groupID: nonIntegergroupID
    },
    400,
    'request.body.groupID should be integer'
);

// Test POST/groups/enroll non-existent studentID
test_unsuccessful_operation(
    'Test POST/groups/enroll non-existent studentID',
    'POST',
    `http://localhost:${serverPort}/groups/enroll`,
    {
        studentID: 13,
        groupID: validgroupID
    },
    404,
    'Response code 404 (Not Found): groupID or student ID does not exist'
);


// Test POST/groups/enroll non-integer groupID
test_unsuccessful_operation(
    'Test POST/groups/enroll non-integer studentID',
    'POST',
    `http://localhost:${serverPort}/groups/enroll`,
    {
        studentID: 'a',
        groupID: validgroupID
    },
    400,
    'request.body.studentID should be integer'
);

// Test POST/groups/enroll already enrolled studentID
test_unsuccessful_operation(
    'Test POST/groups/enroll already enrolled studentID',
    'POST',
    `http://localhost:${serverPort}/groups/enroll`,
    {
        studentID: 3,
        groupID: validgroupID
    },
    409,
    'Student is already enrolled in this group.'
);

// Test POST/groups/enroll group is full
test_unsuccessful_operation(
    'Test POST/groups/enroll group is full',
    'POST',
    `http://localhost:${serverPort}/groups/enroll`,
    {
        studentID: 4,
        groupID: 1
    },
    403,
    'Group is full. Cannot enroll more members.'
);

////////////////////Test GET/group/{groupID}//////////////////////////

// Test GET/group/{groupID} Successful Operation
test_successful_operation(
    'Test GET/group/{groupID}',
    'GET',
    `http://localhost:${serverPort}/group/${validgroupID}`,
     { 
        name: "Group 2", maxMembers: 5, groupID: 2,
        members: 
        [
            { name: "James Stone", id: 3 },
            { name: "Sandy Rivers", id: 4 },
            { name: "Eve Adams", id: 5}
        ]
    }
);

//Test GET/group/{groupID} non-existent ID
test_unsuccessful_operation(
    'Test GET/group/{groupID} non-existent ID',
    'GET',
    `http://localhost:${serverPort}/group/${nonExistentgroupID}`,
    null,
    404,
    'Response code 404 (Not Found): Group not found.'
);

// Test GET/group/{groupID} non-integer ID
test_unsuccessful_operation(
    'Test GET/group/{groupID} non-integer ID',
    'GET',
    `http://localhost:${serverPort}/group/${nonIntegergroupID}`,
    null,
    400,
    'request.params.groupID should be integer'
);

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
        { maxMembers: 6, groupID: 1,
            members: [
                { name: "Alicent", id: 6 }, 
                { name: "Rhaenyra", id: 8 }],
            name: "Beginner Group", price: 50, level: "Beginner",
        },
        { maxMembers: 3, groupID: 2, members: [{ name: "Criston", id: 9 }], name: "Beginner Group for brokies", price: 30, level: "Beginner", }
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
        { maxMembers: 8, groupID: 2,
            members: [
                { name: "Otto", id: 7 }],
            name: "Advanced Group", price: 100, level: "Advanced",
        }
    ]);
})


////////////////////////////////COACH////////////////////////////////////

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

    const response = await got.post(`http://localhost:${serverPort}/coach`, { json: requestBody, throwHttpErrors: false, responseType: 'json', });
    t.is(response.statusCode, 200);
    t.deepEqual(response.body, {
        id: 0, 
        name: "name", 
    });
});

test("POST /coach returns error for missing name field", async (t) => {
    const requestBody = { id: 1 }; 
    const response = await got.post(`http://localhost:${serverPort}/coach`, { json: requestBody, throwHttpErrors: false, responseType: 'json', });

    t.is(response.statusCode, 400);
    t.deepEqual(response.body.message, "request.body should have required property 'name'");

});

test("POST /coach rejects invalid data types for name field", async (t) => {
    const requestBody = { id: 1, name: 13.76 };
    const response = await got.post(`http://localhost:${serverPort}/coach`, { json: requestBody, throwHttpErrors: false, responseType: 'json', });

    t.is(response.statusCode, 400);
    t.deepEqual(response.body.message, "request.body.name should be string"); 
});


///////////////////////////////STUDENT///////////////////////////////////

/////////////////// Test GET/student/{studentID} //////////////////
// Test GET/student/{studentID} Successful Operation
test_successful_operation(
    'Test GET/student/{studentID}',
    'GET',
    `http://localhost:${serverPort}/student/2`,
    { 
        id: 2, 
        name: 'Jane Smith'
    }
);

// Test GET/student/{studentID} non-existent ID
test_unsuccessful_operation(
    'Test GET/student/{studentID} non-existent ID',
    'GET',
    `http://localhost:${serverPort}/student/999`,
    null,
    404,
    'studentID does not exist'
);

// Test GET/student/{studentID} non-integer ID
test_unsuccessful_operation(
    'Test GET/student/{studentID} non-integer ID',
    'GET',
    `http://localhost:${serverPort}/student/'abc'`,
    null,
    400,
    'request.params.studentID should be integer'
);

// Test GET/student/{studentID} negative ID
test_unsuccessful_operation(
    'Test GET/student/{studentID} negative ID',
    'GET',
    `http://localhost:${serverPort}/student/-2`,
    null,
    400,
    'studentID should be a positive integer'
);