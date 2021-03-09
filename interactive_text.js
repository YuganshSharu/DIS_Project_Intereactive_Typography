const screen = document.getElementById('c');
const contex = screen.getContext('2d');
screen.width = window.innerWidth;
screen.height = window.innerHeight;
let smallBallsArray = [];
let paddingX = 10; 
let paddingY = 20;
// for making our mouse movement known
let mouse = {
    X: undefined,
    y: undefined,
    radius: 250
}

window.addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    // console.log(mouse.x, mouse.y);
    // mouse.radius = 100;
});

contex.fillStyle = '#005493';
contex.font = '35px Verdana';
contex.fillText("Life Under Water", 10, 100); // text,x,y,max witdh

// contex.strokeStyle = 'white';
// contex.strokeRect(0,0,100,100);
const coordinate = contex.getImageData(0,0,900,500);

var Size = 2; //3.5
class smallBalls {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = Size;
        this.originalX = this.x;
        this.originalY = this.y;
        this.weight = (Math.random() * 30) + 1;
    }

    draw_circle(){
        // contex.fillStyle = 'red';
        contex.beginPath();
        contex.arc(this.x, this.y, this.size, 0, Math.PI *2);
        contex.closePath();
        contex.fill();
    }
    update(){
        let diff_x = mouse.x - this.x;
        let diff_y = mouse.y - this.y;
        let d = Math.sqrt(diff_x*diff_x + diff_y*diff_y);
        let forceDirectX = diff_x / d;
        let forceDirectY = diff_y / d;
        let range = mouse.radius;
        let force = (range - d) / range;
        let directX = forceDirectX * force * this.weight;
        let directY = forceDirectY * force * this.weight;
        if(d < mouse.radius){
            // this.size = 20;
            // this.x += forceDirectX * 3;
            // this.y += forceDirectY *3;
            this.x -= directX;
            this.y -= directY;
        }
        else{
            if(this.x !== this.originalX){
                let diff_x = this.x - this.originalX;
                this.x -= diff_x/2;

            }
            if(this.y !== this.originalY){
                let diff_y = this.y - this.originalY;
                this.y -= diff_y/2;
            }
        }
    }
}
let point_weight = 3.7;
function scan(){
    smallBallsArray = [];
    // for(let i = 0; i < 1000 ; i++){
    //     let x = Math.random() * screen.width;
    //     let y = Math.random() * screen.height;
    //     smallBallsArray.push(new smallBalls(x, y));
    // }
    // smallBallsArray.push(new smallBalls(50, 50));
    // smallBallsArray.push(new smallBalls(80, 50));
    for(let y = 0, y2 = coordinate.height; y < y2;y++){
        for(let x = 0,x2 = coordinate.width; x < x2;x++){
           if(coordinate.data[(y * 4 * coordinate.width) + (x * 4) + 3] > 128){
               let positionX = x + paddingX;
               let positionY = y + paddingY;
               smallBallsArray.push(new smallBalls(positionX * point_weight,positionY * point_weight));
           } 
        }
    }
}
scan();
console.log(smallBallsArray);

function animationTimer(){
    contex.clearRect(0,0, screen.width,screen.height);
    for(let i = 0; i< smallBallsArray.length; i++){
        smallBallsArray[i].draw_circle();
        smallBallsArray[i].update();
    }
    // grouping();
    grouping1();
    requestAnimationFrame(animationTimer);
}
animationTimer();
function grouping1(){
    let opacity = 1 ;
    for(let a = 0; a < smallBallsArray.length; a++){
        for(let b = a ; b < smallBallsArray.length;b++){
            let diff_x = smallBallsArray[a].x - smallBallsArray[b].x;
            let diff_y = smallBallsArray[a].y - smallBallsArray[b].y;
            let d = Math.sqrt(diff_x*diff_x + diff_y*diff_y);

            if (d < 5 ) {
                smallBallsArray[a].fillStyle = 'white';
                opacityValue = 1 - (d/100);
                let diff_x = mouse.x - smallBallsArray[a].x;
                let diff_y = mouse.y - smallBallsArray[a].y;
                let moused = Math.sqrt(diff_x*diff_x+diff_y*diff_y);
                if (moused < mouse.radius / 2) {
                    smallBallsArray[a].size = 10;
                  contex.strokeStyle='rgba(255,255,255,' + opacityValue + ')';
                } else if (moused < mouse.radius - 4) {
                    smallBallsArray[a].size = 7;
                  contex.strokeStyle='rgba(255,255,255,' + opacityValue + ')';
                } else if (moused < mouse.radius + 2) {
                    smallBallsArray[a].size = 4;
                  contex.strokeStyle='rgba(255,255,255,' + opacityValue + ')';
                } else  {
                    smallBallsArray[a].size = 2.5;
                contex.strokeStyle='rgba(255,255,255,' + opacityValue + ')';
                }
            }
        }  
    }
}
function grouping(){
    let opacity = 1 ;
    for(let a = 0; a < smallBallsArray.length; a++){
        for(let b = a ; b < smallBallsArray.length;b++){
            let diff_x = smallBallsArray[a].x - smallBallsArray[b].x;
            let diff_y = smallBallsArray[a].y - smallBallsArray[b].y;
            let d = Math.sqrt(diff_x*diff_x + diff_y*diff_y);

            if (d < 5 ) {
                
                opacityValue = 1 - (d/100);
                let diff_x = mouse.x - smallBallsArray[a].x;
                let diff_y = mouse.y - smallBallsArray[a].y;
                let moused = Math.sqrt(diff_x*diff_x+diff_y*diff_y);
                
                if (moused < mouse.radius / 2) {
                    smallBallsArray[a].size = 8;
                    
                  contex.strokeStyle='rgba(255,255,255,' + opacityValue + ')';
                } else if (moused < mouse.radius - 4) {
                    smallBallsArray[a].size = 6;
                  contex.strokeStyle='rgba(255,255,255,' + opacityValue + ')';
                } else if (moused < mouse.radius + 2) {
                    smallBallsArray[a].size = 4;
                  contex.strokeStyle='rgba(255,255,255,' + opacityValue + ')';
                } else  {
                    smallBallsArray[a].size = 2.3;
                contex.strokeStyle='rgba(255,255,255,' + opacityValue + ')';
                }
                contex.lineWidth = 5;
                contex.beginPath();
                contex.lineCap = "round";
                contex.moveTo(smallBallsArray[a].x, smallBallsArray[a].y);
                contex.lineTo(smallBallsArray[b].x, smallBallsArray[b].y);
                contex.stroke();
            }

        
        
            // opacity = 1 - (d/30);
            // contex.strokeStyle = 'rgba(255,255,255,'+opacity+')';
            // if(d < 30){


            //     contex.lineWidth = 1;
            //     contex.beginPath();
            //     contex.moveTo(smallBallsArray[a].x, smallBallsArray[a].y);
            //     contex.lineTo(smallBallsArray[b].x, smallBallsArray[b].y);
            //     contex.stroke();
            // }
        }
    }
}
