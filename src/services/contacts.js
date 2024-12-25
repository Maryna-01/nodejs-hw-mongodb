const Contact = require('../models/contact');

async function getContacts() {
    return await Contact.find({});
}

async function getContactById(contactId) {
    return await Contact.findById(contactId);
}

module.exports = {
    getContacts,
    getContactById
};
