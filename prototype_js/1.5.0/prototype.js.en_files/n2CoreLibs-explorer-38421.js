//! ################################################################
//! Copyright (c) 2004 Amazon.com, Inc., and its Affiliates.
//! All rights reserved.
//! Not to be reused without permission
//! $Change: 853239 $
//! $Revision: 1.1 $
//! $DateTime: 2006/05/08 12:24:21 $
//! ################################################################
function n2ExplorerInitLibrary() {	// Begin library code wrapper. Goes all the way to the bottom of the file
if (window.goN2LibMon) goN2LibMon.beginLoad('explorer');
window.N2ExplorerPopover=function() {
N2MultiPanePopover.call ( this );
this.bEnableLAD = true; //false;
this.explorerParentInitialize = this.initialize;
this.initialize = function (id, objectName, dataArrayName, dispMinMethod, 
locateMethod, nHAdjust, nVAdjust) {
this.explorerParentInitialize(id, objectName, dataArrayName, dispMinMethod, 
locateMethod, nHAdjust, nVAdjust);
;
this.sBodyStyle = null;
this.bBigisBig = false;
var pane0DefaultWidth = 480;
var pane0DefaultHeight = 'auto'; //300;
var menuPaneDefaultWidth = 130;
var infoPaneDefaultHeight = 200;
var infoPaneDefaultWidth = pane0DefaultWidth - menuPaneDefaultWidth - 8; // 336; //340
this.expandPane = function (sExPaneID) {
;
var exPane = this.findPane(sExPaneID);
;
if (exPane) exPane.expand();
this.setLatestAction(sExPaneID);
}
this.resetMAP = function(sID) {
var aData = this.getDataArray();
aData['a'+sID].bmap=0;
}
var pane0 = this.getPane(0);
;
pane0.setDefaultWidth(pane0DefaultWidth);
pane0.setDefaultHeight(pane0DefaultHeight);
pane0.setUseHistory(true);
if (this.bEnableLAD)	pane0.configureLADSupport(true, null, 'pdok', 'ptd', 'pi');
;
pane0.setTemplate('<table style="border: 5px solid #EFEDD4; background-color:#EFEDD4" cellspacing="0" cellpadding="0" width="100% height="100%" ><tr><td>' +
'<table border="0" cellspacing="0" cellpadding="0" width="100% height="100%" >' +						
'<tr>' +
'<td valign="top" ><div id="{POPOVER_ID}product" style="align:right; ">PRODUCT</div></td>' + 
'</tr>' +
'</table>' +
'<img src="' + window.gsN2ImageHost + 'detail/spacer.gif" width="7" height="2">' +
'<div id="{POPOVER_ID}wrapper">wrapper</div>' +
'</td></tr></table>'						   
);
;
subPane = pane0.newSubPane('product');
;
subPane.setDefaultContent('<hr all>Product info for <b>{THING_ID}</b> goes here go here');
subPane.setDefaultWidth('auto');
subPane.setMinHeight(30);
subPane.setMaxHeight(160);
subPane.populate = function (action, id, type, sParams, sLinkID, sHref, sLinkText) {
if (type == null || id == null) {
;
return;
}		
var sKey = type+id;
var aData = this.oPopover.getDataArray();
;
;
if (aData[sKey]) {
if (type == 'a' || type == 'as' || type == 'am') {
var sh;
if (aData[sKey].sh) {
sh = aData[sKey].sh;
} else {
var ras = aData[sKey].ras;
var rc = aData[sKey].rc;
var ra = aData[sKey].ra;
if (ras) {
ras = '<img src="' + window.gsN2ImageHost + 'detail/stars-' + ras +'.gif" width=64 height=12>';
} else if (ra >=0 && ra <=5) {
var raMaj=0;
var raMin=0;
var raMaj = Math.floor(ra);
var rem = ra-raMaj;
rem = rem.toFixed(2);
if ( (rem >= 0.25) && (rem < 0.75) ){
raMin=5;						
} else if (rem >= 0.75) {
raMaj++;
}
ras = '<img src="' + window.gsN2ImageHost + 'detail/stars-' + raMaj + '-' + raMin +'.gif" width=64 height=12>';
} else {
ras =""; 
;
}
var av = aData[sKey].av ? aData[sKey].av : null;
;
var th;
th = aData[sKey].th;
if ((th == null) || goN2U.isUndefined(th) ) {
th = '<img src="' + window.gsN2ImageHost + 'x-locale/detail/thumb-no-image.gif"/>'; 
}
th = th.replace('/>', ' align="center" vspace="5" hspace="5" border="0" ' +
'onmouseover="{POPOVER_OBJECT}.displayBigImage(true, this)" '+
'onmouseout="{POPOVER_OBJECT}.displayBigImage(false)"/>');
var lp = aData[sKey].lp;
var op = aData[sKey].op;
var gbc = aData[sKey].gbc;
var up = aData[sKey].up;
var bmap = aData[sKey].bmap;
;
;
;
;
;
op = op ? op : lp;
var lp0  = lp ? lp.slice(1) : '0';
var op0  = op ? op.slice(1) : '0';
var gbc0 = gbc ? gbc.slice(1) : '0';
var re = /,/g;
lp0 = lp0.replace(re, '');
op0 = op0.replace(re, '');
gbc0 = gbc0.replace(re, '');
var topPrice = Math.max(lp0, op0);
var finalPrice = op0 - gbc0;
var ys=null;
if ((lp && op) || (finalPrice < op0)){
lp0 = lp0>0 ? lp0 : op0;
ys = topPrice - finalPrice;
var pctsaved = Math.round(ys*100/topPrice) ;
ys = ' <FONT color=#660000>(' + pctsaved + '% off)</font>';
}
;
;
;
var sButtonContent;
var bHideButton = true;
var oDiv = goN2U.getRawObject('gb_buy_' + id);
if (oDiv) {
sButtonContent = oDiv.innerHTML;
sButtonContent = sButtonContent.replace(/gb_buy_/g,'gb_');
} else {
sButtonContent = "&nbsp";
bHideButton = false;
}
var oPop = this.oPopover;			
sh = "";
sh +='<table width="100%" cellpadding="0" cellspacing="0" border="0" class="n2ExpProdPane">';
sh +='<tr>';
sh +=' <td align="center" valign="middle">';
var oLink = new N2ExternalLink (null,
'/exec/obidos/tg/detail/-/' + id + '/ref={REFTAG_HEAD}n2_pp0{REFTAG_TAIL}/{SESSION_ID}',
th, 
'Go to the Detail Page for this item');
sh += th ? oLink.genHTML() : '&nbsp;';
sh +='</td>';			
var sName = aData[sKey].nm ? aData[sKey].nm : sLinkText;
sh +='<td><div style="padding: 4px 0 4px 0;">' 
+ '<div>';
oLink = new N2ExternalLink (null,   
'/exec/obidos/tg/detail/-/' + id + '/ref={REFTAG_HEAD}n2_pp0{REFTAG_TAIL}/{SESSION_ID}',
'<b>' + sName  + '</b>', 
'Go to the Detail Page for this item');
sh += oLink.genHTML();
if (aData[sKey].mf) {
if (aData[sKey].cat) {
var href = '/exec/obidos/search-handle-url/store-name=' + aData[sKey].cat +
'&index=' + aData[sKey].cat.toLowerCase() + 
'&search-type=ss&field-manufacturer=' + aData[sKey].mf + '/{SESSION_ID}' ;
oLink = new N2ExternalLink (null,   
href,
aData[sKey].mf , 
'Search for more products by this manufacturer');
sh += ' <nobr> by ' + oLink.genHTML() + '</nobr>';
} else {
sh += ' <nobr> by ' + aData[sKey].mf + '&nbsp; &nbsp;</nobr>';
}
}
sh += ras ? ras : '';
sh +='</div><div>';
if (finalPrice) {
if (gbc) {
sh +='<span>';
sh +='Gold Box Price: <strike>' + (lp && (lp0 > op0) ? lp : op) + '</strike>&nbsp;</span>';
if (bmap) { 
sh += '<span id="{POPOVER_ID}price" class="clickable" ' +
'onclick="goN2U.setContent(\'{POPOVER_ID}price\',\'$' + 
goN2U.addComma(finalPrice.toFixed(2)) + '&nbsp' + (ys ?  ys : '') + '\', \'price\');' +
'{POPOVER_OBJECT}.resetMAP(\'{THING_ID}\');"' +
'>Click to see price</span>&nbsp;';
} else {
sh += '<b><span class="price">$' + goN2U.addComma(finalPrice.toFixed(2)) + '&nbsp;</span></b>';
sh += ys ?  ys : '';
}
} else {
sh +='New: ';
if (bmap) { 
sh += '<span id="{POPOVER_ID}price" class="clickable" ' +
'onclick="goN2U.setContent(\'{POPOVER_ID}price\',\'<b>$' + 
goN2U.addComma(finalPrice.toFixed(2)) + '</b>\', \'price\');' +
'{POPOVER_OBJECT}.resetMAP(\'{THING_ID}\');"' +
'>Click to see price</span>&nbsp;';
} else {
sh +='<b><span class="price">$'+ goN2U.addComma(finalPrice.toFixed(2)) + '</span></b>&nbsp;';
}
if (up) {
oLink = new N2ExternalLink (null,   
'/exec/obidos/tg/stores/offering/list/-/'+id+'/all/ref=n2_nu1/{SESSION_ID}/',
'Used &amp; new', 
'View used and new versions available from\nAmazon.com Marketplace Sellers');
sh +='<span >' +
'&nbsp;&nbsp;' + oLink.genHTML() + ' from <span style="color: #900;">'+ up + '</span>' +
'</span>';
}
}
}					
sh +='</div><div>';
sh += av ? av : '';
sh +='</div></div></td></tr>';
sh += '</table>';
}			
this.setContent(sh);
if (bHideButton) {
goN2U.undisplay('gb_hide_'+id);
goN2U.display('gb_popover_button_'+id);
}
} else {
;
}
} else {
this.setContent('');
}
}
var oWrapper = pane0.newSubPane('wrapper');
if (this.bEnableLAD && goCust.isLoggedIn())	oWrapper.configureLADSupport(true, null, 'crtok', 'ptd', 'cw');
oWrapper.replaceTemplateTDFieldPlaceholders(true);
oWrapper.setTemplate((this.bBigisBig ? '<div id="{POPOVER_ID}bigImage" style="display:Xnone" align="center"><img src="{imgl}"></div>': '') +
'<table id="{POPOVER_ID}wrapper" border="0" cellspacing="0" cellpadding="0" width="100% height="100%" bgcolor="#ffffff" style="padding-top:6">' +						
'<tr>' +
'<td width="5%" valign="top" style="padding-top:' +
(goN2U.isIE() ? '0.7em' : '0.4em') +
'"><div id="{POPOVER_ID}menu" >MENU</div></td>' + 
'<td valign="top">'+
(this.bBigisBig ? '' : '<div id="{POPOVER_ID}bigImage" style="display:none" align="center"><br><img src="{imgm}"></div>') +
'<div id="{POPOVER_ID}sectionsPane" class="showVerticalScrollbar" ' +
'style="background-color:#fff; height:' + infoPaneDefaultHeight+'; width:' + infoPaneDefaultWidth+'">' +
'sections go here' +
'</div></td>' +
'</tr>' +
'</table>'
);
oWrapper.postPopulate = function (sAction, sID, sType, sParams, sLinkID, sHref, sLinkText) {
var sKey = sType+sID;
var aData = this.oPopover.getDataArray();
;
;
var menu;
if ( menu = this.oPopover.findPane('menu') ) {		
;
if (aData[sKey].gbc) {
menu.undisplay('atc');
menu.display('gbatc');
} else {
menu.display('atc');
menu.undisplay('gbatc');
}
}
return true;
}
subPane = oWrapper.addSubPane( new N2LinksPane(), 'menu');	
subPane.setDefaultWidth(menuPaneDefaultWidth);
subPane.addEntry( new N2InternalLink ('atc', 'crt',
'Remove from Cart', this.getObjectName() + '.rfc', 
'Remove this item from your cart',
'Add to Cart', 
this.getObjectName() + '.atc',
'Add this item to your cart',
'datc', 'Add to cart',
3)
);
subPane.addEntry( new N2ExternalLink ('gbatc',  
"javascript:" + this.getObjectName() + ".gbatc('{THING_ID}')",
'Add to Cart',
'Add this Gold Box item to your Cart',
'datc', 'Add to Cart',
3) );
subPane.addEntry( new N2InternalLink ('atwl', 'wl', 
'Add to Wish List', null, null,
'Add to Wish List', 
this.getObjectName() + '.atwl',
'Add this item to your Wish List',
null, null,
1)
);
subPane.addEntry( new N2ExternalLink ('syh',  
'/exec/obidos/redirect-to-external-url/{SESSION_ID}?path=http%3A//s1.amazon.com/exec/varzea/sdp/sai-condition/{THING_ID}/ref={REFTAG_HEAD}n2_syh{REFTAG_TAIL}',
'Sell Yours Here','If you already own this product and want\nto sell it, click here.', 
null, null,
3) );
subPane.addEntry( new N2ExternalLink ('taf',  
'/exec/obidos/tg/detail/-/{THING_ID}/ref={REFTAG_HEAD}n2_taf{REFTAG_TAIL}/{SESSION_ID}?v=glance&vi=e-mail-friend',
'Tell a Friend', 'Send e-mail about this product to a friend',
null, null,
3) );
subPane.addEntry( new N2ExternalLink ('war',
'/exec/obidos/flex-sign-in/ref={REFTAG_HEAD}n2_war{REFTAG_TAIL}/{SESSION_ID}?page=community/community-sign-in-secure.html&response=tg/stores/detail/-/{CATEGORY}/{THING_ID}/customer-review-form&method=GET',
'Write a Review','Write a review about this product', 
null, null,
3) );
subPane.addEntry( new N2ExternalLink ('gtdp', 
'/exec/obidos/tg/detail/-/{THING_ID}/ref={REFTAG_HEAD}n2_gtdp{REFTAG_TAIL}/{SESSION_ID}' ,
'Go to Detail Page', 'Go to the Detail Page for this item', 
null, null,
3) );
subPane.setEntryStyle('padding:0 0 5px 6px'); 
var scrollerPane = oWrapper.addSubPane(new N2SectionPane(), 'sectionsPane');	
scrollerPane.addSection('summary', '<b>Item Summary</b>', '', false)
scrollerPane.addSection('sims', '<b>Customers who shopped for this also <nobr>shopped for</nobr></b>', '', false)
scrollerPane.addSection('reviews', '<b>Customer Reviews</b>', '', false)
if (goCust.isLoggedIn()) {
scrollerPane.addSection('tiay', '<b>This Item and ' + goCust.getName() + '</b>', '', false)
}
subPane = scrollerPane.addSubPane(new N2ExpandoPane(), 'summary');	
subPane.deferredPopulate = function (action, id, type) {
;
var sh='';
var sKey = type+id;
var aData = this.oPopover.getDataArray();
;
;
if (aData[sKey]) {
if (aData[sKey].at0) {
this.oPopover.kludgeTimer = null;
var nMaxFeaturelength = 20000;
var nCumLen=0;
var i=0;
var sAtKey = 'at'+i;
while(!goN2U.isUndefOrNull(aData[sKey][sAtKey])) {
var txt = aData[sKey][sAtKey];
nCumLen += txt.length;
sh += '<div style="padding: 0 0 6px 0px">' + txt +'</div>';
++i;
sAtKey = 'at'+i;
} 
}else {
;
} 
} 
sh += '<div >ASIN: ' + id +'</div>';
this.setContent(sh);
}
if (goCust.isLoggedIn()) {
subPane = scrollerPane.addSubPane( new N2ExpandoPane(),'tiay');	
subPane.disableScrollbars(true);
subPane.setMessage = function(sM) { this.sMessage = sM; }
subPane.deferredPopulate = function (action, id, type) {
;
var sh='';
if(this.sMessage) {
sh = this.sMessage;
} else {
var sKey = type+id;
var aData = this.oPopover.getDataArray();
;
;
var aD = aData[sKey];
var now = new Date();
var myDate;
var dt;
var sDt;
var re = /(\d+:)/;	
if (aD.wl >0) {
sh += '<div style="padding: 0 0 6px 0px">';
myDate = aD.wl * 1000;
dt = new Date(myDate);
sDt = dt.toLocaleString();
var oLink = new N2ExternalLink(null, 
'/gp/registry/registry.html/ref={REFTAG_HEAD}n2_wl{REFTAG_TAIL}/{SESSION_ID}?type=wishlist',
'Wish List', 
'Go to Your Wish List');
if (now-dt <10000)
sh += 'Just added to your ' + oLink.genHTML() +'.<br />';
else if (now-dt <60000)
sh += 'Recently added to your ' + oLink.genHTML() +'. ';
else
sh += 'Added to your ' + oLink.genHTML() +' on ' + sDt + '. ';
sh += '</div>';
}
if (aD.crt >0) {
sh += '<div style="padding: 0 0 6px 0px">';
myDate = aD.crt * 1000;
dt = new Date(myDate);
sDt = dt.toLocaleString();
var qty = aD.crtq ? aD.crtq : 1;	
var multiAdd= aD.crtm ? true : false;	
var oLink = new N2ExternalLink(null, 
'/gp/cart/view.html?ref={REFTAG_HEAD}n2_vc{REFTAG_TAIL}/{SESSION_ID}',
'Shopping Cart', 
'View cart contents.');
if (now-dt <20000)
sh += 'Just added to your ' + oLink.genHTML() +'.<br />';
else {
sh += 'Quantity in your ' + oLink.genHTML()+ ': ' + qty + '.<br />';
if (!multiAdd)
sh += 'Added on ' + sDt + '. ';
}
oLink = new N2ExternalLink(null, 
'/gp/cart/view.html/{SESSION_ID}?proceedToCheckout=1',
'Proceed to Checkout.', 
'Proceed to Checkout.');
sh += oLink.genHTML();
sh += '</div>';
}
if (aD.crtm >1) {
var oPane = this.oPopover.findPane('sectionsPane');
if (oPane) oPane.overrideLink (0, '<div class="disabled">Remove from cart</div>');
}
}
if (sh == '') sh = "(Nothing to display about this item and you.)";
this.setContent(sh);
}
}
subPane = scrollerPane.addSubPane(new N2ExpandoPane(), 'sims');	
subPane.setDUAction('sims');
subPane.parentOnSuccess = subPane.onRequestSuccess;
subPane.onRequestSuccess = function(dataArray, fnArray, nStatus, sRequestID) {
this.parentOnSuccess(dataArray, fnArray, nStatus, sRequestID);
this.deferredRePopulate(2000);
}			
subPane.disableScrollbars(true);
subPane = scrollerPane.addSubPane(new N2ExpandoPane(), 'reviews');
subPane.setDUAction('reviews');
subPane.disableScrollbars(true);
}	// END intialize
this.atc = function(sThingID, sDivID) {
;
this.setLatestAction('tiay');
this.requestUpdate(this.findPane('sectionsPane'),
'cartadd', sThingID, 'a', null,
false, false,
this.atcSuccess, this.atcFailure, this);
}
this.atcSuccess = function(dataArray, fnArray, nStatus, sRequestID) { 
;
if (nStatus ==0) {
this.repopulate();
} else {
this.atcFailure();
}
}
this.atcFailure = function() { 
var sh = '<br /><font color="#cc0000">Unfortunately we encountered a problem and were unable to add this ' +
'item to your Shopping Cart.</font> Please try again later.<br /><br />' +
'<span class="clickable">Click here to clear this message...</span><br />';
this.tiayMessageHook(sh);
}
this.rfc = function(sThingID, sDivID) {
;
this.setLatestAction('tiay');
var aTD = this.getDataArray();
var sItemID = aTD['a'+sThingID]['crtid'];
;
this.requestUpdate(this.findPane('sectionsPane'),
'cartremove', sThingID, 'a', sItemID,
false, false,
this.rfcSuccess, this.rfcFailure, this);
}
this.rfcSuccess = function(dataArray, fnArray, nStatus, sRequestID) { 
;
if (nStatus ==0) {		
var sh = 'Removed this item from your cart<br /><br />' +
'<span class="clickable">Click here to clear this message...</span><br />';
this.tiayMessageHook(sh);
} else {
this.rfcFailure();
}
}
this.rfcFailure = function() { 
var sh = '<br /><font color="#cc0000">Unfortunately we encountered a problem and were unable to remove this ' +
'item to your Shopping Cart.</font> Please try again later.<br /><br />' +
'<span class="clickable">Click here to clear this message...</span>';
this.tiayMessageHook(sh);
}
this.gbatc = function (sID) {
var oF = document['gb_' + sID];
;
if (oF)	oF.submit();
}
this.atwl = function(sThingID, sDivID) {
;
this.setLatestAction('tiay');
this.requestUpdate(this.findPane('sectionsPane'),
'wladd', sThingID, 'a', null,
false, false,
this.atwlSuccess, this.atwlFailure, this);
}
this.atwlSuccess = function(dataArray, fnArray, nStatus, sRequestID) { 
;
if (nStatus ==0) {
this.repopulate();
} else {
this.atwlFailure();
}
}
this.atwlFailure = function() {
var sh = '<font color="#cc0000">Unfortunately we encountered a problem and were unable to add this ' +
'item to your Wish List.</font> Please try again later.<br /><br />' +
'<span class="clickable">Click here to clear this message...</span><br />';
this.tiayMessageHook(sh);
}
this.tiayMessageHook = function(sMsg) {
var pane;
if (pane = this.findPane('tiay')) {
pane.setMessage(sMsg);
this.repopulate();
this.explorerParent_click = this._click;
this._click = function (evt){
var pane;
if (pane = this.findPane('tiay')) {
pane.setMessage(null);
this.repopulate();
}
this.explorerParent_click(evt);
this._click = this.explorerParent_click;
}
}
}
this.enableLAD = function (b) { this.bEnableLAD = b; }
this.displayBigImage = function (b, oThumb) { 
return;
var sImageID = this.getID() + 'bigImage';
var sSectionsID = this.getID() + (this.bBigisBig ? 'wrapper' : 'sectionsPane');
if (b) {
var nL = goN2U.getObjectLeft(oThumb);
var nT = goN2U.getObjectTop(oThumb);
goN2U.animateBox(nL, nT, 30, 30, nL+250, nT+100, 150, 150, 4, 
new Function("goN2U.undisplay('"+sSectionsID+"');"+
"goN2U.display('"+sImageID+"');" ),
this.sAnimateCloseStyle);
} else {
goN2U.undisplay(sImageID);
goN2U.display(sSectionsID);
}
}
this.setBigisBig = function(b) { this.bBigisBig = b; }	
}
N2ExplorerPopover.prototype = new N2MultiPanePopover();
if (window.goN2LibMon) goN2LibMon.endLoad('explorer');
} // END library code wrapper
n2RunIfLoaded("multipanepopover", n2ExplorerInitLibrary, "explorer");