import express from 'express';
import ctrl from '../controllers/contacts.js';

const router = express.Router();

router.get('/contacts', ctrl.getAllContactsHandler);

router.get('/contacts/:contactId', ctrl.getContactByIdHandler);

router.post('/contacts', ctrl.createContactHandler);

router.patch('/contacts/:contactId', ctrl.updateContactHandler);

router.delete('/contacts/:contactId', ctrl.deleteContactHandler);

export default router;

