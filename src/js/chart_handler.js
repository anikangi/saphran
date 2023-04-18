var chart = new CanvasJS.Chart("chartContainer",{
	data: [{
		type: "line",
		dataPoints : [
			{ label: "Jan 2022",  y: 1.2  },
			{ label: "Feb 2022",  y: 1.25  },
			{ label: "Mar 2022",  y: 1.3  },
			{ label: "Apr 2022",  y: 1.35  },
			{ label: "May 2022",  y: 1.4  },
			{ label: "Jun 2022",  y: 1.45  },
			{ label: "Jul 2022",  y: 1.5  },
			{ label: "Aug 2022",  y: 1.55  },
			{ label: "Sep 2022",  y: 1.6  },
			{ label: "Oct 2022",  y: 1.65  },
			{ label: "Nov 2022",  y: 1.7  },
			{ label: "Dec 2022",  y: 1.75  },
		]
	}]
});

chart.render();

var xValue, yValue;

var mouseDown = false;
var selected = null;
var changeCursor = false;

var timerId = null;

function getPosition(e) {
    var digits = 3;
    var factor = Math.pow(10, digits);

    var parentOffset = $("#chartContainer > .canvasjs-chart-container").offset();          	
    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;
    xValue = Math.round(factor * chart.axisX[0].convertPixelToValue(relX)) / factor;
    yValue = Math.round(factor * chart.axisY[0].convertPixelToValue(relY)) / factor;

    console.log(xValue, yValue);

    var dps = chart.data[0].dataPoints;
    console.log(Math.pow(xValue - dps[0].x, 2) + Math.pow(yValue - dps[0].y, 2));
}

function searchDataPoint() {
    var dps = chart.data[0].dataPoints;

    var pt_dist = Infinity;
    changeCursor = false;
    selected = null;
    for (var i = 0; i < dps.length; i++) {
        var sqdist = Math.pow(xValue - dps[i].x, 2) + Math.pow(yValue - dps[i].y, 2);
        if (sqdist <= 5) {
            if (mouseDown && sqdist < pt_dist) {
                pt_dist = sqdist;
                selected = i;
            }
            else {
                changeCursor = true;
            }
        }
    }
}

jQuery("#chartContainer > .canvasjs-chart-container").on({
    mousedown: function(e) {
        mouseDown = true;
        getPosition(e);  
        searchDataPoint();
    },
    mousemove: function(e) {
        getPosition(e);
        if(mouseDown) {
            clearTimeout(timerId);
            timerId = setTimeout(function(){
                if(selected != null) {
                    chart.data[0].dataPoints[selected].y = yValue;
                    chart.render();
                }   
            }, 0);
        }
        else {
            searchDataPoint();
            if(changeCursor) {
                chart.data[0].set("cursor", "n-resize");
            } else {
                chart.data[0].set("cursor", "default");
            }
        }
    },
    mouseup: function(e) {
        if(selected != null) {
            chart.data[0].dataPoints[selected].y = yValue;
            chart.render();
            mouseDown = false;
        }
    }
});