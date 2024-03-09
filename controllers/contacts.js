const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId; // Id mongo assigns all database entries (primary key)

const getAll = async (req, res) => {
    //swagger.tags=['contacts']
    /*
    #swagger.description = 'Returns all contacts in the database.';
    */
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
     res.setHeader('Content-Type', "application/json");
     res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    //swagger.tags=['contacts']
    /*
    #swagger.description = 'Returns a contact from the database using the contacts ID number';
    */
    const contactId = new ObjectId(req.params.id)
   const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: contactId });
   result.toArray().then((contacts) => {
    res.setHeader('Content-Type', "application/json");
    res.status(200).json(contacts[0]);
   });
};

const createContact = async (req, res) => {
    //swagger.tags=['contacts']
    /*
    #swagger.description = 'Create a contact in the database, every field is required. The contacted ID number is automatically assigned by the database after submition.
                            Any field that is ommitted will be set to "NULL"';
    */
    const contact =  {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occured while creating the contact.');
    };
};

const updateContact = async (req, res) => {
    //swagger.tags=['contacts']
    /*
    #swagger.description = 'Update a contacts information using the contacts ID number.The contacted ID number is automatically assigned by the database after submition.
                            Any field that is ommitted will be set to "NULL"';
    */
    const contactId = new ObjectId(req.params.id);
    const contact ={
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({_id: contactId}, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occured while updating the contact.');
    };
};

const deleteContact = async (req, res) => {
    //swagger.tags=['contacts']
    /*
    #swagger.description = 'Delete a contact from the database using the contacts ID number.';
    */
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({_id: contactId});
    if (response.deleteCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occured while deleting the contact.');
    };
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
}