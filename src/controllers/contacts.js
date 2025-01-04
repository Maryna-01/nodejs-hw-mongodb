import createError from 'http-errors';
import { getAllContacts, getContactById, createContact , updateContact ,  deleteContact} from '../services/contacts.js';

export const getAllContactsHandler = async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
    });
};

export const getContactByIdHandler = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
        throw createError(404, "Contact not found");
    }

    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};

export const createContactHandler = async (req, res, next) => {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

    if (!name || !phoneNumber || !contactType) {
        throw createError(400, "Missing required fields: name, phoneNumber, or contactType");
    }

    const newContact = await createContact({ name, phoneNumber, email, isFavourite, contactType });

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: newContact,
    });
};

export const updateContactHandler = async (req, res, next) => {
    const { contactId } = req.params;
    const updateFields = req.body;

    const updatedContact = await updateContact(contactId, updateFields);

    if (!updatedContact) {
        throw createError(404, "Contact not found");
    }

    res.status(200).json({
        status: 200,
        message: "Successfully patched a contact!",
        data: updatedContact,
    });
};

export const deleteContactHandler = async (req, res, next) => {
    const { contactId } = req.params;

    const deletedContact = await deleteContact(contactId);

    if (!deletedContact) {
        throw createError(404, "Contact not found");
    }

    res.status(204).send();
};