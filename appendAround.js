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
	        $set = $( "["+ att +"='"+ $self.closest( "["+ att +"]" ).attr( att ) + "']" );
      
	    function appendToVisibleContainer(){
	      if( $self.is( ":hidden" ) ){
	        $self.appendTo( $set.filter( ":visible:eq(0)" ) );
	      }
	    }
            
	    $(window).resize(appendToVisibleContainer).trigger("resize");
      
	  });
	};
}( jQuery ));