const NativeNotificationCompat = requireClass("android.support.v4.app.NotificationCompat");
const NativeNotificationBuilder = NativeNotificationCompat.Builder;
const NativeContext = requireClass("android.content.Context");
const NOTIFICATION_SERVICE = NativeContext.NOTIFICATION_SERVICE;

var Priority = {
    MIN: -2,
    LOW: -1,
    DEFAULT: 0,
    HIGH: 1,
    MAX: 2
};

function Notifications() { }

Notifications.notificationBuilder = [];

Notifications.create = function(params) {
    console.log("create");
    var activity = Android.getActivity();
    var context = activity.getApplicationContext();
    
    var notificationBuilder = new NativeNotificationBuilder(context);
    notificationBuilder = notificationBuilder.setSmallIcon(params.smallIcon);
    notificationBuilder = notificationBuilder.setContentTitle(params.title);
    notificationBuilder = notificationBuilder.setContentText(params.text);
    console.log("before setOptionalParameters");
    setOptionalParameters(notificationBuilder, params);
    setIntent(notificationBuilder);
    notificationBuilder = notificationBuilder.build();
    
    Notifications.notificationBuilder.push({id: params.id, builder: notificationBuilder});
};

function setIntent(notificationBuilder) {
    const Pages = require("nf-core/ui/pages");
    const NativeIntent = requireClass("android.content.Intent");
    const NativeTaskStackBuilder = requireClass("android.app.TaskStackBuilder");
    const NativePendingIntent = requireClass("android.app.PendingIntent");
    
    var page = Pages.currentPage;
    var nativeObject = page.nativeObject;
    var activity = nativeObject.getActivity();
    var mainActivity = Android.getActivity();
    var resultIntent = new NativeIntent(activity, activity.getClass());
    var stackBuilder = NativeTaskStackBuilder.create(activity);
    var mainClass = mainActivity.getClass();
    stackBuilder.addParentStack(mainClass);
    stackBuilder.addNextIntent(resultIntent);
    var flag = NativePendingIntent.FLAG_UPDATE_CURRENT;
    var resultPendingIntent = stackBuilder.getPendingIntent(0, flag);

    notificationBuilder.setContentIntent(resultPendingIntent);    
}

function setOptionalParameters(notificationBuilder, params) {
    if(params.autoCancel != undefined)
        notificationBuilder = notificationBuilder.setAutoCancel(params.autoCancel);
    if(params.onGoing != undefined)
        notificationBuilder = notificationBuilder.setOngoing(params.onGoing);
    if(params.color != undefined)
        notificationBuilder = notificationBuilder.setColor(params.color);
    if(params.progress) {
        var progress = params.progress;
        notificationBuilder = notificationBuilder.setProgress(progress.max,
            progress.progress, progress.indeterminate);
    }
    if(params.ticker)
        notificationBuilder = notificationBuilder.setTicker(params.ticker);
    if(params.vibrate)
        notificationBuilder = notificationBuilder.setVibrate(params.vibrate);
    if(params.number)
        notificationBuilder = notificationBuilder.setNumber(params.number);
    if(params.priority)
        notificationBuilder = notificationBuilder.setPriority(params.priority);
    if(params.subText)
        notificationBuilder = notificationBuilder.setSubText(params.subText);
    if(params.sound) {
        // todo sound setting doesn't work causing by issue CLI-175.
        // notificationBuilder = notificationBuilder.setSound(uri);
    }
    if(params.when) {
        notificationBuilder = notificationBuilder.setShowWhen(true);
        notificationBuilder = notificationBuilder.setWhen(params.when);
    }
}

Notifications.show = function(id) {
    var activity = Android.getActivity();
    var notificationManager = activity.getSystemService(NOTIFICATION_SERVICE);
    var index = getNotificationIndexByID(id);
    if(index != -1) {
        var notificationBuilder = (Notifications.notificationBuilder[index]).builder;
        notificationManager.notify(id, notificationBuilder);
    }
};

function getNotificationIndexByID(id) {
    var i = 0;
    for(i = 0; i < Notifications.notificationBuilder.length; i++) {
        if(id == (Notifications.notificationBuilder[i]).id)
            return i;
    }
    return -1;
}

Notifications.cancel = function(id) {
    var activity = Android.getActivity();
    var notificationManager = activity.getSystemService(NOTIFICATION_SERVICE);
    notificationManager.cancel(id);
};

Notifications.cancelAll = function(id) {
    var activity = Android.getActivity();
    var notificationManager = activity.getSystemService(NOTIFICATION_SERVICE);
    notificationManager.cancelAll();
};


Object.defineProperty(Notifications, 'Priority', {
    value: Priority,
    writable: false,
    enumerable: true
});

// ios spesific methods
Notifications.setBadgeNumber = function(e){};
Notifications.getBadgeNumber = function(){};

module.exports = Notifications;