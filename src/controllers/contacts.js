import createError from 'http-errors';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import contactsServices from '../services/contacts.js';


export const getAllContactsHandler = async (req, res) => {
    const contacts = contactsServices.getAllContacts ();
    res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
    });
};

export const getContactByIdHandler = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await  contactsServices.getContactById(contactId);

    if (!contact) {
        throw createHttpError(404, "Contact not found");
    }

    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};

 const createContactHandler = async (req, res,) => {
    const contact = await contactsServices.createContact(req.body);

    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: contact,
      });
    };
    

    const updateContactHandler = async (req, res) => {
        const { contactId } = req.params;
        const result = await contactsServices.updateContact(contactId, req.body);
      
        if (!result) throw createHttpError(404, 'Contact not found');
      
        res.status(200).json({
          status: 200,
          message: 'Successfully patched a contact!',
          data: result.contact,
        });
      };
      

      const deleteContactHandler = async (req, res) => {
        const { contactId } = req.params;
        const result = await contactsServices.deleteContact(contactId);
      
        if (!result) throw createHttpError(404, 'Contact not found');
      
        res.status(204).send();
      };
      const ctrl = {
        getAllContactsController: ctrlWrapper(getAllContactsHandler),
        getContactByIdController: ctrlWrapper(getContactByIdHandler),
        createContactController: ctrlWrapper(createContactHandler),
        updateContactController: ctrlWrapper(updateContactHandler),
        deleteContactController: ctrlWrapper(deleteContactHandler),
      };
      
      export default ctrl;