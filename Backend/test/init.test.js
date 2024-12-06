const http = require('node:http');
const test = require('ava').default;
const got = require('got');
const listen = require('test-listen')
const app = require('../index');

test.before(async (t) => { // einai async giati tha trexei prin ta tests?? to async paei mazi me to await
	t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
	t.context.got = got.extend({ http2:true, throwHttpErrors: false, responseType: "json", prefixUrl: t.context.prefixUrl });
});


test('is this working?', (t) => {
    t.pass();
});

// GET /coach/{coachID} tests
test("GET /coach/{coachID} returns correct coach for valid ID", async (t) => {
    const { body, statusCode } = await t.context.got(`CoachService/getCoach/coaches/1`, {
        throwHttpErrors: false,
    });
    t.is(statusCode, 200);
    //t.deepEqual(body, { id: 1, name: "Guardiola" });
});

test("GET /coach/{coachID} returns error for invalid ID (Coach Not Found)", async (t) => {
    const { body, statusCode } = await t.context.got(`CoachService/getCoach/coaches/666`, {
        throwHttpErrors: false,
    });
    t.is(statusCode, 404);
    //t.deepEqual(body, { message: "Invalid Coach ID" });
});

test("GET /coach/{coachID} rejects with an error for a null ID", async (t) => {
    const { body, statusCode } = await t.context.got(`CoachService/getCoach/coaches/${null}`, {
        throwHttpErrors: false,
    });
    t.is(statusCode, 400);
    //t.deepEqual(body, { message: "Invalid coach ID." });
});

test("GET /coach/{coachID} rejects with an error for an undefined ID", async (t) => {
    const { body, statusCode } = await t.context.got(`CoachService/getCoach/coaches/undefined`, {
        throwHttpErrors: false,
    });
    t.is(statusCode, 400);
    //t.deepEqual(body, { message: "Invalid coach ID." });
});


test.after((t) => {
	t.context.server.close();
});
