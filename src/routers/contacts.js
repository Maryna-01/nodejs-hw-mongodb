import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getAllContactsHandler, getContactByIdHandler, createContactHandler, updateContactHandler, deleteContactHandler } from '../controllers/contacts.js';

const router = express.Router();

router.get('/', ctrlWrapper(getAllContactsHandler));
router.get('/:contactId', ctrlWrapper(getContactByIdHandler));
router.post('/', ctrlWrapper(createContactHandler));
router.patch('/:contactId', ctrlWrapper(updateContactHandler));
router.delete('/:contactId', ctrlWrapper(deleteContactHandler));

export default router;

