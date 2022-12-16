//document.body.addEventListener("mouseover", updateDiv, false);
var shotgun = document.getElementById('shotgun');
var svg = document.getElementById('svg');

var cursorX;
var cursorY;
document.onmousemove = function (e) {
    cursorX = (e.pageX / window.innerWidth);
    cursorY = (e.pageY / window.innerHeight)*100;
    posY = (Math.abs(cursorY-100));
    
    let shotWidthPx = window.getComputedStyle(shotgun).getPropertyValue("width");
    
    let shotWidth = (parseInt(shotWidthPx.replace(/px/,"")));

    svg.style.transform =  "translateX(-10px) scaleY(" + posY + "%)";
    shotgun.style.transform = "translateX("+window.innerWidth/2+"px) rotate("+(cursorX-0.5)*50+"deg)";
    
}

