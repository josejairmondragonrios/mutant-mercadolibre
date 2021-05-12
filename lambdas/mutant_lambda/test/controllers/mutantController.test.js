const { init } = require("../../src/controllers/mutantController")

test('IsMutant Controller', () => {
    const event = { 'headers': {}, 'body': { 'dna': ['TTGC', 'AAGT', 'CTAT', 'CGAA', 'CCCC', 'CCAC'] } },
        body = {},
        callback = {};

    const result = { statusCode: 200 };

    return init(event, body, callback).then(data => {
        expect(data).toEqual(result);
    });
});

test('IsNotMutant Controller', () => {
    const event = { 'headers': {}, 'body': { 'dna': ['TTGX', 'AAGT', 'CTAT', 'CGAA', 'CCCC', 'CCAC'] } },
        body = {},
        callback = {};

    const result = { statusCode: 403 };

    return init(event, body, callback).then(data => {
        expect(data).toEqual(result);
    });
});