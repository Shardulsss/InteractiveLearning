

window.addEventListener("load", () =>{
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext("2d");


	//Resizing
	canvas.height = 580;	
	canvas.width = 580;
	
	

	//variabels
	let painting = false;

	function startPosition(){
		painting = true;
		draw(e);
	}
	function finishedPosition(){
		painting = false;
		ctx.beginPath();
	}
	function draw(e){
		if(!painting) return;
		ctx.lineWidth = 15;
		ctx.lineCap = "round";
		ctx.lineTo(e.clientX, e.clientY);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(e.clientX, e.clientY);
	}


	//evet listener
	canvas.addEventListener('mousedown', startPosition);
	canvas.addEventListener('mouseup', finishedPosition);
	canvas.addEventListener('mousemove', draw);

});

const trial = function(){
    
    alert("trial")
}

const mybtn = document.querySelector("#but")

var items = ["Zero","One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
var item = items[Math.floor(Math.random()*items.length)];




const sendImg1 = function(){
	const canvas = document.querySelector("#canvas");
	const datauri = canvas.toDataURL()

	const xhr = new XMLHttpRequest()
	const imgData = {
		imgURI : datauri,
		num : item
	}
	xhr.open('POST','/imgdatas')
	xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8')
	xhr.send(JSON.stringify(imgData))
	
}

const sub = function(){
	const canvas = document.querySelector("#canvas");
	var canvasURL = canvas.toDataURL();
	document.getElementById("image").value = canvasURL;
}