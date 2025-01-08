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


//////////////////////////////CLASSROOM//////////////////////////////////

/////////////////// Test GET/group/{groupID}/classroom //////////////////

// Test GET/group/{groupID}/classroom Successful Operation
test('Test GET/group/{groupID}/classroom Successful Operation', async (t) => {
    try {
        const response = await got(`http://localhost:${serverPort}/group/${validgroupID}/classroom`, { responseType: 'json' });
        t.is(response.statusCode, 200);
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
        await got(`http://localhost:${serverPort}/group/${nonExistentgroupID}/classroom`, { responseType: 'json' });
        t.fail('Request should have failed with 404, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 404);
        t.is(error.response.body.message, 'Response code 404 (Not Found): groupID does not exist');
    }
});

// Test GET/group/{groupID}/classroom non-integer ID
test('Test GET/group/{groupID}/classroom non-integer ID', async (t) => {
    try {
        await got(`http://localhost:${serverPort}/group/${nonIntegergroupID}/classroom`, { responseType: 'json' });
        t.fail('Request should have failed with 400, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 400);
        t.is(error.response.body.message, 'request.params.groupID should be integer');
    }
});

// Test GET/group/{groupID}/classroom negative ID
test('Test GET/group/{groupID}/classroom negative ID', async (t) => {
    try {
        const response = await got(`http://localhost:${serverPort}/group/${negativegroupID}/classroom`, { responseType: 'json' });
        t.fail('Request should have failed with 400, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 400);
        t.is(error.response.body.message, 'request.params.groupID should be integer');
    }
});


/////////////////// Test PUT/group/{groupID}/classroom //////////////////

// Test PUT/group/{groupID}/classroom Successful Operation
test('Test PUT/group/{groupID}/classroom Successful Operation', async (t) => {
    try {
        const requestBody = { editingStudentID: 8, id: validgroupID, users: [10, 11, 12] };

        const response = await got.put(`http://localhost:${serverPort}/group/${validgroupID}/classroom`, {
            json: requestBody,
            responseType: 'json',
        });

        t.is(response.statusCode, 200);
        
        t.deepEqual(response.body, { editingStudentID: 8, id: 2, users: [10, 11, 12], });
    } catch (error) {
        t.fail(`API call failed: ${error.message}`);
    }
});

// Test PUT/group/{groupID}/classroom non-existent ID
test('Test PUT/group/{groupID}/classroom non-existent ID', async (t) => {
    try {
        const requestBody = { editingStudentID: 8, id: nonExistentgroupID, users: [10, 11, 12] };

        // Make an HTTP PUT request to the API for non- existent ID: 4
        await got.put(`http://localhost:${serverPort}/group/${nonExistentgroupID}/classroom`, {
            json: requestBody,
            responseType: 'json',
        });
    
        t.fail('Request should have failed with 404, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 404);
        t.is(error.response.body.message, 'Response code 404 (Not Found): groupID does not exist');
    }
});

// Test PUT/group/{groupID}/classroom non-integer ID
test('Test PUT/group/{groupID}/classroom non-integer ID', async (t) => {
    try {
        // Prepare the body for the PUT request
        const requestBody = { editingStudentID: 8, id: nonIntegergroupID, users: [10, 11, 12] };

        // Make an HTTP PUT request to the API for invalid ID: f
        await got.put(`http://localhost:${serverPort}/group/${nonIntegergroupID}/classroom`, {
            json: requestBody,
            responseType: 'json',
        });
        t.fail('Request should have failed with 400, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 400);
        t.is(error.response.body.message, 'request.params.groupID should be integer, request.body.id should be integer');
    }
});

// Test PUT/group/{groupID}/classroom negative ID
test('Test PUT/group/{groupID}/classroom negative ID', async (t) => {
    try {
        const requestBody = { editingStudentID: 8, id: negativegroupID, users: [10, 11, 12] };
        const response = await got.put(`http://localhost:${serverPort}/group/${negativegroupID}/classroom`, {
            json: requestBody,
            responseType: 'json',
        });
        t.fail('Request should have failed with 400, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 400);
        t.is(error.response.body.message, 'Invalid request');
    }
});

// Test PUT/group/{groupID}/classroom for non-integer editingStudentID
test('Test PUT/group/{groupID}/classroom non-integer editingStudentID', async (t) => {
    try {
        const requestBody = { editingStudentID: 'a', id: validgroupID, users: [10, 11, 12] };

        // Make an HTTP PUT request to the API for ID: 2
        const response = await got.put(`http://localhost:${serverPort}/group/${validgroupID}/classroom`, {
            json: requestBody,
            responseType: 'json',
        });
        t.fail('Request should have failed with 400, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 400);
        t.is(error.response.body.message, 'request.body.editingStudentID should be integer');
    }
});

// Test PUT/group/{groupID}/classroom for non-array users
test('Test PUT/group/{groupID}/classroom non-array users', async (t) => {
    try {
        const requestBody = { editingStudentID: 7, id: validgroupID, users: 'c' };

        const response = await got.put(`http://localhost:${serverPort}/group/${validgroupID}/classroom`, {
            json: requestBody,
            responseType: 'json',
        });
        t.fail('Request should have failed with 400, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 400);
        t.is(error.response.body.message, 'request.body.users should be array');
    }
});


/////////////////// Test POST/group/{groupID}/classroom/setEditor //////////////////

// Test POST/group/{groupID}/classroom/setEditor Successful Operation
test('Test POST/group/{groupID}/classroom/setEditor Successful Operation', async (t) => {
    try {
        const requestBody = {
            studentID: 8
        };

        const response = await got.post(`http://localhost:${serverPort}/group/${validgroupID}/classroom/setEditor`, {
            json: requestBody,
            responseType: 'json',
        });

        t.is(response.statusCode, 200);
        t.deepEqual(response.body, { editingStudentID: 8, id: 2, users: [7,8,9], });
    } catch (error) {
        t.fail(`API call failed: ${error.message}`);
    }
});

// Test POST/group/{groupID}/classroom/setEditor non-existent group ID
test('Test POST/group/{groupID}/classroom/setEditor non-existent group ID', async (t) => {
    try {
        const requestBody = {
            studentID: 8
        };

        const response = await got.post(`http://localhost:${serverPort}/group/${nonExistentgroupID}/classroom/setEditor`, {
            json: requestBody,
            responseType: 'json',
        });
        t.fail('Request should have failed with 404, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 404);
        t.is(error.response.body.message, 'Response code 404 (Not Found): groupID does not exist');
    }
});

// Test POST/group/{groupID}/classroom/setEditor non-integer group ID
test('Test POST/group/{groupID}/classroom/setEditor non-integer group ID', async (t) => {
    try {
        const requestBody = {
            studentID: 7
        };

        const response = await got.post(`http://localhost:${serverPort}/group/${nonIntegergroupID}/classroom/setEditor`, {
            json: requestBody,
            responseType: 'json',
        });

        t.fail('Request should have failed with 400, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 400);
        t.is(error.response.body.message, 'request.params.groupID should be integer');
    }
});

// Test POST/group/{groupID}/classroom/setEditor non-integer student ID
test('Test POST/group/{groupID}/classroom/setEditor non-integer student ID', async (t) => {
    try {
        const requestBody = {
            studentID: 'a'
        };
        const response = await got.post(`http://localhost:${serverPort}/group/${validgroupID}/classroom/setEditor`, {
            json: requestBody,
            responseType: 'json',
        });
        t.fail('Request should have failed with 400, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 400);
        t.is(error.response.body.message, 'request.body.studentID should be integer');
    }
});

// Test POST/group/{groupID}/classroom/setEditor student ID not in group
test('Test POST/group/{groupID}/classroom/setEditor student ID not in group', async (t) => {
    try {
        const requestBody = {
            studentID: 3
        };

        const response = await got.post(`http://localhost:${serverPort}/group/${validgroupID}/classroom/setEditor`, {
            json: requestBody,
            responseType: 'json',
        });
        t.fail('Request should have failed with 422, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 422);
        t.is(error.response.body.message, 'This studentID doesn not belong to any member of the classroom');
    }
});


////////////////////////////////GROUP////////////////////////////////////

////////////////////Test DELETE/group/{groupID}//////////////////////////

// Test DELETE/group/{groupID} Successful Operation
test('Test DELETE/group/{groupID} Successful Operation', async (t) => {
    try {
        const response = await got.delete(`http://localhost:${serverPort}/group/${validgroupID}`, { responseType: 'json' });

        t.is(response.statusCode, 200);

        t.deepEqual(response.body, { name: "Group 2", maxMembers: 4, groupID: 2, members: [
                { name: "James Stone", id: 3 },
                { name: "Sandy Rivers", id: 4 }
            ] 
        });
    } catch (error) {
        t.fail(`API call failed: ${error.message}`);
    }
});

// Test DELETE/group/{groupID} non-existent ID
test('Test DELETE/group/{groupID} non-existent ID', async (t) => {
    try {
        const response = await got.delete(`http://localhost:${serverPort}/group/${nonExistentgroupID}`, { responseType: 'json' });

        t.fail('Request should have failed with 404, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 404);
        t.is(error.response.body.message, 'Response code 404 (Not Found): groupID does not exist');
    }
});


// Test DELETE/group/{groupID} non-integer ID
test('Test DELETE/group/{groupID} non-integer ID', async (t) => {
    try {
        const groupID = 'a'
        const response = await got.delete(`http://localhost:${serverPort}/group/${nonIntegergroupID}`, { responseType: 'json' });

        t.fail('Request should have failed with 400, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 400);
        t.is(error.response.body.message, 'request.params.groupID should be integer');
    }
});

////////////////////Test POST/groups/enroll//////////////////////////
test('Test POST/groups/enroll Successful Operation', async (t) => {
    try {
        const requestBody = {
            studentID: 5,
            groupID: validgroupID
        };
        const response = await got.post(`http://localhost:${serverPort}/groups/enroll`, { 
            json: requestBody,
            responseType: 'json',
        });

        t.is(response.statusCode, 200);

        t.deepEqual(response.body, { name: "Group 2", maxMembers: 5, groupID: 2,
            members: [
                { name: "James Stone", id: 3 },
                { name: "Sandy Rivers", id: 4 },
                { name: "Eve Adams", id: 5 }
            ]
        });
    } catch (error) {
        t.fail(`API call failed: ${error.message}`);
    }
});

// Test POST/groups/enroll non-existent groupID
test('Test POST/groups/enroll non-existent groupID', async (t) => {
    try {
        const requestBody = {
            studentID: 5,
            groupID: nonExistentgroupID
        };
        const response = await got.post(`http://localhost:${serverPort}/groups/enroll`, { 
            json: requestBody,
            responseType: 'json',
        });

        t.fail('Request should have failed with 404, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 404);
        t.is(error.response.body.message, 'Response code 404 (Not Found): groupID or student ID does not exist');
    }
});


// Test POST/groups/enroll non-integer groupID
test('Test POST/groups/enroll non-integer groupID', async (t) => {
    try {
        const requestBody = {
            studentID: 5,
            groupID: nonIntegergroupID
        };
        const response = await got.post(`http://localhost:${serverPort}/groups/enroll`, { 
            json: requestBody,
            responseType: 'json',
        });

        t.fail('Request should have failed with 400, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 400);
        t.is(error.response.body.message, 'request.body.groupID should be integer');
    }
});


// Test POST/groups/enroll non-existent studentID
test('Test POST/groups/enroll non-existent studentID', async (t) => {
    try {
        const requestBody = {
            studentID: 13,
            groupID: validgroupID
        };
        const response = await got.post(`http://localhost:${serverPort}/groups/enroll`, { 
            json: requestBody,
            responseType: 'json',
        });

        t.fail('Request should have failed with 404, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 404);
        t.is(error.response.body.message, 'Response code 404 (Not Found): groupID or student ID does not exist');
    }
});


// Test POST/groups/enroll non-integer groupID
test('Test POST/groups/enroll non-integer studentID', async (t) => {
    try {
        const requestBody = {
            studentID: 'a',
            groupID: validgroupID
        };
        const response = await got.post(`http://localhost:${serverPort}/groups/enroll`, { 
            json: requestBody,
            responseType: 'json',
        });
        t.fail('Request should have failed with 400, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 400);
        t.is(error.response.body.message, 'request.body.studentID should be integer');
    }
});


// Test POST/groups/enroll already enrolled studentID
test('Test POST/groups/enroll already enrolled studentID', async (t) => {
    try {
        const requestBody = {
            studentID: 3,
            groupID: validgroupID
        };
        const response = await got.post(`http://localhost:${serverPort}/groups/enroll`, { 
            json: requestBody,
            responseType: 'json',
        });

        t.fail('Request should have failed with 409, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 409);
        t.is(error.response.body.message, 'Student is already enrolled in this group.');
    }
});


// Test POST/groups/enroll group is full
test('Test POST/groups/enroll group is full', async (t) => {
    try {
        const requestBody = {
            studentID: 4,
            groupID: 1
        };
        const response = await got.post(`http://localhost:${serverPort}/groups/enroll`, { 
            json: requestBody,
            responseType: 'json',
        });
        t.fail('Request should have failed with 409, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 403);
        t.is(error.response.body.message, 'Group is full. Cannot enroll more members.');
    }
});


////////////////////Test GET/group/{groupID}//////////////////////////

// Test GET/group/{groupID} Successful Operation
test('Test GET/group/{groupID} Successful Operation', async (t) => {
    try {
        const response = await got(`http://localhost:${serverPort}/group/${validgroupID}`, { responseType: 'json' });

        t.is(response.statusCode, 200);

        t.deepEqual(response.body, { name: "Group 2", maxMembers: 5, groupID: 2,
            members: [
                { name: "James Stone", id: 3 },
                { name: "Sandy Rivers", id: 4 }
            ]
        });
    } catch (error) {
        t.fail(`API call failed: ${error.message}`);
    }
});


test('Test GET/group/{groupID} non-existent ID', async (t) => {
    try {
        const response = await got(`http://localhost:${serverPort}/group/${nonExistentgroupID}`, { responseType: 'json' });

        t.fail('Request should have failed with 404, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 404);
        t.is(error.response.body.message, 'Response code 404 (Not Found): Group not found.');
    }
});

// Test GET/group/{groupID} non-integer ID
test('Test GET/group/{groupID} non-integer ID', async (t) => {
    try {
        const response = await got(`http://localhost:${serverPort}/group/${nonIntegergroupID}`, { responseType: 'json' });

        t.fail('Request should have failed with 400, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 400);
        t.is(error.response.body.message, 'request.params.groupID should be integer');
    }
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
test('Test GET/student/{studentID} Successful Operation', async (t) => {
    try {
        const studentID = 2;
        const response = await got(`http://localhost:${serverPort}/student/${studentID}`, { responseType: 'json' });

        t.is(response.statusCode, 200);

        t.deepEqual(response.body, { id: 2, name: 'Jane Smith' });
          
          
    } catch (error) {
        t.fail(`API call failed: ${error.message}`);
    }
});

// Test GET/student/{studentID} non-existent ID
test('Test GET/student/{studentID} non-existent ID', async (t) => {
    try {
        const studentID = 999;
        const response = await got(`http://localhost:${serverPort}/student/${studentID}`, { responseType: 'json' });

        t.fail('Request should have failed with 404, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 404);
        t.is(error.response.body.message, 'studentID does not exist');

    }
});

// Test GET/student/{studentID} non-integer ID
test('Test GET/student/{studentID} non-integer ID', async (t) => {
    try {
        const studentID = 'abc';
        const response = await got(`http://localhost:${serverPort}/student/${studentID}`, { responseType: 'json' });

        t.fail('Request should have failed with 400, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 400);
        t.is(error.response.body.message, 'request.params.studentID should be integer');

    }
});

// Test GET/student/{studentID} negative ID
test('Test GET/student/{studentID} negative ID', async (t) => {
    try {
        const studentID = -2;
        const response = await got(`http://localhost:${serverPort}/student/${studentID}`, { responseType: 'json' });

        t.fail('Request should have failed with 400, but it succeeded.');
    } catch (error) {
        t.is(error.response.statusCode, 400);
        t.is(error.response.body.message, 'studentID should be a positive integer');
    }
});