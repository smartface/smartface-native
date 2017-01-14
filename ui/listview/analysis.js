const View = require('../view');
const extend = require('js-base/core/extend');
/**
 * @class UI.ListView
 * @since 0.1
 * @extends UI.View
 * ListView is a UI object to display a views as rows. ListView displays UI.ListViewItem as row. 
 * The UI.ListViewController is used for managing ListView.
 *
 *     @example
 *     const Pages = require('sf-core/ui/pages');
 *     const Page = require('sf-core/ui/page');
 *     const AbsoluteLayout = require('sf-core/ui/absolutelayout');
 *     const Color = require('sf-core/ui/color');
 *     const ListView = require('sf-core/ui/listview');
 *     const ListViewItem = require('sf-core/ui/listviewitem');
 *     const ListViewController = require('sf-core/ui/listviewcontroller');
 *     const Label = require('sf-core/ui/label');
 *     const Font = require('sf-core/ui/font');
 *     const ImageView = require('sf-core/ui/imageview');
 *     const Image = require('sf-core/ui/image');
 *     const ImageFillType = require('sf-core/ui/imagefilltype');
 *     
 *     var myImage1 = Image.createFromFile('assets://image1.png');
 *     var myImage2 = Image.createFromFile('assets://image2.png');
 *     var myImage3 = Image.createFromFile('assets://image3.png');
 *     var myImage4 = Image.createFromFile('assets://image4.png');
 *     var myImage5 = Image.createFromFile('assets://image5.png');
 *     var myImage6 = Image.createFromFile('assets://image6.png');
 *     var myImage7 = Image.createFromFile('assets://image7.png');
 *     
 *     var myListView = new ListView({
 *         height: '100%',
 *         width: '100%',
 *         backgroundColor: Color.LIGHTGRAY,
 *         itemCount: myDataSet.length,
 *         android: {
 *             setPullRefreshColors: [Color.RED, Color.GREEN, Color.BLUE, Color.CYAN, Color.YELLOW]
 *         },
 *         verticalScrollBarEnabled: false
 *     });
 *     
 *     var myDataSet = [
 *                         { 
 *                             image: myImage1, 
 *                             title: 'Smartface Title 1', 
 *                             subTitle: 'Show first visible index', 
 *                             backgroundColor: Color.RED,
 *                             action:function(){
 *                                 alert(myListView.firstVisibleIndex)
 *                             }
 *                         },
 *                         { 
 *                             image: myImage2, 
 *                             title: 'Smartface Title 2', 
 *                             subTitle: 'Show last visible index', 
 *                             backgroundColor: Color.CYAN,
 *                             action:function(){
 *                                 alert(myListView.lastVisibleIndex);
 *                             } 
 *                         },
 *                         { 
 *                             image: myImage3, 
 *                             title: 'Smartface Title 3', 
 *                             subTitle: 'Change data set', 
 *                             backgroundColor: Color.YELLOW,
 *                             action:function(){
 *                                 myDataSet.push({
 *                                     image: myImage7,
 *                                     title: 'Smartface Title 7', 
 *                                     subTitle: 'Smartface New ListViewItem',
 *                                     backgroundColor: Color.BLUE,
 *                                     action: function(){
 *                                         alert('Hello from NativeFace ListView!');
 *                                     }
 *                                 })
 *                                 myListView.itemCount = myDataSet.length;
 *                                 myListView.notifyDataSetChanged();
 *                             } 
 *                         },
 *                         { 
 *                             image: myImage4, 
 *                             title: 'Smartface Title 4', 
 *                             subTitle: 'Change data set', 
 *                             backgroundColor: Color.GRAY,
 *                             action:function(){
 *                                 myListView.scrollTo(2);
 *                             } 
 *                         },
 *                         { 
 *                             image: myImage5, 
 *                             title: 'Smartface Title 5', 
 *                             subTitle: 'Insert List View Item',
 *                             backgroundColor: Color.WHITE, 
 *                             action:function(){
 *                                 var myListViewItem = new ListViewItem();
 *                                 var myAbsoluteLayout = new AbsoluteLayout({
 *                                     id: 104,
 *                                     height: '100%',
 *                                     width: '100%'
 *                                 });
 *                                 myListViewItem.add(myAbsoluteLayout);
 *                                 myListView.insertListItem(myListViewItem);
 *                             } 
 *                         },
 *                         { 
 *                             image: myImage6, 
 *                             title: 'Smartface Title 6', 
 *                             subTitle: 'Remove List View Item',
 *                             backgroundColor: Color.RED, 
 *                             action:function(){
 *                                 myListView.removeListItem(4);
 *                             } 
 *                        }
 *                        
 *                     ];
 *     
 *     
 *     var myListViewController = new ListViewController();
 *     var myFontTitle = Font.create("Arial",16,Font.BOLD);
 *     var myFontSubTitle = Font.create("Arial",14,Font.ITALIC);
 *     myListViewController.onRowCreate = function(){
 *         var myListViewItem = new ListViewItem();
 *         var myAbsoluteLayout = new AbsoluteLayout({
 *             id: 100,
 *             height: '100%',
 *             width: '100%'
 *         });
 *         var myImageView = new ImageView({
 *             id: 101,
 *             height: '80%',
 *             width: '10%',
 *             top: '10%',
 *             left: '10%'
 *         });
 *         var myLabelTitle = new Label({
 *             id: 102,
 *             height: '40%',
 *             width: '50%',
 *             top: '10%',
 *             left: '40%'
 *         });
 *         var myLabelSubtitle = new Label({
 *             id: 103,
 *             height: '30%',
 *             width: '50%',
 *             top: '60%',
 *             left: '40%'
 *         });
 *         myAbsoluteLayout.addChild(myImageView);
 *         myAbsoluteLayout.addChild(myLabelTitle);
 *         myAbsoluteLayout.addChild(myLabelSubtitle);
 *         myListViewItem.addChild(myAbsoluteLayout);
 *         return myListViewItem;
 *     };
 *     myListViewController.onRowBind = function(listViewItem,index){
 *         var myAbsoluteLayout = listViewItem.findChildById(100);
 *         var myImageView = listViewItem.findChildById(101);
 *         var myLabelTitle = listViewItem.findChildById(102);
 *         var myLabelSubtitle = listViewItem.findChildById(103);
 *         myAbsoluteLayout.backgroundColor = 
 *         myImageView.imageSource = myDataSet[index].image;
 *         myLabelTitle.text = myDataSet[index].title;
 *         myLabelTitle.font = myFontTitle;
 *         myLabelSubtitle.text = myDataSet[index].subTitle;
 *         myLabelTitle.font = myFontSubTitle;
 *     };
 *     myListViewController.onRowSelected = function(listViewItem,index){
 *         myDataSet[index].action();
 *     };
 *     
 *     myListView.controller = myListViewController;
 * 
 *     myListView.onPullRefresh = function(){
 *         alert('ListView refreshed!');
 *     }
 *     
 *     var myPage = new Page();
 *     myPage.add(myListView);
 *     var myPages = new Pages({rootPage : myPage});
 * 
 */
 
