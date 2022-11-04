// Preloader //

jQuery(document).ready(function($) {  

$(window).load(function(){
  $('#preloader').fadeOut('slow',function(){$(this).remove();});
});

});


// Closes the sidebar menu
$("#menu-close").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

// Opens the sidebar menu
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

// Scrolls to the selected menu item on the page
$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});

// wow

new WOW().init();

// carousel

$(document).ready(function() {
 
  var owl = $("#screenshots");
 
  owl.owlCarousel({
    autoPlay: false,
    pagination: false,
    stopOnHover: true,
  });
 
  // Custom Navigation Events
  $(".next").click(function(){
    owl.trigger('owl.next');
  })
  $(".prev").click(function(){
    owl.trigger('owl.prev');
  })
 
});

// Testimonial

$(document).ready(function() {
 
  $("#review").owlCarousel({
 
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true,
      
 
      // "singleItem:true" is a shortcut for:
      // items : 1, 
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false
 
  });
 
});

// Set Header Background

$(window).scroll(function(){
  var sticky = $('.sticky'),
      scroll = $(window).scrollTop();

  if (scroll >= 100) sticky.addClass('fixed');
  else sticky.removeClass('fixed');
});

// Team overlay

// $(document).ready(function(){
//   $(".img-overlay").hover(function(){
//     $(".overlay").toggleClass("overlay_hover");
//   });

// });
var Slider = function() {
  var total, $slide, $slider, sliderWidth, increment = 120;
  var on = function() {
    $slider = $('.slider');
    $slide = $('.slide');
    sliderWidth = $slider.width();
    total = $slide.length;
    position();
  }

  var position = function() {
    var sign, half = $('.active').index(), x = 0, z = 0, zindex,scaleX = 1.3,scaleY = 1.3, transformOrigin;
    $slide.each(function(index, element) {
      scaleX = scaleY = 1;
      transformOrigin = sliderWidth / 2;
      if(index < half) {
        sign = 1;
        zindex = index + 1;
        x = sliderWidth / 2 - increment * (half - index + 1);
        z =  -increment * (half - index + 1);
      } else if(index > half) {
        sign = -1
        zindex = total - index;
        x = sliderWidth / 2 + increment * (index - half + 1);
        z =  -increment * (index - half + 1);
      } else {
        sign = 0;
        zindex = total;
        x = sliderWidth / 2;
        z = 1;
        scaleX = scaleY = 1.2;
        transformOrigin = 'initial';
      }
      $(element).css(
        {
          'transform': 'translate3d(' + calculateX(x, sign, 300) + 'px, 0,' + z + 'px) scale3d(' + scaleX + ',' + scaleY + ', 1)',
          'z-index': zindex,
          'transform-origin-x': transformOrigin
        }
      );
    });
  };

  var calculateX = function(position, sign, width) {
    switch(sign) {
      case 1:
      case 0: return position - width / 2;
      case -1: return position - width / 2;
    }
  }
  
  var imageSize = function() {
    return $slider.width() / 3;
  }
  
  var recalculateSizes = function() {
    sliderWidth = $slider.width();
    position();
  }
  
  var clickedImage = function() {
    $('.active').removeClass('active');
    $(this).addClass('active');
    position();
  }
  
  var addEvents = function() {
    $( window ).resize(recalculateSizes);
    $(document).on('click','.slide', clickedImage);
  }
  
  return {
    init: function() {
      on();
      addEvents();
    }
  };
}();

$(function(){
  var slider = Slider.init();
})