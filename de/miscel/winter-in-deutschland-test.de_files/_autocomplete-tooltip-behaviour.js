
if(!window.jspackager || !jspackager.devmode){
//jquery.bgiframe
;(function($){$.fn.bgIframe=$.fn.bgiframe=function(s){if($.browser.msie&&parseInt($.browser.version,10)<7){s=$.extend({top:'auto',left:'auto',width:'auto',height:'auto',opacity:true,src:'javascript:false;'},s||{});var a=function(n){return n&&n.constructor==Number?n+'px':n},html='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+'style="display:block;position:absolute;z-index:-1;'+(s.opacity!==false?'filter:Alpha(Opacity=\'0\');':'')+'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':a(s.top))+';'+'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':a(s.left))+';'+'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':a(s.width))+';'+'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':a(s.height))+';'+'"/>';return this.each(function(){if($('> iframe.bgiframe',this).length==0)this.insertBefore(document.createElement(html),this.firstChild)})}return this}})(jQuery);
//jquery.tooltip
;(function($){var k,tTitle,tBody,tUrl,current,oldTitle,tID;$.fn.Tooltip=function(a){a=$.extend({},arguments.callee.defaults,a);if(!k){k=$('<div id="tooltip"><span><h3></h3><div id="tooltip-icon"></div><p class="body"></p><p class="url"></p></span></div>').hide().css({display:'none',position:'absolute',zIndex:"3000"}).appendTo('body');tTitle=$('h3',k);tBody=$('p.body',k);tUrl=$('p.url',k)}$(this).filter('[@title]').each(function(){this.tSettings=a}).bind("mouseover",save).bind("focus",save).bind("focus",handle).bind(a.event,handle);return this};function handle(a){if(this.tSettings.delay)tID=setTimeout(show,this.tSettings.delay);else show();if(this.tSettings.track)$('body').bind('mousemove',update);update(a);$(this).bind('mouseout',hide);$(this).bind('blur',hide)}function save(){if(this==current||!this.title)return;current=this;var b=$(this),settings=this.tSettings;var c=oldTitle=b.attr('title');b.attr('title','');if(settings.showBody){var d=c.split(settings.showBody);tTitle.html(d.shift());tBody.empty();for(var i=0,part;part=d[i];i++){if(i>0)tBody.append("<br/>");tBody.append(part)}if(tBody.html())tBody.show();else tBody.hide()}else{tTitle.html(c);tBody.hide()}var e=(b.attr('href')||b.attr('src'));if(settings.showURL&&e)tUrl.html(e.replace('http://','')).show();else tUrl.hide();if(settings.extraClass){k.addClass(settings.extraClass)}if(settings.fixPNG&&$.browser.msie){k.each(function(){if(this.currentStyle.backgroundImage!='none'){var a=this.currentStyle.backgroundImage;a=a.substring(5,a.length-2);$(this).css({'backgroundImage':'none','filter':"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='"+a+"')"})}})}}function show(){tID=null;k.show();update()}function update(a){if(current==null){$('body').unbind('mousemove',update);return}var b=k[0].offsetLeft;var c=k[0].offsetTop;if(a){var d=$(a.target);var e=d.get(0);if(e){var f=null;if(e.nodeName.toLowerCase()=='a'){f=d.children('img').get(0)}else if(e.nodeName.toLowerCase()=='img'){f=e}if(f){var g=/^.*\/([^/]+)\.[^.]+$/;g.exec(f.src);var h=RegExp.$1;if(h){$('#tooltip-icon').attr('class',h)}}var i=findPos($(a.target).get(0));b=i[0]+4;c=i[1]-k[0].offsetHeight-8;var j=viewport();if((b+k[0].offsetWidth)>(j.x+j.cx)){k.addClass('tooltip-r');b-=(k[0].offsetWidth-4)}else{k.removeClass('tooltip-r')}k.css({left:b+'px',top:c+'px'})}}}function viewport(){var e=document.documentElement||{},b=document.body||{},w=window;function min(){var v=Infinity;for(var i=0;i<arguments.length;i++){var n=arguments[i];if(n&&n<v)v=n}return v}return{x:w.pageXOffset||e.scrollLeft||b.scrollLeft||0,y:w.pageYOffset||e.scrollTop||b.scrollTop||0,cx:min(e.clientWidth,b.clientWidth,w.innerWidth),cy:min(e.clientHeight,b.clientHeight,w.innerHeight)}}function hide(){if(tID)clearTimeout(tID);current=null;k.hide();if(this.tSettings.extraClass){k.removeClass(this.tSettings.extraClass)}$(this).attr('title',oldTitle).unbind('mouseout',hide);if(this.tSettings.fixPNG&&$.browser.msie){k.each(function(){$(this).css({'filter':'',backgroundImage:''})})}}function findPos(a){var b=curtop=0;if(a.offsetParent){b=a.offsetLeft;curtop=a.offsetTop;while(a=a.offsetParent){b+=a.offsetLeft;curtop+=a.offsetTop}}return[b,curtop]}$.fn.Tooltip.defaults={delay:250,event:"mouseover",track:false,showURL:true,showBody:null,extraClass:null,fixPNG:false}})(jQuery);
//autocomplete
;function selectItem(a){}function formatItem(a){return a[0]}$.autocomplete=function(f,g){var h=this;var k=$(f).attr("autocomplete","off");if(g.inputClass){k.addClass(g.inputClass)}var l=document.createElement("div");var m=$(l);var n=findPos(f);m.hide().addClass(g.resultsClass).css({position:"absolute",top:(n.y+f.offsetHeight)+"px",left:n.x+"px"});m.focus(function(e){if(o){window.clearTimeout(o)}e.preventDefault();e.stopPropagation();f.focus()});$("body").append(l);f.autocompleter=h;f.lastSelected=k.val();var o=null;var r="";var t=-1;var u={};var w=false;k.keydown(function(e){switch(e.keyCode){case 38:e.preventDefault();moveSelect(-1);break;case 40:e.preventDefault();moveSelect(1);break;case 9:case 13:if(selectCurrent()){t=-1;e.preventDefault()}break;case 27:t=-1;hideResultsNow();break;default:t=-1;if(o){clearTimeout(o)}o=setTimeout(onChange,g.delay);break}}).blur(function(e){hideResults()});hideResultsNow();function onChange(){var v=k.val();if(v==r){return}r=v;if(v.length>=g.minChars){k.addClass(g.loadingClass);requestData(v,k.attr("name"));n=findPos(f);m.css({top:(n.y+f.offsetHeight)+"px",left:n.x+"px"})}else{k.removeClass(g.loadingClass);m.hide()}}function moveSelect(a){var b=$("li",l);if(!b){return}if(l.style.display=="none"){return}t+=a;if(t<0){t=0}else if(t>=b.size()){t=b.size()-1}b.removeClass("over");$(b[t]).addClass("over");if(b[t]&&b[t].scrollIntoView){b[t].scrollIntoView(false)}}function selectCurrent(){if(t<0){selectItem(null);return false}var a=$("li.over",l)[0];var b;if(!a){b=$("li",l);if(g.selectOnly){if(b.length==1){a=b[0]}}else if(g.selectFirst){a=b[0]}}if(a){selectItem(a);return true}else{return false}}function selectItem(a){if(!a){a=document.createElement("li");a.extra=[];a.selectValue=k.val()}var v=$.trim(a.selectValue?a.selectValue:a.innerHTML);f.lastSelected=v;r=v;m.html("");k.val(v);hideResultsNow();f.focus();if(f.form&&f.form.hitPreview){f.form.hitPreview()}if(g.onItemSelect){setTimeout(function(){g.onItemSelect(a)},1)}}function onClickItem(a){selectItem(a);t=-1}function hideResults(){if(o){clearTimeout(o)}o=setTimeout(hideResultsNow,200)}function hideResultsNow(){var v;if(o){clearTimeout(o)}k.removeClass(g.loadingClass);if(m.is(":visible")){m.hide()}if(g.mustMatch){v=k.val();if(v!=f.lastSelected){selectItem(null)}}}function receiveData(q,a){var b,iframe,resultLabel,inputWidth;if(a){b=null;if((b=dataToDom(a))==null){hideResultsNow();return false}k.removeClass(g.loadingClass);l.innerHTML="";m.css({height:"auto"});iframe=null;resultLabel=document.createElement("p");$(resultLabel).html(g.resultIntroText);m.append(resultLabel);if($.browser.msie){iframe=document.createElement('iframe');m.append(iframe)}inputWidth=f.offsetWidth-2;l.appendChild(b);m.css({width:inputWidth});m.show();if($.browser.msie){$resultList=m.find('> ul');$(iframe).css({width:(inputWidth-18),height:($resultList.height()-1)});$resultList.css({marginTop:-$resultList.height()});if(m.height()>=235){m.css({height:"235"})}else{m.css({height:"auto"})}}}else{hideResultsNow()}}function parseData(a){if(!a){return null}var b=[];var c=a.split(g.lineSeparator);var i,row;for(i=0;i<c.length;i++){row=$.trim(c[i]);if(row){b[b.length]=row.split(g.cellSeparator)}}return b}function dataToDom(a){var b=document.createElement("ul");var c=a.length;if(c==0){return null}var i,row,li,extra,j;for(i=0;i<c;i++){row=a[i];if(!row){continue}li=document.createElement("li");if(g.formatItem){li.innerHTML=g.formatItem(row,i,c);li.selectValue=row[0]}else{li.innerHTML=row[0]}extra=null;if(row.length>1){extra=[];for(j=1;j<row.length;j++){extra[extra.length]=row[j]}}li.extra=extra;b.appendChild(li);$(li).hover(function(){$("li",b).removeClass("over");$(this).addClass("over")},function(){$(this).removeClass("over")}).click(function(e){e.preventDefault();e.stopPropagation();onClickItem(this)})}return b}function requestData(q,b){if(!g.matchCase){q=q.toLowerCase()}var c=g.cacheLength?loadFromCache(q):null;if(c){receiveData(q,c)}else{$.get(makeUrl(q,b),function(a){a=filterData(q,parseData(a));receiveData(q,a)})}}function filterData(q,a){if(!q||!a||(q.length<g.minChars)){return null};if(!g.matchCase){q=q.toLowerCase()}var b=[];for(var i in a){var d=a[i];if(d&&d[0]&&matchSubset(d[0],q)){b[b.length]=d}}return b}function makeUrl(q,a){var b=g.url+"?"+(a||"q")+"="+encodeURIComponent(q);var i;for(i in g.extraParams){b+="&"+i+"="+g.extraParams[i]}return b}function loadFromCache(q){if(!q){return null}if(u[q]){return u[q]}var i,qs,c,csub,j,x,x0;if(g.matchSubset){for(i=q.length-1;i>=g.minChars;i--){qs=q.substr(0,i);c=u[qs];if(c){csub=[];for(j=0;j<c.length;j++){x=c[j];x0=x[0];if(matchSubset(x0,q)){csub[csub.length]=x}}return csub}}}return null}function matchSubset(s,a){if(!g.matchCase){s=s.toLowerCase()}var i=s.indexOf(a);if(i==-1){return false}return i==0||g.matchContains}this.flushCache=function(){u={}};this.setExtraParams=function(p){g.extraParams=p};function addToCache(q,a){if(!a||!q||!g.cacheLength){return}if(!u.length||u.length>g.cacheLength){u={};u.length=1}else if(!u[q]){u.length++}u[q]=a}function findPos(a){var b=a.offsetLeft||0;var c=a.offsetTop||0;a=a.offsetParent;while(a){b+=a.offsetLeft;c+=a.offsetTop;a=a.offsetParent}return{x:b,y:c}}};$.fn.autocomplete=function(b,c){c=c||{};c.url=b;c.resultIntroText=c.resultIntroText||"Vorschl&auml;ge zu Ihrer Sucheingabe:";c.inputClass=c.inputClass||"ac-input";c.resultsClass=c.resultsClass||"ac-results";c.lineSeparator=c.lineSeparator||"\n";c.cellSeparator=c.cellSeparator||"|";c.minChars=c.minChars||1;c.delay=c.delay||400;c.matchCase=c.matchCase||0;c.matchSubset=c.matchSubset||1;c.matchContains=c.matchContains||0;c.cacheLength=c.cacheLength||1;c.mustMatch=c.mustMatch||0;c.extraParams=c.extraParams||{};c.loadingClass=c.loadingClass||"ac-loading";c.selectFirst=c.selectFirst||false;c.selectOnly=c.selectOnly||false;this.each(function(){var a=this;new $.autocomplete(a,c)});return this};$.submitpreview=function(d,f,g){var h=this;var j=$(d).attr("submitpreview","off");var k=$(g);var l=true;var m=k.get(0).innerHTML;var n=null;var o=0;d.resetForm=resetForm;d.hitPreview=triggerPreview;j.keyup(function(e){switch(e.keyCode){case 9:case 13:case 27:case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:break;default:if(e.keyCode==8||e.keyCode>31){if(e.keyCode>111&&e.keyCode<124){}else{triggerPreview()}}break}}).blur(function(){});$("input,select,textarea",d).change(function(e){triggerPreview()});function triggerPreview(){if(n){clearTimeout(n)}n=setTimeout(onChange,f.delay)}function onChange(){if(!g){return}if(f.previewOnlyForValidForm){var b;$('input[type=text], select').filter('.required').each(function(){if(!this.value){b=true;return false}});if(b){if(!l){k.html(m).find('a').click(function(){j.submit();return false});l=true}return}}l=false;$.get(makeUrl(),function(a){if(f.system=="prototype"||document.location.href.indexOf('file:')==0){a=parseData(a);if(o>f.numberOfAllowedCriteria){k.empty();k.append(a[2])}else{k.empty();if(Math.random()>0.5){k.append(a[0])}else{k.append(a[1])}}}else{k.empty();k.append(a)}})}function makeUrl(){if(!d||!d.elements||!f.url){return}o=0;var a=f.url;for(var i=0;i<d.elements.length;i++){if(d.elements[i].type.toLowerCase()!="submit"){if($.trim(d.elements[i].value)){if(d.elements[i].type.toLowerCase()=="checkbox"||d.elements[i].type.toLowerCase()=="radio"){if(!d.elements[i].checked)continue}a+=o==0?"?":"&";a+=encodeURIComponent(d.elements[i].name)+"="+encodeURIComponent(d.elements[i].value);o++}}}var i;for(i in f.extraParams){a+="&"+i+"="+f.extraParams[i]}return a}function parseData(a){if(!a){return null}var b=[];var c=a.split(f.lineSeparator);var i,row;for(i=0;i<c.length;i++){row=$.trim(c[i]);if(row){b[b.length]=row}}return b}function resetForm(){l=true;d.reset();k.empty();k.append(m)}};$.fn.submitpreview=function(b,c,d){c=c||{};c.url=b;c.delay=c.delay||1000;c.lineSeparator=c.lineSeparator||"\n";this.each(function(){var a=this;new $.submitpreview(a,c,d)});return this};
//afteronload-starter
;(function($,l,p){function initPaymentValidation(){var b="Bitte w%E4hlen Sie einen Anbieter aus.";$('form.validate-selection').submit(function(){var a=$('input[type=radio]',this);if(a.length&&!a.filter(':checked').length){alert(unescape(b));return false}})}if($.browser.msie&&parseInt($.browser.version,10)<7){$('#nav li, #my-test-module li').hover(function(){$(this).addClass("hover");$('ul',this).each(function(i){if($(this).width()/16<12){$(this).width('12em')}})},function(){$(this).removeClass("hover")}).children('ul').bgiframe()}$("#ct-s-form input.fn-fr").keyup(function(e){switch(e.keyCode){case 9:case 13:case 27:case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:break;default:if(e.keyCode==8||e.keyCode>31){if(e.keyCode>111&&e.keyCode<124){}else{var v=this.value;if(v.length>0){if(this.form&&this.form.resetForm){document.forms['ct-s-form'].reset();this.value=v}}}}}}).blur(function(){});if($.fn.submitpreview){var g={system:"",delay:2000,numberOfAllowedCriteria:7,previewOnlyForValidForm:true};var h=$("#ct-s-form");h.submitpreview(aperto.paths.submitPreview,g,$("#ct-s-button"));var j=h.get(0);if(j&&j.hitPreview){$(window).bind('load',j.hitPreview)}}function enableAutoCompletion(a,b){if(!a){return}for(var i=0;i<a.length;i++){var c=$(a[i]);var d={minChars:3,matchSubset:1,matchContains:1,cacheLength:10,selectOnly:1,onItemSelect:selectItem,formatItem:formatItem};for(var n in b.options){d[n]=b.options[n]}var e=/ac-op-([^ -]+)-([^ ]+)/;var f=c.attr("class").split(" ");for(var k=0;k<f.length;k++){if(e.exec(f[k])){d[RegExp.$1]=RegExp.$2}}c.autocomplete(b.url,d)}}function initAutoComplete(){if($.fn.autocomplete){var a={"#ni-s.ac-me":{url:p.autoComplete,options:null},"#ct-s-form .ac-me":{url:p.autoCompleteCt,options:{extraParams:{prodCatId:$("#prodCatId").val()}}}};for(var i in a){enableAutoCompletion($(i),a[i])}}}function initTableHover(){$("table:not(.mod) thead th").hover(function(){if($(this).find("a strong").length){$("table tr.first th").removeClass("sorted2");$(this).addClass("sorted2")}},function(){$(this).removeClass('sorted2')});$("table:not(.mod) thead th.alt").hover(function(){if($(this).find("a").length){$("table tr.first th.alt").removeClass("sorted");$(this).addClass("sorted")}},function(){$(this).removeClass('sorted')});$('tbody.sort th:first-child:has(a), th.sort').hover(function(){$("table tbody th.sorted-l2").removeClass("sorted-l2");$(this).addClass("sorted-l2")},function(){$(this).removeClass('sorted-l2')})}function initPopupAllHelpLink(){$('#content a.nf-all-help').click(function(){if(window.opener){opener.location=$(this).attr("href");window.close()}else{location=$(this).attr("href")}return false})}function launchWindow(a,b,c,d){var e;if(b&&b.type=='keypress'){if(b.keyCode){e=b.keyCode}else if(b.which){e=b.which}if(e!=13&&e!=32){return true}}var f=window.open(a,'win','width='+(c?c:"475")+',height='+(d?d:"550")+',scrollbars=yes,resizable=yes');f.focus();return false}$.checkLinks=function(b){b=b||document;var c,linkTitlePrefix,linkTitleHint,i,rel;if(b.getElementsByTagName){c=b.getElementsByTagName('a');for(i=0;i<c.length;i++){rel=c[i].getAttribute('rel');if(c[i].getAttribute('href')&&(rel&&rel.indexOf('popup')!=-1)){c[i].onclick=function(a){return launchWindow(this,a)};c[i].onkeypress=function(a){return launchWindow(this,a)}}}}};function onWindowComplete(){if($.fn.Tooltip){$('a.img-info').Tooltip({track:false,delay:0,showURL:false});$('#tooltip').bgiframe()}initAutoComplete();initPaymentValidation();initTableHover();initPaymentSelectLinks();$.checkLinks();initPopupAllHelpLink()}if(apertoWindowLoaded){onWindowComplete()}else{$(window).load(onWindowComplete)}})(jQuery,aperto.lang,aperto.paths);
}// END !jspackager.devmode