/*global UTILS, document, window, console, define, module*/
(function () {
	'use strict';
	
	/*
	 * @roadmap 
	 * - different content for different mediaqueries, data-sizes and data-target
	 * - https://raw.githubusercontent.com/aFarkas/lazysizes/gh-pages/lazysizes.js
	 * - browsers support - do not polyfill add/remove eventListener, matchMedia
	 */
	
	var options = {
            bp : '(min-width: 960px)',
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
		this.init();
	}
	
	ResponsiveLoader.prototype = {
		loadContent : function () {
			var self = this;
			window.removeEventListener('resize', self.conditionHandler);
			for (var i = 0; i < self.content.length; i++) {
				document.getElementById(self.content[i].target).innerHTML = self.content[i].html;
			}
			self.options.callback && self.options.callback();
		},
		preloadContent : function () {
			var content = [],
				scripts = document.getElementsByTagName('script');
			
			for (var i = 0; i < scripts.length; i++) {
				if (~scripts[i].className.indexOf(this.options.className)) {
					content.push({
						target: scripts[i].getAttribute('data-target'),
						html: scripts[i].innerHTML
					});
				}
			}
			this.content = content;
		},
		meetsCondition : function () {
			var self = this;
			return window.matchMedia(self.options.bp).matches;
		},
		checkCondition : function () {
			var self = this;
			if (!!self.meetsCondition()) {
				self.loadContent();
			}
		},
		init : function () {
			var self = this;
			this.preloadContent();
			if (!!this.content.length) {
				this.conditionHandler = this.checkCondition.bind(this);
				if (typeof window.matchMedia != 'undefined' || typeof window.msMatchMedia != 'undefined') {
					if (!!self.meetsCondition()) {
						self.loadContent();
					} else {
						window.addEventListener('resize', self.conditionHandler);
					}
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