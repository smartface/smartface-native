const FlexLayout            = require("nf-core/ui/flexlayout");
const Color                 = require("nf-core/ui/color");
const TypeUtil              = require("nf-core/util/type");
const AndroidUnitConverter  = require("nf-core/util/Android/unitconverter.js");
const Pages                 = require("nf-core/ui/pages");

const NativeFragment        = requireClass("android.support.v4.app.Fragment");
const NativeBuildVersion    = requireClass("android.os.Build");
const NativeAndroidR        = requireClass("android.R");
const NativeSupportR        = requireClass("android.support.v7.appcompat.R");
const NativeColorDrawable   = requireClass("android.graphics.drawable.ColorDrawable");
const NativeHtml            = requireClass("android.text.Html");
const NativeDrawerLayout    = requireClass('android.support.v4.widget.DrawerLayout');

const MINAPILEVEL_STATUSBARCOLOR = 21;
// WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS
const FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS = -2147483648;
// WindowManager.LayoutParams.FLAG_FULLSCREEN
const FLAG_FULLSCREEN = 1024;

const OrientationDictionary = {
    // Page.Orientation.PORTRAIT: ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
    1: 1,
    // Page.Orientation.UPSIDEDOWN: ActivityInfo.SCREEN_ORIENTATION_REVERSE_PORTRAIT
    2: 9,
    // Page.Orientation.AUTOPORTRAIT: ActivityInfo.SCREEN_ORIENTATION_SENSOR_PORTRAIT
    3: 7,
    // Page.Orientation.LANDSCAPELEFT: ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE
    4: 0,
    // Page.Orientation.LANDSCAPERIGHT: ActivityInfo.SCREEN_ORIENTATION_REVERSE_LANDSCAPE
    8: 8,
    // Page.Orientation.AUTOLANDSCAPE: ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE
    12: 6,
    // Page.Orientation.AUTO: ActivityInfo.ActivityInfo.SCREEN_ORIENTATION_SENSOR
    15: 4
};


