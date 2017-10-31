var tileOrder = [];
$(document).ready(function(){
 	var subTitleOrder = [8, 1, 2, 3, 4, 5, 6 ,7];
 	var i = 0;

 	var intervalID = setInterval(function(){

 		var transTime = 300;
  		var boxNum = subTitleOrder[i];
		var boxName = ".box-" + boxNum;
		var tBoxName = '';

		switch(subTitleOrder[i]){
			case 2: tBoxName = " , .t-box-top";    break;
			case 4: tBoxName = " , .t-box-right";  break;
			case 6: tBoxName = " , .t-box-bottom"; break;
			case 8: tBoxName = " , .t-box-left";   break;
		}
		$(boxName + tBoxName).animate({"opacity": "1"}, transTime);
  		i++;
  		if (i == subTitleOrder.length){ //end of tile display
  			clearInterval(intervalID);
  			showSubtitle(transTime);
  		}
		}, 200);
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
	console.log("game started");
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
	setTimeout(function(){
		$('.round-num-screen').css("visibility", "visible");
		setTimeout(function(){
		    startRound(0);
		}, 1500);
	}, 2000);
	
}
function setBoxMouseover(){

	$('.square > div').on({
	    mouseenter: function (){
	    	var className = $(this).attr('class').split(' ')[0];
	    	$('.' + className).css('cursor','pointer');
	    	$('.' + className).css('opacity','0.6');
	    	setTimeout(function(){
				$('.' + className).animate({"opacity": "1"}, 100)
			}, 500);
	    },
	    mouseleave: function (){
	    	var className = $(this).attr('class').split(' ')[0];
	    	$('.' + className).css('cursor','auto');
	    	$('.' + className).css('opacity','1');
	    }
	});
}
function startRound(roundNum){

	//create squares
	$('.round-num-screen').css("visibility", "hidden");
	var square = document.createElement('div');
	square.id = 'square';
	square.className = 'square';
	$('.square').css("opacity", "0");
	square.innerHTML = '<div class = "square-left square-tri"></div><div class = "square-right square-tri"></div><div class = "square-top square-tri"></div><div class = "square-bottom square-tri"></div>';
	document.getElementsByTagName('body')[0].appendChild(square);
	var numBeeps = roundNum + 4;
	$('.square').addClass('ease-in');

	setTimeout(function(){
			nextTile(numBeeps);
	}, 1000);
}
function nextTile(numBeeps){
	if(numBeeps == 0){
		startUserTurn();
		return;
	}
	var tileNum = Math.ceil(Math.random()*4);
	tileOrder.push(tileNum);
	lightTile(tileNum); 
	setTimeout(function(){
		nextTile(numBeeps-1);
	}, 1000);
}
function lightTile(tileNum){
	var beep1 = document.getElementById("beep-1");
	var beep2 = document.getElementById("beep-2");
	var beep3 = document.getElementById("beep-3");
	var beep4 = document.getElementById("beep-4");

	var fadeinTime = 300;
	var fadeOutTime = 200;
	switch(tileNum){
		case 1: beep1.play();
				$('.square-top').fadeOut(fadeOutTime); 
				$('.square-top').fadeIn(fadeinTime); 
				break;
		case 2: beep2.play();
				$('.square-right').fadeOut(fadeOutTime); 
				$('.square-right').fadeIn(fadeinTime); 
				break;
		case 3: beep3.play();
				$('.square-bottom').fadeOut(fadeOutTime); 
				$('.square-bottom').fadeIn(fadeinTime); 
				break;
		case 4: beep4.play();
				$('.square-left').fadeOut(fadeOutTime); 
				$('.square-left').fadeIn(fadeinTime); 
				break;
		default: alert("Invalid Tile Number: " + tileNum); break;
	}
}
function setTileClicks(){
	var beep1 = document.getElementById("beep-1");
	var beep2 = document.getElementById("beep-2");
	var beep3 = document.getElementById("beep-3");
	var beep4 = document.getElementById("beep-4");

	var tileNum = 0;

	$('.square > div').on({
		click: function() {
			$('.' + className).css('opacity','1');
         	var className = $(this).attr('class').split(' ')[0];
         	switch(className){
         		case 'square-top': 	
         			beep1.play();
         			tileNum = 1; 
         			break;
         		case 'square-right': 	
         			beep2.play(); 
         			tileNum = 2;
         			break;
         		case 'square-bottom': 	
         			beep3.play(); 
         			tileNum = 3;
         			break;
         		case 'square-left': 	
         			beep4.play(); 
         			tileNum = 4;
         			break;
         		default: alert("Wrong tile name");
         	}
         	$('.' + className).fadeOut(200); 
			$('.' + className).fadeIn(200);
			if(tileOrder[0] != tileNum){
 				alert("wrong tile: " + tileOrder + " " + tileNum);
 			}
 			else{
 				tileOrder.splice(0,1);
 				if(tileOrder.length == 0){ // sequence complete
 					alert(tileOrder + " Done!");
 				}
 			}
     	}
     });
}
function startUserTurn(){
	setBoxMouseover();
	setTileClicks();
}
