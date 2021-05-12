const { init } = require("../../src/controllers/statsController")

test('Get Controller', () => {
    const event = {},
        body = {},
        callback = {};

    const statusCode = 200;

    return init(event, body, callback).then(data => {
        expect(data.statusCode).toEqual(statusCode);
    });
});