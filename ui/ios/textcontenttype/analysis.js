/**
 * @enum {String} UI.iOS.TextContentType
 * @ios
 * @static
 * @since 4.2.1
 *
 * Constants that identify the semantic meaning expected for a text-entry area
 *
 */
var TextContentType = {};

/**
 * @property {String} NAME
 * @ios
 * Specifies the expectation of a name.
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.NAME;

/**
 * @property {String} NAMEPREFIX
 * @ios
 * Specifies the expectation of a prefix or title, such as “Dr.”.
 * @static
 * @since 4.2.1
 * @readonly
 */
TextContentType.NAMEPREFIX;

/**
 * @property {String} GIVENNAME
 * @ios
 * Specifies the expectation of a given name.
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.GIVENNAME;

/**
 * @property {String} MIDDLENAME
 * @ios
 * Specifies the expectation of a middle name.
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.MIDDLENAME;

/**
 * @property {String} FAMILYNAME
 * @ios
 * Specifies the expectation of a family name.
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.FAMILYNAME;

/**
 * @property {String} NAMESUFFIX
 * @ios
 * Specifies the expectation of a suffix, such as “Jr.”.
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.NAMESUFFIX;

/**
 * @property {String} NICKNAME
 * @ios
 * Specifies the expectation of a nickname.
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.NICKNAME;

/**
 * @property {String} JOBTITLE
 * @ios
 * Specifies the expectation of a job title.
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.JOBTITLE;

/**
 * @property {String} ORGANIZATIONNAME
 * @ios
 * Specifies the expectation of an organization name.
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.ORGANIZATIONNAME;

/**
 * @property {String} LOCATION
 * @ios
 * Specifies the expectation of a location, such as a point of interest, an address, or another way to identify a location.
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.LOCATION;

/**
 * @property {String} FULLSTREETADDRESS
 * @ios
 * Specifies the expectation of a street address that fully identifies a location.
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.FULLSTREETADDRESS;

/**
 * @property {String} STREETADDRESSLINE1
 * @ios
 * Specifies the expectation of the first line of a street address.
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.STREETADDRESSLINE1;

/**
 * @property {String} STREETADDRESSLINE2
 * @ios
 * Specifies the expectation of the second line of a street address.
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.STREETADDRESSLINE2;

/**
 * @property {String} ADDRESSCITY
 * @ios
 * Specifies the expectation of a city name.
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.ADDRESSCITY;

/**
 * @property {String} ADDRESSSTATE
 * @ios
 * Specifies the expectation of a state name.
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.ADDRESSSTATE;

/**
 * @property {String} ADDRESSCITYANDSTATE
 * @ios
 * Specifies the expectation of a city name combined with a state name.
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.ADDRESSCITYANDSTATE;

/**
 * @property {String} SUBLOCALITY
 * @ios
 * Specifies the expectation of a sublocality.
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.SUBLOCALITY;

/**
 * @property {String} COUNTRYNAME
 * @ios
 * Specifies the expectation of a country name.
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.COUNTRYNAME;

/**
 * @property {String} POSTALCODE
 * @ios
 * Specifies the expectation of a postal code.
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.POSTALCODE;

/**
 * @property {String} TELEPHONENUMBER
 * @ios
 * Specifies the expectation of a telephone number.
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.TELEPHONENUMBER;

/**
 * @property {String} EMAILADDRESS
 * @ios
 * Specifies the expectation of an email address.
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.EMAILADDRESS;

/**
 * @property {String} URL
 * @ios
 * Specifies the expectation of a URL.
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.URL;

/**
 * @property {String} CREDITCARDNUMBER
 * @ios
 * Specifies the expectation of a Credit Card Number.
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.CREDITCARDNUMBER;

/**
 * @property {String} USERNAME
 * @ios
 * The expectation that a text input area specifies an account or login name. @available(iOS 11.0, *)
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.USERNAME;

/**
 * @property {String} PASSWORD
 * @ios
 * The expectation that a text input area specifies a password. @available(iOS 11.0, *)
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.PASSWORD;

/**
 * @property {String} NEWPASSWORD
 * @ios
 * The expectation that a text input area specifies a new password. @available(iOS 12.0, *)
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.NEWPASSWORD;

/**
 * @property {String} ONETIMECODE
 * @ios
 * The expectation that a text input area specifies a single-factor SMS login code. @available(iOS 12.0, *)
 * @static
 * @readonly
 * @since 4.2.1
 */
TextContentType.ONETIMECODE;