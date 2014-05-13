/**
 * jQuery multi date selection plugin
 * @requires 	jQuery 
 * @author 		Rudy Malhi
 */

;(function($){
	"use strict";
	var default_options = {
		cssClass: "multidatepicker-widget",
		showLast: true,
		lastText: "last"
	};

  	$.fn.multidatepicker = function( options ) {
	    // override defaults with specified option
	    var options = $.extend( {}, default_options, options ),
	    	elem = this,
	    	picker = $('<div>'),
	    	ul = $('<ul>'),
	    	values = [];

	    if (elem.val()) {
	    	values = elem.val().split(',');
	    }

	    picker.addClass(options.cssClass).hide();

	    for (var i=1; i<=31; i++) {
	    	var li = $('<li>');
	    	li.data('value', i).text(i);
	    	ul.append(li);
	    }
	    if (options.showLast) {
	    	var li = $('<li class="multidatepicker-lastday">');
	    	li.data('value', -1).text(options.lastText);
	    	ul.append(li);
	    }


	    elem.after(picker.append(ul));

    	for (var i=0; i<values.length; i++) {
			picker.find('li').eq(values[i]-1).addClass("selected");   		
    	}

		picker.on('click.multidatepicker','li', function(e) {
		}).on('mousedown.multidatepicker','li', function(e) {
			e.preventDefault();
			e.stopImmediatePropagation();
			var item = $(this).toggleClass("selected"),
				value = item.data('value').toString(),
				pos = values.indexOf(value);
			if (pos < 0) {
				values.push(value);
			} else {
				values.splice(pos,1);
			}
			values.sort(function(a,b){return a-b});
			elem.val(values.join(','));			
		});    

	    elem.on('focusin.multidatepicker', function() {
		    picker.css('left',elem.position().left).fadeIn('fast');
	    }).on('focusout.multidatepicker', function(e) {
	    	picker.fadeOut('fast');
	    });

	    return elem;
	};

})(jQuery);