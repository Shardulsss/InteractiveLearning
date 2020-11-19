
let model;
let prediction;
var canvasWidth           	= 300;
var canvasHeight 			= 300;
var canvasStrokeStyle		= "white";
var canvasLineJoin			= "round";
var canvasLineWidth       	= 10;
var canvasBackgroundColor 	= "black";
var canvasId              	= "canvas";

var clickX = new Array();
var clickY = new Array();
var clickD = new Array();
var drawing;

document.getElementById('chart_box').innerHTML = "";
document.getElementById('chart_box').style.display = "none";

////////////////Canvas
var canvasBox = document.getElementById('canvas_box');
var canvas    = document.createElement("canvas");

canvas.setAttribute("width", canvasWidth);
canvas.setAttribute("height", canvasHeight);
canvas.setAttribute("id", canvasId);
canvas.style.backgroundColor = canvasBackgroundColor;
canvasBox.appendChild(canvas);
if(typeof G_vmlCanvasManager != 'undefined') {
  canvas = G_vmlCanvasManager.initElement(canvas);
}

ctx = canvas.getContext("2d");


/////mouse down
$("#canvas").mousedown(function(e) {
	var rect = canvas.getBoundingClientRect();
	var mouseX = e.clientX- rect.left;;
	var mouseY = e.clientY- rect.top;
	drawing = true;
	addUserGesture(mouseX, mouseY);
	drawOnCanvas();
});

///
canvas.addEventListener("touchstart", function (e) {
	if (e.target == canvas) {
    	e.preventDefault();
  	}

	var rect = canvas.getBoundingClientRect();
	var touch = e.touches[0];

	var mouseX = touch.clientX - rect.left;
	var mouseY = touch.clientY - rect.top;

	drawing = true;
	addUserGesture(mouseX, mouseY);
	drawOnCanvas();

}, false);

///
$("#canvas").mousemove(function(e) {
	if(drawing) {
		var rect = canvas.getBoundingClientRect();
		var mouseX = e.clientX- rect.left;;
		var mouseY = e.clientY- rect.top;
		addUserGesture(mouseX, mouseY, true);
		drawOnCanvas();
	}
});

//
canvas.addEventListener("touchmove", function (e) {
	if (e.target == canvas) {
    	e.preventDefault();
  	}
	if(drawing) {
		var rect = canvas.getBoundingClientRect();
		var touch = e.touches[0];

		var mouseX = touch.clientX - rect.left;
		var mouseY = touch.clientY - rect.top;

		addUserGesture(mouseX, mouseY, true);
		drawOnCanvas();
	}
}, false);


////
$("#canvas").mouseup(function(e) {
	drawing = false;
});

////
canvas.addEventListener("touchend", function (e) {
	if (e.target == canvas) {
    	e.preventDefault();
  	}
	drawing = false;
}, false);

///
$("#canvas").mouseleave(function(e) {
	drawing = false;
});

/////
canvas.addEventListener("touchleave", function (e) {
	if (e.target == canvas) {
    	e.preventDefault();
  	}
	drawing = false;
}, false);

////
function addUserGesture(x, y, dragging) {
	clickX.push(x);
	clickY.push(y);
	clickD.push(dragging);
}

////

function drawOnCanvas() {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	ctx.strokeStyle = canvasStrokeStyle;
	ctx.lineJoin    = canvasLineJoin;
	ctx.lineWidth   = canvasLineWidth;

	for (var i = 0; i < clickX.length; i++) {
		ctx.beginPath();
		if(clickD[i] && i) {
			ctx.moveTo(clickX[i-1], clickY[i-1]);
		} else {
			ctx.moveTo(clickX[i]-1, clickY[i]);
		}
		ctx.lineTo(clickX[i], clickY[i]);
		ctx.closePath();
		ctx.stroke();
	}
}

