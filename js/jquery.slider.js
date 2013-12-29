(function ( $ ) {
 
    $.fn.parallaxSlider = function( options ) {
 
        var settings = $.extend({
			elements: [], // elements to animate
			onBefore: function(elScrollTo, elAtNow){},
			onAfter: function(elScrollTo, elAtNow){},
			SEL_paging: null,
			SEL_bulletR: null,
			SEL_bullerL: null,
			speed_cont: 700,
			speed_delay: 0,
			selected: 'selected',
			child_count_per_scroll: 1,
			stop_on_slider_end: false,
			animation_cont: 'swing',
			count_in_margins: false,
			touchEnabled: true
        }, options );
		
		var _this = $(this);
		var animates = false;
		var numNow = 0;
		var l = _this.children().length - 1 > 0 ? _this.children().length - 1 : 0;;
		
		function goTo(elScrollTo, elAtNow, event)
		{
			if (animates) return;
						
			settings.onBefore(elScrollTo, elAtNow, settings);
			
			if (settings.elements.length > 0)
			{
				$.each(settings.elements, function(key,val){
					elementsFade(key, val, elScrollTo, elAtNow);
				});
			}			
			var additionalWidth = 0;
			if (settings.count_in_margins)
			{
				additionalWidth = parseInt(elScrollTo.css('margin-left'), 10);
			}
			_this.delay(settings.speed_delay).animate({
				'margin-left': - parseInt(elScrollTo.position().left, 10) + additionalWidth + 'px'
			}, settings.speed_cont,settings.animation_cont, function(){
				settings.onAfter(elScrollTo, elAtNow, settings);
			});
		}
		function getEl(ind)
		{
			return _this.children().eq(ind);
		}
		function transformNum(sign)
		{
			if (_this.data('child_count_per_scroll'))
			{
				settings.child_count_per_scroll = _this.data('child_count_per_scroll');
			}
			
			if (sign == '+')
			{
				var num = numNow + settings.child_count_per_scroll;
			}
			else if (sign == '-')
			{
				var num = numNow - settings.child_count_per_scroll;
			}
			if (!settings.stop_on_slider_end)
			{
				if (num < 0)
				{
					num = l - settings.child_count_per_scroll + 1;
				}
				else if (num > l)
				{
					num = 0;
				}			
			}
			else
			{
				if (num < 0 || num > l)
				{
					num = numNow;
				}
			}
				
		return num;
		}
		function elementsFade(key, val, elScrollTo, elAtNow){
				
			var el = elAtNow.find(val.SEL);
			var startMargin = el.css('margin-left');
			var marginSlide = (el.width() * 0.40) + 'px';
			if (elScrollTo.position().left < elAtNow.position().left)
			{
				marginSlide = '-' + marginSlide;
			}

			el.delay(settings.speed_delay - 50).animate({
				'margin-left': marginSlide,
				'opacity': '0'
			}, settings.speed_cont - 100, 'swing', function(){
				$(this).css({
					'margin-left': startMargin,
					'opacity': 1
				});
			});
		}
		if (settings.SEL_bulletR)
		{
			$(settings.SEL_bulletR).click(function(e){
				e.preventDefault();
				e.stopPropagation();
				
				var num = transformNum('+');
				if (num === numNow) return;
				goTo(getEl(num), getEl(numNow), e);
				numNow = num;
				if (settings.SEL_paging)
				{
					$(settings.SEL_paging).children().removeClass(settings.selected).eq(numNow).addClass(settings.selected);
				}
				if (settings.SEL_bulletL)
				{
					$(settings.SEL_bulletL).removeClass(settings.selected);
					$(this).addClass(settings.selected);
				}
			});
		}
        
		if (settings.SEL_bulletL)
		{
			$(settings.SEL_bulletL).click(function(e){
				e.preventDefault();
				e.stopPropagation();
				
				var num = transformNum('-');
				if (num === numNow) return;
				goTo(getEl(num), getEl(numNow), e);
				numNow = num;
				if (settings.SEL_paging)
				{
					$(settings.SEL_paging).children().removeClass(settings.selected).eq(numNow).addClass(settings.selected);
				}
				if (settings.SEL_bulletR)
				{
					$(settings.SEL_bulletR).removeClass(settings.selected);
					$(this).addClass(settings.selected);
				}
			});
		}
		if (settings.SEL_paging)
		{
			$(settings.SEL_paging).children().each(function(key, val){
				$(val).click(function(e){
					if (key == numNow) return;
					goTo(getEl(key), getEl(numNow), e);
					$(settings.SEL_paging).children().removeClass(settings.selected);
					$(val).addClass(settings.selected);
					numNow = key;
				});
			})
		}
		
		var _mouseDown;
		var hasTouch;
		var _mouseDownXY;
		var _mouseDownLT;
		var _lastMouseDownXY;
		var _velocity;
		var touchNum = 0;
		
		// touch events
		var touchStart=function(e) { //mouse down
			if (!settings.touchEnabled) return;
			if (!disableParallax) return;
			
			_this.stop(true,false);
			if (!_mouseDown) {
			  if (hasTouch) { e.preventDefault(); e = event.touches[0]; } else { if (!e) e = window.event; }
			  
				window.addEventListener('mousemove', touchMove, false);
				window.addEventListener('mouseup', touchEnd, false);
			
				_mouseDownXY = e.pageX;
				_mouseDownLT = document.getElementById(_this.attr('id')).offsetLeft;
			  
			  _mouseDown = true;
			}
		  };

		  var touchMove=function(e) { //mouse move
			if (!settings.touchEnabled) return;
			if (!disableParallax) return;
			
			if (_mouseDown) {
			  if (hasTouch) { e.preventDefault(); e = event.touches[0]; } else { if (!e) e = window.event; }
				var MouseXY =  e.pageX;
			  if ((MouseXY - _mouseDownXY) > 0)
			  {
				  touchNum = transformNum('-');
			  }
			  else
			  {
				  touchNum = transformNum('+');
			  }
			  _velocity += ((MouseXY - _lastMouseDownXY) * 0.5);
			  _lastMouseDownXY = MouseXY;
			}
		  };

		  var touchEnd=function(e) { //mouse up
			if (!settings.touchEnabled) return;
			if (!disableParallax) return;
			
			if (_mouseDown) {
				_mouseDown = false; 
			  
				  window.removeEventListener('mousemove', touchMove, false);
				  window.removeEventListener('mouseup', touchEnd, false);7
				  if (!touchNum) touchNum = 0;
				  
				  if (numNow != touchNum)
				  {
					goTo(getEl(touchNum), getEl(numNow), e);
					numNow = touchNum;
					if (settings.SEL_paging)
					{
						$(settings.SEL_paging).children().removeClass(settings.selected).eq(numNow).addClass(settings.selected);
					}
				  }
			}
		  };

		  hasTouch = 'ontouchstart' in window;
		  _this.bind('mousedown touchstart', function(event){ touchStart(event); }); 
		  _this.bind('mousemove touchmove', function(event){ touchMove(event); }); 
		  _this.bind('mouseup touchend', function(event){ touchEnd(event); });
		
		
        return this;
 
    };
 
}( jQuery ));