var xmlns="http://www.w3.org/2000/svg",
	xlinkns = "http://www.w3.org/1999/xlink",
	N = 5,
	WC = 100,
	object = new Array(),
	nx = ny = xm = ym = 0 ;

function startUp(){
  resize();

  xm = nx/2;
  ym = ny/2;

  for(i=0;i<N;i++) { 
	ic=document.getElementById("myCircle");
	factor = Math.max(1,(N-i/3))/N;
	object[i] = new makeSphere(i,WC*factor);
  }
}

function makeSphere(i,WC){
  this.obj = document.createElementNS(xmlns,"circle");
  document.getElementById("mask").appendChild(this.obj);
 
  this.i   = i;
  this.ddx  = 0;
  this.ddy  = 0;
  this.PX  = xm;
  this.PY = ym;
  this.x  = 0;
  this.y  = 0;
  this.sto = "object["+i+"].moveSphere();";

  this.moveSphere = function(){
	with(this){
		if(i==0){
			x0 = xm;
			y0 = ym;
		} 
		else {
			x0 = object[i-1].x;
			y0 = object[i-1].y;
		}
		x = PX+=(ddx+=((x0-PX-ddx*4))/10);
		y = PY+=(ddy+=((y0-PY-ddy*4))/10);

		obj.setAttributeNS(null,"cx",x);
		obj.setAttributeNS(null,"cy",y);
		obj.setAttributeNS(null,"r",WC);

		obj.setAttributeNS(null,"id","mask-circle");
		setTimeout(sto, 20);
	}   
  }
  this.moveSphere();		  
}

function resize(){
  nx = screen.width;
  ny = screen.height;
}

function mouseMove(e){
  xm = e.clientX;
  ym = e.clientY;
}

document.getElementById('back').addEventListener('mousemove', function(e) {
  mouseMove(e);
}, false);

document.getElementById('back').addEventListener('touchmove', function(e) {
	e.preventDefault();
	var touch = e.targetTouches[0];
	if (touch) {
		mouseMove(touch);
	}
}, false);