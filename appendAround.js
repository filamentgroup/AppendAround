/*! appendAround markup pattern. [c]2012, @scottjehl, Filament Group, Inc. MIT/GPL 
how-to:
	1. Insert potential element containers throughout the DOM
	2. give each container a data-set attribute with a value that matches all other containers' values
	3. Place your appendAround content in one of the potential containers
	4. Call appendAround() on that element when the DOM is ready
*/
(function( $ ){
	$.fn.appendAround = function(options){
	  return this.each(function(){
      
	    var $self = $( this ),
	        att = "data-set",
	        $set = $( "["+ att +"='"+ $self.closest( "["+ att +"]" ).attr( att ) + "']" ),
	        $timer = null;
      
	    function appendToVisibleContainer(){
	      if( $self.is( ":hidden" ) ){
	        $self.appendTo( $set.filter( ":visible:eq(0)" ) );
	      }
	    }
	    
            // As resize is called constantly, it is likely a good idea to add a bit
            // of a buffer. Paul Irish does a good job summarizing the issue:
            // http://paulirish.com/2009/throttled-smartresize-jquery-event-handler/
            function bufferResize() {
                if ($timer != null)
                    clearTimeout($timer);
                $timer = setTimeout(appendToVisibleContainer, 100)
            }

            appendToVisibleContainer();
      
	    $(window).resize( (options && options.buffer == true) ? bufferResize : appendToVisibleContainer );
      
	  });
	};
}( jQuery ));