/*! appendAround markup pattern. [c]2012, @scottjehl, Filament Group, Inc. MIT/GPL
  how-to:
  1. Insert potential element containers throughout the DOM
  2. give each container a data-set attribute with a value that matches all other containers' values
  3. Place your appendAround content in one of the potential containers
  4. Call appendAround() on that element when the DOM is ready
  */
(function(global) {
	global.appendAround = function(selector) {
		var elems, current, parent, att, attval, set;

		function isHidden(elem) {
			return window.getComputedStyle(elem, null).getPropertyValue('display') === 'none';
		}

		function appendToVisibleContainer() {
			if ( isHidden(parent) ) {
				for ( var i = 0; i < set.length; i++ ) {
					if ( !isHidden(set[i]) ) {
						parent = set[i];
						parent.appendChild(current);
						break;
					}
				}
			}
		}

		elems = document.querySelectorAll(selector);
		for ( var i = 0; i < elems.length; i++ ) {
			current = elems[i];
			parent = current.parentNode;
			att = 'data-set';
			attval = parent.getAttribute(att);
			set = document.querySelectorAll('[' + att + '=' + attval + ']');

			appendToVisibleContainer();
			window.addEventListener('resize', appendToVisibleContainer);
		}
	};
})(window);
