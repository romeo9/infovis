var svgWidth = 750
var svgHeight = 600

var x_axis = svgWidth/2.
var y_axis = svgHeight/2.

var imageWidth = 80
var imageHeight = 80

var alpha = 0

var svgContainer = d3.select("body").append("svg")
	                                    .attr("width", svgWidth)
	                                    .attr("height", svgHeight);

var g = svgContainer.append("g");

var img = g.append("svg:image")
    .attr("xlink:href", "plane.png")
    .attr("width", imageWidth)
    .attr("height", imageHeight)
    .attr("x", x_axis)
    .attr("y",y_axis)
    .attr("transform", "rotate(0)");

document.onkeydown = function(e){
	if(e.keyCode == '40')
		moveDown();
	else if(e.keyCode == '38')
		moveUp();
	else if(e.keyCode == '39')
		moveRight();
	else if(e.keyCode == '37')
		moveLeft();
	else if(e.keyCode == '190')
		rotateRight();
	else if(e.keyCode == '188')
		rotateLeft();
}


function moveDown(e){
	if((y_axis+imageHeight/2.) == svgHeight){
		y_axis = -imageHeight/2.
	}
	else{	
		y_axis +=10
	}
		d3.selectAll("image")
			.attr("y", y_axis)

}

function moveUp(e){	
	if (y_axis == -imageHeight/2.){
		y_axis = svgHeight
	}
	else{
		y_axis -=10
	}
		d3.selectAll("image")
			.attr("y", y_axis)	
}

function moveRight(e){
	if (x_axis >= svgWidth) {
		x_axis = -imageWidth/2.
	}else{
		x_axis +=10
	}
		d3.selectAll("image")
			.attr("x", x_axis)	
}

function moveLeft(e){
	if(x_axis <= -imageWidth/2.){
		x_axis = svgWidth
	}else{
		x_axis -=10
	}
		d3.selectAll("image")
			.attr("x", x_axis)	
}

function reStart(){
	x_axis = svgWidth/2.
	y_axis = svgHeight/2.
	d3.selectAll("image")
		.attr("x", x_axis)
		.attr("y", y_axis)
}

function rotateRight(){

	//alpha += 20
	//d3.selectAll("image")
	//	.attr("transform", "rotate("+alpha+","+(-x_axis)+","+(-y_axis)+")")
}

function rotateLeft(){
 
}


 
