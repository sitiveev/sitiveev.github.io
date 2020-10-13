(function($) {
	
	$.fn.stickynote = function(options) {
        console.log("asdasdasdasdas",options);
		var opts = $.extend({}, $.fn.stickynote.defaults, options);
        console.log("asdasdasdasdas",opts,"sadsd",$(this));
		return this.each(function() {
            console.log("asdasdasdasdas",options);
			$this = $(this);
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			switch(o.event){

				case 'dblclick':

					$this.dblclick(function(e){$.fn.stickynote.createNote(o);console.log("asdasdasdasdas")})
					break;
				case 'click':

					$this.click(function(e){$.fn.stickynote.createNote(o);console.log("asdasdasdasdas")})
					break;
			}		
		});
	};
	$.fn.stickynote.defaults = {
		size 	: 'small',
		event	: 'click',
		color	: '#000000'
	};
	$.fn.stickynote.createNote = function(o) {
		var _note_content = $(document.createElement('textarea'));
		var _div_note 	= 	$(document.createElement('div'))
							.addClass('jStickyNote')
							.css('cursor','move');
		if(!o.text){
			_div_note.append(_note_content);
			var _div_create = $(document.createElement('div'))
						.addClass('jSticky-create')
						.attr('title','Create Sticky Note');
		
			_div_create.click(function(e){
				var _p_note_text = 	$(document.createElement('p'))
									.css('color',o.color)
									.html	(
											$(this)
											.parent()
											.find('textarea')
											.val()
											);
				$(this)
				.parent()
				.find('textarea')
				.before(_p_note_text)
				.remove(); 
				
				$(this).remove();						
			})
		}	
		else
			_div_note.append('<p style="color:'+o.color+'">'+o.text+'</p>');					
		
		var _div_delete = 	$(document.createElement('div'))
							.addClass('jSticky-delete');
        var _div_minimize = 	$(document.createElement('div'))
							.addClass('jSticky-minimize');
        var _div_icon = $(document.createElement('div'))
                    .addClass('jSticky-icon');
        var _div_BG = 	$(document.createElement('div'));
        switch(o.size){
            case 'large':
                _div_BG.addClass('jSticky-large');
                break;
            case 'small':
                _div_BG.addClass('jSticky-medium');
                break;
        }
		_div_delete.click(function(e){
			$(this).parent().remove();
		})
		
		var _div_wrap 	= 	$(document.createElement('div'))
							.css({'position':'absolute','top':'0','left':'0'})
                            .append(_div_BG)
							.append(_div_note)
                            .append(_div_minimize)
							.append(_div_delete)
							.append(_div_create)
                            .append(_div_icon);


		if(o.containment){
			_div_wrap.draggable({ containment: '#'+o.containment , scroll: false ,start: function(event, ui) {
				if(o.ontop)
					$(this).parent().append($(this));
			}});	
		}	
		else{
			_div_wrap.draggable({ scroll: false ,start: function(event, ui) {
				if(o.ontop)
					$(this).parent().append($(this));
			}});	
		}

        _div_icon.css({'visibility':'hidden'});
        _div_icon.click(function(e){
            _div_delete.css({'visibility':'visible'});
            _div_BG.css({'visibility':'visible'});
            _div_note.css({'visibility':'visible'});
            _div_create.css({'visibility':'visible'});
            _div_minimize.css({'visibility':'visible'});
            _div_icon.css({'visibility':'hidden'});

        });
        _div_minimize.click(function(e){
            _div_delete.css({'visibility':'hidden'});
            _div_BG.css({'visibility':'hidden'});
            _div_note.css({'visibility':'hidden'});
            _div_create.css({'visibility':'hidden'});
            _div_minimize.css({'visibility':'hidden'});
            _div_icon.css({'visibility':'visible'});
        });
		$('#contDiv'+currentPageId).append(_div_wrap);
	};
})(jQuery);