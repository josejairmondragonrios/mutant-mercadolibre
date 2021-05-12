class logs {

    /**
     * Tracking de errores
     * @param {*} error 
     */
    static async registerError(error) {
        console.log("Error => ", error);
    }
}

module.exports.logs = logs;