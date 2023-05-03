const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await getListContacts();
      return console.log(allContacts);
    case "get":
      const oneContact = await getContactById(id);
      return console.log(oneContact);
    case "remove":
      const deletedContact = await removeContact(id);
      return console.log(deletedContact);
    case "add":
      const newContact = await addContact(name, email, phone);
      return console.log(newContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

const argv = yargs(hideBin(process.argv)).argv;

invokeAction(argv);
