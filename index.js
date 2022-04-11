var isdrawing = false;
var draw = document.getElementById("draw");
var ctx = draw.getContext("2d");
var oldx,oldy;
draw.width = window.innerWidth * 4;
draw.height = window.innerHeight * 4;
draw.style.width = window.innerWidth + "px";
draw.style.height = window.innerHeight + "px";
ctx.fillStyle = "white";
ctx.fillRect(0, 0, draw.width, draw.height);
ctx.fillStyle = "black";
function down() {isdrawing = true}
function up() {isdrawing = false}
function move(e) {
  if (isdrawing) {
    ctx.beginPath();
	ctx.lineWidth = 6;
    ctx.arc(e.offsetX * 4,e.offsetY * 4,3,0,2*Math.PI);
    ctx.fill();
	ctx.beginPath();
	ctx.moveTo(oldx, oldy);
	ctx.lineTo(e.offsetX * 4, e.offsetY * 4);
	ctx.stroke(); 
  }
  oldx = e.offsetX * 4;
  oldy = e.offsetY * 4
}
function setSize() {
	ctx.clearRect(0, 0, draw.width, draw.height);
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, draw.width, draw.height);
	ctx.fillStyle = "black";
	draw.width = window.innerWidth * 4;
	draw.height = window.innerHeight * 4;
	draw.style.width = window.innerWidth;
	draw.style.height = window.innerHeight;
}
function save() {
	let canvasUrl = draw.toDataURL("image/jpeg", 0.5);
	console.log(canvasUrl);
	const createEl = document.createElement('a');
	createEl.href = canvasUrl;
	createEl.download = "download-this-canvas";
	createEl.click();
	createEl.remove();
	var x = document.getElementById("snackbar");
	x.className = "show";
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
function clearAll() {
	ctx.clearRect(0, 0, draw.width, draw.height);
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, draw.width, draw.height);
	ctx.fillStyle = "black";
}