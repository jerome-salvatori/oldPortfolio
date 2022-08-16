function forceScroll() {
    document.addEventListener('touchstart', handleTouchStart, false);        
    document.addEventListener('touchmove', handleTouchMove, false);

    //var xDown = null;                                                        
    var yDown = null;

    function getTouches(evt) {
      return evt.touches ||             // browser API
             evt.originalEvent.touches; // jQuery
    }                                                     

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];                                      
        //xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;                                      
    };                                                

    var faces = ["front", "back", "right"];

    function handleTouchMove(evt) {
        //if ( ! xDown || ! yDown ) {
        if (! yDown ) {
            return;
        }

        //var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;

        //var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        //if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            //if ( xDiff > 0 ) {
                /* right swipe */ 
            //} else {
                /* left swipe */
            //}                       
        //} else {
            //if ( yDiff > 0 ) {
                /* down swipe */ 
            //} else { 
                /* up swipe */
            //}                                                                 
        //}
        var face = $("#active-face").val();
        //if ( yDiff > 0 &&  faces.includes(face)) {
        if (faces.includes(face)) {
            face = "." + face;
            console.log($(face).scrollTop());
            $(face).animate({
                scrollTop: $(face).scrollTop() + (yDiff * 20)
            });
        }// else if (faces.includes(face)) { 
            /* up swipe */
        //}      
        /* reset values */
        //xDown = null;
        yDown = null;                                             
    };
}
