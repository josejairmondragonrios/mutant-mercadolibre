"use strict";
var mongoDbClient = require("mongodb").MongoClient;

/**
 * Clase para manejo de la base de datos MongoDB
 */
class database {

  /**
   * Insertar documento en una coleccion de una base de datos MongoDB
   * @param {string} url
   * @param {string} database
   * @param {string} collection
   * @param {object} data
   */
  static async add(url, database, collection, data) {
    let conn = await mongoDbClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
    var dbo = await conn.db(database);
    return await dbo.collection(collection).insertOne(data);
  }
}

module.exports.database = database;