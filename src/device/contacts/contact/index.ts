import { IContact } from './contact';

const Contact: ConstructorOf<IContact, Partial<IContact>> = require(`./contact.${Device.deviceOS.toLowerCase()}`).default;
type Contact = IContact;

export default Contact;
