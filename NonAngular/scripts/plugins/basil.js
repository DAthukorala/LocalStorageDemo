!function(){var e=function(n){return e.utils.extend({},e.plugins,(new e.Storage).init(n))};e.version="0.4.10",e.utils={extend:function(){for(var e="object"==typeof arguments[0]?arguments[0]:{},n=1;n<arguments.length;n++)if(arguments[n]&&"object"==typeof arguments[n])for(var t in arguments[n])e[t]=arguments[n][t];return e},each:function(e,n,t){if(this.isArray(e)){for(var i=0;i<e.length;i++)if(!1===n.call(t,e[i],i))return}else if(e)for(var r in e)if(!1===n.call(t,e[r],r))return},tryEach:function(e,n,t,i){this.each(e,function(e,r){try{return n.call(i,e,r)}catch(n){if(this.isFunction(t))try{t.call(i,e,r,n)}catch(e){}}},this)},registerPlugin:function(n){e.plugins=this.extend(n,e.plugins)},getTypeOf:function(e){return void 0===e||null===e?""+e:Object.prototype.toString.call(e).replace(/^\[object\s(.*)\]$/,function(e,n){return n.toLowerCase()})}};for(var n=["Arguments","Boolean","Function","String","Array","Number","Date","RegExp","Undefined","Null"],t=0;t<n.length;t++)e.utils["is"+n[t]]=function(n){return function(t){return e.utils.getTypeOf(t)===n.toLowerCase()}}(n[t]);e.plugins={},e.options=e.utils.extend({namespace:"b45i1",storages:["local","cookie","session","memory"],expireDays:365,keyDelimiter:"."},window.Basil?window.Basil.options:{}),e.Storage=function(){var n="b45i1"+(Math.random()+1).toString(36).substring(7),t={},i=function(n){var t=e.utils.getTypeOf(n);return"string"===t&&n||"number"===t||"boolean"===t},r=function(n){return e.utils.isArray(n)?n:e.utils.isString(n)?[n]:[]},o=function(n,t,r){var o="";return i(t)?o+=t:e.utils.isArray(t)&&(o=(t=e.utils.isFunction(t.filter)?t.filter(i):t).join(r)),o&&i(n)?n+r+o:o},s=function(e,n,t){return i(e)?n.replace(new RegExp("^"+e+t),""):n},u={engine:null,check:function(){try{window[this.engine].setItem(n,!0),window[this.engine].removeItem(n)}catch(e){return!1}return!0},set:function(e,n,t){if(!e)throw Error("invalid key");window[this.engine].setItem(e,n)},get:function(e){return window[this.engine].getItem(e)},remove:function(e){window[this.engine].removeItem(e)},reset:function(e){for(var n,t=0;t<window[this.engine].length;t++)n=window[this.engine].key(t),e&&0!==n.indexOf(e)||(this.remove(n),t--)},keys:function(e,n){for(var t,i=[],r=0;r<window[this.engine].length;r++)t=window[this.engine].key(r),e&&0!==t.indexOf(e)||i.push(s(e,t,n));return i}};return t.local=e.utils.extend({},u,{engine:"localStorage"}),t.session=e.utils.extend({},u,{engine:"sessionStorage"}),t.memory={_hash:{},check:function(){return!0},set:function(e,n,t){if(!e)throw Error("invalid key");this._hash[e]=n},get:function(e){return this._hash[e]||null},remove:function(e){delete this._hash[e]},reset:function(e){for(var n in this._hash)e&&0!==n.indexOf(e)||this.remove(n)},keys:function(e,n){var t=[];for(var i in this._hash)e&&0!==i.indexOf(e)||t.push(s(e,i,n));return t}},t.cookie={check:function(e){if(!navigator.cookieEnabled)return!1;if(window.self!==window.top){var t="thirdparty.check="+Math.round(1e3*Math.random());return document.cookie=t+"; path=/",-1!==document.cookie.indexOf(t)}if(e&&e.secure)try{this.set(n,n,e);var i=this.get(n)===n;return this.remove(n),i}catch(e){return!1}return!0},set:function(e,n,t){if(!this.check())throw Error("cookies are disabled");if(t=t||{},!e)throw Error("invalid key");var i=encodeURIComponent(e)+"="+encodeURIComponent(n);if(t.expireDays){var r=new Date;r.setTime(r.getTime()+24*t.expireDays*60*60*1e3),i+="; expires="+r.toGMTString()}if(t.domain&&t.domain!==document.domain){var o=t.domain.replace(/^\./,"");if(-1===document.domain.indexOf(o)||o.split(".").length<=1)throw Error("invalid domain");i+="; domain="+t.domain}!0===t.secure&&(i+="; Secure"),document.cookie=i+"; path=/"},get:function(e){if(!this.check())throw Error("cookies are disabled");for(var n,t=encodeURIComponent(e),i=document.cookie?document.cookie.split(";"):[],r=i.length-1;r>=0;r--)if(0===(n=i[r].replace(/^\s*/,"")).indexOf(t+"="))return decodeURIComponent(n.substring(t.length+1,n.length));return null},remove:function(e){this.set(e,"",{expireDays:-1});for(var n=document.domain.split("."),t=n.length;t>1;t--)this.set(e,"",{expireDays:-1,domain:"."+n.slice(-t).join(".")})},reset:function(e){for(var n,t,i=document.cookie?document.cookie.split(";"):[],r=0;r<i.length;r++)t=(n=i[r].replace(/^\s*/,"")).substr(0,n.indexOf("=")),e&&0!==t.indexOf(e)||this.remove(t)},keys:function(e,n){if(!this.check())throw Error("cookies are disabled");for(var t,i,r=[],o=document.cookie?document.cookie.split(";"):[],u=0;u<o.length;u++)t=o[u].replace(/^\s*/,""),i=decodeURIComponent(t.substr(0,t.indexOf("="))),e&&0!==i.indexOf(e)||r.push(s(e,i,n));return r}},{init:function(e){return this.setOptions(e),this},setOptions:function(n){this.options=e.utils.extend({},this.options||e.options,n)},support:function(e){return t.hasOwnProperty(e)},check:function(e){return!!this.support(e)&&t[e].check(this.options)},set:function(n,i,s){if(s=e.utils.extend({},this.options,s),!(n=o(s.namespace,n,s.keyDelimiter)))return!1;var u;i=!0===s.raw?i:(u=i,JSON.stringify(u));var a=null;return e.utils.tryEach(r(s.storages),function(e,r){return t[e].set(n,i,s),a=e,!1},null,this),!!a&&(e.utils.tryEach(r(s.storages),function(e,i){e!==a&&t[e].remove(n)},null,this),!0)},get:function(n,i){if(i=e.utils.extend({},this.options,i),!(n=o(i.namespace,n,i.keyDelimiter)))return null;var s=null;return e.utils.tryEach(r(i.storages),function(e,r){if(null!==s)return!1;var o;s=t[e].get(n,i)||null,s=!0===i.raw?s:(o=s)?JSON.parse(o):null},function(e,n,t){s=null},this),s},remove:function(n,i){i=e.utils.extend({},this.options,i),(n=o(i.namespace,n,i.keyDelimiter))&&e.utils.tryEach(r(i.storages),function(e){t[e].remove(n)},null,this)},reset:function(n){n=e.utils.extend({},this.options,n),e.utils.tryEach(r(n.storages),function(e){t[e].reset(n.namespace)},null,this)},keys:function(e){e=e||{};var n=[];for(var t in this.keysMap(e))n.push(t);return n},keysMap:function(n){n=e.utils.extend({},this.options,n);var i={};return e.utils.tryEach(r(n.storages),function(r){e.utils.each(t[r].keys(n.namespace,n.keyDelimiter),function(n){i[n]=e.utils.isArray(i[n])?i[n]:[],i[n].push(r)},this)},null,this),i}}},e.memory=(new e.Storage).init({storages:"memory",namespace:null,raw:!0}),e.cookie=(new e.Storage).init({storages:"cookie",namespace:null,raw:!0}),e.localStorage=(new e.Storage).init({storages:"local",namespace:null,raw:!0}),e.sessionStorage=(new e.Storage).init({storages:"session",namespace:null,raw:!0}),window.Basil=e,"function"==typeof define&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports&&(module.exports=e)}();