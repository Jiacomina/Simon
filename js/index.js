var tileOrder = [];
var roundNum = 0;
var highestRound = 1;
$(document).ready(function(){
	var soundURL = "https://raw.githubusercontent.com/Jiacomina/Simon/master/sound/"
	lowLag.init();
	lowLag.load(soundURL + "simonSound1.mp3", "beep1");
	lowLag.load(soundURL + "simonSound2.mp3", "beep2");
	lowLag.load(soundURL + "simonSound3.mp3", "beep3");
	lowLag.load(soundURL + "simonSound4.mp3", "beep4");
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
 	$('.replay-icon').on({
 		click: function(){
 			console.log("clicked!");
 			$('.incorrect-screen').css("visibility", "hidden");
 			startRound(0);
 		}
 	});
 	$('.next-icon').on({
 		click: function(){
 			console.log("next round!");
 			$('.correct-screen').css("visibility", "hidden");
 			startRound(roundNum);
 		}
 	});
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
	tileOrder = [];

	$('.square').remove(); //remove old squares from previous round
	$('.round-num-screen').css("visibility", "hidden"); //hide round number screen
	$('.stats-bar').css("visibility", "visible"); // show stats bar

	// update round number stat
	var roundNumStat = document.getElementById('round-num');
	var roundNumIncr = roundNum + 1;
	roundNumStat.innerHTML = "Round: " + roundNumIncr;

	// create new square 
	var square = document.createElement('div');
	square.id = 'square';
	square.className = 'square';
	$('.square').css("opacity", "0");
	square.innerHTML = '<div class = "square-left square-tri"></div><div class = "square-right square-tri"></div><div class = "square-top square-tri"></div><div class = "square-bottom square-tri"></div>';
	document.getElementsByTagName('body')[0].appendChild(square);

	var numBeeps = roundNum + 4; //calcualte number of tiles

	//update tile num stat
	var tileNumStat = document.getElementById('num-tiles');
	tileNumStat.innerHTML = "Tiles: " + numBeeps;

	//update highest round stat
	if(roundNum + 1 > highestRound){
		highestRound = roundNum + 1;
		var highestRoundStat = document.getElementById('highest-round');
		highestRoundStat.innerHTML = "Highest Round: " + highestRound;
	}

	$('.square').addClass('ease-in'); //show square

	setTimeout(function(){
			nextTile(numBeeps); //generate next tile
	}, 1000);
}
function nextTile(numBeeps){
	if(numBeeps == 0){
		startUserTurn(); //allow user to select tiles
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

	var fadeinTime = 300;
	var fadeOutTime = 200;
	switch(tileNum){
		case 1: lowLag.play("beep1");
				$('.square-top').fadeOut(fadeOutTime); 
				$('.square-top').fadeIn(fadeinTime); 
				break;
		case 2: lowLag.play("beep2");
				$('.square-right').fadeOut(fadeOutTime); 
				$('.square-right').fadeIn(fadeinTime); 
				break;
		case 3: lowLag.play("beep3");
				$('.square-bottom').fadeOut(fadeOutTime); 
				$('.square-bottom').fadeIn(fadeinTime); 
				break;
		case 4: lowLag.play("beep4");
				$('.square-left').fadeOut(fadeOutTime); 
				$('.square-left').fadeIn(fadeinTime); 
				break;
		default: alert("Invalid Tile Number: " + tileNum); break;
	}
}
function setTileClicks(){

	var tileNum = 0;

	$('.square > div').on({
		click: function() {
			$('.' + className).css('opacity','1');
         	var className = $(this).attr('class').split(' ')[0];
         	switch(className){
         		case 'square-top': 	
         			lowLag.play("beep1");
         			tileNum = 1; 
         			break;
         		case 'square-right': 	
         			lowLag.play("beep2");
         			tileNum = 2;
         			break;
         		case 'square-bottom': 	
         			lowLag.play("beep3");
         			tileNum = 3;
         			break;
         		case 'square-left': 	
         			lowLag.play("beep4");
         			tileNum = 4;
         			break;
         		default: alert("Wrong tile name");
         	}
         	$('.' + className).fadeOut(200); 
			$('.' + className).fadeIn(200);
			if(tileOrder[0] != tileNum){
 				$('.incorrect-screen').css("visibility", 'visible');
 				roundNum = 0;
 			}
 			else{
 				tileOrder.splice(0,1);
 				if(tileOrder.length == 0){ // sequence complete
 					$('.correct-screen').css("visibility", 'visible');
 					roundNum++;
 				}
 			}
 			console.log(tileNum + " " + tileOrder);
     	}
     });
}
function startUserTurn(){
	setBoxMouseover();
	setTileClicks();
}
