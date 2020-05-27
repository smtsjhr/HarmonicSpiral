var t= 0;
var c = 0;
var rate = 0.25;

var get_mouse_pos = false;
var get_touch_pos = false;

var stop_animation = false;
var fps, fpsInterval, startTime, now, then, elapsed;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


startAnimating(60);


function draw() {

  canvas.width = window.innerWidth ;
  canvas.height = window.innerHeight;

  ctx.fillStyle = 'rgba(0,0,0,.5)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  
  let s = .0005*t;
  ctx.lineWidth = 12;
  for(i=0;i< Math.max(canvas.width, canvas.height); i+=10){
    ctx.strokeStyle = `hsla(${(0.5*i + 1*c)%360},90%,80%,1)`;
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, i, Math.PI+i*s,i*s);
    ctx.stroke();
  }
  
  t += 3*rate;
  c += 1;
  
}


function startAnimating(fps) {
    
    fpsInterval = 1000/fps;
    then = window.performance.now();
    startTime = then;
    
    animate();
 }
 
 function animate(newtime) {
  
    if (stop_animation) {
        return;
    }

    requestAnimationFrame(animate);

    now = newtime;
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
    
        draw();  
    }

    canvas.addEventListener('mousedown', e => {
    get_mouse_pos = true;
    getMousePosition(canvas, e)
    });
        
    canvas.addEventListener('mouseup', e => {
    get_mouse_pos = false;
    });
    
    canvas.addEventListener('mousemove', function(e) {
        if(get_mouse_pos) {
        getMousePosition(canvas, e)
        }
    })
    
    canvas.addEventListener('touchstart', function(e) {
        getTouchPosition(canvas,e);
        event.preventDefault();
    }, false);
        
    canvas.addEventListener('touchend', function(e) {
    
    }, false);
        
    canvas.addEventListener('touchmove', function(e) {
        getTouchPosition(canvas,e);
        event.preventDefault();
    }, false);
 }


function getMousePosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x_origin = (rect.right - rect.left)/2;
    const y_origin = (rect.bottom - rect.top)/2;
    const x = event.clientX/x_origin - 1;
    const y = -event.clientY/y_origin + 1;
    const r = Math.sqrt(x*x + y*y)/Math.sqrt(2);

    rate = r*r;
    
}

function getTouchPosition(canvas, event) {
    var touch = event.touches[0];
    const rect = canvas.getBoundingClientRect()
    const x_origin = (rect.right - rect.left)/2;
    const y_origin = (rect.bottom - rect.top)/2;
    const x = touch.clientX/x_origin - 1;
    const y = -touch.clientY/y_origin + 1;
    const r = Math.sqrt(x*x + y*y)/Math.sqrt(2);
   
    rate = r*r;
    
}