////
$("#clear-button").click(async function () {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	clickX = new Array();
	clickY = new Array();
	clickD = new Array();
	$(".prediction-text").empty();
	$("#result_box").addClass('d-none');
	document.getElementById("chartbox").innerHTML = "Result";
});

/////load model
async function loadModel() {
  console.log("model loading..");

  // clear the model variable
  model = undefined;
  
  // load the model using a HTTPS request (where you have stored your model files)
  model = await tf.loadLayersModel("model/model.json");
  
  console.log("model loaded..");
}

loadModel();


function preprocessCanvas(image) {
	// resize the input image to target size of (1, 28, 28)
	let tensor = tf.browser.fromPixels(image)
		.resizeNearestNeighbor([28, 28])
		.mean(2)
		.expandDims(2)
		.expandDims()
		.toFloat();
	console.log(tensor.shape);
	return tensor.div(255.0);
}


// predict function 

$("#predict-button").click(async function () {
    // get image data from canvas
	var imageData = canvas.toDataURL();

	// preprocess canvas
	let tensor = preprocessCanvas(canvas);

	// make predictions on the preprocessed image tensor
	let predictions = await model.predict(tensor).data();
	console.log(predictions)


	
	// get the model's prediction results
	let results = Array.from(predictions);
	let p = Math.max.apply(null,results)
    console.log(Math.max.apply(null,results))
    let i=results.findIndex(x=>x==p)
	console.log(i)
	prediction=i
	console.log(item)
	// document.getElementById("chartbox").innerHTML = "Correct";
    if(item=="Zero" && i==0){
        document.getElementById("chartbox").innerHTML = "Correct";
    }
    else if(item=="One" && i==1){
        document.getElementById("chartbox").innerHTML = "Correct";
    }
    else if(item=="Two" && i==2){
        document.getElementById("chartbox").innerHTML = "Correct";
    }
    else if(item=="Three" && i==3){
        document.getElementById("chartbox").innerHTML = "Correct";
    }
    else if(item=="Four" && i==4){
        document.getElementById("chartbox").innerHTML = "Correct";
    }
    else if(item=="Five" && i==5){
        document.getElementById("chartbox").innerHTML = "Correct";
    }
    else if(item=="Six" && i==6){
        document.getElementById("chartbox").innerHTML = "Correct";
    }
    else if(item=="Seven" && i==7){
        document.getElementById("chartbox").innerHTML = "Correct";
    }
    else if(item=="Eight" && i==8){
        document.getElementById("chartbox").innerHTML = "Correct";
    }
    else if(item=="Nine" && i==9){
        document.getElementById("chartbox").innerHTML = "Correct";
    }
    else{
        document.getElementById("chartbox").innerHTML = "Wrong";
	}
	ans = document.getElementById("chartbox").textContent;
	const marks = {
		answer: ans
	}
	fetch('/submittest', {
		method: 'POST', // or 'PUT'
		headers: {
		  'Content-Type': 'application/json',
			},
		body: JSON.stringify(marks),
  	}).then(response => response.json()).then(marks => {
		console.log('Success:', marks);
  	}).catch((error) => {
		console.error('Error:', error);
  	});
});

// $("#submit-button").click(async function () {
// 	ans = document.getElementById("chartbox").textContent;
	
// 	const marks = {
// 		answer: ans
// 	}
// 	fetch('/submittest', {
//   		method: 'POST', // or 'PUT'
//   		headers: {
//     		'Content-Type': 'application/json',
//   			},
//   		body: JSON.stringify(marks),
// 	}).then(response => response.json()).then(marks => {
//   		console.log('Success:', marks);
// 	}).catch((error) => {
//   		console.error('Error:', error);
// 	});
// 	// xhr.open('GET','/submittest?data='+ans,true)
	
// 	// xhr.send()
// 	// xhr.open('POST','/submittest')
// 	// xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8')
// 	// xhr.send(JSON.stringify(marks))
// });
//------------------------------
