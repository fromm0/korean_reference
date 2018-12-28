//! ################################################################
//! Copyright (c) 2004 Amazon.com, Inc., and its Affiliates.
//! All rights reserved.
//! Not to be reused without permission
//! $Change: 1312631 $
//! $Revision: 1.1 $
//! $DateTime: 2007/03/02 09:47:36 $
//! ################################################################
function n2PanesInitLibrary() {	// Begin library code wrapper. Goes all the way to the bottom of the file
if (window.goN2LibMon) goN2LibMon.beginLoad('panes', 'n2CoreLibs');
window.N2MenuPane=function() {
N2PopoverPane.call ( this );
this.sCurrentHighlight=null;
this.sCurrentHighlightAction=null;
this.sSelectedClass = "expMenuSelected";
this.sUnselectedClass = null;
this.highlight = function (sDivID) {
if (this.sCurrentHighlight) 
goN2U.setClass(this.sCurrentHighlight, this.sUnselectedClass);
this.sCurrentHighlight = this.oPopover.getID()+ this.sID + sDivID;
;
var oDiv;
if (oDiv = goN2U.getRawObject(this.sCurrentHighlight))
goN2U.setClass(oDiv, this.sSelectedClass);
else 
;
}
}
N2MenuPane.prototype = new N2PopoverPane();
window.N2DynamicMenuPane=function() {
N2MenuPane.call ( this );
this.aEntries = new Array();
this.aActionIndex = new Array();
this.sSelectedClass = "microSelected";
this.sUnselectedClass = "micro";
this.sDisabledClass = "microDisabled";
this.addEntry = function (sAction, sHref, sText, bDisable) {
this.aActionIndex[sAction] = this.aEntries.length;
var aTmp = this.aEntries[this.aEntries.length] = {};
aTmp.sText = sText;
aTmp.sAction = sAction;
aTmp.sHref = sHref;
aTmp.bDisable = bDisable;
}
this.highlight = function (sAction) {
if (this.sCurrentHighlightAction) {
this.enableEntry(this.sCurrentHighlightAction);
}
var sDivID = this.sCurrentHighlight = this.oPopover.getID()+ this.sID + sAction;
;
var nIndex = this.aActionIndex[sAction];
var oDiv;
if (oDiv = goN2U.getRawObject(sDivID)) {
goN2U.setClass(oDiv, this.sSelectedClass);
this.aEntries[nIndex].sSaved = oDiv.innerHTML;
oDiv.innerHTML = this.aEntries[nIndex].sText;
this.sCurrentHighlightAction = sAction;
} else 
;
}
this.enableEntry = function (sAction) {
var nIndex = this.aActionIndex[sAction];
var sDivID = this.oPopover.getID()+ this.sID + sAction;
var oDiv;
if (oDiv = goN2U.getRawObject(sDivID)) {
goN2U.setClass(oDiv, this.sUnselectedClass);
oDiv.innerHTML = this.aEntries[nIndex].sSaved;
} else {
;
}
}
this.disableEntry = function (sAction) {
var nIndex = this.aActionIndex[sAction];
var sDivID = this.oPopover.getID()+ this.sID + sAction;
var oDiv;
if (oDiv = goN2U.getRawObject(sDivID)) {
goN2U.setClass(oDiv, this.sDisabledClass);
oDiv.innerHTML = this.aEntries[nIndex].sText;
} else {
;
}
}
}
N2DynamicMenuPane.prototype = new N2MenuPane();
window.N2UpdatePane=function() {
N2PopoverPane.call ( this );
var oCfg = goN2U.getConfigurationObject('N2UpdatePane');
var nNoImageAvailabeCheckTimerMs = oCfg.getValue('noImageAvailableCheckDelay', '2000');
this.setDUAction('summary');		// set an action;
this.chainOnSuccess = this.onRequestSuccess;	// save current to chain
this.onRequestSuccess = function (dataArray, fnArray, nStatus, sRequestID) {
;
var aParts = sRequestID.split('^');
this.oPopover.setLatestAction(aParts[1]);
if ((dataArray == null) && nStatus) {
dataArray= new Array();
dataArray[0] = this.defaultContent;
}
this.chainOnSuccess(dataArray, fnArray, nStatus, sRequestID);
var tmpFn = function () { 
var i=1;
var oActive = goN2Events.getActivePopover();
var popID = oActive ? oActive.getID() : '';
var img = popID + '_PLI_' + i;
var elem, w;
while (elem = goN2U.getRawObject(img)) {
w = goN2U.getObjectWidth(elem);
if (w <2) {
elem.src = goN2Locale.getImageURL('JSF-thumb-no-image', 'x-locale/detail/thumb-no-image.gif');
}
i++;
img = popID + '_PLI_' + i;
}
}
try {
setTimeout(tmpFn, nNoImageAvailabeCheckTimerMs);
} catch  (e) { }
}
}
N2UpdatePane.prototype = new N2PopoverPane()
window.N2ExpandoPane=function() {
N2PopoverPane.call ( this );
this.bDisableResizing = true;  
this.deferredPopulate = this.populate;
this.initialize = function() {
;
this.bPopulated = false;
this.bExpanded = false;
this.aSP=null;
}
this.initialize();
this.populate = function (id, objectName, dataArrayName, populateMethod, locateMethod) {
this.aSP = [id, objectName, dataArrayName, populateMethod, locateMethod];
if (!this.bExpanded) {
this.setContent(''); 
this.bPopulated = false;
return;
} else {
var a = this.aSP;
this._defaultPopulate (a[0], a[1], a[2], a[3], a[4]);
this.bPopulated = true;
}
}
}
N2ExpandoPane.prototype = new N2PopoverPane();
N2ExpandoPane.prototype.oCfg = goN2U.getConfigurationObject('N2ExpandoPane');
N2ExpandoPane.prototype.deferredRePopulate = function (delay) {
var sElemID = this.oPopover.getID() + this.sID;
setTimeout("var e; if ( e = goN2U.getRawObject('" + sElemID +"') ) e.innerHTML=e.innerHTML;", delay);
}
N2ExpandoPane.prototype.oCfg = goN2U.getConfigurationObject('N2ExpandoPane');
N2ExpandoPane.prototype.toggle = function (id) {
if (this.bExpanded) this.contract(id)
else this.expand(id);
}
N2ExpandoPane.prototype.expand = function (id) {
var sIDM = this.oPopover.getID() + this.sID;
var contentDivID = sIDM + '_XI';
var contractorDivID = sIDM + '_C';
var expanderDivID = sIDM + '_X';
var delayMS = this.oCfg.getValue('expandContractDelay', '20');
;
var a = this.aSP;
if (!this.bPopulated)	{ 
this.deferredPopulate (a[0], a[1], a[2], a[3], a[4]);
}
goN2U.expandDivHeight(contentDivID, expanderDivID, delayMS, null, contractorDivID);
if (!this.bPopulated)  { 
this.deferredRePopulate(2000);
} else {
this.deferredRePopulate(500);
}
this.oPopover.setLatestAction(this.sID);
this.bPopulated = true;
this.bExpanded = true;
}
N2ExpandoPane.prototype.contract = function (id) {
var sIDM = this.oPopover.getID() + this.sID;
var contentDivID = sIDM + '_XI';
var contractorDivID = sIDM + '_C';
var expanderDivID = sIDM + '_X';
var delayMS = this.oCfg.getValue('expandContractDelay', '20');
goN2U.collapseDivHeight(contentDivID, contractorDivID, delayMS, null, expanderDivID);
this.oPopover.setLatestAction('');
this.bExpanded = false;
}
window.N2SectionPane=function() {
N2PopoverPane.call ( this );
var aSections = new Array();
var aDefaultOrder = new Array();
var aCurrentOrder = new Array();
this.addSection = function (sID, sTitle, sContent, bExpanded) {
;
var tmp = new Object();
tmp.sID = sID;
tmp.sTitle = sTitle;
tmp.sContent = sContent;
tmp.bExpanded = bExpanded;
aSections[sID] = tmp;
var i = aDefaultOrder.length;
aCurrentOrder[i] = aDefaultOrder[i] = sID;
}
this.genSectionHTML = function (id) {
var sPID = this.oPopover.getID();
var tmp = aSections[id];
var sID = tmp.sID;
var sTitle = tmp.sTitle;
var sContent = tmp.sContent;
var bExpanded = tmp.bExpanded;
var sPopoverName = this.oPopover.getObjectName()
var sh="";
var rOrangeArrowImagePath = goN2Locale.getImageURL('JSF-r-orange-arrow', 'nav2/images/arrow-r-orange-11x10.gif');
var dOrangeArrowImagePath = goN2Locale.getImageURL('JSF-d-orange-arrow', 'nav2/images/arrow-d-orange-11x10.gif');
sh += '<table border="0"><tr><td width="12" valign="top">\n' +
'<span id="'+sPID+sID+'_X" ' +
(bExpanded ? 'style="display:none"' : '') +
'>\n' +
'<a href="javascript:' + sPopoverName + '.findPane(\''+sID+'\').expand(\''+sID+'\')">\n' +
'<img src="' + rOrangeArrowImagePath + '" width="11" height="10"  border="0" alt="' +
goN2Locale.getString('alt_text_click_to_expand_36018', 'click to expand this section and see more') + '"></a>\n' +
'</span>\n' +
'<span id="'+sPID+sID+'_C" ' +
(!bExpanded ? 'style="display:none"' : '') +
'>\n' +
'<a href="javascript:' + sPopoverName + '.findPane(\''+sID+'\').contract(\''+sID+'\')">\n' +
'<img src="' + dOrangeArrowImagePath + '" width="11" height="10" border="0" alt="' +
goN2Locale.getString('alt_text_click_to_collapse_36019', 'click to collapse this section and see less') + '"></a>\n' +
'</span>\n' +
'</td><td class="internalLink"><a href="javascript:' + sPopoverName + '.findPane(\''+sID+'\').toggle(\''+sID+'\')">' + sTitle + '</a></td></tr></table>\n';
sh += '<div class="expandableVOuterVisible" ' +
(bExpanded ? '' : 'style="height:1"' )+
'>\n' +
'<div id="'+sPID+sID+'_XI" class="expandableInner" >\n' +
'<div id="'+sPID+sID+'" style="padding: 0 0 0 20px">'+sContent+'</div>' +
'\n</div></div>\n';
return sh;
}
this._determineOrder = function (sID, sType) {
var sExPaneID;
var sKey = sType+sID;
var aData = this.oPopover.getDataArray();
;
;
var tmp = this.oPopover.stack.current();
if (tmp && tmp.action && tmp.action != 'summary') {
sExPaneID = tmp.action;
} else if (aData[sKey].wl || aData[sKey].crt) {
sExPaneID = 'tiay';
} else if ( aData[sKey].nsims ) {
sExPaneID = 'sims';
} else {
sExPaneID = 'summary';
}
aCurrentOrder[1] = sExPaneID;
var len = aCurrentOrder.length;
for (var c=0, d=0;c<len;c++) {
if (c==1) c++;
if (aDefaultOrder[d] == sExPaneID) d++;
aCurrentOrder[c] = aDefaultOrder[d++];
}
return sExPaneID;
}
this.determineOrder = 	this._determineOrder;
this.populate = function(sAction, sID, sType, sParams, sLinkID, sHref, sLinkText){ 
;
var sExPaneID = this.determineOrder(sID, sType);
var sHtml = "";
var len = aCurrentOrder.length;
for (var i=0;i<len;i++) {
sHtml += this.genSectionHTML(aCurrentOrder[i]);
}
this.setContent(sHtml, false, true);
this.populateSubPanes(sAction, sID, sType, sParams, sLinkID, sHref, sLinkText);
this.oPopover.expandPane(sExPaneID);
;
};
}
N2SectionPane.prototype = new N2PopoverPane();
window.N2ExternalLink=function(sID, sHref, sText, sTip, 
sDisField, sDisText,
nDisplayFlags) {
this.sID = sID;
this.sHref = sHref;
this.sText = sText;
this.sTip = sTip;
this.sDisField = sDisField;
this.sDisText = sDisText;
this.nFlags = nDisplayFlags;
this.getDisplayFlags = function() { return this.nFlags; }
this.getID = function() { return this.sID; }
this.setParent = function(oP) { this.oParent = oP; }	
this.setPopover = function(oPop) { this.oPopover = oPop; }
this.genHTML = function (sTID, sTType) {
var sTxt;
var showDis = false;
if (this.oPopover && this.sDisField) {
var aTD = this.oPopover.getDataArray();
showDis =  (sTType && sTID && (aTD[sTType + sTID][this.sDisField] >0)) ? true : false;
}
if (showDis) {
sTxt = '<div class="disabled">' + this.sDisText + '</div>';
} else {
sTxt = '<a href="' + this.sHref + '" onClick="n2HotspotDisableFeature()" '
+ 'name="disald" '
+ 'title="'+ this.sTip + '\n' +
goN2Locale.getString('you_will_go_to_new_page_36022', '(You will go to a new page)') + '">' +
this.sText + '</a>';
}
return sTxt;
}
}
window.N2InternalLink=function(sID, sField,
sTText, sTFunction, sTTip,
sFText, sFFunction, sFTip,
sDisField, sDisText,
nDisplayFlags) {
this.sID = sID;
this.sField = sField;
this.sTText = sTText;
this.sTFunction = sTFunction;
this.sFText = sFText;
this.sFTip = sFTip;
this.sTTip = sTTip;
this.sFFunction = sFFunction;
this.sDisField = sDisField;
this.sDisText = sDisText;
this.nFlags = nDisplayFlags;
this.getDisplayFlags = function() { return this.nFlags; }
this.getID = function() { return this.sID; }
this.setParent = function(oP) { this.oParent = oP; }
this.setPopover = function(oPop) { this.oPopover = oPop; }
this.genHTML = function (sTID, sTType) {
var sTxt;
var aTD = this.oPopover.getDataArray();
var valid = sTType && sTID;
if (valid && (aTD[sTType + sTID][this.sDisField] >0)) {
sTxt = '<div class="disabled">' + this.sDisText + '</div>';
} else if (valid && (aTD[sTType + sTID][this.sField] >0)) {
if (this.sTFunction != null) {
sTxt = '<div class="internalLink"><a href="javascript:' + this.sTFunction + '(\'' + sTID + '\',\'' + this.sID + '\')" ' +
'title="' + this.sTTip + '\n' +
goN2Locale.getString('you_will_stay_here_36023', '(You will stay right here)') + '">' +
this.sTText + '</a></div>';
} else {
sTxt = '<div class="disabled">' + this.sTText + '</div>';
}
} else {
if (this.sFFunction != null) {
sTxt = '<div class="internalLink"><a href="javascript:' + this.sFFunction + '(\'' + sTID +  '\',\'' + this.sID + '\')" ' +
'title="' + this.sFTip + '\n' +
goN2Locale.getString('you_will_stay_here_36023', '(You will stay right here)') + '">' +
this.sFText + '</a></div>';
} else {
sTxt = '<div class="disabled">' + this.sFText + '</div>';
}
}
return sTxt;
}
}
window.N2LinksPane=function(oPopover, sID) {
N2PopoverPane.call ( this, oPopover, sID );
this.oPopover = oPopover;
this.sID = sID;
this.aEntries = new Array();
this.addEntry = function (oLink) {
this.aEntries[this.aEntries.length] = oLink;
oLink.setParent(this);
oLink.setPopover(this.oPopover);
}
this.setEntryStyle = function(s) { this.sEntryStyle = s; }
this.display = function (sEntryID) { 
var sID = this.oPopover.getID() + this.getID() + sEntryID;
goN2U.display(sID);
}
this.undisplay = function (sEntryID) { 
var sID = this.oPopover.getID() + this.getID() + sEntryID;
goN2U.undisplay(sID);
}
this.populate = function (action, id, type, sParams, sLinkID, sHref, sLinkText) {
var nLinks = this.aEntries.length;
var nDispFlag = goCust.isLoggedIn() ? 1 : 2;	// yes: no
;
var sHtml = "";
for (var i=0; i<nLinks; i++) {
var oLink = this.aEntries[i];
if (oLink.getDisplayFlags() & nDispFlag) {
var sH = oLink.genHTML(id,type);
var sS = this.sEntryStyle ?  'style="' + this.sEntryStyle + '" ' : '';
if (sH && sH.length) {
sHtml += '<div id="' + this.oPopover.getID() + this.getID() + oLink.getID() + '" ' + sS + '>' + sH + '</div>\n';
}
}
}
this.setContent(sHtml);
}
this.overrideLink = function (n, s) {
var oLink = this.aEntries[n];
if (oLink) {
var eElem = goN2U.getRawObject(this.oPopover.getID() + this.getID() + oLink.getID());
if (eElem) eElem.innerHTML = s;
}
}
}
N2LinksPane.prototype = new N2PopoverPane();
if (window.goN2LibMon) goN2LibMon.endLoad('panes');
} // END library code wrapper
n2RunIfLoaded("popoverpane", n2PanesInitLibrary, "panes");