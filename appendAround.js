/*! appendAround markup pattern. [c]2012, @scottjehl, Filament Group, Inc. MIT/GPL
 how-to:
 1. Insert potential element containers throughout the DOM
 2. give each container a data-set attribute with a value that matches all other containers' values
 3. Place your appendAround content in one of the potential containers
 4. Call appendAround() on that element when the DOM is ready
 */
(function( $ ){
	$.fn.appendAround = function(){
		return this.each(function(){

			var $self = $( this ),
				att = "data-set",
				$parent = $self.parent(),
				parent = $parent[ 0 ],
				attval = $parent.attr( att ),
				$set = $( "["+ att +"='" + attval + "']" ),
				$isIE11 = !!(window.navigator.userAgent.match(/Trident/) && window.navigator.userAgent.match(/rv.11/));

			function isHidden( elem ){
				return $(elem).css( "display" ) === "none";
			}


			function _appendToVisibleContainer(){
				if( isHidden( parent ) ){
					var found = 0;
					$set.each(function(){
						if( !isHidden( this ) && !found ){
							$self.appendTo( this );
							found++;
							parent = this;
						}
					});
				}
			}

			function appendToVisibleContainer(){

				if ($isIE11){
					setTimeout(function(){
						_appendToVisibleContainer();

					}, 100);
				} else {
					_appendToVisibleContainer();
				}
			}

			appendToVisibleContainer();

			$(window).bind( "resize", appendToVisibleContainer );

		});
	};
}( jQuery ));