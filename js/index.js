$(document).ready(function(){

 	var order1 = [8, 1, 2, 3, 4, 5, 6 ,7];
 	var i = 0;
 	var firstInterval = setInterval(function(){

  		var boxNum = order1[i];
		var boxName = ".box-" + boxNum;
		var tBoxName = '';
		
		switch(order1[i]){
			case 2: tBoxName = " , .t-box-top";    break;
			case 4: tBoxName = " , .t-box-right";  break;
			case 6: tBoxName = " , .t-box-bottom"; break;
			case 8: tBoxName = " , .t-box-left";   break;
		}
		$(boxName + tBoxName).animate({"opacity": "1"}, 400);
  		i++;
  		if (i == order1.length) clearInterval(firstInterval);
		}, 200);
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
