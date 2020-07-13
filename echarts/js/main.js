var J = jQuery.noConflict();

J(window).load(function() {
 //Image Hover Efect
 J(".loading").fadeOut(1000); 	
});

function isScrolledIntoView(elem){
 var docViewTop = J(window).scrollTop();
 var docViewBottom = docViewTop + J(window).height();
 var elemTop = J(elem).offset().top;
 var elemBottom = elemTop + J(elem).height();
 return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));	
}

J(document).delay(600).stop().scroll(function() {
  if(isScrolledIntoView('#home')){
   J('header li').removeClass("current");
   J('header li').first().addClass("current");
  }
  
  if(isScrolledIntoView('#about')){
   J('header li').removeClass("current");
   J('header li:nth-child(2)').addClass("current");
  }
  
  if(isScrolledIntoView('#portfolio')){
   J('header li').removeClass("current");
   J('header li:nth-child(3)').addClass("current");
  }
  
  if(isScrolledIntoView('#features')){
   J('header li').removeClass("current");
   J('header li:nth-child(4)').addClass("current");
  }
  
  if(isScrolledIntoView('#contact')){
   J('header li').removeClass("current");
   J('header li:nth-child(5)').addClass("current");
  }
});

J(document).ready(function() {
  
  //--------------------------scrollTo------------------------------//  
      
  J('#menu a, a.scrollTo,#logo a, footer a').click(function(e){
										  
	// If a link has been clicked, scroll the page to the link's hash target:
		
	J.scrollTo( this.hash || 0, 500, {offset:0} );
	
  });
  
  
  //--------------------------Nivo Slider--------------------------//
  J('#slider').nivoSlider({
        effect: 'random', // Specify sets like: 'fold,fade,sliceDown'
        slices: 15, // For slice animations
        boxCols: 8, // For box animations
        boxRows: 4, // For box animations
        animSpeed: 500, // Slide transition speed
        pauseTime: 5000, // How long each slide will show
        startSlide: 0, // Set starting Slide (0 index)
        directionNav: true, // Next & Prev navigation
        directionNavHide: true, // Only show on hover
        controlNav: true, // 1,2,3... navigation
        controlNavThumbs: false, // Use thumbnails for Control Nav
        controlNavThumbsFromRel: false, // Use image rel for thumbs
        controlNavThumbsSearch: '.jpg', // Replace this with...
        controlNavThumbsReplace: '_thumb.jpg', // ...this in thumb Image src
        keyboardNav: false, // Use left & right arrows
        pauseOnHover: true, // Stop animation while hovering
        manualAdvance: false, // Force manual transitions
        captionOpacity: 1, // Universal caption opacity
        prevText: 'Prev', // Prev directionNav text
        nextText: 'Next', // Next directionNav text
        beforeChange: function(){}, // Triggers before a slide transition
        afterChange: function(){}, // Triggers after a slide transition
        slideshowEnd: function(){}, // Triggers after all slides have been shown
        lastSlide: function(){}, // Triggers when last slide is shown
        afterLoad: function(){} // Triggers when slider has loaded
    });
	  
  //--------------------------Zoombox------------------------------//  
  J('a.zoombox').hover(function(){
    J(this).find('div.zoomHome').fadeIn(300);
   }, 
   function () {
    J(this).find('div.zoomHome').fadeOut(300);
   }
  );  
  
  J('a.zoomboxP').hover(function(){
	J(this).find('div.zoomHomeP').fadeIn(300);
   }, 
   function () {
	J(this).find('div.zoomHomeP').fadeOut(300);
   }
  );  
  
  J('a.zoombox').zoombox({
        theme       : 'zoombox',        //available themes : zoombox,lightbox, prettyphoto, darkprettyphoto, simple
        opacity     : 0.8,              // Black overlay opacity
        duration    : 800,              // Animation duration
        animation   : true,             // Do we have to animate the box ?
        width       : 600,              // Default width
        height      : 400,              // Default height
        gallery     : true,             // Allow gallery thumb view
        autoplay : false                // Autoplay for video
   });
   
   J('a.zoomboxP').zoombox({
        theme       : 'zoombox',        //available themes : zoombox,lightbox, prettyphoto, darkprettyphoto, simple
        opacity     : 0.8,              // Black overlay opacity
        duration    : 800,              // Animation duration
        animation   : true,             // Do we have to animate the box ?
        width       : 900,              // Default width
        height      : 600,              // Default height
        gallery     : true,             // Allow gallery thumb view
        autoplay : false                // Autoplay for video
   });
   
	
});