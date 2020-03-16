var Contacts = {};

Contacts.ios = {};
Contacts.android = {};

Contacts.Contact = function Contacts(params) {
	var self = this;

	params = params || {};
	params.nativeObject ? self.nativeObject = params.nativeObject : self.nativeObject = __SF_CNMutableContact.new();

	Object.defineProperty(self, 'namePrefix', {
		get: function() {
			return self.nativeObject.namePrefix;
		},
		set: function(value) {
			self.nativeObject.namePrefix = value;
		},
		enumerable: true
	});

	Object.defineProperty(self, 'firstName', {
		get: function() {
			return self.nativeObject.givenName;
		},
		set: function(value) {
			self.nativeObject.givenName = value;
		},
		enumerable: true
	});

	Object.defineProperty(self, 'lastName', {
		get: function() {
			return self.nativeObject.familyName;
		},
		set: function(value) {
			self.nativeObject.familyName = value;
		},
		enumerable: true
	});

	Object.defineProperty(self, 'middleName', {
		get: function() {
			return self.nativeObject.middleName;
		},
		set: function(value) {
			self.nativeObject.middleName = value;
		},
		enumerable: true
	});

	Object.defineProperty(self, 'nameSuffix', {
		get: function() {
			return self.nativeObject.nameSuffix;
		},
		set: function(value) {
			self.nativeObject.nameSuffix = value;
		},
		enumerable: true
	});

	Object.defineProperty(self, 'phoneNumbers', {
		get: function() {
			var phoneNumbers = [];
			for (var number in self.nativeObject.phoneNumbers) {
				// Added this check to resolve the sonar issue. 
				// hasOwnProperty() is used to filter out properties from the object's prototype chain.
				if (self.nativeObject.phoneNumbers.hasOwnProperty(number)) {
					phoneNumbers.push(self.nativeObject.phoneNumbers[number].value.stringValue);
				}
			}
			return phoneNumbers;
		},
		set: function(value) {
			if (!value || value.length === 0) {
				self.nativeObject.phoneNumbers = [];
				return;
			}
			var nativeArray = [];
			for (const property in value) {
				var phoneNumber = __SF_CNPhoneNumber.phoneNumberWithStringValue(value[property]);
				nativeArray.push(new __SF_CNLabeledValue(__SF_CNLabelPhoneNumberMain, phoneNumber));
			}

			self.nativeObject.phoneNumbers = nativeArray;
		},
		enumerable: true
	});

	Object.defineProperty(self, 'urlAddresses', {
		get: function() {
			var urlAddresses = [];
			for (var urlAddress in self.nativeObject.urlAddresses) {
				// Added this check to resolve the sonar issue. 
				if (self.nativeObject.urlAddresses.hasOwnProperty(urlAddress)) {
					urlAddresses.push(self.nativeObject.urlAddresses[urlAddress].value);
				}
			}
			return urlAddresses;
		},
		set: function(value) {
			if (!value || value.length === 0) {
				self.nativeObject.urlAddresses = [];
				return;
			}
			var nativeArray = [];
			for (const property in value) {
				nativeArray.push(new __SF_CNLabeledValue(__SF_CNLabelURLAddressHomePage, value[property]));
			}

			self.nativeObject.urlAddresses = nativeArray;
		},
		enumerable: true
	});

	Object.defineProperty(self, 'emailAddresses', {
		get: function() {
			var emailAddresses = [];
			for (var emailAddress in self.nativeObject.emailAddresses) {
				// Added this check to resolve the sonar issue. 
				if (self.nativeObject.emailAddresses.hasOwnProperty(emailAddress)) {
					emailAddresses.push(self.nativeObject.emailAddresses[emailAddress].value);
				}
			}
			return emailAddresses;
		},
		set: function(value) {
			if (!value || value.length === 0) {
				self.nativeObject.emailAddresses = [];
				return;
			}
			var nativeArray = [];
			for (const property in value) {
				nativeArray.push(new __SF_CNLabeledValue(__SF_CNLabelHome, value[property]));
			}

			self.nativeObject.emailAddresses = nativeArray;
		},
		enumerable: true
	});

	Object.defineProperty(self, 'addresses', {
		get: function() {
			var addresses = [];
			for (var address in self.nativeObject.postalAddresses) {
				// Added this check to resolve the sonar issue. 
				if (self.nativeObject.postalAddresses.hasOwnProperty(address)) {
					var addressStr = self.nativeObject.postalAddresses[address].value.street + " " +
						self.nativeObject.postalAddresses[address].value.city + " " +
						self.nativeObject.postalAddresses[address].value.state + " " +
						self.nativeObject.postalAddresses[address].value.postalCode + " " +
						self.nativeObject.postalAddresses[address].value.country;
					addresses.push(addressStr);
				}
			}
			return addresses;
		},
		set: function(value) {
			if (!value || value.length === 0) {
				self.nativeObject.postalAddresses = [];
				return;
			}
			var nativeArray = [];
			for (const property in value) {
				var addressValue = __SF_CNMutablePostalAddress.new();
				addressValue.street = value[property];
				nativeArray.push(new __SF_CNLabeledValue(__SF_CNLabelHome, addressValue));
			}

			self.nativeObject.postalAddresses = nativeArray;
		},
		enumerable: true
	});

	// Assign parameters given in constructor
	params && (function(params) {
		for (var param in params) {
			if (param === "ios" || param === "android") {
				setOSSpecificParams.call(this, params[param], param);
			}
			else {
				this[param] = params[param];
			}
		}

		function setOSSpecificParams(params, key) {
			for (var param in params) {
				this[key][param] = params[param];
			}
		}
	}.bind(this)(params));
};

