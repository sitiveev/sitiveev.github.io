/**
 * Created by admin on 23/3/14.
 */
var marginSide, marginBetween, ratioDiv;
layoutManager = function (val,typeObj) {
    val = Number(val)
    if (val == 0.5) {
        if(headerInfo[2] < 734)
        {
            return headerInfo[2] - 20;
        }
        else
        {
            /*if(typeObj=="image")
            {
                return (headerInfo[2]-35) / 2 * (headerInfo[2]/960);
            }
            else
            {
                return headerInfo[2]- 35 - ((headerInfo[2] - 35) * (headerInfo[2]/960) / 2);
            }*/
            return (headerInfo[2]-35) / 2;
        }
    }
    if(val == 0.33 || val == 0.67)
    {
        if(headerInfo[2] < 700)
        {
            return headerInfo[2] - 20;
        }
        else
        {
            return (headerInfo[2]-35)*val;
        }
    }
    if(val==1)
    {
        return headerInfo[2] - 20;
    }
    if(val == 0.25 || val == .75)
    {
        if(headerInfo[2] < 700)
        {
            return headerInfo[2] - 20;
        }
        else
        {
            return (headerInfo[2]-35)*val;
        }
    }
    if(val == 0.36 || val == 0.64)
    {
        if(headerInfo[2] <= 768)
        {
            return headerInfo[2] - 20;
        }
        else
        {
            return (headerInfo[2]-35)*val;
        }
    }
    else
    {
        if(headerInfo[2] <= 768)
        {
            return headerInfo[2] - 20;
        }
        else
        {
            return (headerInfo[2]-35)*val;
        }
    }

};


layoutPopupManager = function (val,widthPop) {
    val = Number(val)
    if (val == 0.5) {
        if(headerInfo[2] < 734)
        {
            return widthPop - 20;
        }
        else
        {
            return (widthPop-35) / 2;
        }
    }
    if(val == 0.33 || val == 0.67)
    {
        if(headerInfo[2] < 700)
        {
            return widthPop - 20;
        }
        else
        {
            return (widthPop-35)*val;
        }
    }
    if(val == 0.25 || val == 0.75)
    {
        if(headerInfo[2] < 700)
        {
            return widthPop - 20;
        }
        else
        {
            return (widthPop-35)*val;
        }
    }
    if(val==1)
    {
        return widthPop - 20;
    }
}
