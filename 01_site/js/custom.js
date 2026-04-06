
 /* jQuery Pre loader
  -----------------------------------------------*/
$(window).load(function(){
    $('.preloader').fadeOut(1000); // set duration in brackets
});


$(document).ready(function() {

  /* Hide mobile menu after clicking on a link
    -----------------------------------------------*/
    $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });


  /* Smoothscroll js
  -----------------------------------------------*/
    $(function() {
        $('.navbar-default a').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 49
            }, 1000);
            event.preventDefault();
        });
    });


    /* Back to Top
    -----------------------------------------------*/
    $(window).scroll(function() {
      if ($(this).scrollTop() > 200) {
          $('.go-top').fadeIn(200);
            } else {
                $('.go-top').fadeOut(200);
           }
        });
          // Animate the scroll to top
        $('.go-top').click(function(event) {
          event.preventDefault();
        $('html, body').animate({scrollTop: 0}, 300);
    });


  /* wow
  -------------------------------*/
  new WOW({ mobile: false }).init();

  });



/* Progress tracker
-------------------------------*/

const tracker = document.querySelector('#progress-tracker');
const target = document.querySelector('#progress-target');
const inner = document.querySelector('#progress-inner');
const outer = document.querySelector('#progress-outer');
const raised = document.querySelector('#progress-raised');
const progressPercentElement = document.querySelector('#progress-percent');
const targetUsd = 2500;

const roundTo2DecimalPlaces = value => Math.round(value * 100) / 100;

fetch('./api/marketing_wallet.json')
  .then(response => response.json())
  .then(json => {
    const balanceUsd = Number(json.balance_usd);

    target.innerHTML = targetUsd.toFixed(2);
    raised.innerHTML = balanceUsd.toFixed(2);

    const progressPercent = balanceUsd / targetUsd;

    const progressPercentRounded = roundTo2DecimalPlaces(progressPercent * 100)

    progressPercentElement.innerHTML = progressPercentRounded;

    inner.setAttribute('style', `height: ${progressPercent * 100}%`)
    outer.setAttribute('style', `height: ${(1 - progressPercent) * 100}%`)

    tracker.classList.add('progress-tracker__ready');
  })
  .catch(err => console.error(err));