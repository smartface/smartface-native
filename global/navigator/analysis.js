/**
 * @class Navigator
 * @since 1.1.9
 *
 * Navigator is used for navigating between pages. When UI.Router.go calls navigator path,
 * navigates to related page.
 *
 *     @example
 *     const Router = require('sf-core/router');
 *     const Navigator = require('sf-core/navigator');
 *     
 *     Navigator.add('pgProfile', require('pages/pgProfile'));
 *     Navigator.add('pgMessages', require('pages/pgMessages'));
 *     Navigator.setIndex('pgProfile');
 * 
 *     Router.go('dashboard'); // Navigates the page named pgProfile.
 *     Router.go('dashboard/pgMessages'); // Navigates the page named pgMessages.
 */
function Navigator() {}


/**
 * Adds given page class to navigates by matching it with given path. You
 * can define if page instance will be singleton object or a new instance 
 * created everytime when UI.Router.go called.
 * 
 * @param {String} to Route path to page class
 * @param {UI.Page} page Page class to be used for creating and showing instances
 * @param {Boolean} isSingleton If given as true, single instance will be created
 *                              and everytime that instance will be shown
 * @static
 * @android
 * @ios
 * @since 1.1.9
 */
Navigator.prototype.add = function(to, page, isSingleton) {};

/**
 * Sets the page to be shown when UI.Router.go is called with navigator path.
 * 
 * @param {String} to Route path to page class
 * 
 * @static
 * @android
 * @ios
 * @since 1.1.9
 */
Navigator.prototype.setIndex = function(path) {};