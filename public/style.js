$(document).ready(function() {
    $(".nostyle").click(function(){
        $(".result").css("display", "none");
        $(".more-info").css("display", "none");
        $(".today-total-button").css("display", "none");
        $(".result-description").css("display", "none");
        $(".progress").css("display", "block");
    }); 
});

$(document).ready(function() {
    $(".nostyle").click(function(){
    	setTimeout(function() {
    		$(".progress").css("display", "none");
         	$(".loading").css("display", "block");
    	}, 8000);       
    }); 
});


$(document).ready(function() {
    $(".today-total-button").click(function(){
        $(".more-info").css("display", "block");
        $(".today-total-button").css("display", "none");

    }); 
});


$(document).on('click', function(e) {
	// Process only on left mouse click
	if (e.which === 1) {
		var target = $(e.target);
		var select = $('.select');
		var selected = $('.selected');

		// Toggle the active class from select
		if (target.parents().is(select)) {
			if (select.hasClass('active')) {
				select.removeClass('active');
			} else {
				select.addClass('active');
			}
			
			// Toggle the active class from <li> of dropdown list
			if( target.is('.select-option')) {
				target.parent()
					.addClass('active')
					.siblings().removeClass('active');
			}
		} else {
			select.removeClass('active');
		}

		// Updating the selected option
		if (target.closest('ul').is('.select-list')) {
			selected.text(target.text());
		}
	
	}
});



//chrome/firefox
//click anchor
//remove active class & display spinner
//load page

//safari
//click anchor
//load page