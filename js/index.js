$(document).ready(function(){

	$('.full-box , .t-box').animate({"opacity": "1"}, 4000);

 	var order = [1, 5, 3, 7, 8, 4, 2, 6]
	for(var i = 0; i <= order.length; i++){
		var boxNum = order[i];
		var boxName = ".box-" + boxNum;
		var tBoxName = '';
		switch(order[i]){
			case 2: tBoxName = " , .t-box-top";    break;
			case 4: tBoxName = " , .t-box-right";  break;
			case 6: tBoxName = " , .t-box-bottom"; break;
			case 8: tBoxName = " , .t-box-left";   break;
		}
		$(".box-" + boxNum + tBoxName).delay(200).animate({"opacity": "0.6"}, 100);
	}
	setTimeout(function(){ setBoxMouseover();}, 2000);
});

function setBoxMouseover(){
	$('.full-box').on({
	    mouseenter: function () {
	    	var boxNumClass = $(this).attr('class').split(' ')[1];
	        $('.' + boxNumClass).css('opacity', 0.6);
	        switch(boxNumClass){
	        	case 'box-2': $('.t-box-top').css('opacity', 0.6); break;
	        	case 'box-4': $('.t-box-right').css('opacity', 0.6); break;
	        	case 'box-8': $('.t-box-left').css('opacity', 0.6); break;
	        	case 'box-5': $('.t-box-bottom').css('opacity', 0.6); break;
	        }
	    },
	    mouseleave: function () {
	    	var boxNumClass = $(this).attr('class').split(' ')[1];
	    	$('.' + boxNumClass).removeClass('box-highlight');
	    	$('.t-box').css('opacity', 1);
	    }
	});
}
