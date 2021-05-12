"use strict";
var mongoDbClient = require("mongodb").MongoClient;

/**
 * Clase para manejo de la base de datos MongoDB
 */
class database {

  /**
   * Retorna la cantidad del filtro "query" en una coleccion de una base de datos MongoDB
   * @param {string} url
   * @param {string} database
   * @param {string} collection
   * @param {object} query
   * @returns int
   */
  static async getCount(url, database, collection, query) {
    let conn = await mongoDbClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
    var dbo = await conn.db(database);
    return await dbo.collection(collection).countDocuments(query);
  }
}

module.exports.database = database;