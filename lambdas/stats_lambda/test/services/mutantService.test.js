const statsService = require("../../src/services/statsService").statsService;

test('Get Service', () => {
    const result = statsService.get();
    expect(result).not.toBeNull();
});