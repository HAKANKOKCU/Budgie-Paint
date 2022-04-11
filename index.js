var isdrawing = false;
var draw = document.getElementById("draw");
var ctx = draw.getContext("2d");
var oldx,oldy;
draw.width = window.innerWidth * 3;
draw.height = window.innerHeight * 3;
draw.style.width = window.innerWidth + "px";
draw.style.height = window.innerHeight + "px";
ctx.fillStyle = "white";
ctx.fillRect(0, 0, draw.width, draw.height);
ctx.fillStyle = document.getElementById("dcolor").value;
ctx.lineWidth = 6;
function down() {isdrawing = true}
function up() {isdrawing = false}
function move(e) {
  if (isdrawing) {
    ctx.fillStyle = document.getElementById("dcolor").value;
    ctx.strokeStyle = document.getElementById("dcolor").value;
    console.log(document.getElementById("dcolor").value)
    ctx.beginPath();
    ctx.arc(e.offsetX * 3,e.offsetY * 3,ctx.lineWidth / 2,0,2*Math.PI,false);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(oldx,oldy ,ctx.lineWidth / 2,0,2*Math.PI,false);
    ctx.fill();
	  ctx.beginPath();
	  ctx.moveTo(oldx, oldy);
	  ctx.lineTo(e.offsetX * 3, e.offsetY * 3);
	  ctx.stroke();
  }
  oldx = e.offsetX * 3;
  oldy = e.offsetY * 3
}
function setSize() {
  draw.width = window.innerWidth * 3;
	draw.height = window.innerHeight * 3;
	draw.style.width = window.innerWidth + "px";
	draw.style.height = window.innerHeight + "px";
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, draw.width, draw.height);
	ctx.fillStyle = document.getElementById("dcolor").value;
}
function save() {
	let canvasUrl = draw.toDataURL("image/jpeg", 0.5);
	console.log(canvasUrl);
	const createEl = document.createElement('a');
	createEl.href = canvasUrl;
	createEl.download = "download";
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
function toglevisi(elementID) {
  var element = document.getElementById(elementID)
  if (element.style.display === "block") {
    element.style.display = "none"
  }else {
    element.style.display = "block"
  }
}
for (let i = 1; i < 201; i++) {
  var btn = document.createElement("button")
  btn.innerText = i;
  btn.style.borderRadius = "5px";
  btn.style.width = "100%";
  btn.onclick = function () {
    toglevisi("sz");
    ctx.lineWidth = i * 3;
  };
  document.getElementById("sz").appendChild(btn)
}
