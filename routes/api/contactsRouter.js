// contactsRouter.js
import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../../controllers/contactsControllers.js";
import validateBody  from "../../middlewares/validateBody.js";
import {createContactSchema, updateContactSchema} from "../../schemas/contactsSchemas.js";
import controllerWrapper from "../../helpers/controllerWrapper.js";


const contactsRouter = express.Router();

contactsRouter.get("/", controllerWrapper(getAllContacts));

contactsRouter.get("/:id", controllerWrapper(getOneContact));

contactsRouter.delete("/:id", controllerWrapper(deleteContact));

contactsRouter.post("/", validateBody(createContactSchema), controllerWrapper(createContact));

contactsRouter.put("/:id", validateBody(updateContactSchema), controllerWrapper(updateContact));

export default contactsRouter;
