// Typing text
let TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = 'We build ';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  let i = this.loopNum % this.toRotate.length;

  let fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = 'We build' + '<br> ' + '&ensp;' + '<span class="wrap">'+this.txt+'</span>';

  let that = this;
  let delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var element = document.getElementsByClassName('js-typed-text');
  var toRotate = element[0].getAttribute('data-type');
  var period = element[0].getAttribute('data-period');
  if (toRotate) {
    new TxtType(element[0], JSON.parse(toRotate), period);
  }
};

var popupTimeline = anime.timeline();
$('.js-show-popup').on('click', function () {
  anime({
    targets: '.pop-up',
    translateY: 0,
    opacity: 1,
    easing: 'linear',
    duration: 500
  });
  anime({
    targets: '.list-form .list-form__field',
    translateY: 0,
    opacity: 1,
    easing: 'linear',
    duration: 500,
    delay: 500
  });
  anime({
    targets: '.list-form .btn',
    translateY: 0,
    opacity: 1,
    easing: 'linear',
    duration: 500,
    delay: 1000
  });
});

$('.js-popup-close').on('click', function () {
  anime({
    targets: '.pop-up',
    translateY: '-100%',
    opacity: 0,
    easing: 'linear',
    duration: 500
  });
  anime({
    targets: '.list-form .list-form__field',
    translateY: -150,
    opacity: 0.4,
    easing: 'linear',
    duration: 500
    // delay: 500
  });
  anime({
    targets: '.list-form .btn',
    translateY: 50,
    opacity: 0,
    easing: 'linear',
    duration: 500
    // delay: 1000
  });
});

$(document).ready(function () {
  $('.pop-up').css('transform', 'translateY(-100%)');
  $('.pop-up').css('opacity', '1');
  $('.list-form .list-form__field').each(function () {
    $(this).css('transform', 'translateY(-150px)');
    $(this).css('opacity', '0.4');
  });
  $('.list-form .btn').css('transform', 'translateY(150px)');
  $('.list-form .btn').css('opacity', '0');
});