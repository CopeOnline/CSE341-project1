const mongodb = require('../data/database.js');
const ObjectId = require('mongodb').ObjectId; // Id mongo assigns all database entries (primary key)

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((users) => {
     res.setHeader('Content-Type', "application/json");
     res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id)
   const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: userId });
   result.toArray().then((users) => {
    res.setHeader('Content-Type', "application/json");
    res.status(200).json(users[0]);
   });
};

module.exports = {
    getAll,
    getSingle
}