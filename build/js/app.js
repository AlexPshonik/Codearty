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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVHlwaW5nIHRleHRcclxubGV0IFR4dFR5cGUgPSBmdW5jdGlvbihlbCwgdG9Sb3RhdGUsIHBlcmlvZCkge1xyXG4gIHRoaXMudG9Sb3RhdGUgPSB0b1JvdGF0ZTtcclxuICB0aGlzLmVsID0gZWw7XHJcbiAgdGhpcy5sb29wTnVtID0gMDtcclxuICB0aGlzLnBlcmlvZCA9IHBhcnNlSW50KHBlcmlvZCwgMTApIHx8IDIwMDA7XHJcbiAgdGhpcy50eHQgPSAnV2UgYnVpbGQgJztcclxuICB0aGlzLnRpY2soKTtcclxuICB0aGlzLmlzRGVsZXRpbmcgPSBmYWxzZTtcclxufTtcclxuXHJcblR4dFR5cGUucHJvdG90eXBlLnRpY2sgPSBmdW5jdGlvbigpIHtcclxuICBsZXQgaSA9IHRoaXMubG9vcE51bSAlIHRoaXMudG9Sb3RhdGUubGVuZ3RoO1xyXG5cclxuICBsZXQgZnVsbFR4dCA9IHRoaXMudG9Sb3RhdGVbaV07XHJcblxyXG4gIGlmICh0aGlzLmlzRGVsZXRpbmcpIHtcclxuICAgIHRoaXMudHh0ID0gZnVsbFR4dC5zdWJzdHJpbmcoMCwgdGhpcy50eHQubGVuZ3RoIC0gMSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRoaXMudHh0ID0gZnVsbFR4dC5zdWJzdHJpbmcoMCwgdGhpcy50eHQubGVuZ3RoICsgMSk7XHJcbiAgfVxyXG5cclxuICB0aGlzLmVsLmlubmVySFRNTCA9ICdXZSBidWlsZCcgKyAnPGJyPiAnICsgJyZlbnNwOycgKyAnPHNwYW4gY2xhc3M9XCJ3cmFwXCI+Jyt0aGlzLnR4dCsnPC9zcGFuPic7XHJcblxyXG4gIGxldCB0aGF0ID0gdGhpcztcclxuICBsZXQgZGVsdGEgPSAyMDAgLSBNYXRoLnJhbmRvbSgpICogMTAwO1xyXG5cclxuICBpZiAodGhpcy5pc0RlbGV0aW5nKSB7IGRlbHRhIC89IDI7IH1cclxuXHJcbiAgaWYgKCF0aGlzLmlzRGVsZXRpbmcgJiYgdGhpcy50eHQgPT09IGZ1bGxUeHQpIHtcclxuICAgIGRlbHRhID0gdGhpcy5wZXJpb2Q7XHJcbiAgICB0aGlzLmlzRGVsZXRpbmcgPSB0cnVlO1xyXG4gIH0gZWxzZSBpZiAodGhpcy5pc0RlbGV0aW5nICYmIHRoaXMudHh0ID09PSAnJykge1xyXG4gICAgdGhpcy5pc0RlbGV0aW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLmxvb3BOdW0rKztcclxuICAgIGRlbHRhID0gNTAwO1xyXG4gIH1cclxuXHJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgIHRoYXQudGljaygpO1xyXG4gIH0sIGRlbHRhKTtcclxufTtcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2pzLXR5cGVkLXRleHQnKTtcclxuICB2YXIgdG9Sb3RhdGUgPSBlbGVtZW50WzBdLmdldEF0dHJpYnV0ZSgnZGF0YS10eXBlJyk7XHJcbiAgdmFyIHBlcmlvZCA9IGVsZW1lbnRbMF0uZ2V0QXR0cmlidXRlKCdkYXRhLXBlcmlvZCcpO1xyXG4gIGlmICh0b1JvdGF0ZSkge1xyXG4gICAgbmV3IFR4dFR5cGUoZWxlbWVudFswXSwgSlNPTi5wYXJzZSh0b1JvdGF0ZSksIHBlcmlvZCk7XHJcbiAgfVxyXG59O1xyXG5cclxudmFyIHBvcHVwVGltZWxpbmUgPSBhbmltZS50aW1lbGluZSgpO1xyXG4kKCcuanMtc2hvdy1wb3B1cCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICBhbmltZSh7XHJcbiAgICB0YXJnZXRzOiAnLnBvcC11cCcsXHJcbiAgICB0cmFuc2xhdGVZOiAwLFxyXG4gICAgb3BhY2l0eTogMSxcclxuICAgIGVhc2luZzogJ2xpbmVhcicsXHJcbiAgICBkdXJhdGlvbjogNTAwXHJcbiAgfSk7XHJcbiAgYW5pbWUoe1xyXG4gICAgdGFyZ2V0czogJy5saXN0LWZvcm0gLmxpc3QtZm9ybV9fZmllbGQnLFxyXG4gICAgdHJhbnNsYXRlWTogMCxcclxuICAgIG9wYWNpdHk6IDEsXHJcbiAgICBlYXNpbmc6ICdsaW5lYXInLFxyXG4gICAgZHVyYXRpb246IDUwMCxcclxuICAgIGRlbGF5OiA1MDBcclxuICB9KTtcclxuICBhbmltZSh7XHJcbiAgICB0YXJnZXRzOiAnLmxpc3QtZm9ybSAuYnRuJyxcclxuICAgIHRyYW5zbGF0ZVk6IDAsXHJcbiAgICBvcGFjaXR5OiAxLFxyXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcclxuICAgIGR1cmF0aW9uOiA1MDAsXHJcbiAgICBkZWxheTogMTAwMFxyXG4gIH0pO1xyXG59KTtcclxuXHJcbiQoJy5qcy1wb3B1cC1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICBhbmltZSh7XHJcbiAgICB0YXJnZXRzOiAnLnBvcC11cCcsXHJcbiAgICB0cmFuc2xhdGVZOiAnLTEwMCUnLFxyXG4gICAgb3BhY2l0eTogMCxcclxuICAgIGVhc2luZzogJ2xpbmVhcicsXHJcbiAgICBkdXJhdGlvbjogNTAwXHJcbiAgfSk7XHJcbiAgYW5pbWUoe1xyXG4gICAgdGFyZ2V0czogJy5saXN0LWZvcm0gLmxpc3QtZm9ybV9fZmllbGQnLFxyXG4gICAgdHJhbnNsYXRlWTogLTE1MCxcclxuICAgIG9wYWNpdHk6IDAuNCxcclxuICAgIGVhc2luZzogJ2xpbmVhcicsXHJcbiAgICBkdXJhdGlvbjogNTAwXHJcbiAgICAvLyBkZWxheTogNTAwXHJcbiAgfSk7XHJcbiAgYW5pbWUoe1xyXG4gICAgdGFyZ2V0czogJy5saXN0LWZvcm0gLmJ0bicsXHJcbiAgICB0cmFuc2xhdGVZOiA1MCxcclxuICAgIG9wYWNpdHk6IDAsXHJcbiAgICBlYXNpbmc6ICdsaW5lYXInLFxyXG4gICAgZHVyYXRpb246IDUwMFxyXG4gICAgLy8gZGVsYXk6IDEwMDBcclxuICB9KTtcclxufSk7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgJCgnLnBvcC11cCcpLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVkoLTEwMCUpJyk7XHJcbiAgJCgnLnBvcC11cCcpLmNzcygnb3BhY2l0eScsICcxJyk7XHJcbiAgJCgnLmxpc3QtZm9ybSAubGlzdC1mb3JtX19maWVsZCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVZKC0xNTBweCknKTtcclxuICAgICQodGhpcykuY3NzKCdvcGFjaXR5JywgJzAuNCcpO1xyXG4gIH0pO1xyXG4gICQoJy5saXN0LWZvcm0gLmJ0bicpLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVkoMTUwcHgpJyk7XHJcbiAgJCgnLmxpc3QtZm9ybSAuYnRuJykuY3NzKCdvcGFjaXR5JywgJzAnKTtcclxufSk7Il0sImZpbGUiOiJhcHAuanMifQ==
