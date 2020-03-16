import Contacts = require("./device/contacts");

abstract class GridViewItem {
    get furkan(): string{
        throw new Error("Not implemented method");
    }
    set furkan(val: string){
        throw new Error("Not implemented method");
    }
}

class XX implements IGridViewItem {
    get furkan(): string {
        throw new Error("Method not implemented.");
    } 
    
    set furkan(val: string) {
        throw new Error("Method not implemented.");
    }
}

const contact = new Contacts.Contact