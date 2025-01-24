import createHttpError from 'http-errors';
import { updateContact } from '../../services/contacts/updateContact.js';
import { saveFileToCloudinary } from '../../utils/cloudinaryServices.js';
import { saveFileToUploadDir } from '../../utils/uploadDirServices.js';
import { getEnvVar } from '../../utils/getEnvVar.js';

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const file = req.file;

  let photoUrl;


  if (!file && Object.keys(req.body).length === 0) {
    throw createHttpError(400, 'No data provided for update');
  }

  if (file) {
    if (getEnvVar('ENABLE_CLOUDINARY') && getEnvVar('ENABLE_CLOUDINARY').startsWith('cloudinary://')) {
      const photo = await saveFileToCloudinary(file);
      photoUrl = photo.secure_url;
    } else {
      photoUrl = await saveFileToUploadDir(file);
    }
  }

  const updateData = { ...req.body };
  if (photoUrl) {
    updateData.photo = photoUrl;
  }

  const result = await updateContact(contactId, userId, updateData);

  if (!result) throw createHttpError(404, 'Contact not found');

  res.status(200).json({
    status: 200,
    message: 'Successfully updated the contact!',
    data: result,
  });
};
