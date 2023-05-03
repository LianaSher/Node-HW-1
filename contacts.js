const { clear } = require("console");
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const getListContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contId = String(contactId);
  const allContacts = await getListContacts();
  const result = allContacts.find((contact) => contact.id === contId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contId = String(contactId);
  const contacts = await getListContacts();
  const index = contacts.findIndex((contact) => contact.id === contId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await getListContacts();

  const newContact = { id: nanoid(), name, email, phone };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
};
