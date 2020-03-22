/**
@typedef {import("sf-core/ui/color")} Color;
@typedef {import ("sf-core/ui/font")} Font;
@typedef {{
        backgroundColor: typeof Color;
        string: string;
        font: typeof Font;
        foregroundColor: typeof Color;
        link: string;
        strikethrough: boolean;
        underline: boolean;
        underlineColor: typeof Color;
    }} AttributedString
 */

/** @type {AttributedString} */
module.exports = require("./attributedstring-" + Device.deviceOS);
