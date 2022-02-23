export type TextContentTypeType = {
  /**
   * Specifies the expectation of a name.
   * @ios
   * @since 4.2.1
   */
  NAME: string;

  /**
   * Specifies the expectation of a prefix or title, such as “Dr.”.
   * @ios
   * @since 4.2.1
   */
  NAMEPREFIX: string;

  /**
   * Specifies the expectation of a given name.
   * @ios
   * @since 4.2.1
   */
  GIVENNAME: string;

  /**
   * Specifies the expectation of a middle name.
   * @ios
   * @since 4.2.1
   */
  MIDDLENAME: string;

  /**
   * Specifies the expectation of a family name.
   * @ios
   * @since 4.2.1
   */
  FAMILYNAME: string;

  /**
   * Specifies the expectation of a suffix, such as “Jr.”.
   * @ios
   * @since 4.2.1
   */
  NAMESUFFIX: string;

  /**
   * Specifies the expectation of a nickname.
   * @ios
   * @since 4.2.1
   */
  NICKNAME: string;

  /**
   * Specifies the expectation of a job title.
   * @ios
   * @since 4.2.1
   */
  JOBTITLE: string;

  /**
   * Specifies the expectation of an organization name.
   * @ios
   * @since 4.2.1
   */
  ORGANIZATIONNAME: string;

  /**
   * Specifies the expectation of a location, such as a point of interest, an address, or another way to identify a location.
   * @ios
   * @since 4.2.1
   */
  LOCATION: string;

  /**
   * Specifies the expectation of a street address that fully identifies a location.
   * @ios
   * @since 4.2.1
   */
  FULLSTREETADDRESS: string;

  /**
   * Specifies the expectation of the first line of a street address.
   * @ios
   * @since 4.2.1
   */
  STREETADDRESSLINE1: string;

  /**
   * Specifies the expectation of the second line of a street address.
   * @ios
   * @since 4.2.1
   */
  STREETADDRESSLINE2: string;

  /**
   * Specifies the expectation of a city name.
   * @ios
   * @since 4.2.1
   */
  ADDRESSCITY: string;

  /**
   * Specifies the expectation of a state name.
   * @ios
   * @since 4.2.1
   */
  ADDRESSSTATE: string;

  /**
   * Specifies the expectation of a city name combined with a state name.
   * @ios
   * @since 4.2.1
   */
  ADDRESSCITYANDSTATE: string;

  /**
   * Specifies the expectation of a sublocality.
   * @ios
   * @since 4.2.1
   */
  SUBLOCALITY: string;

  /**
   * Specifies the expectation of a country name.
   * @ios
   * @since 4.2.1
   */
  COUNTRYNAME: string;

  /**
   * Specifies the expectation of a postal code.
   * @ios
   * @since 4.2.1
   */
  POSTALCODE: string;

  /**
   * Specifies the expectation of a telephone number.
   * @ios
   * @since 4.2.1
   */
  TELEPHONENUMBER: string;

  /**
   * Specifies the expectation of an email address.
   * @ios
   * @since 4.2.1
   */
  EMAILADDRESS: string;

  /**
   * Specifies the expectation of a URL.
   * @ios
   * @since 4.2.1
   */
  URL: string;

  /**
   * Specifies the expectation of a Credit Card Number.
   * @property {String} CREDITCARDNUMBER
   * @ios
   * @since 4.2.1
   */
  CREDITCARDNUMBER: string;

  /**
   * The expectation that a text input area specifies an account or login name. @available(iOS 11.0, *)
   * @property {String} USERNAME
   * @ios
   * @since 4.2.1
   */
  USERNAME: string;

  /**
   * The expectation that a text input area specifies a password. @available(iOS 11.0, *)
   * @property {String} PASSWORD
   * @ios
   * @since 4.2.1
   */
  PASSWORD: string;

  /**
   * The expectation that a text input area specifies a new password. @available(iOS 12.0, *)
   * @ios
   * @since 4.2.1
   */
  NEWPASSWORD: string;

  /**
   * The expectation that a text input area specifies a single-factor SMS login code. @available(iOS 12.0, *)
   * @ios
   * @since 4.2.1
   */
  ONETIMECODE: string;
};

/**
 * Constants that identify the semantic meaning expected for a text-entry area
 * @ios
 * @since 4.2.1
 */
const TextContentType: TextContentTypeType = Device.deviceOS.toLowerCase() === 'ios' ? require(`./textcontenttype.${Device.deviceOS.toLowerCase()}`).default : {};
type TextContentType = TextContentTypeType;

export default TextContentType;
