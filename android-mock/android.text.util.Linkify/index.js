module.exports = Linkify;

function Linkify(props){
    
}

Linkify.WEB_URLS = 0x01;
Linkify.EMAIL_ADDRESSES = 0x02;
Linkify.PHONE_NUMBERS = 0x04;
Linkify.MAP_ADDRESSES = 0x08;
Linkify.ALL = Linkify.WEB_URLS | Linkify.EMAIL_ADDRESSES | Linkify.PHONE_NUMBERS | Linkify.MAP_ADDRESSES;