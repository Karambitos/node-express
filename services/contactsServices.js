import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

import { fileURLToPath } from 'url';
import path from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// console.log(__filename)
// const contactsPath = path.join(__dirname, 'contacts.json');


const contactsPath = './db/contacts.json';

async function getAll() {
    const contactsService = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(contactsService);
}

async function getById(contactId) {
    const contacts = await getAll();
    const contact = contacts.filter((item) => item.id === String(contactId));
    return contact.length > 0 ? contact : null;
}

async function addContact(data) {
    const contactsService = await getAll();
    const newContact = {
        id: uuidv4(),
        ...data,
    };
    contactsService.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsService, null, 2));
    return newContact;
}

async function updateById(contactId, data) {
    const contactsService = await getAll();
    const index = contactsService.findIndex((item) => item.id === String(contactId));
    if (index === -1) return null;
    contactsService[index] = { contactId, ...data };
    await fs.writeFile(contactsPath, JSON.stringify(contactsService, null, 2));
    return contactsService[index];
}

async function removeContact(contactId) {
    const contactsService = await getAll();
    const index = contactsService.findIndex((item) => item.id === String(contactId));
    if (index === -1) return null;
    const [result] = contactsService.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsService, null, 2));
    return result;
}

export default {
    getAll,
    getById,
    addContact,
    updateById,
    removeContact,
};