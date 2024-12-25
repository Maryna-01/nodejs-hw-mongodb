const express = require('express');
const cors = require('cors');
const pino = require('pino-http')();
const {
    getContacts,
    getContactById
} = require('./services/contacts');

function setupServer() {
    const app = express();

    app.use(cors());
    app.use(pino);
    app.use(express.json());

    app.get('/contacts', async (req, res) => {
        try {
            const contacts = await getContacts();
            res.status(200).json({
                status: 200,
                message: "Successfully found contacts!",
                data: contacts,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    });

    app.get('/contacts/:contactId', async (req, res) => {
        const {
            contactId
        } = req.params;
        try {
            const contact = await getContactById(contactId);
            if (!contact) {
                return res.status(404).json({
                    message: 'Contact not found',
                });
            }
            res.status(200).json({
                status: 200,
                message: `Successfully found contact with id ${contactId}!`,
                data: contact,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error',
            });
        }
    });

    app.use((req, res, next) => {
        res.status(404).json({
            message: 'Not found',
        });
    });

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = {
    setupServer
};
