console.log('connected')

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d', {willReadFrequently: true});

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

class Sine {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.midX = this.canvas.height / 2;
    this.midY = this.canvas.width / 2;

    this.radius = 5;

    this.sineHeight = this.canvas.height / 4;
    this.angle = 1
    this.velocity = Math.random() * 0.1 * (Math.random() > 0.5 ? 1 : -1);
    this.sineAngle = Math.random();
  }

  draw({context} = this) {
    const y = this.midY + this.sineHeight * this.sineAngle;
    
    context.save();
    context.fillStyle = `hsla(${this.angle}, 100%, 40%, 0.5)`;
    context.translate(this.midX, y);
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2 );
    context.fill();
    context.restore();
  }

  move() {
    this.angle += this.velocity; 
    this.sineAngle = Math.sin(this.angle);
  }

  animate() {
    this.draw();
    this.move();
  }
}

const moveCanvas = (x, y) => {
  context.save();
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  context.translate(canvas.width / 2, canvas.height / 2);
  context.rotate(Math.PI / 2)
  context.putImageData(imageData, x, y);
  context.restore();
}

let x = 1;
let y = 0;

setInterval(() => {
  x = Math.random() * 2 * Math.random() > 0.5 ? 1 : -1;
  // y = Math.random() * 2 * Math.random() > 0.5 ? 1 : -1;
}, 2000)

const sin1 = new Sine(canvas, context);
const sin2 = new Sine(canvas, context);

const sines = []
for(let i = 0; i < 10; i++) {
  sines.push(new Sine(canvas, context))
}


const loop = () => {
  requestAnimationFrame(loop);
  moveCanvas(x, y);
  sines.forEach(e => e.animate())
}

loop();