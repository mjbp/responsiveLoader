/*global UTILS, document, window, console, define, module*/
(function () {
	'use strict';
	
	var options = {
            bp : '(min-width: 960px)',
			className : 'responsive-loader',
			callback : false
       	};
	
	function ResponsiveLoader(o) {
		this.options = UTILS.extend({}, options, o);
		this.init();
	}
	
	ResponsiveLoader.prototype = {
		loadContent : function () {
			var self = this;
			UTILS.off(window, 'resize', self.conditionHandler);
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
						UTILS.on(window, 'resize', self.conditionHandler);
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