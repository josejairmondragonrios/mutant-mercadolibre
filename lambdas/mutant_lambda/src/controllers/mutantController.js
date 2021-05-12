"use strict"
var constants = require("../utils/constants");
const logs = require("../utils/logs").logs;
var mutantService = require("../services/mutantService").mutantService;

const init = async (event, context, callback) => {
    try {
        const body = event.body || event;

        var res = await mutantService.isMutant(body.dna);
        
        return (res) ?
            { statusCode: constants.CODE_SUCCESS }
            : { statusCode: constants.CODE_FORBIDDEN };
    } catch (error) {
        logs.registerError(error);
        return { statusCode: constants.CODE_ERROR };
    }
}

module.exports = { init };