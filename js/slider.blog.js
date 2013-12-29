$(function(){
	$('#slider-blog').parallaxSlider({
		SEL_paging	: '#mbl-blog-paging',
		SEL_bulletR : '.newer',
		SEL_bulletL : '.older',
		child_count_per_scroll: 3,
		stop_on_slider_end: true,
		speed_cont: 400,
		
		onBefore: function(elScrollTo, elNowAt){
			$('.blog-block.masked').first().animate({'margin-left' : '30px', 'opacity' : '0'});
			$('.blog-block.masked').last().animate({'margin-left' : '-30px', 'opacity' : '0'});
		},
		onAfter: function(elScrollTo, elNowAt){
			$('.blog-block.masked').first().animate({'margin-left' : '0', 'opacity' : '.2'});
			$('.blog-block.masked').last().animate({'margin-left' : '0', 'opacity' : '.2'});
		}
	});
});