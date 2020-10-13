/**
 * Created by admin on 17/5/14.
 */
function moveVertical(elem,targetTop)
{
    var top = elem.Xtop
    //console.log(targetTop,elem.Xtop)
    function frame() {
        if(elem.Xtop<targetTop)
        {
            top++;  // update parameters
        }
        else
        {
            top--;
        }
        elem.style.top = top + 'px' // show frame

        if (top == targetTop)
        {
            clearInterval(id);
            elem.Xtop = top;
        }// check finish condition

    }
    var id = setInterval(frame, 10) // draw every 10ms
}