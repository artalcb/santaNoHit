//document.body.addEventListener("mouseover", updateDiv, false);
var shotgun = document.getElementById('shotgun');
var svg = document.getElementById('svg');
var width = getComputedStyle(document.documentElement)
    .getPropertyValue('--width');



document.onmousemove = function (e) {
    let cursorX;
    let cursorY;
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



const MAX_BALLS = 5;
var array = new Array(MAX_BALLS).fill(true, 0, MAX_BALLS);
document.onmousedown = function (e) {
    if (array.indexOf(true) >= 0) {
       
        let indexBall = array.indexOf(true);
        console.log(array.filter(x => x==true).length);
        array[indexBall]=false;
        updateLives();
        let ball = document.createElement("div");
        ball.className = "ball";
        ball.style.position = "absolute";

        let style = document.createElement('style');
        let keyFrames = '\
@-webkit-keyframes travel'+indexBall+' {\
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
        transform: scale(0.5, 0.5);\
    }\
}';


        let dynamX = (((e.pageX - (width / 2)) / window.innerWidth) * 100);
        let dynamY = (((e.pageY - (width / 2)) / window.innerHeight) * 100);
        style.innerHTML = keyFrames.replace(/dynamX/g, dynamX + "%").replace(/dynamY/g, dynamY + "%");
        //xddddd
        document.getElementsByTagName('head')[0].appendChild(style);

        //ball.style.animation = "travel 1s cubic-bezier(0,0,0,1.8)";

        let gonzaloX = Math.abs((e.pageX - (width / 2)) - (window.innerWidth / 2));
        let gonzaloY = Math.abs((e.pageY - (width / 2)) - (window.innerHeight));

        let distancia = Math.sqrt(Math.pow(gonzaloX, 2) + Math.pow(gonzaloY, 2))

        var time = distancia * 1.1;

        ball.style.animation = "travel"+indexBall+" " + time + "ms ease-out";
        document.body.appendChild(ball);

        delay(time).then(() => document.body.removeChild(ball));
        delay(time).then(() => array[indexBall] = true);
        delay(time).then(() => updateLives());
    }
}
updateLives();
function updateLives(){
    document.getElementById("lives").innerHTML = "";
    for (var i = 0; i < MAX_BALLS; i++) {
        if (array[i]){
            let ball = document.createElement("div");
            ball.className = "ball";
            ball.style.position = "relative";
            ball.style.top = "0%";
            document.getElementById("lives").appendChild(ball);
        }
      }
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

