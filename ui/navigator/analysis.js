/**
 * @class Navigator
 * @since 1.1.10
 *
 * Navigator is used for navigating between pages. When Router.go calls navigator path,
 * navigates to related page.
 *
 *     @example
 *     const Router = require('sf-core/router');
 *     const Navigator = require('sf-core/ui/navigator');
 *     
 *     var navigator = new Navigator();
 *     navigator.add('pgProfile', require('pages/pgProfile'));
 *     navigator.add('pgMessages', require('pages/pgMessages'));
 *     navigator.go('pgProfile');
 * 
 *     Router.go('dashboard'); // Navigates the page named pgProfile.
 *     Router.go('dashboard/pgMessages'); // Navigates the page named pgMessages.
 */
function Navigator() {}


/**
 * Adds given page class to navigates by matching it with given path. You
 * can define if page instance will be singleton object or a new instance 
 * created everytime when Router.go called.
 * 
 * @method add
 * @param {String} to Route path to page class
 * @param {UI.Page} page Page class to be used for creating and showing instances
 * @param {Boolean} isSingleton If given as true, single instance will be created
 *                              and everytime that instance will be shown
 * @static
 * @android
 * @ios
 * @since 1.1.10
 */
Navigator.prototype.add = function(to, page, isSingleton) {};

/**
 * Sets the page to be shown when Router.go is called with navigator path.
 * 
 * @method go
 * @param {String} to Route path to page class
 * 
 * @static
 * @android
 * @ios
 * @since 1.1.10
 */
Navigator.prototype.go = function(path) {};