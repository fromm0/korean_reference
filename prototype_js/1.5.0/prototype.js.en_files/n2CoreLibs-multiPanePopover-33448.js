//! ################################################################
//! Copyright (c) 2004 Amazon.com, Inc., and its Affiliates.
//! All rights reserved.
//! Not to be reused without permission
//! $Change: 1397983 $
//! $Revision: 1.1 $
//! $DateTime: 2007/05/18 14:33:32 $
//! ################################################################
function n2MultiPanePopoverInitLibrary() {	// Begin library code wrapper. Goes all the way to the bottom of the file
if (window.goN2LibMon) goN2LibMon.beginLoad('multiPanePopover', 'n2CoreLibs');
window.N2MultiPanePopover=function() {
N2StaticPopover.call ( this );
this.oCfg = goN2U.getConfigurationObject('N2MultiPanePopover');
this.className = 'N2MultiPanePopover';
this.version = '1.1.0';
this.sDUHandlerName = 'test/testx';			// Default Mason Template for dynamic update
this.sDURequestMode = 'xd';
this.aPanes = new Array();
this.currentPaneIndex=0;
this.stack = new N2BrowseStack(20); 	// set up the history queue
this.bCacheResponses = true;
this.defaultTimeoutMs = this.oCfg.getValue('defaultTimeoutMs', 8000);
this.kludgeTimer=null;
this.sReftag = null;
}
N2MultiPanePopover.prototype = new N2StaticPopover();
N2MultiPanePopover.prototype.setDefaultTimeout = function(nMS) {  this.defaultTimeoutMs = nMS;  }
N2MultiPanePopover.prototype.cacheResponses = function (b) { this.bCacheResponses = b; };
N2MultiPanePopover.prototype.setReftag = function (s) { this.sReftag = s; };
N2MultiPanePopover.prototype.populate = function(action, id, type, params, linkID, href, linkText) {
var nPreChangePopoverWidth = this.width
var nPreChangePopoverHeight = this.height;
this.currentPane.populate(action, id, type, params, linkID, href, linkText);
this.relocate(this.currentPane, nPreChangePopoverWidth, nPreChangePopoverHeight)
}
N2MultiPanePopover.prototype.repopulate = function() {
var tmp = this.stack.current();
if (tmp) {
this.currentPane.initialize();
this.populate(tmp.action, tmp.id, tmp.type, tmp.params, null, tmp.href, tmp.text);
}
}
N2MultiPanePopover.prototype.newPane = function(n) {
;
var pane;
if (this.aPanes.length && 
!goN2U.isUndefined(this.aPanes[n-1]) &&
goN2U.isNumber(n)) 
pane = this.aPanes[n-1].clone();
else 
pane = new N2PopoverPane(this, n);
pane.index=n;
this.aPanes[n] = pane;
return pane;
}
N2MultiPanePopover.prototype.addPane = function (oPane, n) {
;
; 
; 
oPane.sID = n.toString();
oPane.oPopover = this;
return this.aPanes[n] = oPane;
}
N2MultiPanePopover.prototype.getPane = function (n) {
;
if ( goN2U.isUndefined(this.aPanes[n]) ) {
this.aPanes[n] = this.newPane(n);
} 
return this.aPanes[n];		
}
N2MultiPanePopover.prototype.findPane = function (sPaneID) {
return this.currentPane.findPane(sPaneID);
}
N2MultiPanePopover.prototype.setCurrentPane = function (n) {
; 	
this.currentPaneIndex = n;
this.currentPane = this.getPane(n);
return this.currentPane;
}
N2MultiPanePopover.prototype.usePane = function(nPane, sAction, sID, sType, params, linkID, href, linkText, bFirstPopulate) {
;
if (this.kludgeTimer) {
;
clearTimeout(this.kludgeTimer);
this.kludgeTimer = null;
}
if (!bFirstPopulate) 
this.prepareClose();
var pane = this.setCurrentPane(nPane);
if (pane.locate) this.locate = pane.locate;
if (this.myFeatureChangedCallback) this.myFeatureChangedCallback(this);
pane.initialize(bFirstPopulate);
sAction = sAction ? sAction : this.action;
sID = sID ? sID : this.thingID;
sType = sType ? sType : this.thingType;
params = params ? params : this.thingParams;
linkID = linkID ? linkID : this.linkID
href = href ? href : this.linkHref;
linkText = linkText ? linkText : this.linkText; 
;
this.populate(sAction, sID, sType, params, linkID, href, linkText);
if (pane.myStyle) {
;
goN2U.setClass(this.popObj, pane.myStyle);
}
if (this.myFeatureChangedCallback) this.myFeatureChangedCallback(this);
}
N2MultiPanePopover.prototype.initializeCurrentPane = function() {
this.currentPane.initialize();
}
N2MultiPanePopover.prototype.prepareClose = function() {
this.currentPane.prepareClose();
}
N2MultiPanePopover.prototype.nextPane = function(sAction, sID, sType, sParams, linkID, href, text) {
sAction = sAction ? sAction : this.action;
sID = sID ? sID : this.thingID;
sType = sType ? sType : this.thingType;
sParams = sParams ? sParams : this.thingParams;
linkID = linkID ? linkID : this.linkID
href = href ? href : this.linkHref;
text = text ? text : this.linkText; 
this.usePane(this.currentPaneIndex+1, sAction, sID, sType, sParams, linkID, href, text);
if (this.staticState != 3) this.makeStatic(3);
this.addThingDataToStack(sAction, sID, sType, sParams, linkID, href, text);
}
N2MultiPanePopover.prototype.getSubPane = function(id) {
return this.currentPane.getSubPane(id);		
}	
N2MultiPanePopover.prototype._showPopulate = function (sAction, sID, sType, sParams, sLinkID, sHref, sLinkText) {
this.hideBackForwardButtons();
this.stack.reset();	
;
; 
this.usePane(0, sAction, sID, sType, sParams, sLinkID, sHref, sLinkText, true);
this.addThingDataToStack(sAction, sID, sType, sParams, sLinkID, sHref, sLinkText);
}
N2MultiPanePopover.prototype.initialize = function (id, objectName, dataArrayName, dispMinMethod, 
locateMethod, nHAdjust, nVAdjust) {
this.staticPopoverInitialize(id, objectName, dataArrayName, dispMinMethod, 
locateMethod, nHAdjust, nVAdjust);
;
var pane = this.getPane(0);
this.currentPane = pane;
if (goN2U.isDefined(window.goN2DUManager)) this.setUpdateManager(goN2DUManager);
}
N2MultiPanePopover.prototype.multiPanePopoverInitialize = N2MultiPanePopover.prototype.initialize;
N2MultiPanePopover.prototype.setUpdateManager = function (obj) { this.oUpdateManager = obj; }
N2MultiPanePopover.prototype.setDUHandler = function(sH, sM) { 
this.sDUHandlerName = sH; 
;
;
this.sDURequestMode = sM; 
}
N2MultiPanePopover.prototype.getDUHandlerName = function() { return this.sDUHandlerName; }
N2MultiPanePopover.prototype.getDURequestMode = function() { return this.sDURequestMode; }
N2MultiPanePopover.prototype.requestUpdate = function (oPane, 
action, id, type, params,
bImmediate, bCacheResult, 
overrideSuccess, overrideFailure, oOverride) {		// these three are optional
if (this.oUpdateManager) {
this.showLoading(oPane);
if (this.bCacheResponses) {
bCacheResult = (typeof (bCacheResult)!='undefined') ? bCacheResult : true;
} else {
bCacheResult = false;
}
oPane.currentRequest = this._requestUpdate(oPane, 
action, id, type, params,
bImmediate, bCacheResult, 
overrideSuccess, overrideFailure, oOverride);
} else {
;
}
}
N2MultiPanePopover.prototype._requestUpdate = function (oPane, action, id, type, params,
bImmediate, bCacheResult, 
overrideSuccess, overrideFailure, oOverride) {		// these three are optional
var sDUHandlerName = oPane.getDUHandlerName() ? oPane.getDUHandlerName() : this.sDUHandlerName;
var sDURequestMode = oPane.getDURequestMode() ? oPane.getDURequestMode() : this.sDURequestMode;
;
;
;
return this.oUpdateManager.requestUpdate(oPane, sDURequestMode, sDUHandlerName, action,  id, type, params, 
this.defaultTimeoutMs, bImmediate, bCacheResult,
overrideSuccess, overrideFailure, oOverride, null, this.sReftag );
}
N2MultiPanePopover.prototype.resubmitFormUpdate = function (sAction, sID, sType, sParams, sPaneID) {
this._submitFormUpdate(sAction, sID, sType, sParams, sPaneID, true);
}
N2MultiPanePopover.prototype._submitFormUpdate = function (sAction, sID, sType, sParams, sPaneID, bUseCachedArgs) {
; // ( "+sAction+","+ sID+","+ sType+","+ sParams+")"); 
var oPane = this.findPane(sPaneID);
if (oPane) 	{
return oPane._submitFormUpdate (sAction, sID, sType, sParams, bUseCachedArgs);
} else {
;
return false;	
}
}
N2MultiPanePopover.prototype.requestAnonomousUpdate = function (sDURequestMode, sHandler, action, id, type, params,
bImmediate, bCacheResult, 
overrideSuccess, overrideFailure, oOverride) {		// these three are optional
var sDURequestMode = sDURequestMode ? DURequestMode : this.sDURequestMode;
var sDUHandlerName = sHandler ? sHandler : this.sDUHandlerName;
if (this.oUpdateManager) {
return this.oUpdateManager.requestUpdate(null, sDURequestMode, sDUHandlerName, action,  id, type, params, 
this.defaultTimeoutMs, bImmediate, bCacheResult,
overrideSuccess, overrideFailure, oOverride, null, this.sReftag );
} else {
;
}
return null;
}
N2MultiPanePopover.prototype.showLoading = function (oPane) {
;
var sLoadingHTMLDefault = gsN2LoadingMessage;
var sLoadingHTML = (oPane.sLoadingMessage) ? oPane.sLoadingMessage :
this.oCfg.getValue('loadingHTML', sLoadingHTMLDefault);
if (sLoadingHTML.length)
this.setContent(sLoadingHTML, oPane, true);
}
N2MultiPanePopover.prototype.addThingDataToStack = function (sAction, sID, sType, sParams, linkID, linkHref, linkText) {
if (this.currentPane.useHistory()) {
;
var tmp = new Object();
tmp.action = sAction;
tmp.id   = sID;
tmp.type = sType;
tmp.params = sParams;
tmp.linkID = linkID;
tmp.href = linkHref 
tmp.text = linkText; 
this.stack.add(tmp);
}
}
N2MultiPanePopover.prototype.getCurrentThingData = function () { return this.stack.current(); }
N2MultiPanePopover.prototype.setLatestAction = function (sAction, p1, p2) {	
;
var aData = this.getCurrentThingData();
if (aData) {
aData.action = sAction;
aData.p1 = p1;
aData.p2 = p2;
}
}
N2MultiPanePopover.prototype.update = function (sAction, sID, sType, sParams, eElem) {
;
if (this.oUpdateManager) 
this.currentPane.cancelAllRequests(true);
this._update(this.currentPane, sAction, sID, sType, sParams, eElem);
}
N2MultiPanePopover.prototype.updatePane = function (sPaneID, sAction, sID, sType, sParams, eElem) {
;
var oPane = this.findPane(sPaneID);
;
this._update(oPane, sAction, sID, sType, sParams, eElem);
}
N2MultiPanePopover.prototype._update = function (oPane, sAction, sID, sType, sParams, eElem) {
;
if (!oPane) return;
var oPopover = oPane.oPopover;
var lid, href, text;
if (eElem) {
lid = eElem.id;
href = eElem.href;
text = eElem.innerHTML;
}
sID = sID ? sID : this.thingID
sType = sType ? sType : this.thingType;
sParams = sParams ? sParams : this.thingParams;
this.bEnableStaticState=true;
this.makeStatic(3);
oPopover.setCurrentThingData(sAction, sID, sType, sParams, lid, href, text);	
if ( oPane.useHistory() ) {	
oPopover.addThingDataToStack(sAction, sID, sType, sParams, lid, href, text);
oPopover.updateBackNext();
}
oPane.initialize();
oPane.populate(sAction, sID, sType, sParams, lid, href, text);
}
N2MultiPanePopover.prototype.goBack = function () {
;
this.stack.goBack();
var tmp = this.stack.current();
if (tmp) {
if ((tmp.nPaneIndex != null) && (tmp.nPaneIndex != this.currentPaneIndex)) 
this.usePane(tmp.nPaneIndex); // FIXME: this causes a populate! use alternate mtehod?
;
this.initializeCurrentPane();
this.setCurrentThingData(tmp.action, tmp.id, tmp.type, tmp.params, null, tmp.href, tmp.text);
this.populate(tmp.action, tmp.id, tmp.type, tmp.params, null, tmp.href, tmp.text);
this.updateBackNext();
}
;
}
N2MultiPanePopover.prototype.goForward = function () {
;
this.stack.goForward();
var tmp = this.stack.current();
if (tmp) {
this.initializeCurrentPane();
this.setCurrentThingData(tmp.action, tmp.id, tmp.type, tmp.params, null, tmp.href, tmp.text);
this.populate(tmp.action, tmp.id, tmp.type, tmp.params, null, tmp.href, tmp.text);			
this.updateBackNext();
}
;
}
N2MultiPanePopover.prototype.updateBackNext = function () {
var currentReferenceTop = this.getReferenceTop();
var eB, eN;
if (this.stack.previous() || this.stack.next()) { 
if (this.stack.previous()) {
eB = goN2U.getRawObject(this.myID+'_backBtn');
goN2U.display(this.myID+'_backBtn', 'inline'); 
goN2U.undisplay(this.myID+'_backBtnDis'); 
} else {
eB = goN2U.getRawObject(this.myID+'_backBtnDis');
goN2U.display(this.myID+'_backBtnDis', 'inline'); 
goN2U.undisplay(this.myID+'_backBtn'); 
}
if (this.stack.next()) {
eN = goN2U.getRawObject(this.myID+'_nextBtn');
goN2U.display(this.myID+'_nextBtn', 'inline'); 
goN2U.undisplay(this.myID+'_nextBtnDis'); 
} else {
eN = goN2U.getRawObject(this.myID+'_nextBtnDis');
goN2U.display(this.myID+'_nextBtnDis', 'inline'); 
goN2U.undisplay(this.myID+'_nextBtn'); 
}
eB.src = eB.src;
eN.src = eN.src;
} else {
goN2U.undisplay(this.myID+'_backBtn'); 
goN2U.undisplay(this.myID+'_nextBtn'); 
goN2U.undisplay(this.myID+'_BtnSpace');
goN2U.undisplay(this.myID+'_backBtnDis'); 
goN2U.undisplay(this.myID+'_nextBtnDis'); 
}
var referenceAdj = this.getReferenceTop() - currentReferenceTop;
if (referenceAdj) {
this.top -= referenceAdj;
this.top = Math.max(this.top, goN2U.getScrollTop()+screenPad);
goN2U.shiftTo(this.myID, this.left, this.top);
this.updateLocation();
if (this.myFeatureChangedCallback) {
this.myFeatureChangedCallback(this);
}
}
}
N2MultiPanePopover.prototype.getReferenceTop = function() { return this.top; }
N2MultiPanePopover.prototype.expand = function (sID) { 
var oP;
if (oP=this.findPane(sID) && oP.expand) {
oP.expand();
} else {
;
}
} 
N2MultiPanePopover.prototype.contract = function (sID) { 
var oP;
if (oP=this.findPane(sID) && oP.contract) {
oP.contract();
} else {
;
}
} 
N2MultiPanePopover.prototype.toggle = function (sID) { 
var oP;
if ((oP=this.findPane(sID)) && oP.toggle) {
oP.toggle();
} else {
;
}
} 
if (window.goN2LibMon) goN2LibMon.endLoad('multiPanePopover');
} // END library code wrapper
n2RunIfLoaded("popoverPane", n2MultiPanePopoverInitLibrary, "multipanepopover");