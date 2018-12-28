//! ################################################################
//! Copyright (c) 2004 Amazon.com, Inc., and its Affiliates.
//! All rights reserved.
//! Not to be reused without permission
//! $Change: 1312631 $
//! $Revision: 1.1 $
//! $DateTime: 2007/03/02 09:47:36 $
//! ################################################################
function n2PopoverPaneInitLibrary() {	// Begin library code wrapper. Goes all the way to the bottom of the file
if (window.goN2LibMon) goN2LibMon.beginLoad('popoverPane', 'n2CoreLibs');
window.N2PopoverPane=function(oPopover, sID) {
this.sID = sID;
this.aSubPanes=null;
this.bIsSubPane=false;
this.maxSubPaneWidth;
this.currentWidth;
this.currentHeight;
this.bUseHistory = false;
this.bAllowDynamicUpdate = false;
this.sDefaultContent = '{PANE_ID}';
this.oPopover=oPopover;
this.nDefaultWidth ='auto';  // overrides everything else (inc. min/max)
this.nMinWidth	= 0; //61;	// overrides value obtained from sizing content
this.nMaxWidth	= 0; //600;  // overrides value obtained from sizing content
this.nDefaultHeight ='auto'; 		// overrides everything else (inc. min/max)
this.nMinHeight	= 0; //60;	// overrides value obtained from sizing content
this.nMaxHeight	= 0; //300;  // overrides value obtained from sizing content
this.sElementID;		// set to change the default elementID to populate/update
this.bDisableScrollbars = false; // if true would not allow scrollbars to be added automatically
this.bDisableResizing = false;  // if true would not compute new pane/popover sizes automatically
this.bTemplateHasPlaceholders = false;
this.bReplaceTemplateTDFieldPlaceholders = false;
this.myStyle;
this.LADTimer = null;
this.bbLADSupported = false;	
this.nLADRetries;			// calculated in show()
this.sLADKey = null;		// gaTD[key] exists
this.sLADField = null;		// gaTD[<sID>].field or gaTD[key].field exists
this.sLADDUAction = null;
var imagePath = goN2Locale.getImageURL('JSF-loading-bar', 'nav2/images/loading-bar.gif');
this.sLADLoadingMessage = '<div align="center">' + goN2Locale.getString('loading_13548', 'Loading...') + '<im'+'g s'+'rc="' + imagePath + '" height="9" align="absmiddle"></div>';
this.sLADTimeoutMessage = goN2Locale.getString('unable_to_get_info_36020', "Unable to obtain necessary information. Please try again later");
this.bPersistContent = false;
}
new N2PopoverPane();
N2PopoverPane.prototype.locate=null;
N2PopoverPane.prototype.relocate=null;
N2PopoverPane.prototype.postPopulate=null;		
N2PopoverPane.prototype.getID = function() { return this.sID;}
N2PopoverPane.prototype.setDefaultWidth = function(n) { this.nDefaultWidth = n; }
N2PopoverPane.prototype.setMinWidth = function(n) { this.nMinWidth = n; }
N2PopoverPane.prototype.setMaxWidth = function(n) { this.nMaxWidth = n; }
N2PopoverPane.prototype.setCurrentWidth = function(n) {this.currentWidth = n; }
N2PopoverPane.prototype.setDefaultHeight = function(n) { this.nDefaultHeight = n; }
N2PopoverPane.prototype.setMinHeight = function(n) { this.nMinHeight = n; }
N2PopoverPane.prototype.setMaxHeight = function(n) { this.nMaxHeight = n; }
N2PopoverPane.prototype.setCurrentHeight = function(n) {this.currentHeight = n; }
N2PopoverPane.prototype.disableScrollbars = function(f) { this.bDisableScrollbars = f; }
N2PopoverPane.prototype.setElementID = function(sID) { this.sElementID = sID; }
N2PopoverPane.prototype.getElementID = function() { return this.sElementID; }
N2PopoverPane.prototype.persistContent = function (b) { this.bPersistContent = b; }
N2PopoverPane.prototype.setStyle= function(n) { this.myStyle = n; }
N2PopoverPane.prototype.setUseHistory = function(f) { this.bUseHistory = f; }
N2PopoverPane.prototype.useHistory = function(f)    { return this.bUseHistory; }
N2PopoverPane.prototype.setTemplate = function(s) { 	
this.sTemplate = s; 
this.sDefaultContent = s; // 9/19/2004, essential currently for the templating(?) code to work?
if (this.sTemplate.indexOf('{') >=0) 	this.bTemplateHasPlaceholders = true;
}
N2PopoverPane.prototype.replaceTemplateTDFieldPlaceholders = function (b) { this.bReplaceTemplateTDFieldPlaceholders = b; }
N2PopoverPane.prototype.setDefaultContent = function (s) { this.sDefaultContent = s; }
N2PopoverPane.prototype.isSubPane = function() { return this.bIsSubPane; }
N2PopoverPane.prototype.hasSubPanes = function() { return this.aSubPanes != null; }
N2PopoverPane.prototype.configureLADSupport = function(b, sKey, sField, 
sDUAction, sDUParams,
sLoadingMsg, sTimeoutMsg) {
this.bLADSupported = b; 
if (sKey)       this.sLADKey = sKey;
if (sField)     this.sLADField = sField;
if (sDUAction)     this.sLADDUAction = sDUAction;
if (sDUParams)     this.sDUParams = sDUParams;
if (sLoadingMsg) this.sLADLoadingMessage = sLoadingMsg;
if (sTimeoutMsg) this.sLADTimeoutMessage = sTimeoutMsg;
}
N2PopoverPane.prototype._initialize = function(bFirstPopulate) {
;
this.resetLAD();
if (bFirstPopulate && this.bPersistContent) 
this.sDefaultContent = null;
var aSubPanes = this.aSubPanes;
if (aSubPanes != null) {
var nSubs = aSubPanes.length;
for (var i=0; i<nSubs; i++) {
this.aSubPanes[i].initialize(bFirstPopulate);
}
} else {
;
}
}
N2PopoverPane.prototype.initialize = N2PopoverPane.prototype._initialize;
N2PopoverPane.prototype.resetLAD = function() {
this.nLADRetries = 	this.oPopover.nLADTimeoutMs/this.oPopover.nLADRetryMs;
this.bLADLoading = false;
this.nLADAllow = 1;
if (this.LADTimer) {
;
clearTimeout(this.LADTimer);
this.LADTimer = null;
}	
}
N2PopoverPane.prototype.aCloneList = { oPopover:1, nDefaultWidth:1, nMinWidth:1, nMaxWidth:1, nDefaultHeight:1, nMinHeight:1, nMaxHeight:1, sElementID:1}
N2PopoverPane.prototype.clone = function() {
var pane = new N2PopoverPane();
for (var key in this) {
if (this.aCloneList[key] && key != 'toString') {
pane[key] = this[key];
}
}
return pane;
}
N2PopoverPane.prototype.findPane = function (sPaneID) {
;	
var oPane=null;
var oTmp;
if (sPaneID == this.sID) {
oPane =  this;
} else {
var aSubPanesHash = this.aSubPanesHash;
if(aSubPanesHash) {
oPane = aSubPanesHash[sPaneID];
if (goN2U.isUndefOrNull(oPane)) {
for (var sID in aSubPanesHash) {
if (sID == this.sID) next;
oPane = aSubPanesHash[sID].findPane(sPaneID);
if (!goN2U.isUndefOrNull(oPane)) {
break;
}
}
}
}
}
return oPane;
}
N2PopoverPane.prototype.toString = function () {
var txt= "\nPaneID: " + this.sID +"\n";
txt+= "ElementID: " + this.sElementID + "\n";
txt+= "nDefaultWidth: " + this.nDefaultWidth + "\n";
txt+= "nMinWidth: " + this.nMinWidth + "\n";
txt+= "nMaxWidth: " + this.nMaxWidth + "\n";
txt+= "nDefaultHeight: " + this.nDefaultHeight + "\n";
txt+= "nMinHeight: " + this.nMinHeight + "\n";
txt+= "nMaxHeight: " + this.nMaxHeight + "\n";
txt+= "myStyle: " + this.myStyle + "\n";
return txt;
}
N2PopoverPane.prototype.addSubPane = function(oPane, sID) {
;
;
;
if(!this.aSubPanes) this.aSubPanes = new Array();
if(!this.aSubPanesHash) this.aSubPanesHash = new Object();
this.aSubPanes[this.aSubPanes.length] = oPane;
this.aSubPanesHash[sID] = oPane;
oPane.sID = sID;
oPane.bIsSubPane = true;
oPane.setElementID(sID);
oPane.oPopover = this.oPopover;	// safety(?)
return oPane;
}
N2PopoverPane.prototype.newSubPane = function(sID) {
;
var oPane = new N2PopoverPane(this.oPopover, sID);
this.addSubPane(oPane, sID);
return  oPane;
}
N2PopoverPane.prototype.getSubPane = function (sID) {
;
if(!this.aSubPanesHash) this.aSubPanesHash = new Array();
if (!this.aSubPanesHash[sID]) {
;
this.newSubPane(sID);
}
return this.aSubPanesHash[sID];		
}
N2PopoverPane.prototype.populateSubPanes = function(sAction, sID, sType, sParams, sLinkID, sHref, sLinkText) {
var aSubPanes = this.aSubPanes;
if (aSubPanes != null) {
this.maxSubPaneWidth = 0;
;
var nSubs = aSubPanes.length;
for (var i=0; i<nSubs; i++) {
var oSubPane = aSubPanes[i];
; // + oPane.index.toString() );
if (oSubPane.populate) {
;
;
oSubPane.populate(sAction, sID, sType, sParams, sLinkID, sHref, sLinkText);
this.maxSubPaneWidth = Math.max(this.maxSubPaneWidth, oSubPane.currentWidth);
}
}
if ((this.nDefaultWidth == 'auto') && !this.bIsSubPane && this.maxSubPaneWidth) {
;
goN2U.setWidth(this.oPopover, this.maxSubPaneWidth+6);
}
} else {
;
}
}
N2PopoverPane.prototype.prepareClose = function(bInit) {
var aSubPanes = this.aSubPanes;
;
if (aSubPanes != null) {
var nSubs = aSubPanes.length;
for (var i=0; i<nSubs; i++) {
aSubPanes[i].prepareClose(bInit);
}
} 
this._prepareClose(bInit);
}
N2PopoverPane.prototype._prepareClose = function(bInit) {
if (this.bPersistContent) this.sDefaultContent = this.oPopover.getContent(this);
}
N2PopoverPane.prototype.enableDynamicUpdate = function (bF) { this.bAllowDynamicUpdate = bF;  }
N2PopoverPane.prototype.setDUHandler = function(sH, sM) { 
this.sDUHandlerName = sH; 
this.sRequestMode = sM; 
}
N2PopoverPane.prototype.setDUAction = function(s) { this.bAllowDynamicUpdate = true; this.sDUAction = s; }
N2PopoverPane.prototype.setDUParams = function(s) { this.sDUParams = s; }
N2PopoverPane.prototype.setDUTarget = function(v) { this.sDUTarget = v; }
N2PopoverPane.prototype.getDUHandlerName = function() { return this.sDUHandlerName; }
N2PopoverPane.prototype.getDURequestMode = function() { return this.sRequestMode; }
N2PopoverPane.prototype.getCurrentRequest = function() { return this.sCurrentRequestID; }
N2PopoverPane.prototype.sLoadingMessage = window.gsN2LoadingMessage;
N2PopoverPane.prototype.sTimeoutMessage = window.gsN2TimeoutMessage;
N2PopoverPane.prototype.setLoadingMessage = function (sHtmlFragment) { this.sLoadingMessage = sHtmlFragment; }
N2PopoverPane.prototype.setTimeoutMessage = function (sHtmlFragment) { this.sTimeoutMessage = sHtmlFragment; }
N2PopoverPane.prototype.setDefaultDUContent = function (s) {  this.sTimeoutMessage = s; }
N2PopoverPane.prototype.hookForm = function (sFormName, sAction, sID, sType, params) {
this.sHookFormName = sFormName;
this.sHookAction = sAction;
this.sHookID = sID;
this.sHookType = sType;
this.hookParams = params;
}
N2PopoverPane.prototype.rehookForm = function () {
if (this.sHookFormName) {
n2HookForm (this.sHookFormName, this, this.oPopover.objectName, 
this.sHookAction, this.sHookID, this.sHookType, this.hookParams, this.sID);
} else {
;
}
}
N2PopoverPane.prototype.requestUpdate = function (action, id, type, params,
overrideSuccess, overrideFailure) {
this.sCurrentRequestID = this.oPopover.requestUpdate (this, action, id, type, params,
overrideSuccess, overrideFailure);
}
N2PopoverPane.prototype.submitCallback = function (sAction, sID, sType, sParams, bUseCachedArgs) {
return true;
}
N2PopoverPane.prototype._submitFormUpdate = function (sAction, sID, sType, sParams, bUseCachedArgs) {
; 
if (!this.submitCallback(sAction, sID, sType, sParams, bUseCachedArgs)) {
;
return false;
}
if (bUseCachedArgs) {
sAction = sAction ? sAction : this.sActionC;
sID = sID ? sID : this.sIDC;
sType = sType ? sType : this.sTypeC;
sParams = sParams ? sParams : this.sParamsC;
}
this.sActionC = sAction;
this.sIDC = sID;
this.sTypeC = sType;
this.sParamsC = sParams;
sAction = n2GetFieldValue(this.oForm, sAction, 'action');
sID = n2GetFieldValue(this.oForm, sID, 'id');
sType = n2GetFieldValue(this.oForm, sType, 'type');
sParams = n2GetFieldValue(this.oForm, sParams, 'params');
this.sCurrentRequestID = this.oPopover.requestUpdate (this, sAction, sID, sType, sParams);
return false;	
}
N2PopoverPane.prototype.onRequestSuccess = function (dataArray, fnArray, nStatus, sRequestID) {
;
;
if (dataArray && dataArray.length) {
this.setContent(dataArray[0]);
} 
if (fnArray && fnArray.length) {
var fn = fnArray[0];
if (fn.length) {
fn = this.replacePlaceholders(fn);
fn = this.oPopover.replacePlaceholders(fn);
try { eval (fn); }
catch (e) { ; }
}
}
}
N2PopoverPane.prototype.onRequestFailure = function (sMessage, nStatus) {
this.setContent(this.sTimeoutMessage);
}
N2PopoverPane.prototype.requestComplete = function () {
this.sCurrentRequestID = null;
}
N2PopoverPane.prototype.cancelAllRequests = function (bAbortRequestInProcess) {
;
if (this.sCurrentRequestID) {
this.oPopover.oUpdateManager.cancelRequest(this.sCurrentRequestID, bAbortRequestInProcess)
this.sCurrentRequestID = null;
}
var aSubPanes = this.aSubPanes;
if(aSubPanes) {
for (var sID in aSubPanes) {
aSubPanes[sID].cancelAllRequests (bAbortRequestInProcess);
}
}
if (this.LADTimer) {
;
clearTimeout(this.LADTimer);
}
}
N2PopoverPane.prototype.setContent = function (sHtml, bDisableScrollbars, bDisableResizing) {
var bDisableScrollbars = this.bDisableScrollbars | bDisableScrollbars;
var bDisableResizing = this.bDisableResizing | bDisableResizing;
sHtml = this.replacePlaceholders(sHtml);
this.oPopover.setContent(sHtml, this, bDisableScrollbars, bDisableResizing);
}
N2PopoverPane.prototype.replacePlaceholders = function (sHtml, sAction, sID, sType, sParams, sLinkID, sHref, sLinkText) {
;
;
;
if ( sHtml.indexOf('{') == -1 ) return sHtml;
var oPopover = this.oPopover;
;
sAction = sAction ? sAction : oPopover.action ? oPopover.action :'summary'; 
sID = sID ? sID : oPopover.thingID;
sType = sType ? sType : oPopover.thingType;
var aData = oPopover.getDataArray();
var sCategory='';
var sKey;
if (sType == 'ak')
sKey = sID;
else if (aData) {
sKey = sType+sID;
if (goN2U.isDefined(aData[sKey]) && aData[sKey].cat != null) 
sCategory=aData[sKey].cat
}
if (!goN2U.isString(sHtml)) sHtml = sHtml.toString();
if (!sHtml ) return '';	
if ( sHtml.indexOf('{') == -1) return sHtml;
if ( this.bReplaceTemplateTDFieldPlaceholders ) 
sHtml = sHtml.replace(/{DUMP_ARRAY}/g, this._dumpArrayKeyValues(sKey));
sHtml = sHtml.replace(/{THING_ID}/g, sID);
sHtml = sHtml.replace(/{THING_TYPE}/g, sType);
sHtml = sHtml.replace(/{ACTION}/g, sAction);
sHtml = sHtml.replace(/{CATEGORY}/g, sCategory);
return  sHtml.replace(/{PANE_ID}/g, this.sID);
}
N2PopoverPane.prototype._replaceTemplateTDFieldPlaceholders = function (sTemplate, aArray) {
;
if (!this.bReplaceTemplateTDFieldPlaceholders) return sTemplate;
;
var sHtml = sTemplate;
for (var sKey in aArray) {
var sVal = aArray[sKey];
var sPh = '{' + sKey + '}';
var re = new RegExp(sPh, 'g');
;
sHtml = sHtml.replace(re, sVal);
}
return sHtml;
}
N2PopoverPane.prototype._replaceTemplateElementPlaceholder = function (sTemplate, sText) {
;
var sHtml = sTemplate;
if (sText)
sHtml = sHtml.replace(/{PLACEHOLDER}/, sText);
return sHtml;
}
N2PopoverPane.prototype._replaceTemplateTDFieldPlaceholdersWithArrayEntryContents = function (sTemplate, sKey) {
var aArray = this._getArrayEntryContents(sKey);
var sHtml;
if (goN2U.isObject(aArray)) {
if(sTemplate) {
sHtml = this._replaceTemplateTDFieldPlaceholders(sTemplate, aArray);
} else {
sHtml = this._dumpArrayKeyValues(sKey);
}
} else {
;			
sHtml = sTemplate;
}
return sHtml;
}
N2PopoverPane.prototype._dumpArrayKeyValues =  function (sID) {
;
var xEntry = this._getArrayEntryContents(sID);
var sHtml;
if (goN2U.isObject(xEntry)) {
var sHtml = 'Nav2 Framework Default Array Content Display. <br/>';
for (var sKey in xEntry) {
var sVal = xEntry[sKey];
sHtml += sKey+": "+sVal+"<br/>";
}
} else {
sHtml = xEntry
}
sHtml += '<br/>Use setLayout(...) to modify what/how entries are displayed.';
return sHtml;
}
N2PopoverPane.prototype.preparePopulateSubpanes = function(oHotspot) {
var aSubPanes = this.aSubPanes;
if (aSubPanes != null) {
;
var nSubs = aSubPanes.length;
for (var i=0; i<nSubs; i++) {
var oSubPane = aSubPanes[i];
if (oSubPane.preparePopulate) {
;
oSubPane.preparePopulate(oHotspot);
}
}
}
}
N2PopoverPane.prototype._defaultPopulate = function(sAction, sID, sType, sParams, sLinkID, sHref, sLinkText, fLADMethod) {
;
var bAllowDefault = true;
var sNewContent;
if (this.bLADSupported) {
if (!this.isDataAvailable(sAction, sID, sType, sParams, sLinkID, sHref, sLinkText, fLADMethod)) {
return false;
}
}
switch (sType) {
case 'he': // id of an HTML element
if (this.sTemplate && this.bTemplateHasPlaceholders)
sNewContent = this._replaceTemplateElementPlaceholder(this.sTemplate, this._getElementContents(sID));
else
sNewContent = this._getElementContents(sID);
bAllowDefault = (sNewContent && sNewContent.length) ? false : true;
break;
case 'ak': // array key
if (this.sTemplate && this.bTemplateHasPlaceholders && this.oPopover.aDataArray)
sNewContent = this._replaceTemplateTDFieldPlaceholdersWithArrayEntryContents(this.sTemplate, sID)
else
sNewContent = this._getArrayEntryContents(sID);
bAllowDefault = sNewContent.length ? false : true;
break;
case 'a':	// ASIN
case 'as':	// ASIN
case 'am':	// ASIN + merchantID (in optional field)
if (this.sTemplate  && this.bTemplateHasPlaceholders && this.oPopover.aDataArray) {
sNewContent = this._replaceTemplateTDFieldPlaceholdersWithArrayEntryContents(this.sTemplate, sType+sID)
bAllowDefault = sNewContent.length ? false : true;
}
break;
case 'n':	// node
case 's':	// search
case 'l':	// listmania
case '-':	// none
break;
default:
;		
}
if (bAllowDefault && this.sDefaultContent) sNewContent = this.sDefaultContent;
if (sNewContent && sNewContent.indexOf('{') >=0) {
sNewContent = this.replacePlaceholders (sNewContent, sAction, sID, sType, sParams, sLinkID, sHref, sLinkText);
}
if (sNewContent) {
this.setContent(sNewContent, null, null, false);
}
if (this.bAllowDynamicUpdate) this.populateUsingDynamicUpdate(sAction, sID, sType, sParams);
this.populateSubPanes(sAction, sID, sType, sParams, sLinkID, sHref, sLinkText);
;
if (this.postPopulate) this.postPopulate (sAction, sID, sType, sParams, sLinkID, sHref, sLinkText);
if (this.bLADLoading) this.oPopover.sizeOrPositionChanged();
if (this.sHookFormName) {
n2HookForm (this.sHookFormName, this, this.oPopover.objectName, 
this.sHookAction, this.sHookID, this.sHookType, this.hookParams, this.sID);
}	
return true;
}
N2PopoverPane.prototype.populate = N2PopoverPane.prototype._defaultPopulate;
N2PopoverPane.prototype._getElementContents = function(sID) {
;
;
var eElem = goN2U.getRawObject(sID);
if (eElem) return eElem.innerHTML;
else {
;
return null;
}
}
N2PopoverPane.prototype._getArrayEntryContents = function(sKey) {
;
;
var retval = null
if (goN2U.isUndefOrNull(this.oPopover.aDataArray)) {
;
} else if (goN2U.isNull(this.oPopover.aDataArray[sKey])) {
;
} else {
retval = this.oPopover.aDataArray[sKey];
}
;//goN2Debug.debug("N2PopoverPane._getArrayEntryContents ["+sKey+"]+ returned: "+ (retval ? retval : 'null'));
return retval;
}
N2PopoverPane.prototype.populateUsingDynamicUpdate = function(sAction, sID, sType, sParams) {
;
sAction = this.sDUAction ? this.sDUAction : sAction;
if (!sAction) {
;
return;		
}
sParams = sParams ? sParams : this.sDUParams;
;
this.requestUpdate(sAction, sID, sType, sParams);
}
N2PopoverPane.prototype.isDataAvailable = function(sAction, sID, sType, sParams, sLinkID, sHref, sLinkText, fLADMethod) {
;
;
if (this.oPopover._isDataAvailable (sAction, sID, sType, sParams, sLinkID,
this.sLADKey, this.sLADField)) {
this.LADTimer = null;
return true;
} else {
if (--this.nLADRetries  && this.oPopover.isVisible()) {
if (!this.bLADLoading) {
this.setContent(this.sLADLoadingMessage);
this.bLADLoading = true;
if (this.sLADDUAction) {
;
this.sCurrentRequestID = this.oPopover.requestAnonomousUpdate(this.sRequestMode,
this.sDUHandlerName, 
this.sLADDUAction, 
sID, sType, 
this.sDUParams);
}
}
var sObjectMethod = this.oPopover.getObjectName() + ".findPane('" + this.sID +"').populate";
if (sLinkText) {
var re = /([^\\])'/gi;
sLinkText=sLinkText.replace(re, "$1\\'") ;
}
if (fLADMethod) {
this.LADTimer = setTimeout (fLADMethod, this.oPopover.nLADRetryMs);
} else {
this.LADTimer = setTimeout (new Function("", 
sObjectMethod + "(" + 
(sAction ? "'" + sAction + "'" : null) + "," +
(sID ? "'" + sID + "'" : null) + "," +
(sType ? "'" + sType + "'" : null) + "," +
(sParams ? "'" + sParams + "'" : null) + "," +
(sLinkID ? "'" + sLinkID + "'" : null) + "," +
(sHref ? "'" + sHref + "'" : null) + "," +
(sLinkText ? "'" + sLinkText + "'" : null) +
");"),
this.oPopover.nLADRetryMs);
}
;//goN2Debug.info ("LAD Pane ("+this.sID+") retry ("+this.nLADRetries+")");
} else {
this.LADTimer = null;
;
this.setContent(this.sLADTimeoutMessage);
this.resetLAD();
}
return false;
}
}
N2PopoverPane.prototype.setOwner = function(oO) { this.oOwner = oO; }
if (window.goN2LibMon) goN2LibMon.endLoad('popoverPane');
} // END library code wrapper
function n2PopoverPaneHasStaticPopover()
{
n2RunIfLoaded("dynUpdate", n2PopoverPaneInitLibrary, "popoverpaneLoad");
}
n2RunIfLoaded("staticpopover", n2PopoverPaneHasStaticPopover, "popoverpaneHasStatic");