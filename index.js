var isdrawing = false;
var draw = document.getElementById("draw");
var ctx = draw.getContext("2d");
var oldx,oldy;
var selectedSize = 2;
var acts = [];
var actlg = [];
var as = 0;
draw.width = window.innerWidth * 3;
draw.height = window.innerHeight * 3;
draw.style.width = window.innerWidth + "px";
draw.style.height = window.innerHeight + "px";
ctx.fillStyle = "white";
ctx.fillRect(0, 0, draw.width, draw.height);
ctx.fillStyle = document.getElementById("dcolor").value;
ctx.lineWidth = 6;
function down() {isdrawing = true}
function up() {isdrawing = false;draw.style.touchAction = "";actlg.push(as);as = 0;}
function move(e) {
  var tchx;
  var tchy;
  try {
    tchx = e.offsetX;
    tchy = e.offsetY;
  }catch {
    tchx = event.touches[0].clientX;
    tchy = event.touches[0].clientY;
    draw.style.touchAction = "none";
  }
  if (isdrawing) {
    ctx.fillStyle = document.getElementById("dcolor").value;
    ctx.strokeStyle = document.getElementById("dcolor").value;
    console.log(document.getElementById("dcolor").value)
    ctx.beginPath();
    ctx.arc(tchx * 3,tchy * 3,ctx.lineWidth / 2,0,2*Math.PI,false);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(oldx,oldy ,ctx.lineWidth / 2,0,2*Math.PI,false);
    ctx.fill();
	  ctx.beginPath();
	  ctx.moveTo(oldx, oldy);
	  ctx.lineTo(tchx * 3, tchy * 3);
	  ctx.stroke();
    as++;
    acts.push([0,ctx.fillStyle,ctx.lineWidth,oldx,oldy,tchx * 3,tchy * 3])
  }
  oldx = tchx * 3;
  oldy = tchy * 3
}
async function undo() {
  ctx.clearRect(0, 0, draw.width, draw.height);
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, draw.width, draw.height);
	ctx.fillStyle = "black";
  acts.splice(acts.length - 1,1);
  actlg.splice(acts.length - 1,1);
  for (let i = 0; i < acts.length; i++) {
    ctx.fillStyle = acts[i][1];
    ctx.strokeStyle = acts[i][1];
    ctx.lineWidth = acts[i][2]
    if (acts[i][0] === 0) {
      ctx.beginPath();
      ctx.arc(acts[i][5],acts[i][6],acts[i][2] / 2,0,2*Math.PI,false);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(acts[i][3],acts[i][4] ,acts[i][2] / 2,0,2*Math.PI,false);
      ctx.fill();
  	  ctx.beginPath();
  	  ctx.moveTo(acts[i][3], acts[i][4]);
  	  ctx.lineTo(acts[i][5], acts[i][6]);
  	  ctx.stroke();
    }
  }
  ctx.lineWidth = selectedSize * 3
}
function setSize() {
  draw.width = window.innerWidth * 3;
	draw.height = window.innerHeight * 3;
	draw.style.width = window.innerWidth + "px";
	draw.style.height = window.innerHeight + "px";
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, draw.width, draw.height);
	ctx.fillStyle = document.getElementById("dcolor").value;
  ctx.lineWidth = selectedSize * 3;
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
var tmt;
function togleheg(elementID,heig) {
  var element = document.getElementById(elementID)
  if (element.style.height === heig) {
    element.style.height = "0";
    tmt = setTimeout(function() {
      element.style.display = "none";
    },800)
  }else {
    element.style.display = "";
    setTimeout(function() {
      element.style.height = heig;
    },10)
    try{clearTimeout(tmt)}catch{}
  }
}
for (let i = 1; i < 201; i++) {
  var btn = document.createElement("button")
  btn.innerText = i;
  btn.style.borderRadius = "5px";
  btn.style.width = "100%";
  btn.id = "btnsize" + i;
  btn.onclick = function () {
    togleheg("sz","200px");
    ctx.lineWidth = i * 3;
    const nodeList = document.getElementById("sz").querySelectorAll("button");
		for (let i = 0; i < nodeList.length; i++) {
			nodeList[i].style.backgroundColor = "";
      nodeList[i].style.position = "";
      nodeList[i].style.top = "";
      nodeList[i].style.bottom = "";
		};
    selectedSize = i;
    this.style.backgroundColor = "orange";
    this.style.position = "sticky";
    this.style.top = "0";
    this.style.bottom = "0";
    document.getElementById("sizz").innerText = i;
  };
  if (i === 2) {
    btn.style.backgroundColor = "orange";
    btn.style.position = "sticky";
    btn.style.top = "0";
  }
  document.getElementById("sz").appendChild(btn)
}
async function themeInit() {
	var nightButton = document.getElementById("nghmd")
	if (localStorage.getItem("night") === "on") {
		nightButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/></svg>';
		document.getElementById("title").style.backgroundColor = "#373737";
		document.getElementById("rbar").style.backgroundColor = "#373737";
		document.getElementById("title").style.color = "orange";
		document.getElementById("rbar").style.color = "white";
		document.getElementById("sz").style.color = "white";
		document.body.style.backgroundColor = "#6f6f6f";
		const nodeList = document.querySelectorAll("svg,p");
		for (let i = 0; i < nodeList.length; i++) {
			nodeList[i].style.color = "orange";
		}
	}else {
		nightButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16"><path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg>';
		document.getElementById("title").style.backgroundColor = "white";
		document.getElementById("rbar").style.backgroundColor = "white";
		document.getElementById("title").style.color = "black";
		document.getElementById("rbar").style.color = "black";
		document.getElementById("sz").style.color = "black";
		document.body.style.backgroundColor = "#f4f4f4";
		const nodeList = document.querySelectorAll("svg,p");
		for (let i = 0; i < nodeList.length; i++) {
			nodeList[i].style.color = "black";
		}
	}
}
themeInit();
function nightToggle() {
	if (localStorage.getItem("night") === "on") {
		localStorage.setItem("night","off")
	}else {
		localStorage.setItem("night","on")
	}
	themeInit();
}
function asyncfor(start,end,step,importedvar,func,speed) {
    var stp = start;
    var asyncforr = setInterval(function() {
        func(stp,importedvar);
        if (stp > end) {
            clearInterval(asyncforr);
        }
        if (stp === end) {
            clearInterval(asyncforr);
        }
        stp += step;
    },speed);
}
