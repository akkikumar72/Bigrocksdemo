$(function(){
	$('#slider-packs').parallaxSlider({
		SEL_paging	: '#mbl-paging-packs',
		speed_cont: 800,
		count_in_margins: true
	});
	var animated = false;
	
	$('.pack').hover(function(){
		if (!$(this).find('.mbl-pack-mask').is(':visible')) return;
		if (animated) return;
		animated = true;
		
		var num = $(this).index();
		var currentPosition = parseInt($('.mbl-packs-cont').css('margin-left'), 10);
		$(this).find('.mbl-pack-mask').fadeOut();
		
		var elToMask;
		if (num == 0 || num == 1)
		{
			elToMask = $('.mbl-packs-cont').find('.pack').eq(num + 2);
		}
		else
		{
			elToMask = $('.mbl-packs-cont').find('.pack').eq(num - 2);
		}
		elToMask.find('.mbl-pack-mask').fadeIn();
		
		var elToShow = $(this);
		var toAnimate = (num == 0 || num == 1) ? (currentPosition + $(this).width()) : (currentPosition - $(this).width());
		$('.mbl-packs-cont').animate({
			'margin-left' : toAnimate
		}, function(){
			animated = false;
		});
		
	}, function(){
		// nothing here. yay
	});
});