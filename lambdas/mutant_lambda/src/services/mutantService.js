"use strict"
const constants = require("../utils/constants");
const database = require("../utils/database").database;

class mutantService {

    /**
     * Buscar si el arreglo de string "dna" es mutante
     * @param {*} dna 
     */
    static async isMutant(dna) {
        try {
            if (!this.validateDnaLength(dna))
                return false;
    
            let matrixDna = this.buildMatrix(dna);
            if (!this.validateDnaCharacters(matrixDna))
                return false;
    
            let isMutant = this.serchSequenceDNA(matrixDna);
    
            await database.add(constants.CONNECTION_DATABASE.url, constants.CONNECTION_DATABASE.name, constants.CONNECTION_DATABASE.collection, { mutant: isMutant });
    
            return isMutant;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Validar si la matriz "dna" es valida
     * @param {*} dna 
     * @returns 
     */
    static validateDnaCharacters(matrixDna) {
        let matrixDnaSize = matrixDna.length;

        for (let x = 0; x < matrixDnaSize; x++) {
            let row = matrixDna[x],
                rowSize = row.length;

            for (let y = 0; y < rowSize; y++) {
                let character = row[y];

                // Validar si el caracter se encuentra dentro de los caracteres del "dna"
                if (!constants.DNA_LETTERS.includes(character))
                    return false;
            }
        }

        return true;
    }

    /**
     * Validar el tamaño de los elementos del arreglo "dna"
     * @param {*} dna 
     * @returns 
     */
    static validateDnaLength(dna) {
        let dnaLength = dna.length;
        // Valida si el tamaño del array "dna" es menor al numero de secuencias
        if (dnaLength < constants.SEQUENCE_TO_LETTERS)
            return false;

        let size = 0;
        for (let i = 0; i < dnaLength; i++) {
            let element = dna[i];
            if (i == 0)
                size = element.length;
            else {
                // Valida que todos los elementos tengan el mismo tamaño
                if (size != element.length)
                    return false;
            }
        }

        return true;
    }

    /**
     * Construir matriz de caracteres basado en el array de string "dna"
     * @param {*} sequence 
     * @returns 
     */
    static buildMatrix(dna) {
        return dna.map(element => {
            return element.toUpperCase().split('');
        });
    }

    /**
     * Busca las secuencias de ADN en la "matrixDna"
     * @param {*} matrixDna 
     */
    static serchSequenceDNA(matrixDna) {
        let totalSequencesFound = 0,
            // limite del recorrido de la posicion en (X) de la matriz
            matrixDnaSize = matrixDna.length,
            limitX = matrixDnaSize - constants.SEQUENCE_TO_LETTERS;

        for (let x = 0; x < matrixDnaSize; x++) {

            let row = matrixDna[x],
                rowSize = row.length,
                // limite del recorrido de la posicion en (Y) de la matriz
                limitY = rowSize - constants.SEQUENCE_TO_LETTERS;

            for (let y = 0; y < rowSize; y++) {

                // Valida si las iteracion llego al limite de la matriz para validar secuencias
                if (x > limitY && y > limitY)
                    break;

                let letter = row[y];

                // Validar si "y" no ha llegado al limite de iteraciones de la matriz para validar secuencias horizontales
                if (y <= limitY) {
                    totalSequencesFound += (this.searchHorizontalSequence(matrixDna, letter, x, y, constants.SEQUENCE_TO_LETTERS)) ? 1 : 0;
                    if (totalSequencesFound >= constants.SEQUENCE_NUMBER_TO_BE_MUTANT)
                        return true;
                }

                // Validar si "x" no ha llegado al limite de iteraciones de la matriz para validar secuencias verticales
                if (x <= limitX) {
                    totalSequencesFound += (this.searchVerticalSequence(matrixDna, letter, x, y, constants.SEQUENCE_TO_LETTERS)) ? 1 : 0;
                    if (totalSequencesFound >= constants.SEQUENCE_NUMBER_TO_BE_MUTANT)
                        return true;
                }

                // Validar si "x" y "y" no ha llegado al limite de iteraciones de la matriz para validar secuencias diagonales
                if (x <= limitX && y <= limitY) {
                    totalSequencesFound += (this.searchDiagonalSequence(matrixDna, letter, x, y, constants.SEQUENCE_TO_LETTERS)) ? 1 : 0;
                    if (totalSequencesFound >= constants.SEQUENCE_NUMBER_TO_BE_MUTANT)
                        return true;
                }
            }
        }

        return false;
    }

    /**
     * Buscar secuencias Horizontales
     * @param {*} matrix 
     * @param {*} letter 
     * @param {*} positionX 
     * @param {*} positionY 
     * @param {*} numberPositions 
     * @returns 
     */
    static searchHorizontalSequence(matrix, letter, positionX, positionY, numberPositions) {
        let coincidence = 0;
        let colum = matrix[positionX];

        for (let y = 0; y < numberPositions; y++) {
            if (colum[positionY + y] == letter) {
                coincidence++;
            }
        }

        return (coincidence == constants.SEQUENCE_TO_LETTERS);
    }

    /**
     * Buscar secuencias Verticales
     * @param {*} matrix 
     * @param {*} letter 
     * @param {*} positionX 
     * @param {*} positionY 
     * @param {*} numberPositions 
     * @returns 
     */
    static searchVerticalSequence(matrix, letter, positionX, positionY, numberPositions) {
        let coincidence = 0;
        for (let x = 0; x < numberPositions; x++) {
            let colum = matrix[positionX + x];
            if (colum[positionY] == letter) {
                coincidence++;
            }
        }

        return (coincidence == constants.SEQUENCE_TO_LETTERS);
    }

    /**
     * Buscar secuencias Diagonales
     * @param {*} matrix 
     * @param {*} letter 
     * @param {*} positionX 
     * @param {*} positionY 
     * @param {*} numberPositions 
     * @returns 
     */
    static searchDiagonalSequence(matrix, letter, positionX, positionY, numberPositions) {
        let coincidence = 0;
        for (let x = 0; x < numberPositions; x++) {
            let colum = matrix[positionX + x];
            if (colum[positionY + x] == letter) {
                coincidence++;
            }
        }
        return (coincidence == constants.SEQUENCE_TO_LETTERS);
    }

}

module.exports.mutantService = mutantService;