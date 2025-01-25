import { createContact } from '../../services/contacts/createContact.js';
import { saveFileToCloudinary } from '../../utils/cloudinaryServices.js';
import { saveFileToUploadDir } from '../../utils/uploadDirServices.js';
import { getEnvVar } from '../../utils/getEnvVar.js';

export const createContactController = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const file = req.file;
    let photoUrl;

    if (file) {
      console.log('Received file:', file);

      if (getEnvVar('ENABLE_CLOUDINARY')?.startsWith('cloudinary://')) {
        const photo = await saveFileToCloudinary(file);
        photoUrl = photo.secure_url;
      } else {
        photoUrl = await saveFileToUploadDir(file);
      }
    } else {
      console.log('No file uploaded');
    }

    const contact = await createContact({
      ...req.body,
      userId,
      photo: photoUrl,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (error) {
    console.error('Error in createContactController:', error.message);
    next(error);
  }
};

