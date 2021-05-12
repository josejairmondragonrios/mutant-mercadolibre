"use strict";
var constants = require("../utils/constants");
const logs = require("../utils/logs").logs;
var statsService = require("../services/statsService").statsService;

const init = async (event, context, callback) => {
  try {
    const body = event.body || event;
    return {
      statusCode: constants.CODE_SUCCESS,
      body: JSON.stringify(await statsService.get())
    };
  } catch (error) {
    logs.registerError(error);
    return { statusCode: constants.CODE_ERROR };
  }
};

module.exports = { init };