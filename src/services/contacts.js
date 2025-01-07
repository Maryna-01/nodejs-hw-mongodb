import {
    Contact
}
from '../models/contact.js';

export const getAllContacts = async () => {
    const result = await Contact.find();
    return result;
};

export const getContactById = async (contactId) => {
    const result = await Contact.findById(contactId);
    return result;
};

export const createContact = async (newContactData) => {
    const contacts = await Contact.find(newContactData);
    return contacts;
};

export const deleteContact = async (contactId) => {
    const contacts = await Contact.findByIdAndDelete(contactId);
    return contacts;
};

export const updateContact = async (ContactData) => {
    const contacts = await Contact.find(ContactData);
    return  contacts;
};