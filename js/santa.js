//document.body.addEventListener("mouseover", updateDiv, false);
var shotgun = document.getElementById('shotgun');
var svg = document.getElementById('svg');

var cursorX;
var cursorY;
document.onmousemove = function (e) {
    cursorX = e.pageX;
    cursorY = e.pageY;
    posY = Math.abs(1000-cursorY);

    //let ver = window.getComputedStyle(svg).getPropertyValue("left")
    //let newPosX = (cursorX-(parseInt(ver.replace(/px/,""))));

    svg.style.transform =  "translateX(-10px) scaleY(" + posY/8 + "%)";
    shotgun.style.transform = "translateX("+cursorX+"px)";

}

