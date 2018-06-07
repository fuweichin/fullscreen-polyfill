/*!
 * fullscreen-polyfill 0.1.0
 * Author: Fuwei Chin
 * Licence: Apache Licence 2.0
 */
(function(){
	"use strict";
	var appName=(navigator.userAgent.match(/(Firefox|Edge|Chrome|Safari|Trident)\/[\d.]+/)||["","Unknown"])[1];
	var MSEvent=null;
	if(appName=="Trident"){
		MSEvent=function(type,init){
			var event=document.createEvent("Event");
			var opts=Object(init);
			event.initEvent(type,opts.bubbles,opts.cancelable);
			return event;
		};
		MSEvent.prototype=Event.prototype;
		MSEvent.prototype.constructor=MSEvent;
	}
	//====== Properties ======
	if(!("fullscreenEnabled" in document)){
		Object.defineProperty(Document.prototype,"fullscreenEnabled",{
			configurable:true,
			enumerable:true,
			get: function(){
				switch(appName){
				case "Edge":
				case "Chrome":
				case "Safari":
					return this.webkitFullscreenEnabled;
				case "Firefox":
					return this.mozFullScreenEnabled;
				case "Trident":
					return this.msFullscreenEnabled;
				}
			}
		});
		Object.defineProperty(Document.prototype,"fullscreen",{
			configurable:true,
			enumerable:true,
			get: function(){
				switch(appName){
				case "Edge":
				case "Chrome":
				case "Safari":
					return this.webkitIsFullScreen;
				case "Firefox":
					return this.mozFullScreen;
				case "Trident":
					return this.msFullscreenElement!=null;
				}
			}
		});
		Object.defineProperty(Document.prototype,"fullscreenElement",{
			configurable:true,
			enumerable:true,
			get: function(){
				switch(appName){
				case "Edge":
				case "Chrome":
				case "Safari":
					return this.webkitFullscreenElement;
				case "Firefox":
					return this.mozFullScreenElement;
				case "Trident":
					return this.msFullscreenElement;
				}
			}
		});
	}
	//====== Methods ======
	if(!("requestFullscreen" in document.documentElement)){
		Object.defineProperty(Element.prototype,"requestFullscreen",{
			configurable:true,
			enumerable:true,
			value: function(){
				switch(appName){
				case "Edge":
				case "Chrome":
				case "Safari":
					return this.webkitRequestFullscreen();
				case "Firefox":
					return this.mozRequestFullScreen();
				case "Trident":
					return this.msRequestFullscreen();
				}
			}
		});
		Object.defineProperty(Document.prototype,"exitFullscreen",{
			configurable:true,
			enumerable:true,
			value: function(){
				switch(appName){
				case "Edge":
				case "Chrome":
				case "Safari":
					return this.webkitExitFullscreen();
				case "Firefox":
					return this.mozCancelFullScreen();
				case "Trident":
					return this.msExitFullscreen();
				}
			}
		});
	}
	//====== Events ======
	if(!("onfullscreenchange" in document)){
		Object.defineProperty(Document.prototype,"onfullscreenchange",{
			configurable:true,
			enumerable:true,
			set: function(handler){
				switch(appName){
				case "Edge":
				case "Chrome":
				case "Safari":
					this.onwebkitfullscreenchange=handler;
					break;
				case "Firefox":
					this.onmozfullscreenchange=handler;
					break;
				case "Trident":
					if(this.onmsfullscreenchange!=null){
						if(this.onmsfullscreenchange==handler)
							break;
						this.removeEventListener("MSFullscreenChange",this.onmsfullscreenchange);
					}
					if(typeof handler=="function"){
						this.addEventListener("MSFullscreenChange",handler);
					}
					break;
				}
			},
			get:function(){
				switch(appName){
				case "Edge":
				case "Chrome":
				case "Safari":
					return this.onwebkitfullscreenchange;
				case "Firefox":
					return this.onmozfullscreenchange;
				case "Trident":
					return this.onmsfullscreenchange;
				}
			}
		});
		Object.defineProperty(Document.prototype,"onfullscreenerror",{
			configurable:true,
			enumerable:true,
			set: function(handler){
				switch(appName){
				case "Edge":
				case "Chrome":
				case "Safari":
					this.onwebkitfullscreenchange=handler;
				case "Firefox":
					this.onmozfullscreenchange=handler;
				case "Trident":
					if(this.onmsfullscreenerror!=null){
						if(this.onmsfullscreenerror==handler)
							break;
						this.removeEventListener("MSFullscreenError",this.onmsfullscreenerror);
					}
					if(typeof handler=="function"){
						this.addEventListener("MSFullscreenError",handler);
					}
					break;
				}
			},
			get:function(){
				switch(appName){
				case "Edge":
				case "Chrome":
				case "Safari":
					return this.onwebkitfullscreenerror;
				case "Firefox":
					return this.onmozfullscreenerror;
				case "Trident":
					return this.onmsfullscreenerror||null;
				}
			}
		});
		switch(appName){
		case "Edge":
		case "Chrome":
		case "Safari":
			document.addEventListener("webkitfullscreenchange",function(e){
				var event=new Event("fullscreenchange",e);
				this.dispatchEvent(event);
			});
			document.addEventListener("webkitfullscreenerror",function(e){
				var event=new Event("fullscreenerror",e);
				this.dispatchEvent(event);
			});
			break;
		case "Firefox":
			document.addEventListener("mozfullscreenchange",function(e){
				var event=new Event("fullscreenchange",e);
				this.dispatchEvent(event);
			});
			document.addEventListener("mozfullscreenerror",function(e){
				var event=new Event("fullscreenerror",e);
				this.dispatchEvent(event);
			});
			break;
		case "Trident":
			document.addEventListener("MSFullscreenChange",function(e){
				var event=new MSEvent("fullscreenchange",e);
				this.dispatchEvent(event);
			});
			document.addEventListener("MSFullscreenError",function(e){
				var event=new MSEvent("fullscreenerror",e);
				this.dispatchEvent(event);
			});
			break;
		}
	}
})();