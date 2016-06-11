var examples = {
	'251': 'There is strong research evidence that children perform better in mathematics if music is incorporated in it. It has been shown that mathematics is related with music in various known ways so much that not putting the relationship to good use in and out of school could only be to our disadvantage. Researchers at a Los Angeles school found that 136 second year elementary school pupils who learned to play the piano and read music improved their numeracy skills. This could be so since learning music emphasizes thinking in space and time, and when pupils learn rhythm, they are learning ratios, fractions and proportions. Other researchers investigated the ways in which first and third grade teachers could integrate music into their regular math classrooms. They concluded that music-math integrated lessons had positive effects on three mathematical ability areas of modeling, problem solving and application.'
};

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

clozeTest.on('251', function() {
	clozeTest.set('input', examples.'251');
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
