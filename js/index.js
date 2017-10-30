$(document).ready(function(){
 	var order = [8, 1, 2, 3, 4, 5, 6 ,7];
 	var i = 0;

 	var intervalID = setInterval(function(){

 		var transTime = 300;
  		var boxNum = order[i];
		var boxName = ".box-" + boxNum;
		var tBoxName = '';

		switch(order[i]){
			case 2: tBoxName = " , .t-box-top";    break;
			case 4: tBoxName = " , .t-box-right";  break;
			case 6: tBoxName = " , .t-box-bottom"; break;
			case 8: tBoxName = " , .t-box-left";   break;
		}
		$(boxName + tBoxName).animate({"opacity": "1"}, transTime);
  		i++;
  		if (i == order.length){ //end of tile display
  			clearInterval(intervalID);
  			showSubtitle(transTime);
  		}
		}, 250);
});

function showSubtitle(transTime){
	$('.letter-6').animate({"opacity": "1"}, transTime);
	var i = 7;
	var intervalID = setInterval(function(){
		$('.letter-' + i).animate({"opacity": "1"}, transTime);
		i++
		if(i == 10){
			$('.play').animate({"opacity": "1"}, transTime);
			$('.play').on({
     			mouseenter: function() {
     				$('.letter-box').animate({"opacity": "0.8"}, 100);
     			},
		        mouseleave: function() {
		            $('.letter-box').animate({"opacity": "1"}, 100);
		        },
		    	click: function() {
		         	startGame(transTime);
		     	}
			});
			clearInterval(intervalID);
		}
	}, 250);

}

function startGame(transTime){

	setTimeout(function(){
		$('.play').animate({"opacity": "0"}, transTime*2);
	}, 0);
	setTimeout(function(){
		$('.holder-box , .t-box').animate({"opacity": "0"}, transTime*2);
	}, 0);
	setTimeout(function(){
		$('.square').animate({"opacity": "1"}, transTime*2);
		$('.play , .holder-box , .t-box , .title-box').remove();
	}, 1000);
	setTimeout(function(){
		$('.square').removeClass('hidden');
	}, 2000);
	playRound1(0);

}
function playRound1(roundNum){
	numBeeps = roundNum + 4;
	for(var i = 0; i < numBeeps; i++){
		var rand = Math.random();
		alert(rand);
	}
}
function setBoxMouseover(){
	$('.square-tri').on({
	    mouseenter: function (){
	    	alert("hi");
	    	var className = $(this).attr('class').split(' ')[0];
	        $('.' + className).css('opacity', 0.6);
	    },
	    mouseleave: function (){
	    	var className = $(this).attr('class').split(' ')[0];
	        $('.' + className).css('opacity', 1);
	    }
	});
}
