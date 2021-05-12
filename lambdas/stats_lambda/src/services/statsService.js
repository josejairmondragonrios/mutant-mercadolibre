"use strict";
const constants = require("../utils/constants");
const database = require("../utils/database").database;

/**
 * Clase con los servicios de estadisticas de los mutantes y humanos
 */
class statsService {

    /**
     * Consulta la cantidad de humanos, cantidad de mutantes y el proporcion de mutantes
     * @returns object
     */
    static async get() {
        try {
            let mutants = await database.getCount(constants.CONNECTION_DATABASE.url, constants.CONNECTION_DATABASE.name, constants.CONNECTION_DATABASE.collection, { mutant: true });

            let humans = await database.getCount(constants.CONNECTION_DATABASE.url, constants.CONNECTION_DATABASE.name, constants.CONNECTION_DATABASE.collection, { mutant: false });

            var response = {
                count_mutant_dna: mutants,
                count_human_dna: humans,
                ratio: mutants / humans,
            };
            return response;
        } catch (error) {
            throw error;
        }
    };
}

module.exports.statsService = statsService;
