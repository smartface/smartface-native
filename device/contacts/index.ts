import { ContactsBase } from './contacts';

const Contacts: typeof ContactsBase = require(`./contacts.${Device.deviceOS.toLowerCase()}`).default;
type Contacts = ContactsBase;

export default Contacts;
