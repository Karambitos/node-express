// contactsRouter.js
import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../../controllers/contactsControllers.js";
import ctrlWrapper from "../../helpers/ctrlWrapper.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrlWrapper(getAllContacts));

contactsRouter.get("/:id", ctrlWrapper(getOneContact));

contactsRouter.delete("/:id", ctrlWrapper(deleteContact));

contactsRouter.post("/", ctrlWrapper(createContact));

contactsRouter.put("/:id", ctrlWrapper(updateContact));

export default contactsRouter;
