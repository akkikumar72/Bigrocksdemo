$(function(){
	$('#slider-testim').parallaxSlider({
		SEL_paging	: '#mbl-paging-testim',
		speed_cont: 800,
		
		onBefore: function(elScrollTo, elNowAt){
//			$('.blog-block.masked').first().animate({'margin-left' : '30px', 'opacity' : '0'});
//			$('.blog-block.masked').last().animate({'margin-left' : '-30px', 'opacity' : '0'});
		},
		onAfter: function(elScrollTo, elNowAt){
//			$('.blog-block.masked').first().animate({'margin-left' : '0', 'opacity' : '.2'});
//			$('.blog-block.masked').last().animate({'margin-left' : '0', 'opacity' : '.2'});
		}
	});
});