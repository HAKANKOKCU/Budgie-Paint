var isdrawing = false;
var draw = document.getElementById("draw");
var ctx = draw.getContext("2d");
var oldx,oldy;
var selectedSize = 2;
var acts = [];
var actlg = [];
var as = 0;
var cusw = document.getElementById("cusw");
var cush = document.getElementById("cush");
var colors = ["#F44336","#E91E63","#9C27B0","#673AB7","#3F51B5","#2196F3","#03A9F4","#00BCD4"
              ,"#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107","#FF9800","#FF5722"
              ,"#9E9E9E","#607D8B"]
draw.width = window.innerWidth * 3;
draw.height = window.innerHeight * 3;
draw.style.width = window.innerWidth + "px";
draw.style.height = window.innerHeight + "px";
cusw.value = window.innerWidth;
cush.value = window.innerHeight;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, draw.width, draw.height);
ctx.fillStyle = document.getElementById("dcolor").value;
ctx.lineWidth = 6;
function down(e,type) {isdrawing = true;
  if (type === "m") {
    oldx = e.offsetX * 3;
    oldy = e.offsetY * 3;
  }else {
    var evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
    var touch = evt.touches[0] || evt.changedTouches[0];
    oldx = (touch.clientX - 10 - document.documentElement.scrollLeft + document.getElementById("man").scrollLeft) * 3;
    oldy = (touch.clientY - 50 -document.documentElement.scrollTop +document.getElementById("man").scrollTop) * 3;
    //draw.style.touchAction = "none";
    //console.log("touch")
    //console.log(touch.offsetX,touch.pageX)
  }
}
function up() {isdrawing = false;draw.style.touchAction = "";actlg.push(as);as = 0;}
function move(e,type) {
  var tchx;
  var tchy;
  if (type === "m") {
    tchx = e.offsetX;
    tchy = e.offsetY;
  }else {
    var evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
    var touch = evt.touches[0] || evt.changedTouches[0];
    tchx = touch.clientX - 10 - document.documentElement.scrollLeft + document.getElementById("man").scrollLeft;
    tchy = touch.clientY - 50 -document.documentElement.scrollTop +document.getElementById("man").scrollTop;
    //draw.style.touchAction = "none";
    //console.log("touch")
    //console.log(touch.offsetX,touch.pageX)
  }
  if (isdrawing) {
    ctx.fillStyle = document.getElementById("dcolor").value;
    ctx.strokeStyle = document.getElementById("dcolor").value;
    //console.log(document.getElementById("dcolor").value)
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
  //console.log(tchx)
  oldx = tchx * 3;
  oldy = tchy * 3
}
function undo() {
  acts.splice(acts.length - 1,1);
  //actlg.splice(acts.length - 1,1);
  draw.style.filter = "blur 8px";
  setTimeout(function() {
    ctx.clearRect(0, 0, draw.width, draw.height);
  	ctx.fillStyle = "white";
  	ctx.fillRect(0, 0, draw.width, draw.height);
  	ctx.fillStyle = "black";
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
  },1)
  draw.style.filter = "";
  ctx.lineWidth = selectedSize * 3
}
if (localStorage.getItem("imagedata") !== null) {
  console.log("saved image found")
  //load the image
  var imgdat = JSON.parse(localStorage.getItem("imagedata"));
  imgdat.push([])
  acts = imgdat;
  //set draw(canvas) size to save size
  if (localStorage.getItem("imagewid") !== null) {
	draw.width = localStorage.getItem("imagewid");
	draw.height = localStorage.getItem("imageheg");
	draw.style.width = (localStorage.getItem("imagewid") / 3) + "px";
	draw.style.height = (localStorage.getItem("imageheg") / 3) + "px";
  }
  setTimeout(function() {undo();selectedSize = 2;ctx.lineWidth = selectedSize * 3},100)
}
function setSize() {
  draw.width = window.innerWidth * 3;
	draw.height = window.innerHeight * 3;
	draw.style.width = window.innerWidth + "px";
	draw.style.height = window.innerHeight + "px";
	clearAll();
  ctx.lineWidth = selectedSize * 3;
  cusw.value = window.innerWidth;
  cush.value = window.innerHeight;
}
function setCustomSize() {
  draw.width = cusw.value * 3;
	draw.height = cush.value * 3;
	draw.style.width = cusw.value + "px";
	draw.style.height = cush.value + "px";
	clearAll();
  ctx.lineWidth = selectedSize * 3;
}
function autosave() {
  localStorage.setItem("imagedata",JSON.stringify(acts))
  localStorage.setItem("imagewid",draw.width)
  localStorage.setItem("imageheg",draw.height)
  var x = document.getElementById("snackbar");
	x.className = "show";
  x.innerHTML = "Auto Saving..";
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
setInterval(autosave,60000)
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
  x.innerHTML = "Saving Current Image..";
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
function clearAll() {
	ctx.clearRect(0, 0, draw.width, draw.height);
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, draw.width, draw.height);
	ctx.fillStyle = "black";
	acts = [];
	actlg = [];
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
    togleheg('sz','40%')
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
function themeInit() {
	var nightButton = document.getElementById("nghmd")
	if (localStorage.getItem("night") === "on") {
		nightButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/></svg>';
		document.getElementById("title").style.backgroundColor = "#373737";
		document.getElementById("rbar").style.backgroundColor = "#373737";
    document.getElementById("rpane").style.backgroundColor = "#373737";
		document.getElementById("title").style.color = "orange";
		document.getElementById("rbar").style.color = "white";
		document.getElementById("sz").style.color = "white";
		document.body.style.backgroundColor = "#6f6f6f";
    document.getElementById("rpane").style.color = "white";
		const nodeList = document.querySelectorAll("svg,p");
		for (let i = 0; i < nodeList.length; i++) {
			nodeList[i].style.color = "orange";
		}
	}else {
		nightButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16"><path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg>';
		document.getElementById("title").style.backgroundColor = "white";
		document.getElementById("rbar").style.backgroundColor = "white";
    document.getElementById("rpane").style.backgroundColor = "white";
		document.getElementById("title").style.color = "black";
		document.getElementById("rbar").style.color = "black";
		document.getElementById("sz").style.color = "black";
		document.body.style.backgroundColor = "#f4f4f4";
    document.getElementById("rpane").style.color = "black";
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
function viewRightPane(paneid) {
  const nodeList = document.getElementById("rpane").querySelectorAll("panecnt");
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].style.display = "none";
  }
  document.getElementById("pane_" + paneid).style.display = "block";
  document.getElementById("rpane").style.display = "block"
}
function hidepane() {
  const nodeList = document.getElementById("rpane").querySelectorAll("panecnt");
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].style.display = "none";
  }
  document.getElementById("rpane").style.display = "none";
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
function addcolor(i,clrlist) {
  var button = document.createElement("button");
  button.classList.add("obtn");
  button.style.borderRadius = "5px"
  button.innerHTML = "<div style='display:inline-block;padding:3px;border-radius:5px;background-color:" + clrlist[i] + "'>" + clrlist[i] + "</div>"
  button.onclick = function() {
    document.getElementById("dcolor").value = clrlist[i];
  };
  document.getElementById("pane_clrlist").appendChild(button)
}
asyncfor(0,colors.length - 1,1,colors,addcolor,10)
hidepane();
//function componentToHex(c) {
//  let hex = c.toString(16);
//  return hex.length == 1 ? "0" + hex : hex;
//}
//function rgbToHex(r, g, b) {
//  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
//}
//function rbcolor() {
//  var red = document.getElementById("redval").value;
//  var green = document.getElementById("greenval").value;
//  var blue = document.getElementById("blueval").value;
//  document.getElementById("dcolor").value = rgbToHex(red,green,blue)
//  return rgbToHex(red,green,blue)
//}
setTimeout(function() {
  document.getElementById("rbar").style.transition = "background 0.5s,color 0.5s";
  document.getElementById("rpane").style.transition = "background 0.5s,color 0.5s";
  document.getElementById("title").style.transition = "background 0.5s,color 0.5s";
  document.body.style.transition = "background 0.5s,color 0.5s";
  const nodeList = document.querySelectorAll("svg,p");
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].style.transition = "color 0.5s";
  }
},100)