Contacts.ios.__pickerDelegate = new __SF_CNContactPickerDelegate();

Contacts.pickContact = function(params) {
	if (typeof params.page === 'object') {
		var store = __SF_CNContactStore.new();

		store.requestAccess(function() {
			var pickerViewController = __SF_CNContactPickerViewController.new();
			Contacts.ios.__pickerDelegate.contactPickerDidSelectContact = function(contact) {
				if (typeof params.onSuccess === 'function') {
					__SF_Dispatch.mainAsync(function() {
						var jsContact = new Contacts.Contact({
							nativeObject: contact.mutableCopy()
						});
						params.onSuccess(jsContact);
					});
				}
			};
			pickerViewController.delegate = Contacts.ios.__pickerDelegate;

			params.page.nativeObject.presentViewController(pickerViewController);
		}, function() {
			if (typeof params.onFailure === 'function') {
				__SF_Dispatch.mainAsync(function() {
					params.onFailure();
				});
			}
		});
	}
	else {
		throw Error("page parameter cannot be null");
	}
};

Contacts.fetchAll = function(params) {
	var store = __SF_CNContactStore.new();
	store.requestAccess(function() {
		store.fetchAllContacts(function(allContactsNativeArray) {
			var allContactsManagedArray = [];
			for (var index in allContactsNativeArray) {
				// Added this check to resolve the sonar issue. 
				// hasOwnProperty() is used to filter out properties from the object's prototype chain.
				if (allContactsNativeArray.hasOwnProperty(index)) {
					var jsContact = new Contacts.Contact({
						nativeObject: allContactsNativeArray[index].mutableCopy()
					});
					allContactsManagedArray.push(jsContact);
				}
			}
			params.onSuccess(allContactsManagedArray);
		}, function(error) {
			params.onFailure(error);
		});
	}, function(error) {
		if (typeof params.onFailure === 'function') {
			params.onFailure(error);
		}
	});
};

Contacts.add = function(params) {
	var store = __SF_CNContactStore.new();

	store.requestAccess(function() {
		var contact;
		if (params.contact.constructor.name === "Contacts") {
			contact = params.contact.nativeObject;
		}
		else {
			contact = __SF_CNMutableContact.new();
			var parameterContact = params.contact;

			for (var propertyName in parameterContact) {
				// Added this check to resolve the sonar issue. 
				// It says that the body of every for...in statement should be wrapped 
				// in an if statement that filters which properties are acted upon.
				if (parameterContact.hasOwnProperty(propertyName)) {
					switch (propertyName) {
						case 'displayName':
							contact.givenName = parameterContact[propertyName];
							break;
						case 'phoneNumber':
							var phoneNumber = __SF_CNPhoneNumber.phoneNumberWithStringValue(parameterContact[propertyName]);
							contact.phoneNumbers = [new __SF_CNLabeledValue(__SF_CNLabelPhoneNumberMain, phoneNumber)];
							break;
						case 'email':
							contact.emailAddresses = [new __SF_CNLabeledValue(__SF_CNLabelHome, parameterContact[propertyName])];
							break;
						case 'urlAddress':
							contact.urlAddresses = [new __SF_CNLabeledValue(__SF_CNLabelURLAddressHomePage, parameterContact[propertyName])];
							break;
						case 'address':
							var addressValue = __SF_CNMutablePostalAddress.new();
							addressValue.street = parameterContact[propertyName];
							contact.postalAddresses = [new __SF_CNLabeledValue(__SF_CNLabelHome, addressValue)];
							break;
						default:
					}
				}
			}
		}

		if (typeof params.page === 'object') {
			this.contactViewController = __SF_CNContactViewController.viewControllerForNewContact(contact);
			this.contactViewController.contactStore = store;
			this.contactViewController.allowsActions = false;
			this.contactViewControllerDelegate = new __SF_CNContactViewControllerDelegate();
			this.contactViewControllerDelegate.didCompleteWithContact = function(contact) {
				if (contact) {
					if (typeof params.onSuccess === 'function') {
						params.onSuccess();
					}
				}
				else {
					if (typeof params.onFailure === 'function') {
						params.onFailure();
					}
				}
			};
			this.contactViewController.delegate = this.contactViewControllerDelegate;
			var navigationalcontactViewController = new __SF_UINavigationController();
			navigationalcontactViewController.viewControllers = [this.contactViewController];
			params.page.nativeObject.presentViewController(navigationalcontactViewController);
		}
		else {
			var saveRequest = __SF_CNSaveRequest.new();
			saveRequest.addContact(contact);
			var retval = store.executeSave(saveRequest);

			if (retval) {
				if (typeof params.onSuccess === 'function') {
					params.onSuccess();
				}
			}
			else {
				if (typeof params.onFailure === 'function') {
					params.onFailure();
				}
			}
		}
	}, function(e) {
		params.onFailure({
			message: "Contact access is declined by user."
		});
	});
};