const ListView = extend(View)(
    function (_super, params) {
        _super(this);

        /**
         * Gets/sets controller of the ListView. ListView uses this controller for 
         * list item callbacks. 
         * 
         * @property {UI.ListViewController} [controller = null] 
         * @since 0.1
         */
        this.controller = null;

        /**
         * Gets/sets list item count of the ListView. This property defines how many list item will shown
         * in the ListView. 
         * 
         * @property {Number} [itemCount = 0]   
         * @since 0.1
         */
        this.itemCount = 0;
        
        /**
         * Gets/sets vertical scroll bar status of the ListView. If this is true, 
         * scroll bar will be shown otherwise scroll bar will be hidden.
         * 
         * @property {Number} [verticalScrollBarEnabled = false]   
         * @since 0.1
         */
        this.verticalScrollBarEnabled = false;

        /**
         * Notify the ListView for data changes.
         * 
         * @method notifyDataSetChanged
         * @since 0.1
         */
        this.notifyDataSetChanged = function(){};
        
        /**
         * Set the colors used in the progress animation. The first color 
         * will also be the color of the bar that grows in response to a 
         * user swipe gesture.
         * This propert will works for only Android.
         * 
         * @method setPullRefreshColors
         * @since 0.1
         */
        this.android.setPullRefreshColors = function(colors){};
        
        /**
         * Scroll the ListView to specific index. The item on this index will 
         * shown on the top.
         * 
         * @param {Number} index
         * @method scrollTo
         * @since 0.1
         */
        this.scrollTo = function(index){};
        
        /**
         * This method return first visible list item's index which is visible at 
         * the top of the ListView.
         * 
         * @return {Number} first visible list item's index.
         * @method firstVisibleIndex
         * @since 0.1
         */
        this.firstVisibleIndex = function(){};
        
        /**
         * This method return last visible list item's index which is visible at 
         * the bottom of the ListView.
         * 
         * @return {Number} last visible list item's index.
         * @method lastVisibleIndex
         * @since 0.1
         */
        this.lastVisibleIndex = function(){};
        
        /**
         * Insert list view item to specific row index into the ListView.
         * 
         * @param {Number} index The new list view item's position.
         * @param {UI.ListViewItem} listViewItem The new list view item to insert.
         * @method insertListItem
         * @since 0.1
         */
        this.insertListItem = function(index, listViewItem){};
        
        /**
         * Remove list view item from specific row index of the ListView.
         * 
         * @param {Number} index The row index to remove list view item.
         * @method removeListItem
         * @since 0.1
         */
        this.removeListItem = function(index){};

        /**
         * Gets/sets scroll event for ListView. This event fires when the ListView
         * scrolls. For better performance, don't set any callback if does not 
         * necessary
         * 
         * @event onScroll
         * @since 0.1
         */
        this.onScroll = function onScroll(){ }
        
        /**
         * Gets/sets pull to refresh event for view. This event fires when user swipes
         * and releases the ListView's top.
         * 
         * @event onPullRefresh
         * @since 0.1
         */
        this.onPullRefresh = function onPullRefresh(){}
    }
);

module.exports = ListView;