function Page(params) {
    var self = this;
    var activity = Android.getActivity();
    
    var rootLayout = new FlexLayout({
        isRoot : true,
        backgroundColor: Color.WHITE
    });

    rootLayout.parent = self;
    var isCreated = false;

    var optionsMenu = null;
    self.contextMenu = {};

    self.nativeObject = NativeFragment.extend("SFFragment", {
        onCreateView: function() {
            self.nativeObject.setHasOptionsMenu(true);
            if(!isCreated){
                onLoadCallback && onLoadCallback();
                isCreated = true;
            }
            self.orientation = _orientation;
            return rootLayout.nativeObject;
        },
        onViewCreated: function(view, savedInstanceState) {
            const NativeRunnable = requireClass('java.lang.Runnable');
            rootLayout.nativeObject.post(NativeRunnable.implement({
                run: function() {
                    onShowCallback && onShowCallback();
                }
            }));
        },
        onCreateOptionsMenu: function(menu) {
            optionsMenu = menu;
            if (_headerBarItems.length > 0) {
                self.headerBar.setItems(_headerBarItems);
            }
            return true;
        },
        onConfigurationChanged: function(newConfig){
            _onOrientationChange && _onOrientationChange();
        },
        onOptionsItemSelected: function(menuItem){
            if (menuItem.getItemId() == NativeAndroidR.id.home) {
                if (_headerBarLeftItem) {
                    _headerBarLeftItem.onPress && _headerBarLeftItem.onPress();
                } else {
                    const Router = require("nf-core/ui/router");
                    Router.goBack(null, true);
                }
            } else if (_headerBarItems[menuItem.getItemId()]) {
                var item = _headerBarItems[menuItem.getItemId()];
                if (item.onPress instanceof Function) {
                    item.onPress();
                }
            }
            return true;
        },
        onCreateContextMenu: function(menu, view, menuInfo) {
            var items = self.contextMenu.items;
            var headerTitle = self.contextMenu.headerTitle;
            if(self.contextMenu.headerTitle != "") {
                menu.setHeaderTitle(headerTitle);
            }
            
            var i;
            for(i = 0; i < items.length; i++) {
                menu.add(0, i, 0, items[i].title);
            }
        },
        onContextItemSelected: function(item){
            var itemId = item.getItemId();
            var items = self.contextMenu.items;
            if(itemId >= 0) {
                items[itemId].onSelected();
            }
        },
        onActivityResult: function(requestCode, resultCode, data) {
            const Contacts = require("nf-core/device/contacts");
            const Multimedia = require("nf-core/device/multimedia");
            const Sound = require("nf-core/device/sound");
            
            // todo: Define a method to register request and its callback 
            // for better performance. Remove if statement.
            if(Contacts.PICK_REQUEST_CODE == requestCode) {
                Contacts.onActivityResult(requestCode, resultCode, data);
            }
            else if(Multimedia.CAMERA_REQUEST == requestCode) {
                Multimedia.onActivityResult(requestCode, resultCode, data);
            }
            else if(requestCode == Multimedia.PICK_FROM_GALLERY) {
                Multimedia.onActivityResult(requestCode, resultCode, data);   
            }
            else if(requestCode == Sound.PICK_SOUND) {
                Sound.onActivityResult(requestCode, resultCode, data);   
            }
        }
        
    }, null);

    Object.defineProperty(this, 'layout', {
        get: function() {
            return rootLayout;
        },
        enumerable: true
    });
    
    self.headerBar = {};
    self.headerBar.android = {};

    var onLoadCallback;
    Object.defineProperty(this, 'onLoad', {
        get: function() {
            return onLoadCallback;
        },
        set: function(onLoad) {
            onLoadCallback = onLoad.bind(this);
        },
        enumerable: true
    });

    var onShowCallback;
    Object.defineProperty(this, 'onShow', {
        get: function() {
            return onShowCallback;
        },
        set: function(onShow) {
            onShowCallback = (function() {
                if (onShow instanceof Function) {
                    onShow.call(this, this.__pendingParameters);
                    delete this.__pendingParameters;
                }
            }).bind(this);
        },
        enumerable: true
    });

    var onHideCallback;
    Object.defineProperty(this, 'onHide', {
        get: function() {
            return onHideCallback;
        },
        set: function(onHide) {
            onHideCallback = onHide.bind(this);
        },
        enumerable: true
    });
    
    var _onOrientationChange;
    Object.defineProperty(this, 'onOrientationChange', {
        get: function() {
            return _onOrientationChange;
        },
        set: function(onOrientationChange) {
            _onOrientationChange = onOrientationChange.bind(this);
        },
        enumerable: true
    });
    
    var _orientation = Page.Orientation.PORTRAIT;
    Object.defineProperty(this, 'orientation', {
        get: function() {
            return _orientation;
        },
        set: function(orientation) {
            _orientation = orientation;
            if(typeof OrientationDictionary[_orientation] !== "number"){
                _orientation = Page.Orientation.PORTRAIT;
            }
            activity.setRequestedOrientation(OrientationDictionary[_orientation]);
        },
        enumerable: true
    });

    this.android = {};
        
    var _onBackButtonPressed;
    Object.defineProperty(this.android, 'onBackButtonPressed', {
        get: function() {
            return _onBackButtonPressed;
        },
        set: function(onBackButtonPressed) {
            _onBackButtonPressed = onBackButtonPressed.bind(this);
        },
        enumerable: true
    });
    
    this.statusBar = {};
    var _visible;
    Object.defineProperty(this.statusBar, 'visible',  {
        get: function() {
            return _visible;
        },
        set: function(visible) {
            _visible = visible;
            var window = activity.getWindow();
            if(visible) {
                window.clearFlags(FLAG_FULLSCREEN);
             }
            else {
                window.addFlags(FLAG_FULLSCREEN);
            }
        },
        enumerable: true
    });
    
    this.statusBar.android = {};
    var _color;
    Object.defineProperty(this.statusBar.android, 'color',  {
        get: function() {
            return _color;
        },
        set: function(color) {
            _color = color;
            if(NativeBuildVersion.VERSION.SDK_INT >= MINAPILEVEL_STATUSBARCOLOR) {
                var window = activity.getWindow();
                window.addFlags(FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
                window.setStatusBarColor(color);
            }
        },
        enumerable: true
    });

    Object.defineProperty(this.statusBar, 'height', {
        get: function() {
            var result = 0;
            var resourceId = activity.getResources().getIdentifier("status_bar_height", "dimen", "android");
            if (resourceId > 0) { 
                result = activity.getResources().getDimensionPixelSize(resourceId);
            }
            return result;
        },
        enumerable: true    
    });
    
    var _headerBarColor; // SmartfaceBlue
    Object.defineProperty(self.headerBar, 'backgroundColor', {
        get: function() {
            return _headerBarColor;
        },
        set: function(color) {
            if (color) {
                Pages.getToolbar().setBackgroundColor(color);
            }
        },
        enumerable: true
    });

    var _headerBarImage = null;
    Object.defineProperty(self.headerBar, 'backgroundImage', {
        get: function() {
            return _headerBarImage;
        },
        set: function(image) {
            if (image) {
                _headerBarImage = image;
                Pages.getToolbar().setBackground(image.nativeObject);
            }
        },
        enumerable: true
    });

    var _leftItemEnabled;
    Object.defineProperty(self.headerBar, 'leftItemEnabled', {
        get: function() {
            return _leftItemEnabled;
        },
        set: function(leftItemEnabled) {
            if (TypeUtil.isBoolean(leftItemEnabled)) {
                _leftItemEnabled = leftItemEnabled;
                Pages.getActionBar().setDisplayHomeAsUpEnabled(_leftItemEnabled);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self.headerBar, 'height', {
        get: function() {
            var resources = activity.getResources();
            return resources.getDimension(NativeSupportR.dimen.abc_action_bar_default_height_material);
        },
        enumerable: true
    });

    Object.defineProperty(self.headerBar, 'title', {
        get: function() {
            return Pages.getToolbar().getTitle();
        },
        set: function(text) {
            if (TypeUtil.isString(text)) {
                Pages.getToolbar().setTitle(text);
            } else {
                Pages.getToolbar().setTitle("");
            }
        },
        enumerable: true
    });

    var _headerBarTitleColor;
    Object.defineProperty(self.headerBar, 'titleColor', {
        get: function() {
            return _headerBarTitleColor;
        },
        set: function(color) {
            if (color) {
                _headerBarTitleColor = color;
                Pages.getToolbar().setTitleTextColor(color);
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(self.headerBar, 'visible', {
        get: function() {
            // View.VISIBLE
            return Pages.getToolbar().getVisibility() ==  0;
        },
        set: function(visible) {
            if (TypeUtil.isBoolean(visible)) {
                if(visible){
                    // View.VISIBLE
                    Pages.getToolbar().setVisibility(0);
                }
                else{
                    // View.GONE
                    Pages.getToolbar().setVisibility(8);
                }
            }
        },
        enumerable: true
    });

    Object.defineProperty(self.headerBar.android, 'subtitle', {
        get: function() {
            return Pages.getToolbar().getSubtitle();
        },
        set: function(text) {
            if (TypeUtil.isString(text)) {
                Pages.getToolbar().setSubtitle(text);
            } else {
                Pages.getToolbar().setSubtitle("");
            }
        },
        enumerable: true
    });

    var _headerBarSubtitleColor;
    Object.defineProperty(self.headerBar.android, 'subtitleColor', {
        get: function() {
            return _headerBarSubtitleColor;
        },
        set: function(color) {
            if (color) {
                Pages.getToolbar().setSubtitleTextColor(color);
            }
        },
        enumerable: true
    });
    
    var _headerBarLogo = null;
    Object.defineProperty(self.headerBar.android, 'logo', {
        get: function() {
            return _headerBarLogo;
        },
        set: function(image) {
            const Image = require("nf-core/ui/image");
            if(image instanceof Image){
                _headerBarLogo = image;
                Pages.getActionBar().setLogo(_headerBarLogo.nativeObject);
            }
        },
        enumerable: true
    });
    
    var _headerBarLogoEnabled = false;
    Object.defineProperty(self.headerBar.android, 'logoEnabled', {
        get: function() {
            return _headerBarLogoEnabled;
        },
        set: function(logoEnabled) {
            if(TypeUtil.isBoolean(logoEnabled)){
                _headerBarLogoEnabled = logoEnabled;
                Pages.getActionBar().setDisplayUseLogoEnabled(_headerBarLogoEnabled);
            }
        },
        enumerable: true
    });
    
    // Implemented for just SearchView
    self.headerBar.addViewToHeaderBar = function(view){
        const HeaderBarItem = require("nf-core/ui/headerbaritem");
        view.nativeObject.onActionViewCollapsed();
        _headerBarItems.unshift(new HeaderBarItem({searchView : view, title: "Search"}));
        self.headerBar.setItems(_headerBarItems);
    };
    // Implemented for just SearchView
    self.headerBar.removeViewFromHeaderBar = function(view){
        if(_headerBarItems.length > 0 && _headerBarItems[0].searchView){
            _headerBarItems = _headerBarItems.splice(1,_headerBarItems.length);
            self.headerBar.setItems(_headerBarItems);
        }
    };
    
    var _headerBarItems = [];
    self.headerBar.setItems = function(items) {
        if (!(items instanceof Array)) {
            return;
        }
        else if(items == null){
            optionsMenu.clear();
            return;
        }

        _headerBarItems = items;
        if (optionsMenu == null) {
            return;
        }
        
        const NativeMenuItem    = requireClass("android.view.MenuItem");
        const NativeImageButton = requireClass('android.widget.ImageButton');
        const NativeTextButton  = requireClass('android.widget.Button');
        const NativeView        = requireClass('android.view.View');
        const NativePorterDuff  = requireClass('android.graphics.PorterDuff');

        optionsMenu.clear();

        var itemID = 1;
        items.forEach(function(item) {
            var itemView;
            if(item.searchView){
                itemView = item.searchView.nativeObject;
            }
            else {
                if (item.image && item.image.nativeObject) {
                    var imageCopy = item.image.nativeObject.mutate();
                    item.color && imageCopy.setColorFilter(item.color, NativePorterDuff.Mode.SRC_IN);
                    itemView = new NativeImageButton(activity);
                    itemView.setImageDrawable(imageCopy);
                } else {
                    itemView = new NativeTextButton(activity);
                    item.color && itemView.setTextColor(item.color);
                    itemView.setText(item.title);
                }
                
                itemView.setOnClickListener(NativeView.OnClickListener.implement({
                    onClick: function(view) {
                        item.onPress && item.onPress();
                    }
                }));
            }
            itemView.setBackgroundColor(Color.TRANSPARENT);

            var menuItem = optionsMenu.add(0, itemID++, 0, item.title);
            menuItem.setEnabled(item.enabled);
            menuItem.setShowAsAction(NativeMenuItem.SHOW_AS_ACTION_ALWAYS);
            menuItem.setActionView(itemView);

        });
    };

    var _headerBarLeftItem = null;
    self.headerBar.setLeftItem = function (leftItem) {
        const HeaderBarItem = require("../headerbaritem");
        if (leftItem instanceof HeaderBarItem && leftItem.image) {
            _headerBarLeftItem = leftItem;
            Pages.getActionBar().setHomeAsUpIndicator(_headerBarLeftItem.image.nativeObject);
        } else {
            _headerBarLeftItem = null;            
            Pages.getActionBar().setHomeAsUpIndicator(null);
        }
    };
    
    // Default values
    self.statusBar.visible = true;
    self.isBackButtonEnabled = false;
    self.statusBar.color = Color.TRANSPARENT;
    self.headerBar.backgroundColor = Color.create("#00A1F1");
    self.headerBar.leftItemEnabled = false;
    self.headerBar.android.logoEnabled = false;
    self.headerBar.titleColor = Color.WHITE;
    self.headerBar.subtitleColor = Color.WHITE;
    self.headerBar.visible = true;
    
    //Handling ios value
    self.statusBar.ios = {};
    self.statusBar.ios.style = null;
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

Page.Orientation = {};
Object.defineProperty(Page.Orientation,"PORTRAIT",{
    value: 1
});
Object.defineProperty(Page.Orientation,"UPSIDEDOWN",{
    value: 2
});
Object.defineProperty(Page.Orientation,"AUTOPORTRAIT",{
    value: 3
});
Object.defineProperty(Page.Orientation,"LANDSCAPELEFT",{
    value: 4
});
Object.defineProperty(Page.Orientation,"LANDSCAPERIGHT",{
    value: 8
});
Object.defineProperty(Page.Orientation,"AUTOLANDSCAPE",{
    value: 12
});
Object.defineProperty(Page.Orientation,"AUTO",{
    value: 15
});


module.exports = Page;