Contacts.pick = function(params) { //Depracated on 4.1.5

	if (typeof params.page === 'object') {
		var store = __SF_CNContactStore.new();

		store.requestAccess(function() {
			var pickerViewController = __SF_CNContactPickerViewController.new();
			var pickerDelegate = new __SF_CNContactPickerDelegate();
			pickerDelegate.contactPickerDidCancel = function() {
				pickerViewController.dismiss(true, function() {});
			};
			pickerDelegate.contactPickerDidSelectContact = function(contact) {
				var returnValue = manageNativeContact(contact);
				if (typeof params.onSuccess === 'function') {
					params.onSuccess(returnValue);
				}
			};
			pickerViewController.delegate = pickerDelegate;

			params.page.nativeObject.presentViewController(pickerViewController);
		}, function() {
			if (typeof params.onFailure === 'function') {
				params.onFailure();
			}
		});
	}
};

Contacts.getAll = function(params) { //Depracated on 4.1.5
	var store = __SF_CNContactStore.new();
	store.requestAccess(function() {
		store.fetchAllContacts(function(allContactsNativeArray) {
			var allContactsManagedArray = [];
			for (var index in allContactsNativeArray) {
				// Added this check to resolve the sonar issue. 
				// hasOwnProperty() is used to filter out properties from the object's prototype chain.
				if (allContactsNativeArray.hasOwnProperty(index)) {
					var managedContact = manageNativeContact(allContactsNativeArray[index]);
					allContactsManagedArray.push(managedContact);
				}
			}
			params.onSuccess(allContactsManagedArray);
		}, function(error) {
			params.onFailure(error);
		});
	}, function(error) {
		if (typeof params.onFailure === 'function') {
			params.onFailure(error);
		}
	});
};

function manageNativeContact(contact) {
	var returnValue = {};
	if (contact.givenName) {
		returnValue.displayName = contact.givenName + " " + contact.familyName;
	}

	var phoneNumbers = [];
	for (var number in contact.phoneNumbers) {
		// Added this check to resolve the sonar issue. 
		// hasOwnProperty() is used to filter out properties from the object's prototype chain.
		if (contact.phoneNumbers.hasOwnProperty(number)) {
			phoneNumbers.push(contact.phoneNumbers[number].value.stringValue);
		}
	}
	returnValue.phoneNumber = phoneNumbers;

	var emailAddresses = [];
	for (var email in contact.emailAddresses) {
		// Added this check to resolve the sonar issue. 
		// hasOwnProperty() is used to filter out properties from the object's prototype chain.
		if (contact.emailAddresses.hasOwnProperty(email)) {
			emailAddresses.push(contact.emailAddresses[email].value);
		}
	}
	returnValue.email = emailAddresses;

	var urlAddresses = [];
	for (var urlAddress in contact.urlAddresses) {
		// Added this check to resolve the sonar issue. 
		if (contact.urlAddresses.hasOwnProperty(urlAddress)) {
			urlAddresses.push(contact.urlAddresses[urlAddress].value);
		}
	}
	returnValue.urlAddress = urlAddresses;

	var addresses = [];
	for (var address in contact.postalAddresses) {
		// Added this check to resolve the sonar issue. 
		if (contact.postalAddresses.hasOwnProperty(address)) {
			var addressStr = contact.postalAddresses[address].value.street + " " +
				contact.postalAddresses[address].value.city + " " +
				contact.postalAddresses[address].value.state + " " +
				contact.postalAddresses[address].value.postalCode + " " +
				contact.postalAddresses[address].value.country;
			addresses.push(addressStr);
		}
	}
	returnValue.address = addresses;

	return returnValue;
};

module.exports = Contacts;