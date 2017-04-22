var speed = 10 //velocità dell'aeroplanino (in px)

var height = (document.body.scrollHeight * 80)/100;  
var width = document.body.clientWidth;

var svgWidth = width	//larghezza svg è la larghezza della pagina
var svgHeight = height	//lunghezza svg è l'80% della lunghezza della pagina 

//coordinate iniziali dell'oggetto. Esattamente al centro del svg.
var x_axis = svgWidth/2.	
var y_axis = svgHeight/2.

//dimensioni immagine che rappresenta l'oggetto
var imageWidth = 100
var imageHeight = 100

var alpha = 0 //angolo di rotazione dell'aeroplanino

//elemento svg
var svgContainer = d3.select("body").append("svg")
	                                    .attr("width", svgWidth)
	                                    .attr("height", svgHeight);

var g = svgContainer.append("g");

var img = g.append("svg:image")
    .attr("xlink:href", "plane.png")
    .attr("width", imageWidth)
    .attr("height", imageHeight)
    .attr("transform", "translate("+x_axis+","+y_axis+") rotate("+alpha+")")

//event handler. Quando viene premuto il tasto viene chiamata la funzione.
// A seconda del codice del tasto vengono chiamate altre funzioni
document.onkeydown = function(e){
	if(e.keyCode == '40')			//tasto giù
		moveDown();	
	else if(e.keyCode == '38')		//tasto su
		moveUp();
	else if(e.keyCode == '39')		//tasto destra
		moveRight();
	else if(e.keyCode == '37')		//tasto sinistra
		moveLeft();
}

/*
Per tutti i movimenti, quando si preme un tasto, prima l'aeroplano ruota, poi si muove
*/
function moveDown(){
	if(alpha == 90){ 				//se l'aeroplano è già ruotato
		if(y_axis >= svgHeight){	//allora verifica se ha raggiunto il confine dell'svg
			y_axis = -imageHeight/2.	//se l'ha raggiunto, modifica la posizione e riportalo sopra
		}
		else{	
			y_axis += speed			//se c'è ancora spazio, continua a muoversi
		}

	}else{							//se non è già ruotato 
		alpha = 90					//modifica l'angolo, ma non la posizione
	}

	d3.selectAll("image")
		.attr("transform", "translate("+x_axis+","+y_axis+") rotate("+alpha+")")	//aggiorna

}

function moveUp(e){	
	if(alpha == -90){
		if (y_axis <= 0){
			y_axis = svgHeight
		}
		else{
			y_axis -= speed
		}
	}else{
		alpha = -90
	}

	d3.selectAll("image")
		.attr("transform", "translate("+x_axis+","+y_axis+") rotate("+alpha+")")	
}

function moveRight(e){
	if(alpha==0){
		if (x_axis >= svgWidth) {
			x_axis = -imageWidth/2.
		}else{
			x_axis += speed
		}
	}else{
		alpha = 0
	}
	d3.selectAll("image")
		.attr("transform", "translate("+x_axis+","+y_axis+") rotate("+alpha+")")	
}

function moveLeft(e){
	if(alpha==180){
		if(x_axis <= 0){
			x_axis = svgWidth
		}else{
			x_axis -= speed
		}
	}else{
		alpha = 180
	}
	
		d3.selectAll("image")
			.attr("transform", "translate("+x_axis+","+y_axis+") rotate("+alpha+")")	
}

function reStart(){
	x_axis = svgWidth/2.
	y_axis = svgHeight/2.

	alpha = 0

	speed = 10

	d3.selectAll("image")
		.attr("transform", "translate("+x_axis+","+y_axis+") rotate("+alpha+")")

	document.getElementById("error").innerHTML = " ";
	document.getElementById("inputVel").value = ""

}

function setSpeed(){
	input = parseInt(document.getElementById("inputVel").value)

	console.log(typeof(input) + "  digitato: " + input)
	
	if(isNaN(input)){
		document.getElementById("error").innerHTML = "ERRORE! Inserire un numero!";

	}else{
		speed = input
		document.getElementById("error").innerHTML = " ";
	}

}


