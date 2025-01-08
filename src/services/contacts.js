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
    const contact = await Contact.create(newContactData);
    return contact;
};

export const deleteContact = async (contactId) => {
    const contact = await Contact.findByIdAndDelete(contactId);
    return contact;
};

export const updateContact = async (ContactData) => {
    const contact = await Contact.findByIdAndUpdate(contactId, updateFields, { new: true });
    return  contact;
};