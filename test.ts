import Contacts = require("./device/contacts");
import Color = require("./ui/color");
import File = require("./io/file");
abstract class GridViewItem {
    get furkan(): string{
        throw new Error("Not implemented method");
    }
    set furkan(val: string){
        throw new Error("Not implemented method");
    }
}

const color: Color = new Color();
const file = new File();
file.path