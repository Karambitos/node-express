import contactsService from "../services/contactsServices.js";
import {createContactSchema, updateContactSchema} from "../schemas/contactsSchemas.js";
import HttpError from "../helpers/HttpError.js";


export const getAllContacts = async (req, res, next) => {
    const contacts = await contactsService.getAll();
    res.json(contacts);
};

export const getOneContact = async (req, res, next) => {
    const { id } = req.params;
    const contact = await contactsService.getById(id);
    if (!contact) {
        throw HttpError(404, "Not found");
    }
    res.json(contact);
};

export const createContact = async (req, res, next) => {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }
    const contact = await contactsService.addContact(req.body);
    res.status(201).json(contact);
};

export const updateContact = async (req, res, next) => {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const contact = await contactsService.updateById(id, req.body);
    if (!contact) {
        throw HttpError(404, "Not found");
    }
    res.json(contact);
};

export const deleteContact = async (req, res, next) => {
    const { id } = req.params;
    const contact = await contactsService.removeContact(id);
    if (!contact) {
        throw HttpError(404, "Not found");
    }
    res.json({
        message: "Delete success",
    });
};

