const mutantService = require("../../src/services/mutantService").mutantService;

test('IsMutant Service', () => {
    const parameter = ['TTGC', 'AAGT', 'CTAT', 'CGAA', 'CCCC', 'CCAC'];

    const result = mutantService.isMutant(parameter);
    expect(result).toEqual(true);
});

test('IsNotMutant Service', () => {
    const parameter = ['TTGX', 'AAGT', 'CTAT', 'CGAA', 'CCCC', 'CCAC'];

    const result = mutantService.isMutant(parameter);
    expect(result).toEqual(false);
});