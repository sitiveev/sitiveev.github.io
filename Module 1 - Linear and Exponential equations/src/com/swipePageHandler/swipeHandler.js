/**
 * Created by admin on 4/3/14.
 */
function addSwipeEvents()
{
    console.log('ullas swipe event added');
    $( document ).on( "swipeleft", ".innerContDiv", function( event ) {
        // Get the filename of the next page. We stored that in the data-next
        // attribute in the original markup.
        console.log('left swiped');
        //changePage(1);
        var next = $( this ).jqmData( "next" );
        // Check if there is a next page and
        // swipes may also happen when the user highlights text, so ignore those.
        // We're only interested in swipes on the page.
        if ( next && ( event.target === $( this )[ 0 ] ) ) {
           // navnext( next );
        }
    });


// The same for the navigating to the previous page
    $( document ).on( "swiperight", ".innerContDiv", function( event ) {
        var prev = $( this ).jqmData( "prev" );
        //changePage(-1);
        if ( prev && ( event.target === $( this )[ 0 ] ) ) {
           // navprev( prev );
        }
    });

}
