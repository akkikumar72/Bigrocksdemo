function detectmob() { 
	if( navigator.userAgent.match(/Android/i)
	|| navigator.userAgent.match(/webOS/i)
	|| navigator.userAgent.match(/iPhone/i)
	|| navigator.userAgent.match(/iPad/i)
	|| navigator.userAgent.match(/iPod/i)
	|| navigator.userAgent.match(/BlackBerry/i)
	|| navigator.userAgent.match(/Windows Phone/i)
	){
	   return true;
	 }
	else {
	   return false;
	 }
   }
if(! detectmob() ) {

	var disableParallax = false;
	$(window).resize(function(){
		if ($(this).width() > 720)
		{
			if (disableParallax)
			{
				disableParallax = false;
			}
			$('#slider-main, #slider-features, #slider-testim, #slider-domain, #slider-packs')
			.css({
				'margin' : 'auto'
			});
			$('.blog-cont-visible').css({
				'margin': '0 20px'
			});
			$('.mbl-packs-cont').css({
				'margin-left': '0'
			});

			$('.mbl-pack-mask').hide();
			$('#slider-blog').data('child_count_per_scroll', 3);
		}
		else
		{
			if (!disableParallax)
			{
				disableParallax = true;
				$('[data-0]').each(function(key, val){
					var css = $(val).data('0').split(' ').join('').split(';');
					for(i=0; i < css.length; i++)
					{
						if (css[i]!== '')
						{
							var cssProp = css[i].split(':');
							$(val).css(cssProp[0], cssProp[1]);
						}
					}
				});
			}
			$('.mbl-packs-cont').css({
				'margin-left': '-440px'
			});
			$('.mbl-pack-mask').hide();
			$('.mbl-pack-mask').first().show();
			$('.mbl-pack-mask').last().show();
			$('#slider-blog').data('child_count_per_scroll', 1);
		}
	});
	
	$(function(){
		$(window).resize();
		skrollr.init({
			beforerender: function(data) {
				if(disableParallax) return false;
			}
		});
	});
}
else
{
	$(function(){
		$('#slider-blog').data('child_count_per_scroll', 1);
	})
}