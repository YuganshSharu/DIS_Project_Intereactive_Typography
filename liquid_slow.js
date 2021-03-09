const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleSrray = [];
let paddingX = 10; 
let paddingY = -50;
// for making our mouse movement known
let mouse = {
    X: null,
    y: null,
    radius: 50
}

window.addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    // console.log(mouse.x, mouse.y);
    // mouse.radius = 100;
});

ctx.fillStyle = 'white';
ctx.font = '30px Verdana';
ctx.fillText("SDG-14/6", 10, 100); // text,x,y,max witdh

// ctx.strokeStyle = 'white';
// ctx.strokeRect(0,0,100,100);
const coordinate = ctx.getImageData(0,0,900,500);

var Size = 1; //3.5
class Particle {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = Size;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 50) + 1;
    }

    draw_circle(){
        // ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI *2);
        ctx.closePath();
        ctx.fill();
    }
    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        let forceDirectX = dx / distance;
        let forceDirectY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directX = forceDirectX * force * this.density;
        let directY = forceDirectY * force * this.density;
        if(distance < mouse.radius){
            // this.size = 20;
            // this.x += forceDirectX * 3;
            // this.y += forceDirectY *3;
            this.x -= directX;
            this.y -= directY;
        }
        else{
            if(this.x !== this.baseX){
                let dx = this.x - this.baseX;
                this.x -= dx/10;

            }
            if(this.y !== this.baseY){
                let dy = this.y - this.baseY;
                this.y -= dy/10;
            }
        }
    }
}
let point_density = 8;
function init(){
    particleArray = [];
    // for(let i = 0; i < 1000 ; i++){
    //     let x = Math.random() * canvas.width;
    //     let y = Math.random() * canvas.height;
    //     particleArray.push(new Particle(x, y));
    // }
    // particleArray.push(new Particle(50, 50));
    // particleArray.push(new Particle(80, 50));
    for(let y = 0, y2 = coordinate.height; y < y2;y++){
        for(let x = 0,x2 = coordinate.width; x < x2;x++){
           if(coordinate.data[(y * 4 * coordinate.width) + (x * 4) + 3] > 128){
               let positionX = x + paddingX;
               let positionY = y + paddingY;
               particleArray.push(new Particle(positionX * point_density,positionY * point_density));
           } 
        }
    }
}
init();
console.log(particleArray);

function animate(){
    ctx.clearRect(0,0, canvas.width,canvas.height);
    for(let i = 0; i< particleArray.length; i++){
        particleArray[i].draw_circle();
        particleArray[i].update();
    }
    connect();
    requestAnimationFrame(animate);
}
animate();

function connect(){
    let opacity = 1 ;
    for(let a = 0; a < particleArray.length; a++){
        for(let b = a ; b < particleArray.length;b++){
            let dx = particleArray[a].x - particleArray[b].x;
            let dy = particleArray[a].y - particleArray[b].y;
            let distance = Math.sqrt(dx*dx + dy*dy);

            if (distance < 30 ) {
                
                opacityValue = 1 - (distance/500);
                let dx = mouse.x - particleArray[a].x;
                let dy = mouse.y - particleArray[a].y;
                let mouseDistance = Math.sqrt(dx*dx+dy*dy);
                if (mouseDistance < mouse.radius / 2) {
                    particleArray[a].size = 12;
                  ctx.strokeStyle='rgba(255,255,255,' + opacityValue + ')';
                } else if (mouseDistance < mouse.radius - 4) {
                    particleArray[a].size = 11;
                  ctx.strokeStyle='rgba(255,255,255,' + opacityValue + ')';
                } else if (mouseDistance < mouse.radius + 2) {
                    particleArray[a].size = 6;
                  ctx.strokeStyle='rgba(255,255,255,' + opacityValue + ')';
                } else  {
                    particleArray[a].size = 3;
                ctx.strokeStyle='rgba(255,255,255,' + opacityValue + ')';
                }
                ctx.lineWidth = 12;
                ctx.beginPath();
                ctx.lineCap = "round";
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }

        
        
            // opacity = 1 - (distance/30);
            // ctx.strokeStyle = 'rgba(255,255,255,'+opacity+')';
            // if(distance < 30){


            //     ctx.lineWidth = 1;
            //     ctx.beginPath();
            //     ctx.moveTo(particleArray[a].x, particleArray[a].y);
            //     ctx.lineTo(particleArray[b].x, particleArray[b].y);
            //     ctx.stroke();
            // }
        }
    }
}
window.addEventListener('resize', function(){
    canvasPosition = canvas.getBoundingClientRect();
  });