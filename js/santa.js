//document.body.addEventListener("mouseover", updateDiv, false);
var shotgun = document.getElementById('shotgun');
var svg = document.getElementById('svg');

var cursorX;
var cursorY;
document.onmousemove = function (e) {
    cursorX = (e.pageX / window.innerWidth);
    cursorY = (e.pageY / window.innerHeight);
    posY = (Math.abs(cursorY - 1));


    //let shotWidth = (parseInt(shotWidthPx.replace(/px/,"")));

    svg.style.transform = "translateX(-10px) scaleY(" + posY * 100 + "%)";
    shotgun.style.transform = "translateX(" + window.innerWidth / 2 + "px) rotate(" + (cursorX - 0.5) * 50 + "deg)";

    var crosshair = document.getElementById('crosshair');
    crosshair.style.left = "calc(" + e.pageX + "px - " + crosshair.width / 2 + "px)";
    crosshair.style.top = "calc(" + e.pageY + "px - " + crosshair.height / 2 + "px)";
    crosshair.style.display = "block";
    crosshair.setAttribute('draggable', false);

}

document.onmousedown = function (e) {
    let ball = document.createElement("div");
    ball.className = "ball";

    let style = document.createElement('style');
    style.type = 'text/css';
    let keyFrames = '\
@-webkit-keyframes travel {\
    0% {\
        left: 50%;\
        top: 100%;\
        transform: scale(1, 1);\
    }\
    80% {\
        transform: scale(1.5, 1.5);\
    }\
    100% {\
        left: dynamX;\
        top: dynamY;\
        transform: scale(0.8, 0.8);\
    }\
}';

    var width = getComputedStyle(document.documentElement)
        .getPropertyValue('--width');
    let dynamX = (((e.pageX - (width/2)) / window.innerWidth) * 100) + "%";
    let dynamY = (((e.pageY - (width / 2)) / window.innerHeight) * 100) + "%";
    style.innerHTML = keyFrames.replace(/dynamX/g, dynamX).replace(/dynamY/g, dynamY);
    document.getElementsByTagName('head')[0].appendChild(style);


    //ball.style.animation = "travel 1s cubic-bezier(0,0,0,1.8)";
    ball.style.animation = "travel 1s ease-out";
    document.body.appendChild(ball);
}


