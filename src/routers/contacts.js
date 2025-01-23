import { Router } from 'express';
import multer from 'multer';
import ctrl from '../controllers/contacts/index.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import * as contactsSchemas from '../validation/contactsValidation.js';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.use(authenticate);

router.get('/', ctrl.getAllContactsController);

router.get('/:contactId', isValidId, ctrl.getContactByIdController);

router.post(
  '/',
  upload.single('photo'),
  validateBody(contactsSchemas.createContactSchema),
  ctrl.createContactController,
);

router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(contactsSchemas.updateContactSchema),
  ctrl.updateContactController,
);

router.delete('/:contactId', isValidId, ctrl.deleteContactController);

export default router;