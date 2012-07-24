/*! appendAround markup pattern. [c]2012, @scottjehl, Filament Group, Inc. MIT/GPL 
how-to:
	1. Insert potential element containers throughout the DOM
	2. give each container a data-set attribute with a value that matches all other containers' values
	3. Place your appendAround content in one of the potential containers
	4. Call appendAround() on that element when the DOM is ready
	
	appendAround supports two options:
	 - buffer: enable resize call buffering (boolean, default: true, first call only)
	 - timeout: ms to wait for resize call buffering (int, default: 100)
	
	To disable the buffer: appendAround({buffer: false})
	To change the timeout: appendAround({timeout: 250})
*/
(function( $ ){
        var $$resize_callback_set = false,
            $$timeout = 100,
            $$timer = null,
            $$callbacks = [];

	$.fn.appendAround = function(opts){
	  return this.each(function(){
      
	    var $self = $( this ),
	        att = "data-set",
	        $set = $( "["+ att +"='"+ $self.closest( "["+ att +"]" ).attr( att ) + "']" );
      
	    function appendToVisibleContainer(){
	      if( $self.is( ":hidden" ) ){
	        $self.appendTo( $set.filter( ":visible:eq(0)" ) );
	      }
	    }
      
	    appendToVisibleContainer();
            addResizeListener(appendToVisibleContainer);
            
            if ($$resize_callback_set == false)
            {
            	$(window).resize( (opts && opts.buffer == false) ? callResizeListeners : bufferResize );
            	$$resize_callback_set = true;
            }
            
            if (opts && opts.timeout)
              $$timeout = opts.timeout
	  });
	};
	
        // As resize is called constantly, it is likely a good idea to add a bit
        // of a buffer. Paul Irish does a good job summarizing the issue:
        // http://paulirish.com/2009/throttled-smartresize-jquery-event-handler/
        function bufferResize() {
          if ($$timer != null)
            clearTimeout($$timer);
          $$timer = setTimeout(callResizeListeners, $$timeout)
        }

        function callResizeListeners()
        {
          for (var i in $$callbacks)
            $$callbacks[i]();
        }

        function addResizeListener(listener)
        {
          $$callbacks[$$callbacks.length] = listener;
        }
}( jQuery ));