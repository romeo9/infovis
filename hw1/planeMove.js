var speed = 20 //velocità dell'aeroplanino (in px)

var height = (document.body.scrollHeight * 80)/100;  
var width = document.body.clientWidth;

var svgWidth = width	//larghezza svg è la larghezza della pagina
var svgHeight = height	//lunghezza svg è l'80% della lunghezza della pagina 

//coordinate iniziali dell'oggetto. Esattamente al centro del svg.
var x_axis = svgWidth/2.	
var y_axis = svgHeight/2.

//dimensioni immagine che rappresenta l'oggetto
var imageWidth = 200
var imageHeight = 200

var alpha = 0 //angolo di rotazione dell'aeroplanino

var scale = 2

//elemento svg
var svgContainer = d3.select("body").append("svg")
	                                    .attr("width", svgWidth)
	                                    .attr("height", svgHeight);


var g = drawPlane(svgContainer);

var planeHeight = g.node().getBBox().height/2.			
var planeWidth = g.node().getBBox().width/2.

g.transition().duration(1000)
    .attr("transform", "translate("+x_axis+","+y_axis+") rotate("+alpha+','+planeWidth+','+planeHeight+") scale("+scale+")")


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
moveDown: va giu
*/
function moveDown(){
	if(alpha == 90){ 				//se l'aeroplano è già ruotato
		if(y_axis >= svgHeight){	//allora verifica se ha raggiunto il confine dell'svg
			y_axis = -imageHeight/2.	//se l'ha raggiunto, modifica la posizione e riportalo sopra
		}
		else{	
			y_axis += speed			//se c'è ancora spazio, continua a muoversi
		}
		trsOperation(false);

	}else{							//se non è già ruotato 
		alpha = 90					//modifica l'angolo, ma non la posizione
		
		trsOperation(true)
		//d3.selectAll("svg").selectAll("g").transition()
		//.attr("transform", "translate("+x_axis+","+y_axis+") rotate("+alpha+','+planeWidth+','+planeHeight+") scale("+scale+")")
	}

		//aggiorna

}

//moveUp: va su
function moveUp(){	
	if(alpha == -90){
		if (y_axis <= 0){
			y_axis = svgHeight
		}
		else{
			y_axis -= speed
		}
		trsOperation(false)
	}else{
		alpha = -90
		trsOperation(true)
	}

		
}

//moveRight: va a destra
function moveRight(){
	if(alpha==0){
		if (x_axis >= svgWidth) {
			x_axis = -imageWidth/2.
		}else{
			x_axis += speed

		}
		trsOperation(false)
	}else{
		alpha = 0
		trsOperation(true)
		
	}
		
}

//moveLeft: va a sinistra
function moveLeft(){
	if(alpha==180){
		if(x_axis <= 0){
			x_axis = svgWidth
		}else{
			x_axis -= speed
		}
		trsOperation(false);
			

	}else{
		alpha = 180
		trsOperation(true)
}
	}
	
		

//reStart: fa ripartire l'aeroplanino da capo con la velocità di default
function reStart(){
	x_axis = svgWidth/2.
	y_axis = svgHeight/2.

	alpha = 0

	speed = 10

	trsOperation(true)
	

	document.getElementById("error").innerHTML = " ";
	document.getElementById("inputVel").value = ""

}

//setSpeed: modifica la velocità prendendo i dati da input
function setSpeed(){
	input = parseInt(document.getElementById("inputVel").value)
	
	if(isNaN(input)){
		document.getElementById("error").innerHTML = "ERRORE! Inserire un numero!";

	}else{
		speed = input
		document.getElementById("error").innerHTML = " ";
	}

}

function drawPlane(svg){
	var g = svg.append('g')
				.attr("id", "plane");

	g.append('ellipse')
		.attr("cx", 35)
        .attr("cy", 35)
        .attr("rx", 15)
        .attr("ry", 4);
    g.append("rect")
    	.attr("x", 5)
    	.attr("y", 31)
    	.attr("width",25)
    	.attr("height",8);
    g.append("path")
    	.attr("d", "M 35 35 L 20 15 L 18 15 L 28 35")
    	.attr("stroke", "black")
    	.attr("stoke-width", 2)
    	.attr("fill", "black");
    g.append("path")
    	.attr("d", "M 35 35 L 20 55 L 18 55 L 28 35")
    	.attr("stroke", "black")
    	.attr("stoke-width", 2)
    	.attr("fill", "black");
    g.append("path")
    	.attr("d", "M 10 35 L 2 25 H 1 L 5 35")
    	.attr("stroke", "black")
    	.attr("stoke-width", 2)
    	.attr("fill", "black");
    g.append("path")
    	.attr("d", "M 10 35 L 2 45 H 1 L 5 35")
    	.attr("stroke", "black")
    	.attr("stoke-width", 2)
    	.attr("fill", "black");

    return g;
}

/*
t = translate
r = rotate
s = scale
*/
function trsOperation(transition){
	if(transition){
		d3.selectAll("svg").selectAll("g").transition()
			.attr("transform", "translate("+x_axis+","+y_axis+") rotate("+alpha+','+planeWidth+','+planeHeight+") scale("+scale+")")
	}else{
		d3.selectAll("svg").selectAll("g")
			.attr("transform", "translate("+x_axis+","+y_axis+") rotate("+alpha+','+planeWidth+','+planeHeight+") scale("+scale+")")
	}
}

