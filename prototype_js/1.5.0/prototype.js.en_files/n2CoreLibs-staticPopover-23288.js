//! ################################################################
//! Copyright (c) 2004 Amazon.com, Inc., and its Affiliates.
//! All rights reserved.
//! Not to be reused without permission
//! $Change: 1350394 $
//! $Revision: 1.1 $
//! $DateTime: 2007/04/05 14:42:58 $
//! ################################################################
function n2StaticPopoverInitLibrary() {	// Begin library code wrapper. Goes all the way to the bottom of the file
if (window.goN2LibMon) goN2LibMon.beginLoad('staticPopover', 'n2CoreLibs');
window.N2MiniPane=function (oPopover, sID) {
this.sID = sID;
this.bIsSubPane=false;
this.maxSubPaneWidth;
this.currentWidth;
this.currentHeight;
this.oPopover=oPopover;
this.nDefaultWidth ; 		// overrides everything else (inc. min/max)
this.nMinWidth	= 0; //201;	// overrides value obtained from sizing content
this.nMaxWidth	= 0; //600;  // overrides value obtained from sizing content
this.nDefaultHeight = 'auto'; 		// overrides everything else (inc. min/max)
this.nMinHeight	= 0; //60;	// overrides value obtained from sizing content
this.nMaxHeight	= 0; //300;  // overrides value obtained from sizing content
this.setDefaultWidth = function(n) { this.nDefaultWidth = n; }
this.setMinWidth = function(n) { this.nMinWidth = n; }
this.setMaxWidth = function(n) { this.nMaxWidth = n; }
this.setCurrentWidth = function(n) {this.currentWidth = n; }
this.setDefaultHeight = function(n) { this.nDefaultHeight = n; }
this.setMinHeight = function(n) { this.nMinHeight = n; }
this.setMaxHeight = function(n) { this.nMaxHeight = n; }
this.setCurrentHeight = function(n) {this.currentHeight = n; }
this.isSubPane = function() { return this.bIsSubPane; }
this.relocate=null;
this.initialize = function() { }
}
window.N2StaticPopover=function() {
N2SimplePopover.call ( this );
var oCfg = this.oCfg = goN2U.getConfigurationObject('N2StaticPopover');
this.className = 'N2StaticPopover';
this.version = '1.0.0';
this.currentPane = new N2MiniPane(this);
this.currentPane.nMinWidth	= 0;//200;	// overrides value obtained from sizing content
this.currentPane.nMaxWidth	= 0;//600;  // overrides value obtained from sizing content
this.sMyStyle = 'n2Pop';								// The outer popup
this.sMyStyleStatic = 'n2PopStatic';
this.sStaticTitlebarStyle = 'popStaticTitle';			// just the titlebar when static
this.sSemiStaticTitlebarStyle = 'popSemiStaticTitle';	// just the titlebar when semi-static
this.sBodyStyle = 'n2PopBody';
this.sTitlebarStyle = this.sStaticTitlebarStyle;
this.sTitleStyle = 'popTitle';
this.sTitle = '';
this.nMinLeftPixelsVisible = oCfg.getValue('minLeftPixelsVisible', 100);
this.nMinTopPixelsVisible = oCfg.getValue('minTopPixelsVisible', 50);
this.nMinRightPixelsVisible = oCfg.getValue('minRightPixelsVisible', 100);
this.nMinBottomPixelsVisible = oCfg.getValue('minBottomPixelsVisible', 100);
this.closeButton = oCfg.getValue('popoverCloseImg',
{
width: 46,
height: 16,
up: 'JSF-close-tan-sm',
upFallback: 'nav2/images/close-tan-sm',
down: 'JSF-close-tan-sm-dn',
downFallback: 'nav2/images/close-tan-sm-dn'
}
);
this.backButton = oCfg.getValue('popoverBackImg',
{
width: 46,
height: 16,
up:'JSF-back-tan-sm',
upFallback:'nav2/images/back-tan-sm',
down:'JSF-back-tan-sm-dn',
downFallback:'nav2/images/back-tan-sm-dn',
disabled: 'JSF-back-tan-sm-dis',
disabledFallback:'nav2/images/back-tan-sm-dis'
}
);
this.nextButton = oCfg.getValue('popoverNextImg',
{
width: 46,
height: 16,
up:'JSF-next-tan-sm',
upFallback:'nav2/images/next-tan-sm',
down:'JSF-next-tan-sm-dn',
downFallback:'nav2/images/next-tan-sm-dn',
disabled: 'JSF-next-tan-sm-dis',
disabledFallback:'nav2/images/next-tan-sm-dis'
}
);
this.oneByOneImg = oCfg.getValue('oneByOneImage', '1x1_trans.gif');
this.loadBarImg = oCfg.getValue('loadingBarImg', 'JSF-loading-bar');
this.loadBarImgFallback = 'nav2/images/loading-bar.gif';
this.bDraggable = true;
this.staticState=0;
this.nPopBorderAdjust=0;
}
N2StaticPopover.prototype = new N2SimplePopover();
N2StaticPopover.prototype.initialize = function (id, objectName, dataArrayName, dispMinMethod,
locateMethod, nHAdjust, nVAdjust) {
this.simplePopoverInitialize(id, objectName, dataArrayName, dispMinMethod, 
locateMethod, nHAdjust, nVAdjust);
;
this.fDragEngage = this.returnHandler('_dragEngage');
this.fDragMove = this.returnHandler('_dragMove');
this.fDragRelease = this.returnHandler('_dragRelease');
this.hideBackForwardButtons();
}
N2StaticPopover.prototype.staticPopoverInitialize = N2StaticPopover.prototype.initialize;
N2StaticPopover.prototype.getPane = function () { return this.currentPane; }
N2StaticPopover.prototype.setButtonImages = function(sIdentifier, nWidth, nHeight, sUp, sDown, sDisabled) {
this[sIdentifier+'Button'] = 
{
width: nWidth, 
height: nHeight, 
up: sUp, 
upFallback: 'nav2/images/' + sUp, 
down: sDown, 
downFallback: 'nav2/images/' + sDown, 
disabled: sDisabled,
disabledFallback: 'nav2/images/' + sDisabled 
};
}
N2StaticPopover.prototype.setDraggable = function (bDraggable) { this.bDraggable = bDraggable; }
N2StaticPopover.prototype.setStyle= function(sOuter, sBody) { this.sMyStyle = sOuter; this.sBodyStyle = sBody; }
N2StaticPopover.prototype.setTitle= function(sTxt) {
this.sTitle = sTxt;
if (this.popObj) {
var oText = goN2U.getRawObject(this.myID + '_titleBarTitle');
if (oText) {
oText.innerHTML = sTxt;
}
}
}
N2StaticPopover.prototype.setTitleStyle= function(s) { this.sTitleStyle = s; }
N2StaticPopover.prototype.setStaticTitlebarStyle= function(s) { this.sStaticTitlebarStyle = s; }
N2StaticPopover.prototype.setSemiStaticTitlebarStyle= function(s) { this.sSemiStaticTitlebarStyle = s; }
N2StaticPopover.prototype.generateButton = function (sID, sObjectID, sActionCode, sImageDir, oProperties) {
if (!oProperties.upFallback)
{
oProperties.upFallback = 'nav2/images/' + oProperties.up;
}
if (!oProperties.downFallback)
{
oProperties.downFallback = 'nav2/images/' + oProperties.down;
}
var downImagePath = goN2Locale.getImageURL(oProperties.down, oProperties.downFallback);
var upImagePath = goN2Locale.getImageURL(oProperties.up, oProperties.upFallback);
var sBuf = '<span class="clickable" onclick="' + sObjectID + sActionCode+ '">'
+'<img id="' + sID + '" class="clickable" src="' + upImagePath + '" width="'+oProperties.width+'" height="'+oProperties.height+'"'
+' border="0" onmousedown="this.src=\'' + downImagePath + '\';" onmouseup="this.src=\'' + upImagePath + '\';"></span>';
if (oProperties.disabled) {
var disabledImagePath = goN2Locale.getImageURL(oProperties.disabled, oProperties.disabledFallback);
sBuf +='<img id="' + sID + 'Dis" class="clickable" src="' + disabledImagePath + '" width="'+oProperties.width+'" height="'+oProperties.height+'" border="0">';
}
return sBuf;
}
N2StaticPopover.prototype.createPopHTML = function (id, objectID, content) {
goN2U.preloadImage(goN2Locale.getImageURL(this.closeButton.up, this.closeButton.upFallback));
goN2U.preloadImage(goN2Locale.getImageURL(this.closeButton.down, this.closeButton.downFallback));
goN2U.preloadImage(goN2Locale.getImageURL(this.loadBarImg, this.loadBarImgFallback));
var outer = '<div id="' + id + '" class="'+this.sMyStyle+'" style="display:block; visibility:hidden; left:0px; top:0px; position:absolute"'
+' onMouseOver="' + objectID + '.mouseOver();" onMouseOut="' + objectID + '.mouseOut(event);"'
+' onMouseMove="' + objectID + '.mouseMove(event);" onMouseDown="' + objectID + '._click(event);">'
+'<div class="n2">';
var tbnc = '<div id="' + id + '_titleBar" class="'+this.sTitlebarStyle+'" style="visibility:inherit; min-height:18px;">'
+ '<div style="float:right; padding: 3px 4px 0 0" id="' + id + '_titleBarTd2">'
+ this.generateButton(id +'_backBtn', objectID, '.goBack()', this.imageDir, this.backButton)
+ this.generateButton(id +'_nextBtn', objectID, '.goForward()', this.imageDir, this.nextButton)
+ this.generateButton(id +'_closeX', objectID, '.hide()', this.imageDir, this.closeButton)
+ '</div>' 
+ '<span id="' + id + '_titleBarTitle" class="'+this.sTitleStyle+'">' + this.sTitle + '</span>'
+ '</div>';
var popbody = '<div id="' + id + '_main" class="' + this.sBodyStyle + '" style="clear:both;">';
if (content) popbody +=content;
else popbody +='--CONTENT GOES HERE (static)--';
popbody += '</div>';	// _main
var gp = outer + tbnc + popbody;
gp +='</div>'	// n2
+'</div>';	// n2Pop
var spanEl = document.createElement("div");
spanEl.innerHTML = gp;
document.body.insertBefore(spanEl,document.body.firstChild);
return goN2U.getRawObject(id);
}
N2StaticPopover.prototype.populate = function(action, id, type, linkID, href, linkText) {
var nPreChangePopoverWidth = this.width
var nPreChangePopoverHeight = this.height;
this._defaultPopulate(action, id, type, linkID, href, linkText);
this.relocate(this.currentPane, nPreChangePopoverWidth, nPreChangePopoverHeight)
}
N2StaticPopover.prototype.returnHandler = function(methodName) {
var o = {obj:this,method:methodName};
var fn = function(e){
if (!e) e = window.event;
o.obj[o.method](e);
}
return fn;
}
N2StaticPopover.prototype.makeStatic = function (nFlag) {
;
this.updateLocation();
var nTopOffset=0;  //(adjust for TBHeight)
var offset=0;		
var nDefaultWidth = this.currentPane.nDefaultWidth;
var currentWidth = goN2U.getObjectWidth(this.popObj);
var currentHeight = goN2U.getObjectHeight(this.popObj);
this.cursorCanLeavePopover = false;
if (nDefaultWidth) goN2U.setWidth(this.popObj, nDefaultWidth);
if (nFlag == 0) {		/// non-static
goN2U.setClass(this.popObj, this.sMyStyle);
goN2U.hide(this.myID+'_titleBar');
goN2U.undisplay(this.myID+'_titleBar');
this.displayCloseButtons(false);	// 0524
} else {
if (nFlag & 1) {	/// show titlebar
goN2U.display(this.myID+'_titleBar');
goN2U.show(this.myID +'_titleBar');
this.displayCloseButtons(true);	// 0609
}
if (nFlag & 2) {	/// show close and full static look, and set static mode (cursorCanLeavePopover)
this.displayCloseButtons(true);
this.cursorCanLeavePopover = true;
var elemTitleBar = goN2U.getElement(this.myID + '_titleBar');
goN2U.setClass(elemTitleBar, this.sStaticTitlebarStyle);
elemTitleBar.style.cursor = 'move';  // make sure the title bar looks draggable when the mouse is over it
goN2U.setClass(this.popObj, this.sMyStyleStatic);
if (goN2U.isIE()) goN2U.setWidth(this.popObj, currentWidth+2); // +4  
else if (goN2U.isMozilla5())goN2U.setWidth(this.popObj, currentWidth-2); 
if (this.expandsH == 'l')
offset = -2;	// -4  // KLUDGE to allow for border width increase
else
offset = 0;
} else {			/// semi-static look
var elemTitleBar = goN2U.getElement(this.myID + '_titleBar');
goN2U.setClass(elemTitleBar, this.sSemiStaticTitlebarStyle);
elemTitleBar.style.cursor = 'move';  // make sure the title bar looks draggable when the mouse is over it
goN2U.setClass(this.popObj, this.sMyStyle);
}
if (this.staticState == 0)	nTopOffset = 18;
}			
this.staticState=nFlag;
this.top = this.recalcTop(this.top-nTopOffset);
this.left = this.left + offset;
; 
goN2U.shiftTo(this.myID, this.left, this.top);
this.updateLocation();
if(this.myFeatureChangedCallback) this.myFeatureChangedCallback(this);
}
N2StaticPopover.prototype.ensureVisible = function () {
this.updateLocation();
var nCurrentTop = this.top;
var nCurrentLeft = this.left;
var nScrollLeft = goN2U.getScrollLeft();
var nWindowWidth = goN2U.getInsideWindowWidth();
var nWindowRight = nScrollLeft + nWindowWidth;
; 
this.top = this.recalcTop(this.top);
if (this.left < nScrollLeft ) {
this.left = nScrollLeft + 6; // FIXME: use screen pad
}
; 
if (this.right > nWindowRight) {
this.left = nWindowRight - this.width - 6; // FIXME: use screen pad
}
if (this.top != nCurrentTop || this.left != nCurrentLeft) {
; 
goN2U.shiftTo(this.myID, this.left, this.top);
this.updateLocation();
if (this.myFeatureChangedCallback) this.myFeatureChangedCallback(this);
} else {
; 
}
}
N2StaticPopover.prototype.recalcTop = function (top) {
var edgePad = this.oCfg.getValue('edgePad', 6);
var insideWindowHeight = goN2U.getInsideWindowHeight();
var nScrollTop = goN2U.getScrollTop();
var windowBottomEdge = insideWindowHeight + nScrollTop;
var currentHeight = goN2U.getObjectHeight(this.popObj)
if (top + currentHeight > windowBottomEdge) {
; 
top = windowBottomEdge - currentHeight - edgePad;
top = Math.max(top, nScrollTop+edgePad);
;
}
return top;
}
N2StaticPopover.prototype.displayCloseButtons = function (disp) {
if(disp) {
goN2U.display(this.myID+'_closeX', 'inline');
var eC = goN2U.getRawObject(this.myID+'_closeX');
if (eC) eC.src = eC.src;
} else {
goN2U.undisplay(this.myID+'_closeX');
}
}
N2StaticPopover.prototype.hideBackForwardButtons = function () {
goN2U.undisplay(this.myID+'_backBtn'); 
goN2U.undisplay(this.myID+'_nextBtn'); 
goN2U.undisplay(this.myID+'_backBtnDis'); 
goN2U.undisplay(this.myID+'_nextBtnDis'); 
}	
N2StaticPopover.prototype.setContent = function (sHtml, oPane, bDisableScrollbars, bDisableResizing) {
if (bDisableResizing) {
this._setContentNoResize(sHtml, oPane, bDisableScrollbars);
} else {
this._setContent(sHtml, oPane, bDisableScrollbars);
this.ensureVisible();
}
}
N2StaticPopover.prototype.getContent	= function (oPane) {
; 
var sElemID = oPane.sElementID ? oPane.sElementID : '_main'; 
sElemID = this.myID+sElemID;
var eElem = goN2U.getRawObject(sElemID);
if (eElem == null) {
;
return null;
} 
return eElem.innerHTML;
}
N2StaticPopover.prototype._setContentNoResize = function (sHtml, oPane) {
;
sHtml = this.replacePlaceholders(sHtml);
sElemID = oPane.sElementID ? oPane.sElementID : '_main'; 
sElemID = this.myID+sElemID;
;
var eElem = goN2U.getRawObject(sElemID);
if (eElem == null) {
this.content = sHtml;
;
;
return;
} 
eElem.innerHTML = sHtml;
;
}
N2StaticPopover.prototype._relocate = function (oPane, nOrigWidth, nOrigHeight) {
this.updateLocation();
if (oPane.relocate == null) {
var nNewLeft = this.left;
var nNewTop = this.top;
if (this.expandsH =='l') {
var nLeftNow = this.left;
nNewLeft = nLeftNow + nOrigWidth - goN2U.getObjectWidth(this.popObj);
}
if (this.expandsV =='u') {
var nTopNow = this.top;
}
goN2U.shiftTo(this.popObj, nNewLeft, nNewTop);
} else {
oPane.relocate (nOrigWidth, nOrigHeight);		
}
this.ensureVisible();
}
N2StaticPopover.prototype.relocate = N2StaticPopover.prototype._relocate;
N2StaticPopover.prototype._dragEngage = function (evt) {
evt = (evt) ? evt : window.event;
var target = (evt.target) ? evt.target : evt.srcElement;
;
;
var elemTitleBar = goN2U.getElement(this.myID+'_titleBar');
if (this.bDraggable && target && elemTitleBar && goN2U.elementIsContainedBy(target, elemTitleBar)) {
var docBody = document.body;
if (docBody && docBody.setCapture) {
docBody.setCapture();
}
var mouseDownX = goN2U.isDefined(evt.clientX)? evt.clientX : evt.pageX;
var mouseDownY = goN2U.isDefined(evt.clientY)? evt.clientY : evt.pageY;
this.dragOffsetX = mouseDownX - ((this.popObj.offsetLeft) ? this.popObj.offsetLeft : this.popObj.left);
this.dragOffsetY = mouseDownY - ((this.popObj.offsetTop) ? this.popObj.offsetTop : this.popObj.top);
this.buttonIsDown = true;
evt.cancelBubble = true;
if (evt.stopPropagation) {
evt.stopPropagation();
}
if (evt.preventDefault) {
evt.preventDefault();
}
return false;
} else {
return true;
}
}
N2StaticPopover.prototype._dragMove = function (evt) {
evt = (evt) ? evt : window.event;
if (!this.buttonIsDown) {
return true;
}
var nX = goN2U.isDefined(evt.clientX)? evt.clientX : evt.pageX;
nX -= this.dragOffsetX;
var nY = goN2U.isDefined(evt.clientY)? evt.clientY : evt.pageY;
nY -= this.dragOffsetY;
goN2U.shiftTo(this.popObj, nX, nY);
this.updateLocation();
if (this.myFeatureChangedCallback) {
this.myFeatureChangedCallback(this);
}
evt.cancelBubble = true;
if (evt.stopPropagation) {
evt.stopPropagation();
}
if (evt.preventDefault) {
evt.preventDefault();
}
return false;
}
N2StaticPopover.prototype._dragRelease = function (evt) {
if (!this.buttonIsDown) {
return true;
}
this._ensurePartiallyVisible();
if (document.body && document.body.releaseCapture) {
document.body.releaseCapture();
}
this.buttonIsDown = false;
evt.cancelBubble = true;
if (evt.stopPropagation) {
evt.stopPropagation();
}
if (evt.preventDefault) {
evt.preventDefault();
}
return false;
}
N2StaticPopover.prototype._click = function(evt) {
evt = (evt) ? evt : window.event;
;
if(!this.isStatic()) this.makeStatic(3);
}
N2StaticPopover.prototype._ensurePartiallyVisible = function (evt) {
var nLeft = this.left;
var nTop = this.top;
var nWindowWidth = goN2U.getInsideWindowWidth();
var nWindowHeight = goN2U.getInsideWindowHeight();
var nScrollLeft = goN2U.getScrollLeft();
var nScrollTop = goN2U.getScrollTop();
if (this.right < 0) {
nLeft = (-this.right + this.nMinLeftPixelsVisible) - Math.abs(this.left);
;
} 
if (this.top < 0) {
;
nTop = this.nMinTopPixelsVisible;
}
if (this.left > (nWindowWidth + nScrollLeft)) {
;
nLeft = nWindowWidth + nScrollLeft - this.nMinRightPixelsVisible;
}
if (this.top > (nWindowHeight + nScrollTop)) {
;
nTop = nWindowHeight + nScrollTop - this.nMinBottomPixelsVisible;
}
;
goN2U.shiftTo(this.popObj, nLeft, nTop);
this.updateLocation();
}
N2StaticPopover.prototype.hookEvents = function () {
;
goN2Events.addEventHandler('mousedown', this.fDragEngage);
goN2Events.addEventHandler('mousemove', this.fDragMove);
goN2Events.addEventHandler('mouseup', this.fDragRelease);
}
N2StaticPopover.prototype.unhookEvents = function () {
;
goN2Events.removeEventHandler('mousedown', this.fDragEngage);
goN2Events.removeEventHandler('mousemove', this.fDragMove);
goN2Events.removeEventHandler('mouseup', this.fDragRelease);
}
N2StaticPopover.prototype._setContent = function (sHtml, oPane, bDisableScrollbars, bReadjustPopoverDimensions) {
var bResetTitlebar = false;
var nNoContentHeight;
var nUpdatedPopoverWidth, nUpdatedPopoverHeight;
oPane = oPane ? oPane : this.currentPane;
;
bDisableScrollbars = bDisableScrollbars ? true : false;
bReadjustPopoverDimensions = bReadjustPopoverDimensions ? true : false;
var nTitleBarHeight=0;
if (this.staticState >0) {	
var TBVisibleHeight = goN2U.getObjectHeight(this.popObj);
goN2U.hide(this.myID+'_titleBar');
goN2U.undisplay(this.myID+'_titleBar');
nTitleBarHeight = TBVisibleHeight - goN2U.getObjectHeight(this.popObj);
;
bResetTitlebar = true;
}
sHtml = this.replacePlaceholders(sHtml);
sElemID = oPane.sElementID ? oPane.sElementID : '_main'; 
;
var eElem = goN2U.getRawObject(this.myID+sElemID);
if (eElem == null) {
this.content = sHtml;
;
return;
} 
var oElemParent = eElem.parentNode;
;
eElem.innerHTML = '';
goN2U.setWidth(eElem, null);		
goN2U.setHeight(eElem, null);	
var nPopBorderAdjust=0; 
if ( !oPane.isSubPane() || bReadjustPopoverDimensions) {
;
goN2U.setWidth(this.popObj, null);		
goN2U.setHeight(this.popObj, null);	
if (this.nPopBorderAdjust) {
nPopBorderAdjust = this.nPopBorderAdjust;
} else {
this.nPopBorderAdjust = nPopBorderAdjust = goN2U.getObjectWidth(this.popObj) - goN2U.getObjectWidth(eElem);
}
}
;
var nParentWidth = goN2U.getObjectWidth(oElemParent);
var nParentHeight = goN2U.getObjectHeight(oElemParent);
;
var nPopoverWidth = goN2U.getObjectWidth(this.popObj);
var nPopoverHeight = goN2U.getObjectHeight(this.popObj);
;
var newWidth, newHeight; //, unconstrainedMaxWidth, unconstrainedMaxHeight;
eElem.innerHTML = sHtml;
nParentWidth = goN2U.getObjectWidth(oElemParent);
nParentHeight = goN2U.getObjectHeight(oElemParent);
;
nPopoverWidth = goN2U.getObjectWidth(this.popObj);
nPopoverHeight = goN2U.getObjectHeight(this.popObj);
;
var bSetWidth = true;
newWidth = goN2U.getObjectWidth(eElem);
;
if (oPane.nDefaultWidth) {
if (oPane.nDefaultWidth == 'auto') {
;
bSetWidth = false;	// testing
} else newWidth = oPane.nDefaultWidth;
}
var nMin = oPane.nMinWidth;
var nMax = oPane.nMaxWidth
if (nMax && (newWidth > nMax)) {
bSetWidth = true;
newWidth = nMax;
;
} else if (nMin && (newWidth < nMin)) {
bSetWidth = true;
newWidth = nMin;
;
}
if ( oPane.isSubPane() ) {
if (bSetWidth) {
goN2U.setWidth(eElem, newWidth);
;
}
} else {
var w = goN2U.isNumber(newWidth) ? newWidth + nPopBorderAdjust : newWidth;
;
goN2U.setWidth(this.popObj, w);		
}
oPane.setCurrentWidth(newWidth);
var newHeight = goN2U.getObjectHeight(eElem);
;
if ( !bDisableScrollbars && ((oPane.nDefaultHeight && (newHeight > oPane.nDefaultHeight)) || 
(oPane.nMaxHeight && newHeight>oPane.nMaxHeight)) ) {
;
if(goN2U.isIE() || goN2U.isMozilla5()) {
eElem.style.overflow='auto';
} else
eElem.style.overflow='auto';
} else {
eElem.style.overflow='';
}
var bSetHeight = true;
if (oPane.nDefaultHeight) {
;
if (oPane.nDefaultHeight == 'auto') { 
bSetHeight = false;
} else {
newHeight = oPane.nDefaultHeight;
;
}
}
nMin = oPane.nMinHeight;
nMax = oPane.nMaxHeight
if (nMax && (newHeight > nMax)) {
bSetHeight = true;
newHeight = nMax;
;
} else if (nMin && (newHeight < nMin)) {
bSetHeight = true;
newHeight = nMin;
;
}
if (bSetHeight) {
;
goN2U.setHeight(eElem, newHeight);
oPane.setCurrentHeight(newHeight);
}	
if (bResetTitlebar) {
goN2U.show(this.myID+'_titleBar');
goN2U.display(this.myID+'_titleBar');
}		
;
}
N2StaticPopover.prototype.contentChanging = function (oPane) {
oPane = oPane ? oPane : this.currentPane;
sElemID = oPane.sElementID ? oPane.sElementID : '_main'; 
;
var eElem = goN2U.getRawObject(this.myID+sElemID);
goN2U.setWidth(this.popObj, null);		
goN2U.setHeight(this.popObj, null);	
goN2U.setWidth(eElem, null);
goN2U.setHeight(eElem, null);
}
N2StaticPopover.prototype.contentChanged = function (oPane) {
oPane = oPane ? oPane : this.currentPane;
sElemID = oPane.sElementID ? oPane.sElementID : '_main'; 
;
var eElem = goN2U.getRawObject(this.myID+sElemID);
this.setContent(eElem.innerHTML);
if (this.myFeatureChangedCallback) this.myFeatureChangedCallback(this);
}
N2StaticPopover.prototype.callContentUpdater = function (fFn) {
this.contentChanging();
fFn();
this.contentChanged();
}
N2StaticPopover.prototype.displayPopoverDiv = function (bDisplayIt) {
if (bDisplayIt) {
goN2U.display(this.myID +'_main');
} else {
goN2U.undisplay(this.myID +'_main');
}
}
if (window.goN2LibMon) goN2LibMon.endLoad('staticPopover');
} // END library code wrapper
n2RunIfLoaded("simplepopover", n2StaticPopoverInitLibrary, "staticpopover");