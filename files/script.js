var clozeTest = new Ractive({
	el: '#clozeTest',
	template: '#template-clozeTest',

	data: {
		input: '여기에 입력하세요...'
	},

	computed: {
		inputRegex: function() {
			var input = this.get('input');
			return input.replace(/([_0-9a-zA-Z\uac00-\ud7a3]+)/g,'<span>$1</span>').replace(/\n/g,'<br/>');
		}
	}

});

//Randomise plugin
(function($) {
	$.fn.randomize = function(childElem) {
		return this.each(function() {
			var $this = $(this);
			var elems = $this.children(childElem);

			elems.sort(function() { return (Math.round(Math.random())-0.5); });

			$this.remove(childElem);

			for(var i=0; i < elems.length; i++){
				$this.append(elems[i]);
			}
		});
	}
})(jQuery);

$(function() {

	//Increment number
	var number = 0;
	function incrementNumber () {
		if (number == 0) {
			$('#input').attr("disabled", true);
		}
		number += 1;
	}

	$('body').on('click', '#result_content span', function(){
		var
			thisTxt = $(this).text(),
			inputWidth = $(this).width()
		;
		if ($(this).children().length == 0) {
			console.log("index: " + $('#result_content').children().index($(this)))
			incrementNumber();

			$(this).attr({id: 'item' + number})
				.addClass('selected')
				.clone()
				.text($(this).text() + ' ')
				.appendTo('#keyword_content')
			;

			$(this).html('(' + number + ') <input type="text"/>')
				.find('input')
				.addClass('test-input')
				.attr({name: thisTxt})
				.css('width', inputWidth)
				.data('text', thisTxt)
			;
		}
	});
	
	$('body').on('click','#keyword_content span', function() {
		var thisClass = $(this).attr('id');
		var thatClass = 'span#' + thisClass;
		var thisTxt = $(this).text().trim();
		$('#result_content').find(thatClass).replaceWith('<span>' + thisTxt + '</span>');
		$(this).fadeOut('slow').remove();
	});

	$('#keywords button').click(function() {
		$('#keyword_content').randomize("#keyword_content span");
	});

	$('body').on('keyup', '#result_content input[type=text]', inputCheck);

	function inputCheck() {
		if ( this.value === this.name ) {
			$(this).addClass('success');
			$(this).parent().addClass('success').text(this.name);
			var inputs = $('#result_content').find(':input');
			inputs.eq(inputs.index(this)+ 1).focus();
			$(this).remove();
		} else {
			$(this).addClass('error');
		}
	}

});
