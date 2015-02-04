/*global UTILS, document, window, console, define, module*/
(function () {
	'use strict';
	
	var options = {
			className : 'responsive-loader',
			callback : false
		},
		UTILS = {
			extend : function () {
				for(var i = 1; i < arguments.length; i++) {
					for(var key in arguments[i]) {
						if(arguments[i].hasOwnProperty(key)) {
							arguments[0][key] = arguments[i][key];
						}
					}
				}
				return arguments[0];
			}
		};
	
	function ResponsiveLoader(o) {
		this.options = UTILS.extend({}, options, o);
		this.loadCount = 0;
		this.init();
	}
	
	ResponsiveLoader.prototype = {
		loadContent : function (i) {
			var self = this;
			this.loadCount++;
			document.getElementById(self.content[i].target).innerHTML = self.content[i].html;
			self.content[i].loaded = true;
			if(this.loadCount === (this.content.length)) {
				window.removeEventListener('resize', self.conditionHandler, false);
			}
			self.options.callback && self.options.callback(self.content[i].target);
		},
		preloadContent : function () {
			var content = [],
				scripts = document.getElementsByTagName('script');
			
			for (var i = 0; i < scripts.length; i++) {
				if (~scripts[i].className.indexOf(this.options.className)) {
					content.push({
						target: scripts[i].getAttribute('data-target'),
						html: scripts[i].innerHTML,
						mq: scripts[i].getAttribute('data-media-query'),
						loaded: false
					});
				}
			}
			this.content = content;
		},
		meetsCondition : function (mq) {
			var self = this;
			return window.matchMedia(mq).matches;
		},
		checkCondition : function () {
			var self = this;
			for (var i = 0; i < self.content.length; i++) {
				if (!self.content[i].loaded && !!self.meetsCondition(self.content[i].mq)) {
					self.loadContent(i);
				}
			}
		},
		init : function () {
			var self = this;
			this.preloadContent();
			if (!!this.content.length) {
				this.conditionHandler = this.checkCondition.bind(this);
				if (typeof window.matchMedia != 'undefined' || typeof window.msMatchMedia != 'undefined') {
					this.conditionHandler();
					window.addEventListener('resize', self.conditionHandler, false);
				} else {
					self.loadContent();
				}
			}
		}
	};
	
	ResponsiveLoader.run = function(options) {
		return new ResponsiveLoader(options);
	};

	if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
		define(function() {
			return ResponsiveLoader;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = ResponsiveLoader.attach;
		module.exports.ResponsiveLoader = ResponsiveLoader;
	} else {
		window.ResponsiveLoader = ResponsiveLoader;
	}
}());