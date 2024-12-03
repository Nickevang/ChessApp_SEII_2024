// Creating the post Group test

const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

const { createGroup } = require('../service/GroupService.js');
const app = require('../index.js');

test.before(async (t) =>
{
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json' });
});



test.after.always((t) =>
{
    t.context.server.close();
});




test('test to pass', (t) =>
{
    t.pass();
});




// Testing the post group by Function 



test('Post group by function', async (t) =>
{



    const group = {


        maxMembers: 6,

        groupID: 0,

        members: [{ name: "John Doe", id: 2 }],

        name: "Advanced Group"

    };

    const result = await createGroup(group);


    // check that result is a dictionary

    t.is(typeof result, 'object');


    // check it has the right keys

    t.true(result.hasOwnProperty('maxMembers'));
    t.true(result.hasOwnProperty('groupID'));
    t.true(result.hasOwnProperty('members'));
    t.true(result.hasOwnProperty('name'));

    // check the values are correct

    t.is(result.maxMembers, 6);
    t.is(result.groupID, 0);
    t.deepEqual(result.members, [{ name: "John Doe", id: 2 }]);
    t.is(result.name, "Advanced Group");

});




test('Post group by URL', async t =>
{
    try
    {
        const { body, statusCode } = await t.context.got.post("group", {
            json: {
                maxMembers: 6,
                groupID: 0,
                members: [{ name: "John Doe", id: 2 }],
                name: "Advanced Group"
            }
        });

        // Check the value of the status 
        t.is(statusCode, 200);

        // check that result is a dictionary
        t.is(typeof body, 'object');

        // check it has the right keys
        t.true(body.hasOwnProperty('maxMembers'));
        t.true(body.hasOwnProperty('groupID'));
        t.true(body.hasOwnProperty('members'));
        t.true(body.hasOwnProperty('name'));

        // check the values are correct
        t.is(body.maxMembers, 6);
        t.is(body.groupID, 0);
        t.deepEqual(body.members, [{ name: "John Doe", id: 2 }]); // Use deepEqual for array/object comparison
        t.is(body.name, "Advanced Group");
    } catch (error)
    {
        // Properly handle errors
        t.fail(`Request failed: ${error.message}`);
    }
});
