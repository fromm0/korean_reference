//! ################################################################
//! Copyright (c) 2004-2007 Amazon.com, Inc., and its Affiliates.
//! All rights reserved.
//! Not to be reused without permission
//! $DateTime: 2007/05/25 15:06:55 $
//! ################################################################
function n2DynUpdateInitLibrary() { // Begin library code wrapper. Goes all the way to the bottom of the file
if (window.goN2LibMon) { goN2LibMon.beginLoad('dynUpdate', 'n2CoreLibs'); }
var nRequestSequenceNumber = 0;
var imagePath = goN2Locale.getImageURL('JSF-loading-bar', 'nav2/images/loading-bar.gif');
window.gsN2LoadingMessage = '<div>' + goN2Locale.getString('loading_13548', 'Loading...') + '<im'+'g s'+'rc="' + imagePath + '" height="9" align="absmiddle"></div>';
window.gsN2TimeoutMessage = goN2Locale.getString('no_addl_info_36017', 'No additional information is available at this time');
window.n2DUExpandParameter=function(p, bEscape) {
var sT='';
if (goN2U.isString(p)) {
sT = p;
} else if (goN2U.isNumber(p)) {
sT = p.toString();
} else if (goN2U.isArray(p)) {
for (var i=0; i<p.length;i++) {
if (sT.length >0) sT +=';';
sT += p[i];
}
} else if (goN2U.isObject(p) ) {
for (var k in p) {
if (sT.length >0) sT +=';';
sT += k+':'+p[k];
}
} else if (!goN2U.isUndefOrNull(p)) {
;
}
if (bEscape) {
var sE = sT.replace(/\</g, '&#60;');
sE = sE.replace(/\>/g, '&#62;');
sE = encodeURIComponent(sE);
sE = sE.replace(/\|/g, '%7C');
sE = sE.replace(/\~/g, '%7E');
sE = sE.replace(/\*/g, '%2A');
sE = sE.replace(/\'/g, '%27');
sE = sE.replace(/\(/g, '%28');
sE = sE.replace(/\)/g, '%29');
sE = sE.replace(/\!/g, '%21');
sE = sE.replace(/\_/g, '%5F');
return sE;
}
return sT;
}
window.n2HookForm=function(sFormName, oObj, sExecObjectName, sAction, sID, sType, params, sPaneID, sReftag) {
sExecObjectName = sExecObjectName ? sExecObjectName : oObj.objectName;
if (goN2U.isUndefOrNull(sExecObjectName)) {
;
return;
}
;
oObj.sFormName = sFormName;
var eF = document.forms[sFormName];
if (eF) {
oObj.oForm = eF;
;
var sParams = n2DUExpandParameter(params, false);
if (goN2U.bIsSafari) {
eF._sDUObjectName = sExecObjectName;
eF['onsubmit'] = _n2SafariGenerateSubmit(sAction, sID, sType, sParams, sPaneID);
} else {
eF['onsubmit'] = new Function (sExecObjectName
+ "._submitFormUpdate("
+ (sAction ? "'"+ sAction+"'," : "null,")
+ (sID ? "'"+ sID+"'," : "null,")
+ (sType ? "'"+ sType+"'," : "null,")
+ (sParams ? "'"+ sParams+"'," : "null,")
+ (sPaneID ? "'"+ sPaneID+"'," : "null,")
+ (sReftag ? "'"+ sReftag+"'" : "null")
+ "); return false;" );
}
var method = eF.method;
if (method && (method.toLowerCase() == 'post')) {
oObj.sRequestMode = 'sdfs';
} else {
oObj.sRequestMode = 'xdfs';
}
;
} else {
;
}
}
function _n2SafariGenerateSubmit(sAction, sID, sType, sParams, sPaneID, sRefTag) {
var fnF =  function () {
var oDU = eval(this._sDUObjectName);
if (oDU) {
oDU._submitFormUpdate(sAction, sID, sType, sParams, sPaneID, sRefTag);
}
return false;
}
return fnF;
}
window.n2GetFieldValue=function(eForm, sValue, sComment) {
var sVal;
if (goN2U.isUndefOrNull(sValue)) return null;
if (sValue.indexOf('MAP:')==0) {
var sF = sValue.substring(4);
var aF = sF.split(',');
sVal = '';
for (var i=0; i<aF.length; i++){
if (i>0) sVal += ';';
var aMap = aF[i].split('=');
var re = / /g;
aMap[0] = aMap[0].replace(re,'');
var eF = eForm[aMap[0]];
if (eF) {
if (aMap.length >1) {
eF.value = aMap[1];
;
}
if (eF.type == "checkbox") {
if (eF.checked) {
sVal += eF.value;
;
} else {
;
}
} else if (goN2U.isArray(eF) && goN2U.isDefined(eF.length)) {
for (var j=0; j<eF.length; ++j) {
var cbF = eF[j];
if (cbF.checked) {
sVal += cbF.value;
;
} else {
;
}
}
} else {
sVal += eF.value;
;
}
} else {
;
}
}
} else if (sValue.indexOf('SEQ:')==0) {
nRequestSequenceNumber++;
return 'SEQ'+nRequestSequenceNumber.toString();
} else {
sVal = sValue;
}
return sVal;
}
window.n2XHRFactory = function() {
var oXHR=false;
if (!oXHR && typeof XMLHttpRequest!='undefined') {
try {
oXHR = new XMLHttpRequest();
} catch (e) {
;
}
} else if(window.ActiveXObject) {
try {
oXHR = new ActiveXObject("Msxml2.XMLHTTP");
} catch(e) {
try {
oXHR = new ActiveXObject("Microsoft.XMLHTTP");
} catch(e) {
;
oXHR = false;
}
}
}
if(oXHR) {
;
} else {
;
}
return oXHR
}
window.N2DynUpObject=function(sObjName) {
this.sObjectName = sObjName;
}
new N2DynUpObject();
N2DynUpObject.prototype.sRequestMode = 'xd';        // xdomain
N2DynUpObject.prototype.sHandler = 'test/testx';    // test xdomain handler
N2DynUpObject.prototype.className = 'N2DynUpObject';
N2DynUpObject.prototype.version = '1.1.0';
N2DynUpObject.prototype.nTimeoutMS = 10000;
N2DynUpObject.prototype.bImmediate = false;
N2DynUpObject.prototype.bCachable = true;
N2DynUpObject.prototype.sPersistContentForm = null;
N2DynUpObject.prototype.sPersistFunctionsForm = null;
N2DynUpObject.prototype.sPersistValuesForm = null;
N2DynUpObject.prototype.sLoadingMessage = gsN2LoadingMessage;
N2DynUpObject.prototype.sTimeoutMessage = gsN2TimeoutMessage;
N2DynUpObject.prototype.currentRequest = null;
N2DynUpObject.prototype.sTargetID = null;
N2DynUpObject.prototype.sURLExtension = '.html';
N2DynUpObject.prototype.setDefaultTimeout = function (nMS) { this.nTimeoutMS = nMS; }
N2DynUpObject.prototype.setReftag = function (sReftag) { this.sReftag = sReftag; };
N2DynUpObject.prototype.setHandler = function(s, m) {
;
this.sHandler = s;
this.sRequestMode = m;
}
N2DynUpObject.prototype.setTargetElementID = function (sID) { this.sTargetID = sID; }
N2DynUpObject.prototype.setLoadingMessage = function (sHtmlFragment) { this.sLoadingMessage = sHtmlFragment; }
N2DynUpObject.prototype.setTimeoutMessage = function (sHtmlFragment) { this.sTimeoutMessage = sHtmlFragment; }
N2DynUpObject.prototype.setURLExtension = function (sExt) { this.sURLExtension = sExt; }
N2DynUpObject.prototype.cacheResponses = function (b) { this.bCachable = b; };
N2DynUpObject.prototype.newRequestsCancelExisting = function (b) { this.bImmediate = b; };
N2DynUpObject.prototype.setPersistForms = function (sContentForm, sFunctionsForm, sValuesForm) {
this.sPersistContentForm = sContentForm;
this.sPersistFunctionsForm = sFunctionsForm;
this.sPersistValuesForm = sValuesForm;
};
N2DynUpObject.prototype.requestUpdate = function (sAction, sID, sType, sParams, nTimeoutMS, bImmediate, bCachable, sReftag) {
;
nTimeoutMS = nTimeoutMS ? nTimeoutMS : this.nTimeoutMS;
bImmediate = (bImmediate ? bImmediate : this.bImmediate);
bCachable = (bCachable ? bCachable : this.bCachable);
sReftag = (sReftag ? sReftag : this.sReftag);
if (this.oUpdateManager) {
this.setLoading();
this.currentRequest = this.oUpdateManager.requestUpdate(this,
this.sRequestMode, this.sHandler,
sAction, sID, sType, sParams,
nTimeoutMS, bImmediate, bCachable,
null, null, null, this.sURLExtension,
sReftag);
} else {
;
}
}
N2DynUpObject.prototype.resubmitFormUpdate = function (sAction, sID, sType, params, sReftag) {
sAction = sAction ? sAction  : this.sAction;
sID = sID ? sID : this.sID;
sType = sType ? sType : this.sType;
var sParams = n2DUExpandParameter((params ? params : this.params), false);
sReftag = sReftag ? sReftag : this.sReftag;
this._submitFormUpdate(sAction, sID, sType, sParams, sReftag);
}
N2DynUpObject.prototype.submitForm = N2DynUpObject.prototype.resubmitFormUpdate;
N2DynUpObject.prototype.cancelRequest = function (bAbortRequestInProcess) {
if (this.oUpdateManager) {
if (this.currentRequest) {
this.oUpdateManager.cancelRequest(this.currentRequest, bAbortRequestInProcess);
} else {
;
}
} else {
;
}
}
N2DynUpObject.prototype._submitFormUpdate = function (sAction, sID, sType, sParams, sReftag) {
;
if (this.oUpdateManager) {
this.setLoading();
sAction = n2GetFieldValue(this.oForm, sAction, 'action');
sID = n2GetFieldValue(this.oForm, sID, 'id');
sType = n2GetFieldValue(this.oForm, sType, 'type');
sParams = n2GetFieldValue(this.oForm, sParams, 'params');
sReftag = sReftag ? sReftag : this.sReftag;
this.currentRequest = this.oUpdateManager.requestUpdate(this,
this.sRequestMode, this.sHandler,
sAction, sID, sType, sParams,
this.nTimeoutMS, this.bImmediate, this.bCachable,
null, null, null, this.sURLExtension, sReftag);
}
return false;
}
N2DynUpObject.prototype.toString = function () {
var txt = "RemoteHandler Name: " + this.sHandler + "\n";
txt+= "DefaultTimeout: " + this.nTimeoutMS + " ms\n";
txt+= "Immediate?: " + this.bImmediate + "\n";
txt+= "Cachable?: " + this.bCachable;
return txt;
}
N2DynUpObject.prototype.debug = function () {
;
}
N2DynUpObject.prototype.setLoading = function () {
if (this.sTargetID && this.sLoadingMessage) {
var oE = goN2U.getRawObject(this.sTargetID)
if (oE != null) {
oE.innerHTML = this.sLoadingMessage;
} else {
;
}
}
}
N2DynUpObject.prototype.setUpdateManager = function (obj) { this.oUpdateManager = obj; }
N2DynUpObject.prototype.requestComplete = function () {
this.currentRequest = null;
}
N2DynUpObject.prototype._onRequestSuccess = function (aHTML, aJSFunctions, nStatus, sRequestID) {
if (aHTML) {
if (this.sTargetID && aHTML[0]) {
this._updateContent(this.sTargetID, aHTML[0]);
}
for (var id in aHTML) {
if (id != 0 && id != '0') {
this._updateContent(id, aHTML[id]);
}
}
}
if (aJSFunctions) {
for (var id in aJSFunctions) {
try {
var fFn = eval (aJSFunctions[id]);
} catch(e) {
;
}
}
}
if (this.sPersistContentForm && aHTML) {
goN2Persist.saveContent(this.sPersistContentForm, aHTML);
}
if (this.sPersistFunctionsForm && aJSFunctions) {
goN2Persist.saveFunctions(this.sPersistFunctionsForm, aJSFunctions);
}
}
N2DynUpObject.prototype.onRequestSuccess = N2DynUpObject.prototype._onRequestSuccess;
N2DynUpObject.prototype._updateContent = function (sID, sContent) {
var oE = goN2U.getRawObject(sID);
if (oE != null) {
;
oE.innerHTML = sContent;
} else {
;
}
}
N2DynUpObject.prototype.onRequestFailure = function (sMessage, nStatus, sRequestID) {
if (this.sTargetID && this.sTimeoutMessage) {
this._updateContent(this.sTargetID, this.sTimeoutMessage);
}
}
N2DynUpObject.prototype.hookForm = function (sFormName, sAction, sID, sType, params) {
this.sAction = sAction;
this.sID = sID;
this.sType = sType;
this.params = params;
n2HookForm (sFormName, this, this.sObjectName, sAction, sID, sType, params);
}
N2DynUpObject.prototype.getFormName = function () {
return this.sFormName;
}
N2DynUpObject.prototype.suspendFormHook = function (b) {
var eF = this.oForm;
if (!eF) return;
if (b) {
this._fOnsubmit = eF['onsubmit'];
eF['onsubmit'] = null;
} else {
eF['onsubmit'] = this._fOnsubmit;
}
}
window.N2DynUpRequest=function(oRequester, sRequestMode, sURL, nTimeoutMS, bCachable, fOverrideSuccess, fOverrideFailure, oOverride) {
this.oRequester=oRequester;
;
this.sRequestMode = sRequestMode.toLowerCase();
this.methodSuccess = fOverrideSuccess;
this.methodFailure = fOverrideFailure;
this.oOverride = oOverride;
this.sURL= sURL ? sURL : 'CACHE-ONLY';
this.nTimeoutMS= nTimeoutMS ? nTimeoutMS : '0';
this.bCachable = !goN2U.isUndefOrNull(bCachable) ? bCachable : true;
this.tripTime=0;
this.dataType='0';
this.arJS=null;
this.arHTML=null;
this.cancelled=false;
this.timedOut=false
this.success=false;
}
function N2DynUpRequestInfo(oRequester, sRequestID, fOverrideSuccess, fOverrideFailure, oOverride) {
this.oRequester=oRequester;
this.sRequestID=sRequestID;
this.oOverride = oOverride;
this.oRequest=null;     // only set once repsone is received
this.methodSuccess = fOverrideSuccess;  // optional
this.methodFailure = fOverrideFailure;  // optional
}
function N2DynUpStats() {
this.className = 'N2DynUpStats';
this.version = '1.0.0';
this.totalRequestsCount=0; // includes fulfilled from cache
this.cachedHitsCount=0;
this.remoteRequestsCount=0;// remote only
this.successCount=0;    // remote only
this.nTimeoutCount=0;   // remote only
this.successAfterTimeoutCount=0;
this.minTripTime=0;     // remote only
this.maxTripTime=0;     // remote only
this.lastTripTime=0;
this.totalTripTime=0;
this.averageTripTime=0;
this.recordRemoteRequest = function () {
this.remoteRequestsCount++;
this.totalRequestsCount++;
}
this.recordCacheHit = function () {
this.cachedHitsCount++;
this.totalRequestsCount++;
this.lastTripTime = 'ch';
}
this.recordSuccess = function (tripTime, bPastTimeout) {
this.successCount++;
this.lastTripTime=tripTime;
this.totalTripTime+=tripTime;
this.averageTripTime = this.totalTripTime/this.successCount;
this.minTripTime= Math.min(this.minTripTime, tripTime);
this.maxTripTime= Math.max(this.maxTripTime, tripTime);
if (bPastTimeout)
this.successAfterTimeoutCount++;
}
this.recordTimeout = function () {
this.nTimeoutCount++;
}
this.toString = function () {
var txt= "Total Requests: " + this.totalRequestsCount + "\n";
txt+= "Remote Requests: " + this.remoteRequestsCount + "\nCache Hits: " + this.cachedHitsCount + "\n";
txt+= "Successful Requests: " + this.successCount + "\nTimed Out Requests: " + this.nTimeoutCount + "\n";
txt+= "Success After Timeout: " + this.successAfterTimeoutCount + "\n";
txt+= "Last Trip Time: " + this.lastTripTime + " ms\n";
txt+= "Min Trip Time: " + this.minTripTime + " ms\nMax Trip Time: " + this.maxTripTime + " ms\n";
txt+= "Average Trip Time: " + Math.round(this.averageTripTime) +" ms";
return txt;
}
this.toHTML = function () {
var txt=this.toString();
var re = /\n/gi;
txt = txt.replace(re, "<br />");
return txt;
}
this.summary = function () {
var txt= this.totalRequestsCount + ":";
txt+= this.remoteRequestsCount + ":" + this.cachedHitsCount + ":";
txt+= this.successCount + ":" + this.nTimeoutCount + ":";
txt+= this.successAfterTimeoutCount + ":";
txt+=this.lastTripTime + ":";
txt+= this.minTripTime + ":" + this.maxTripTime + ":";
txt+= this.averageTripTime;
return txt;
}
}
window.N2DynamicUpdateManager=function() {
this.className = 'N2DynamicUpdateManager';
this.version = '190';
this.SCRIPTIDPREFIX = "goN2SO_";
this.nScriptID=0;
this.nSdfsID=0;
this.oXHR = n2XHRFactory();
this.bXHRPRocessing=false;
var queue = new N2FifoQueue(20);  // circular queue, max 20 requests
var requests = new Array();
var nTimeoutStatus='255';
var nScriptErrStatus = '254';
var nNoInfoStatus = '253';
var oCfg = goN2U.getConfigurationObject('N2DynamicUpdateManager');
this.nTimeoutMS = oCfg.getValue('defaultTimeoutMS', 10000);
this.baseURL = null;
this.proxyURL = null;
this.marketplace = null;
this.sRID='NA';
var nSTATE_NOT_PROCESSING = 0;
var nSTATE_WAITING = 1;
var nSTATE_RESPONSE_RECEIVED = 2;
var nSTATE_DATA_AVAILABLE = 3;
var nSTATE_ABORTING_REQUEST = 4;
this.nProcessState=nSTATE_NOT_PROCESSING;
this.bExpectingResponseComplete = false;
this.bXHREvalProcessing=false;
this.stats = new N2DynUpStats();
this.optimize = true;
this.bFirstSDFS = true;
this.clearBuffer = true;
this.sessionID = '';
this.bDisablePP = false;
this.setBaseURL = function (sURL) {
;
this.baseURL = sURL;
this.baseDomain = null;
var re = new RegExp('https?:\/\/[^/]+');
var m = re.exec(sURL);
if (m != null) this.baseDomain = m[0];
}
this.setMarketplace = function (mp) { this.marketplace = mp; }
this.setSessionID = function (sID) {
this.sessionID = sID;
;
}
this.setHTTPRID = function (sRID) { this.sRID = sRID; }
this.disablePP = function (b) { this.bDisablePP = b; }
this.setProxyURL = function (sURL) {
this.proxyURL = sURL;
;
}
this.setDefaultTimeout = function (nMS) { this.nTimeoutMS = nMS; }
this.clearCache = function () { requests = new Array(); }
this.getStats = function () { return this.stats; }
this.requestTargetUpdate = function (oRequester, oTarget,
sRequestMode, sHandler, sAction, sID, sType, params,
nTimeoutMS, bImmediate, bCachable) {
return this.requestUpdate (oRequester, sRequestMode, sHandler, sAction, sID, sType, params,
nTimeoutMS, bImmediate, bCachable,
null, null, oTarget);
}
this.requestUpdate = function (oRequester, sRequestMode, sHandler, sAction, sID, sType, params,
nTimeoutMS, bImmediate, bCachable,
fOverrideSuccess, fOverrideFailure, oOverride, sURLExtension,
sReftag) {
var oRequestInfo = this.getCurrentRequestInfo();
;
if ((this.nProcessState == nSTATE_WAITING) && bImmediate) {
this.cancelRequest(oRequestInfo.sRequestID);
}
bCachable = (typeof (bCachable)!='undefined') ? bCachable : true;
sAction = n2DUExpandParameter(sAction, true);
sID = n2DUExpandParameter(sID, true);
sType = n2DUExpandParameter(sType, true);
var sParams = n2DUExpandParameter(params, true);
switch(sRequestMode) {
case 'sd': sRequestMode = 'xhr';
;
break;
case 'sdfs': sRequestMode = 'xhrfs';
;
break;
}
;
if (oRequester) {
if (oRequester.sID) {
;
} else {
;
}
}
var sRequestID = this.genRequestID(sHandler,sAction,sID,sType,sParams);
var oRequestInfo = new N2DynUpRequestInfo(oRequester, sRequestID,
fOverrideSuccess, fOverrideFailure, oOverride);
var oRequest = this.getRequest(sRequestID);
if (oRequest) {
oRequestInfo.oRequest = oRequest;
if (oRequest.success) {
;
this.stats.recordCacheHit();
this.processSuccess(oRequestInfo, oRequest.arHTML, oRequest.arJS, oRequest.nStatus, sRequestID);
sRequestID = null;  // there is no active request in this case.
} else {
;
this.addRequest(oRequestInfo);
}
} else {
;
var sFullURL = this.genURL (sRequestMode, sHandler, sAction, sID, sType, sParams, sURLExtension, sReftag);
nTimeoutMS = nTimeoutMS ? nTimeoutMS : this.nTimeoutMS;
oRequestInfo.oRequest = new N2DynUpRequest(oRequester, sRequestMode, sFullURL, nTimeoutMS, bCachable,
fOverrideSuccess, fOverrideFailure, oOverride);
this.addRequest(oRequestInfo);
}
return sRequestID;
}
this.cancelRequest = function (sRequestID, bAbortRequestInProcess) {
var bCancelled = false;
if (bAbortRequestInProcess) {
if (this.nProcessState == nSTATE_WAITING) {
var oRequestInfo = this.getCurrentRequestInfo();
if (!oRequestInfo) {
;
} else if (sRequestID == oRequestInfo.sRequestID) {
;
this.stopWatchdog();
this.killCurrentRequest(oRequestInfo, false);
bCancelled = true;
}
} else if (this.nProcessState > nSTATE_WAITING) {
;
}
}
if (!bCancelled) {
var oRequest = this.getRequest(sRequestID);
if (oRequest) {
;
oRequest.cancelled = true;
}
}
}
this.addRequest = function (oRequestInfo) {
var sRequestID = oRequestInfo.sRequestID;
;
requests[sRequestID] = oRequestInfo.oRequest;
queue.add(oRequestInfo);
if (this.nProcessState) {
;
} else  {
if (this.bExpectingResponseComplete) {
;
this.responseComplete();
} else {
this.remoteRequest(oRequestInfo.oRequest);
}
}
return sRequestID;
}
this.cacheResponse = function (sRequestID, oRequest) {
;
requests[sRequestID] = oRequest;
return sRequestID;
}
this.genRequestID = function (sHandler, sAction, sID, sType, sParams) {
var reqID = sHandler;
reqID += '^' + (sAction ? sAction : '');
reqID += '^' + (sType ? sType : '');
reqID += '^' + (sID ? sID : '');
reqID += '^' + (sParams ? sParams : '');
;
return reqID;
}
this.genURL = function (sMode, sHandler, sAction, sID, sType, sParams, sURLExtension, sReftag) {
if (this.baseURL == null) {
;
}
if (this.sessionID == null || this.sessionID == '') {
;
}
if (this.marketplace == null) {
;
}
if (goN2U.isUndefOrNull(sURLExtension) ) {
sURLExtension = '.html';
}
if (goN2U.isUndefOrNull(sReftag) ) {
sReftag = '';
} else {
sReftag = '/ref=' + sReftag;
}
var sURL;
if (sHandler.indexOf('\/') == 0 ) {
sURL = this.baseDomain + sHandler + sURLExtension + sReftag + "/" + this.sessionID;
} else {
sURL = this.baseURL + sHandler + sURLExtension + sReftag + "/" + this.sessionID;
}
sURL += "?ie=UTF8";
sURL += "&rm="+sMode;
if (this.proxyURL) {
if(this.proxyURL.substr(1,2) == ':\\') {
return 'file:///' +this.proxyURL + sHandler + '-' + sAction + '.html';
} else {
sURL = this.proxyURL + "&url=" + sURL + "&ra="+sAction;
}
} else {
if (typeof(sAction) != 'undefined' && sAction != null)
sURL += "&ra="+sAction;
}
if (typeof(sID) != 'undefined' && sID != null)
sURL += "&id="+sID;
if (typeof(sType) != 'undefined'  && sType != null)
sURL += "&tt="+sType;
if (this.marketplace != null)
sURL += "&mp="+this.marketplace;
sURL += "&vn="+this.version;
if (!goN2U.isUndefOrNull(sParams))
sURL += "&ps="+sParams;
if (this.optimize) {
sURL += "&opt="+this.stats.summary();
}
sURL += "&orid="+this.sRID;
if (this.bDisablePP) sURL += '&PageProfiler=false&PowerBar=false';
;
return sURL;
}
this.getRequest = function (reqID) {
var oRequest = requests[reqID];
return requests[reqID];
}
this.removeRequest = function (reqID) {
;
requests[reqID] = null;
}
this.getCurrentRequest = function () {
var reqInfo = queue.current();
var reqID = reqInfo.sRequestID;
if (reqID)
return requests[reqID];
else
return null;
}
this.getCurrentRequestInfo = function () {
return queue.current();
}
this._issueNextRequest = function () {
;
var oRequestInfo = queue.next();
var oRequest, sRequestID;
if (oRequestInfo) {
sRequestID = oRequestInfo.sRequestID;
oRequest = this.getRequest(sRequestID);
;
;
;
}
if (oRequest) {
if (oRequest.success) {
oRequestInfo.oRequest = oRequest;
;
this.stats.recordCacheHit();
this.processSuccess(oRequestInfo, oRequest.arHTML, oRequest.arJS, oRequest.nStatus, sRequestID);
this.issueNextRequest();
} else {
;
this.remoteRequest(oRequest);
}
} else {
;
}
}
this.issueNextRequest = this._issueNextRequest;
this.remoteRequest = function (oRequest) {
this.stats.recordRemoteRequest();
this.nProcessState = nSTATE_WAITING;
this.bExpectingResponseComplete = true;
this.startWatchdog(oRequest.nTimeoutMS);
var now = new Date();
oRequest.reqStart = now.getTime();
switch ( oRequest.sRequestMode ) {
case 'xd':
;
oRequest.sScriptID = this.SCRIPTIDPREFIX+this.nScriptID.toString();
this.loadScript(oRequest.sURL, false, oRequest.sScriptID);
this.nScriptID++;
break;
case 'sd':
;
break;
case 'xhr':
;
this.XHRSend(oRequest.sURL, null);
break;
case 'xdfs':
;
;
if (oRequest.oRequester && oRequest.oRequester.oForm) {
var eF=oRequest.oRequester.oForm, sFields='', i=0, el;
el=eF.elements[i];
while (!goN2U.isUndefOrNull(el)) {
if (!eF.disabled) {
if (el.type == "checkbox") {
if (el.checked) {
sFields += '&'+el.name+"="+encodeURIComponent(el.value);
}
} else {
sFields += '&'+el.name+"="+encodeURIComponent(el.value);
}
}
el=eF.elements[++i]
}
var sURL= oRequest.sURL+sFields;
;
oRequest.sScriptID = this.SCRIPTIDPREFIX+this.nScriptID.toString();
this.loadScript(sURL, false, oRequest.sScriptID);
this.nScriptID++;
}
break;
case 'sdfs': // MODIFIED for XHR
case 'xhrfs':
;
;
if (oRequest.oRequester && oRequest.oRequester.oForm) {
var eF=oRequest.oRequester.oForm
var sFields='', i=0, el;
el=eF.elements[i];
while (!goN2U.isUndefOrNull(el)) {
if (!eF.disabled) {
if (el.type == "checkbox") {
if (el.checked) {
sFields += '&'+el.name+"="+encodeURIComponent(el.value);
}
} else {
sFields += '&'+el.name+"="+encodeURIComponent(el.value);
}
}
el=eF.elements[++i];
}
sFields = sFields.substring(1);
var sURL= oRequest.sURL;
if (window.goN2Debug) {
;
this.nSdfsID++;
}
this.XHRSend(oRequest.sURL, sFields);
}
break;
default:
;
}
}
this.startWatchdog = function (nTimeoutMS){
nTimeoutMS = nTimeoutMS ? nTimeoutMS : this.nTimeoutMS;
if (nTimeoutMS){
;
var tmpFn = function () { goN2DUManager.onTimeout(); };
this.watchdogTimer=setTimeout(tmpFn, nTimeoutMS);
}
}
this.stopWatchdog = function (){
if (this.watchdogTimer){
clearTimeout(this.watchdogTimer);
this.watchdogTimer = null;
}
}
this.setWatchdog = function (delay, fn){
this.nTimeoutMS=delay;
if (fn)
this.on_timeout=fn;
}
this.onScriptError = function (sMsg, sFile, nLine) {
sMsg = sMsg ? sMsg : "script error";
if (this.nProcessState) {  // any processing state except nSTATE_NOT_PROCESSING
var oRequestInfo = this.getCurrentRequestInfo();
if (!oRequestInfo) {
return;
} else {
var oReq = oRequestInfo.oRequest;
if ( oReq && (oReq.sRequestMode == 'xd' || oReq.sRequestMode == 'xdfs')){
this.killCurrentRequest(oRequestInfo, true, sMsg);
}
}
}
}
this.onTimeout = function () {
if (!this.watchdogTimer) {
return;
}
this.watchdogTimer = null;
var oRequestInfo = this.getCurrentRequestInfo();
if (!oRequestInfo) {
;
return;
}
if (this.nProcessState == nSTATE_DATA_AVAILABLE)
;
else
;
var oRequest = oRequestInfo.oRequest;
if (oRequest) {
this.stats.recordTimeout();
oRequest.timedOut = true;
}
this.killCurrentRequest(oRequestInfo, true, 'timeout', nTimeoutStatus);
}
this.killCurrentRequest = function (oRequestInfo, bCallErrorCallback, sReason, nStatus) {
var oRequest = oRequestInfo.oRequest;
; // supposed to be set if it's processing
this.nProcessState=nSTATE_ABORTING_REQUEST;
if (oRequest) {
if (!oRequest.cancelled) {
this.processFailure(oRequestInfo, sReason, nStatus, bCallErrorCallback);
}
this.removeRequest(oRequestInfo.sRequestID)
}
this.stopWatchdog();
if (this.bXHRPRocessing) {
this.oXHR.abort();
this.bXHRPRocessing = false;
if (goN2U.isMozilla5()) {
goN2DUManager.oXHR = n2XHRFactory();
}
}
this.nProcessState = nSTATE_NOT_PROCESSING; // VITAL or next request will never be issued
this.bExpectingResponseComplete = false;
this.issueNextRequest();
}
this.onDataAvailable = function (sRequestID, aHTML, aJSFunctions, nStatus, bJSData) {
;
this.nProcessState = nSTATE_DATA_AVAILABLE;
var bValidData=true;
var msg = "Response contained no valid data. (0 HTML, 0 JS, no JSData). Status was "+ nStatus;
if (!aHTML && !aJSFunctions && !bJSData) {
;
bValidData=false;
}
var bCallProcessSuccess = false;
var oRequestInfo = this.getCurrentRequestInfo();
var oRequest = this.getRequest(sRequestID); // oRequestInfo.oRequest;
if (!oRequestInfo && !oRequest) {
;
return;
}
var sCurrentRequestID = '';
if (!oRequestInfo && oRequest) {
oRequestInfo = oRequest;
} else {
sCurrentRequestID = oRequestInfo.sRequestID;
}
var latency = "(cached)";
if (oRequest) {
var now = new Date();
latency = now.getTime() - oRequest.reqStart;
this.stats.recordSuccess(latency, oRequest.timedOut);
;
if (!aHTML && !aJSFunctions && !bJSData) {
this.processFailure(oRequestInfo, msg, nStatus, true);
return;
}
oRequest.tripTime = latency;
if (!oRequest.cancelled) {
if (sCurrentRequestID == sRequestID) {
bCallProcessSuccess = true;
} else {
;
}
}
} else if (bValidData) {
;
oRequest = new N2DynUpRequest(null, '', '');
this.cacheResponse(sRequestID, oRequest);
}
if (window.goN2Debug) {
;
}
if (oRequest && oRequest.bCachable) {
;
oRequest.arJS = aJSFunctions;
oRequest.arHTML = aHTML;
oRequest.nStatus = nStatus;
oRequest.success = true;  // FIXME: Should this be the status code >=0 ?
}
if (bCallProcessSuccess )
this.processSuccess(oRequestInfo, aHTML, aJSFunctions, nStatus, sRequestID);
if (oRequest && !oRequest.bCachable) {
;//goN2Debug.info("Removing request as it is not marked cachable...")
this.removeRequest(sRequestID);
}
}
this.processSuccess = function (oRequestInfo, aHTML, aJSFunctions, nStatus, sRequestID) {
var oRequester = oRequestInfo.oRequester;
var oOverride = !goN2U.isUndefined(oRequestInfo.oOverride) && oRequestInfo.oOverride != null
? oRequestInfo.oOverride : oRequester;
if (oRequester) {
;
if (oRequester.sID) ;
if (oRequestInfo.methodSuccess) {
;
oRequestInfo.methodSuccess.call(oOverride, aHTML, aJSFunctions, nStatus, sRequestID);
} else {
;
oRequester.onRequestSuccess(aHTML, aJSFunctions, nStatus, sRequestID);
}
oRequester.requestComplete();
}
}
this.processFailure = function (oRequestInfo, sMessage, nStatus, bNotifyRequestor) {
var oRequester = oRequestInfo.oRequester;
var oOverride = oRequestInfo.oOverride ? oRequestInfo.oOverride : oRequester;
if (oRequester) {
if (bNotifyRequestor) {
;
if (oRequestInfo.methodFailure)
oRequestInfo.methodFailure.call(oOverride, sMessage, nStatus, oRequestInfo.sRequestID);
else
oRequester.onRequestFailure(sMessage, nStatus, oRequestInfo.sRequestID);
}
oRequester.requestComplete();
}
}
this.responseHead = function (sID) {
this.nProcessState = nSTATE_RESPONSE_RECEIVED;
;
;
}
this.responseComplete = function () {
this.bExpectingResponseComplete = false;
var oRequestInfo = this.getCurrentRequestInfo();
this.stopWatchdog();
if (oRequestInfo) {
var sRequestID = oRequestInfo.sRequestID;
;
var oRequest = oRequestInfo.oRequest;
if (nSTATE_NOT_PROCESSING < this.nProcessState &&
this.nProcessState < nSTATE_DATA_AVAILABLE ) {
if (nSTATE_DATA_AVAILABLE <= this.nProcessState) {
;
} else {
;
}
if (!oRequest.cancelled) {
this.processFailure(oRequestInfo, 'Error: No information matching your request returned', nNoInfoStatus, true);
}
}
if (oRequest) {
if (oRequest.sScriptID) {
goN2U.removeElementById(oRequest.sScriptID);
oRequest.sScriptID = null;
}
}
} else {
;
;
}
this.nProcessState=nSTATE_NOT_PROCESSING;  // VITAL or next request will never be issued
if (!this.bXHREvalProcessing) {
this.issueNextRequest();
}
}
this.loadScript = function (sURL, bLocalCacheOK, sID) {
;
var e = document.createElement("script");
e.type="text/javascript";
e.id=sID;
e.charset = "utf-8";
if (bLocalCacheOK) {
e.src = sURL;
} else {
e.src = sURL + (sURL.indexOf('?') == -1 ? '?' : '&') + 'n2t='+ new Date().getTime();
}
oTheHead.appendChild(e); // test change 2005-04-06
}
this.XHRSend = function(sURL, sData) {
var sMode = "GET";
var bSuccess = true;
var sDataLength = 'N/A';
if (sData) {
sMode = "POST";
sDataLength = sData.length;
}
try {
;
this.oXHR.open(sMode, sURL, true);
this.oXHR.onreadystatechange= function() { goN2DUManager.onXHRReadyStateChange() };
if (sMode == "POST") {
this.oXHR.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
this.oXHR.send(sData);
} else {
this.oXHR.send(null);
}
this.bXHRPRocessing = true;
} catch(e) {
;
this.bXHRPRocessing = false;
this.killCurrentRequest(this.getCurrentRequestInfo(), true, 'Bad XHRResponse',
goN2U.isDefined(oXHR) ? oXHR.status: '???');
bSuccess = false;
}
return bSuccess;
}
this.onXHRReadyStateChange = function() {
var oXHR = this.oXHR;
if (oXHR.readyState==4) {
var oRequestInfo = this.getCurrentRequestInfo();
this.bXHRPRocessing = false;
if (this.nProcessState!=nSTATE_ABORTING_REQUEST) {
try {
if (oXHR.status == 200) {
var len = oXHR.responseText.length;
;
try {
this.bXHREvalProcessing=true;
eval(oXHR.responseText);
this.bXHREvalProcessing=false;
if (this.nProcessState!=nSTATE_NOT_PROCESSING) {
;
this.killCurrentRequest(oRequestInfo, true, 'Bad XHRResponse (incomplete?)', oXHR.status);
} else {
this.issueNextRequest();
}
} catch (e) {
this.bXHREvalProcessing=false;
;//goN2Debug.scriptError("Error eval-ing XHR response. (" + e.toString() + ").");
;
this.killCurrentRequest(oRequestInfo, true, 'Error eval-ing XHR response', oXHR.status);
}
} else {
;
this.killCurrentRequest(oRequestInfo, true, 'Bad XHRResponse', oXHR.status);
}
} catch (e) {
;
this.killCurrentRequest(oRequestInfo, true, 'XHR Exception', oXHR.status);
}
}
} else {
;
}
}
}
window.goN2DUManager = new N2DynamicUpdateManager;
N2DynUpObject.prototype.oUpdateManager = goN2DUManager;
N2ChainEventHandler ('onerror', function(){ goN2DUManager.onScriptError(); }, 'goN2DUManager chain onError event' );
goN2Persist = {
sPersistFormName: 'goN2PersistForm',
aRenderContentCalled: {},
aEvalFunctionsCalled: {},
aSkipProcessing: {},
saveContent: function(sFormName, aHTML) {
var oForm = document.forms[sFormName];
if (!oForm) {
;
return;
}
;
var nFields = oForm.elements.length/2;
if (!aHTML) {
return;
}
var iNext;
var aLookup = {};
for (iNext=0; iNext < nFields; ++iNext) {
var sId = oForm['k_'+iNext].value;
if (goN2U.isUndefOrNull(sId) || sId.length==0) {
break;
}
aLookup[sId] = iNext;
}
;
for (var sId in aHTML) {
if (goN2U.isDefined(aLookup[sId])) {
;
oForm['v_'+aLookup[sId]].value = aHTML[sId];
;
} else {
if (iNext >= nFields) {
;
return false;
}
;
oForm['k_'+iNext].value = sId;
oForm['v_'+iNext].value = aHTML[sId];
aLookup[sId] = iNext; // add to the lookup array for check below
iNext++;
}
}
return true;
},
saveFunctions: function(sFormName, aFns) {
var oForm = document.forms[sFormName];
if (oForm && aFns) {
;
var nFields = oForm.elements.length/2;
var nFns = aFns.length;
var nCount = 0;
if (nFns <= nFields) {
var i;
for (i=0;i<nFns;i++) {
oForm['v_'+i].value = aFns[i];
}
for (;i<nFields;i++) {
oForm['v_'+i].value = null;
}
} else {
;//goN2Debug.error("goN2Persist.saveFunctions: Array length ("+nCount+") exceeds form length ("+ nFields +")");
return false;
}
} else {
;
}
return true;
},
saveValue: function(sFormName, sKey, sValue) {
var oForm = document.forms[sFormName];
var bOK = false;
if (oForm) {
var nIndex = goN2Persist.getValueIndex(sFormName, sKey);
if (nIndex >=0) {
oForm.elements['v_'+nIndex].value = sValue;
bOK = true;
} else {
var nFields = oForm.elements.length/2;
var i;
for (i=0;i<nFields;i++) {
if (!oForm.elements['k_'+i].value) {
oForm.elements['k_'+i].value = sKey;
oForm.elements['v_'+i].value = sValue;
bOK = true;
break;
}
}
}
} else {
;
}
if (!bOK) {
;
}
return bOK;
},
getValue: function (sFormName, sKey) {
var oForm = document.forms[sFormName];
var sData = null;
if (oForm) {
var nIndex = goN2Persist.getValueIndex(sFormName, sKey);
if (nIndex >=0 && oForm) {
sData = oForm.elements['v_'+nIndex].value;
}
} else {
;
}
return sData;
},
getValueIndex: function (sFormName, sKey) {
var oForm = document.forms[sFormName];
if (oForm) {
var nFields = oForm.elements.length/2;
var i;
for (i=0;i<nFields;i++) {
if (oForm.elements['k_'+i].value == sKey) {
return i;
}
}
} else {
;
}
return -1;
},
resetForm: function (sFormName) {
var oForm = document.forms[sFormName];
if (oForm) {
if (typeof oForm['k_0'] == 'undefined') {
goN2Persist._resetVForm(oForm);
} else {
goN2Persist._resetKVForm(oForm);
}
} else {
;
}
},
_resetKVForm: function (oForm) {
var i=0;
var oIDField=oForm['k_'+i];
while (typeof oIDField != 'undefined') {
oForm['v_'+i].value = '';
oIDField.value = '';
i++;
oIDField=oForm['k_'+i];
}
},
_resetVForm: function (oForm) {
var i=0;
var oIDField=oForm['v_'+i];
while (typeof oIDField != 'undefined') {
oIDField.value = '';
i++;
oIDField=oForm['v_'+i];
}
},
renderContent: function (sFormName) {
if (goN2U.isDefined(goN2Persist.aRenderContentCalled[sFormName])) {
return;
}
goN2Persist.aRenderContentCalled[sFormName] = true;
var oForm = document.forms[sFormName];
if (oForm) {
;
var i=0;
var oIDField=oForm.elements['k_'+i];
while (typeof oIDField != 'undefined') {
var oValueField=oForm.elements['v_'+i];
var sID = oIDField.value;
if (sID) {
goN2Persist.insertContent(sID, oValueField.value);
}
i++;
oIDField=oForm.elements['k_'+i];
}
} else {
;
}
},
insertContent: function(sID, sValue) {
var oE = goN2U.getElement(sID);
if (oE) {
;
oE.innerHTML = sValue;
} else {
;
}
},
evalFunctions: function (sFormName) {
if (goN2U.isDefined(goN2Persist.aEvalFunctionsCalled[sFormName])) {
return;
}
goN2Persist.aEvalFunctionsCalled[sFormName] = true;
var oForm = document.forms[sFormName];
if (oForm) {
var i=0;
var oValueField=oForm['v_'+i];
while (typeof oValueField != 'undefined' && oValueField.value.length) {
try {
eval (oValueField.value);
} catch (e) {
;
}
i++;
oValueField=oForm['v_'+i];
}
} else {
;
}
},
skipAutoProcessingFor: function(sFormName) {
goN2Persist.aSkipProcessing[sFormName] = 1;
},
processAll: function () {
var oForm = document.forms[goN2Persist.sPersistFormName];
if (oForm) {
;
var oField=oForm['c'];
var aForms = oField.value.split('|');
var sForm;
for (i=0;i<aForms.length;i++){
sForm = aForms[i];
if (goN2Persist.aSkipProcessing[sForm] || !sForm.length)
continue;
goN2Persist.renderContent(sForm);
}
oField=oForm['f'];
aForms = oField.value.split('|');
for (i=0;i<aForms.length;i++){
sForm = aForms[i];
if (goN2Persist.aSkipProcessing[sForm] || !sForm.length)
continue;
goN2Persist.evalFunctions(sForm);
}
;
} else {
;
}
}
}
if (typeof window.goN2Debug == "object") {
goJSFToolbar.addHTML('&nbsp;<span>PersistForms:[<a href="javascript:goJSFToolbar.showPersistForms(true)">I</a>|<a href="javascript:goJSFToolbar.showPersistForms(false)">O</a>]</span>','beforeBegin');
}
if (window.goN2LibMon) goN2LibMon.endLoad('dynUpdate');
} // END library code wrapper
n2RunIfLoaded("utilities", n2DynUpdateInitLibrary, "dynupdate");