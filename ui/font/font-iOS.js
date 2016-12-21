/* globals */
function Font () {}

Font.create = function(fontFamily, size, style) {
    if (style === this.NORMAL) {
        return UIFont.fontWithNameSize(fontFamily,size);
    }else if(style === this.BOLD){
        return UIFont.fontWithNameSize(fontFamily,size).bold();
    }
    else if(style === this.ITALIC){
        return UIFont.fontWithNameSize(fontFamily,size).italic();
    }else if(style === this.BOLDITALIC){
       return UIFont.fontWithNameSize(fontFamily,size).boldItalic(); 
    }
        
}
    
Font.createFromFile = function(path, size) {
    return  UIFont.createFromFileWithFilenameStringSize(path, size);
}

Font.NORMAL = 1;
Font.BOLD = 2;
Font.ITALIC = 4;
Font.BOLDITALIC = 6;

module.exports = Font;