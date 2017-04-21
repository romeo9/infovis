var svgWidth = 750
var svgHeight = 600

var x_axis = svgWidth/2.
var y_axis = svgHeight/2.


var svgContainer = d3.select("body").append("svg")
	                                    .attr("width", svgWidth)
	                                    .attr("height", svgHeight);

var g = svgContainer.append("g");

var img = g.append("svg:image")
    .attr("xlink:href", "plane.png")
    .attr("width", 80)
    .attr("height", 80)
    .attr("x", x_axis)
    .attr("y",y_axis);


document.onkeydown = function(e){
	if(e.keyCode == '40')
		moveDown();
	else if(e.keyCode == '38')
		moveUp();
	else if(e.keyCode == '39')
		moveRight();
	else if(e.keyCode == '37')
		moveLeft();
}


function moveDown(e){	
		y_axis +=10
		d3.selectAll("image")
			.attr("y", y_axis)	
}

function moveUp(e){	
		y_axis -=10
		d3.selectAll("image")
			.attr("y", y_axis)	
}

function moveRight(e){
		x_axis +=10
		d3.selectAll("image")
			.attr("x", x_axis)	
}

function moveLeft(e){
		x_axis -=10
		d3.selectAll("image")
			.attr("x", x_axis)	
}
 


 
