module.exports = {
    CODE_ERROR: 500,
    CODE_FORBIDDEN: 403,
    CODE_SUCCESS: 200,
    SEQUENCE_NUMBER_TO_BE_MUTANT: 2,
    SEQUENCE_TO_LETTERS: 4,
    DNA_LETTERS: ['A', 'T', 'G', 'C'],
    CONNECTION_DATABASE: {
        url: "mongodb://root:12345678@localhost:27017/",
        name: "mutantes_db",
        collection: "tracking_dna_validation",

    }
    
};