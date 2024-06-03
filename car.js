class Car {
  constructor(x, y, width, height,ctrType,maxSpeed = 5,color = 'black') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acc = 0.5;
    this.maxSpeed = maxSpeed;
    this.fric = 0.05;
    this.angle = 0
    this.ctrType = ctrType
    this.damaged = false
    if (this.ctrType === 'KEYS') {
      this.sensor = new Sensor(this)
    }
    this.controls = new Controls(this.ctrType);
    this.color = color
  }
  update(roadBorders,traffic) {
    if(!this.damaged){
      this.polygon = this.#createPolygon()
      this.damaged = this.#assessDamage(roadBorders,traffic)
      this.#move()
    }
    if (this.ctrType === 'KEYS') {
      this.sensor.update(roadBorders,traffic)
    }

  }

  #assessDamage(roadBorders){
    for (let i = 0; i < roadBorders.length; i++) 
      {if(polyIntersect(this.polygon,roadBorders[i])) return true  }
      
    if(this.ctrType === 'KEYS'){
      for (let i = 0; i < traffic.length; i++) 
        {if(polyIntersect(this.polygon,traffic[i].polygon)) return true }     
    }
    
    return false
  }

  #createPolygon(){
    const points  =[ ]
    const rad = Math.hypot(this.width,this.height)/2
    const alpha = Math.atan2(this.width,this.height)
    points.push({
      x:this.x-Math.sin(this.angle-alpha)*rad,
      y:this.y-Math.cos(this.angle-alpha)*rad
    })
    
    points.push({
      x:this.x-Math.sin(this.angle+alpha)*rad,
      y:this.y-Math.cos(this.angle+alpha)*rad
    })

    points.push({
      x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
      y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
    })

    points.push({
      x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
      y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
    })
 
    return points
  }
  draw(ctx) {
    // ctx.save()
    // ctx.translate(this.x,this.y)
    // ctx.rotate(-this.angle)
    // ctx.beginPath();
    // ctx.rect(
    //    - this.width / 2,
    //    - this.height / 2,
    //   this.width,
    //   this.height
    // );
    // ctx.fill();

    // ctx.restore()

    if(this.damaged){
      ctx.fillStyle = 'skyblue'
    }else{
      ctx.fillStyle = this.color
    }
    
    ctx.beginPath()
    ctx.moveTo(this.polygon[0].x,this.polygon[0].y)
    for (let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x,this.polygon[i].y) 
    }
    ctx.fill()
    if(this.ctrType === 'KEYS')
    {this.sensor.draw(ctx)}
  }
  #move(){
    if (this.controls.forward) {
      this.speed += this.acc;
    }
    if (this.controls.backward) {
      this.speed -= this.acc;
    }
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }

    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }

    if (this.speed > 0) {
      this.speed -= this.fric;
    }
    if (this.speed < 0) {
      this.speed += this.fric;
    }

    if (Math.abs(this.speed) < this.fric) {
      this.speed = 0;
    }

    if(this.speed !=0 ){
        const flip = this.speed>0?1:-1
      
        if(this.controls.left){
          this.angle+=0.03*flip
        }
        if(this.controls.right){
          this.angle-=0.03*flip
    
        }
      }
    this.x-=Math.sin(this.angle)*this.speed
    this.y -= Math.cos(this.angle)*this.speed
  }
}
