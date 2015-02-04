#Responsive Loader
A javascript module to conditionally load any DOM elements based on media query.

##What?
Load mobile-friendly components on small devices, and a more robust or heavier-load component on desktops.

##How?
Include the module and use script tags to markup your conditional content in HTML, set the class of the script element (default 'responsive-loader') add a data-target atttribute to set the id of the target HTML element, and a data-media-query attribute to set the media query condition.

For example:

```
<script src="/js/responsiveLoader.min.js"></script>
<script>ResponsiveLoader.run();</script>
```

```html
<div id="example-1">
	<script type="text/conditional-html" class="responsive-loader" data-target="example-1" data-media-query='(min-width:30em)'>
		<h1>Text at min-width:30em</h1>
	</script>
</div>
<div id="example-2">
	<script type="text/conditional-html" class="responsive-loader" data-target="example-1" data-media-query='(min-width:48em)'>
		<h1>Text at min-width:48em</h1>
	</script>
</div>
```

##Options
className - type: String, default: 'responsive-loader', description: className that identifies content to be condtionally loaded
callback - type: function, default: false, description: Function called when content is loaded

##Requirements
No dependencies. Uses addEventListener, removeEventLister and matchMedia; which must be polyfilled for use with non-modern browsers. Browsers without matchMedia do not cut the mustard and all conditional content is loaded.

##Roadmap
Add data-callback support for individual callbacks on conditional content