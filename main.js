const canvas = document.getElementById("myCanva");
canvas.width = 200;
const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2,canvas.width*.9)
const x=road.getLaneCenter(1)

const car = new Car(x, 100, 30, 50,"KEYS",10);
const traffic = [
  new Car(road.getLaneCenter(0), -100, 35, 55, "Car 3", 1, 'green'),   // Lane 2, green color, medium size
  new Car(road.getLaneCenter(2), -600, 45, 65, "Car 5", 2, 'orange'),  // Lane 2, orange color, larger size
  new Car(road.getLaneCenter(1), -100, 40, 60, "Car 6", 3, 'yellow'),  // Lane 3, yellow color, larger size
  new Car(road.getLaneCenter(0), -500, 30, 50, "Car 8", 4, 'cyan'),    // Lane 3, cyan color, standard size
  new Car(road.getLaneCenter(2), -700, 45, 65, "Car 9", 5, 'magenta'), // Lane 3, magenta color, larger size
];

animate();

function animate() {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders,[])
  }
  car.update(road.borders,traffic);
  canvas.height = window.innerHeight;

  ctx.save()
  ctx.translate(0,-car.y+canvas.height*.7)

  road.draw(ctx)
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx)
  }
  car.draw(ctx);
  
  ctx.restore()
  requestAnimationFrame(animate);
}
