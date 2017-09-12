const Priority = {};

Object.defineProperties(Priority, {
    'MIN': {
        value: -2, // NotificationCompat.PRIORITY_MIN
        enumerable: true
    },
    'LOW': {
        value: -1, // NotificationCompat.PRIORITY_DEFAULT
        enumerable: true
    },
    'DEFAULT': {
        value: 0, // NotificationCompat.PRIORITY_MIN
        enumerable: true
    },
    'HIGH': {
        value: 1, // NotificationCompat.PRIORITY_HIGH
        enumerable: true
    },
    'MAX': {
        value: 2, // NotificationCompat.PRIORITY_MAX
        enumerable: true
    },
});

module.exports = Priority;