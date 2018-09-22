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
$(document).ready(function() {
  var element = document.getElementsByClassName('js-typed-text');
  var toRotate = element[0].getAttribute('data-type');
  var period = element[0].getAttribute('data-period');
  if (toRotate) {
    new TxtType(element[0], JSON.parse(toRotate), period);
  }
});
// Popup animation
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
  });
  anime({
    targets: '.list-form .btn',
    translateY: 50,
    opacity: 0,
    easing: 'linear',
    duration: 500
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
// Field label animation
$(document).ready(function () {
  $('.list-form .list-form__label').each(function () {
    $(this).css('transform', 'translateY(14px)');
    $(this).css('font-size', '16px')
  });
});
$('.list-form .list-form__input').focus(function () {
  $(this).parent().addClass('focused');
  anime({
    targets: '.list-form__field.focused .list-form__label',
    translateY: '-12px',
    fontSize: 12,
    easing: 'linear',
    duration: 200
  });
});
$('.list-form .list-form__input').focusout(function () {
  if($(this).val()) {
    $(this).parent().addClass('fill');
  }
  else {
    anime({
      targets: '.list-form__field.focused .list-form__label',
      translateY: '14px',
      fontSize: 16,
      easing: 'linear',
      duration: 200
    });
    if($(this).parent().hasClass('fill')) {
      $(this).parent().removeClass('fill')
    }
  }
  $(this).parent().removeClass('focused');
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVHlwaW5nIHRleHRcclxubGV0IFR4dFR5cGUgPSBmdW5jdGlvbihlbCwgdG9Sb3RhdGUsIHBlcmlvZCkge1xyXG4gIHRoaXMudG9Sb3RhdGUgPSB0b1JvdGF0ZTtcclxuICB0aGlzLmVsID0gZWw7XHJcbiAgdGhpcy5sb29wTnVtID0gMDtcclxuICB0aGlzLnBlcmlvZCA9IHBhcnNlSW50KHBlcmlvZCwgMTApIHx8IDIwMDA7XHJcbiAgdGhpcy50eHQgPSAnV2UgYnVpbGQgJztcclxuICB0aGlzLnRpY2soKTtcclxuICB0aGlzLmlzRGVsZXRpbmcgPSBmYWxzZTtcclxufTtcclxuVHh0VHlwZS5wcm90b3R5cGUudGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGxldCBpID0gdGhpcy5sb29wTnVtICUgdGhpcy50b1JvdGF0ZS5sZW5ndGg7XHJcblxyXG4gIGxldCBmdWxsVHh0ID0gdGhpcy50b1JvdGF0ZVtpXTtcclxuXHJcbiAgaWYgKHRoaXMuaXNEZWxldGluZykge1xyXG4gICAgdGhpcy50eHQgPSBmdWxsVHh0LnN1YnN0cmluZygwLCB0aGlzLnR4dC5sZW5ndGggLSAxKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhpcy50eHQgPSBmdWxsVHh0LnN1YnN0cmluZygwLCB0aGlzLnR4dC5sZW5ndGggKyAxKTtcclxuICB9XHJcblxyXG4gIHRoaXMuZWwuaW5uZXJIVE1MID0gJ1dlIGJ1aWxkJyArICc8YnI+ICcgKyAnJmVuc3A7JyArICc8c3BhbiBjbGFzcz1cIndyYXBcIj4nK3RoaXMudHh0Kyc8L3NwYW4+JztcclxuXHJcbiAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gIGxldCBkZWx0YSA9IDIwMCAtIE1hdGgucmFuZG9tKCkgKiAxMDA7XHJcblxyXG4gIGlmICh0aGlzLmlzRGVsZXRpbmcpIHsgZGVsdGEgLz0gMjsgfVxyXG5cclxuICBpZiAoIXRoaXMuaXNEZWxldGluZyAmJiB0aGlzLnR4dCA9PT0gZnVsbFR4dCkge1xyXG4gICAgZGVsdGEgPSB0aGlzLnBlcmlvZDtcclxuICAgIHRoaXMuaXNEZWxldGluZyA9IHRydWU7XHJcbiAgfSBlbHNlIGlmICh0aGlzLmlzRGVsZXRpbmcgJiYgdGhpcy50eHQgPT09ICcnKSB7XHJcbiAgICB0aGlzLmlzRGVsZXRpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMubG9vcE51bSsrO1xyXG4gICAgZGVsdGEgPSA1MDA7XHJcbiAgfVxyXG5cclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgdGhhdC50aWNrKCk7XHJcbiAgfSwgZGVsdGEpO1xyXG59O1xyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2pzLXR5cGVkLXRleHQnKTtcclxuICB2YXIgdG9Sb3RhdGUgPSBlbGVtZW50WzBdLmdldEF0dHJpYnV0ZSgnZGF0YS10eXBlJyk7XHJcbiAgdmFyIHBlcmlvZCA9IGVsZW1lbnRbMF0uZ2V0QXR0cmlidXRlKCdkYXRhLXBlcmlvZCcpO1xyXG4gIGlmICh0b1JvdGF0ZSkge1xyXG4gICAgbmV3IFR4dFR5cGUoZWxlbWVudFswXSwgSlNPTi5wYXJzZSh0b1JvdGF0ZSksIHBlcmlvZCk7XHJcbiAgfVxyXG59KTtcclxuLy8gUG9wdXAgYW5pbWF0aW9uXHJcbiQoJy5qcy1zaG93LXBvcHVwJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gIGFuaW1lKHtcclxuICAgIHRhcmdldHM6ICcucG9wLXVwJyxcclxuICAgIHRyYW5zbGF0ZVk6IDAsXHJcbiAgICBvcGFjaXR5OiAxLFxyXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcclxuICAgIGR1cmF0aW9uOiA1MDBcclxuICB9KTtcclxuICBhbmltZSh7XHJcbiAgICB0YXJnZXRzOiAnLmxpc3QtZm9ybSAubGlzdC1mb3JtX19maWVsZCcsXHJcbiAgICB0cmFuc2xhdGVZOiAwLFxyXG4gICAgb3BhY2l0eTogMSxcclxuICAgIGVhc2luZzogJ2xpbmVhcicsXHJcbiAgICBkdXJhdGlvbjogNTAwLFxyXG4gICAgZGVsYXk6IDUwMFxyXG4gIH0pO1xyXG4gIGFuaW1lKHtcclxuICAgIHRhcmdldHM6ICcubGlzdC1mb3JtIC5idG4nLFxyXG4gICAgdHJhbnNsYXRlWTogMCxcclxuICAgIG9wYWNpdHk6IDEsXHJcbiAgICBlYXNpbmc6ICdsaW5lYXInLFxyXG4gICAgZHVyYXRpb246IDUwMCxcclxuICAgIGRlbGF5OiAxMDAwXHJcbiAgfSk7XHJcbn0pO1xyXG4kKCcuanMtcG9wdXAtY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgYW5pbWUoe1xyXG4gICAgdGFyZ2V0czogJy5wb3AtdXAnLFxyXG4gICAgdHJhbnNsYXRlWTogJy0xMDAlJyxcclxuICAgIG9wYWNpdHk6IDAsXHJcbiAgICBlYXNpbmc6ICdsaW5lYXInLFxyXG4gICAgZHVyYXRpb246IDUwMFxyXG4gIH0pO1xyXG4gIGFuaW1lKHtcclxuICAgIHRhcmdldHM6ICcubGlzdC1mb3JtIC5saXN0LWZvcm1fX2ZpZWxkJyxcclxuICAgIHRyYW5zbGF0ZVk6IC0xNTAsXHJcbiAgICBvcGFjaXR5OiAwLjQsXHJcbiAgICBlYXNpbmc6ICdsaW5lYXInLFxyXG4gICAgZHVyYXRpb246IDUwMFxyXG4gIH0pO1xyXG4gIGFuaW1lKHtcclxuICAgIHRhcmdldHM6ICcubGlzdC1mb3JtIC5idG4nLFxyXG4gICAgdHJhbnNsYXRlWTogNTAsXHJcbiAgICBvcGFjaXR5OiAwLFxyXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcclxuICAgIGR1cmF0aW9uOiA1MDBcclxuICB9KTtcclxufSk7XHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAkKCcucG9wLXVwJykuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWSgtMTAwJSknKTtcclxuICAkKCcucG9wLXVwJykuY3NzKCdvcGFjaXR5JywgJzEnKTtcclxuICAkKCcubGlzdC1mb3JtIC5saXN0LWZvcm1fX2ZpZWxkJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVkoLTE1MHB4KScpO1xyXG4gICAgJCh0aGlzKS5jc3MoJ29wYWNpdHknLCAnMC40Jyk7XHJcbiAgfSk7XHJcbiAgJCgnLmxpc3QtZm9ybSAuYnRuJykuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWSgxNTBweCknKTtcclxuICAkKCcubGlzdC1mb3JtIC5idG4nKS5jc3MoJ29wYWNpdHknLCAnMCcpO1xyXG59KTtcclxuLy8gRmllbGQgbGFiZWwgYW5pbWF0aW9uXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAkKCcubGlzdC1mb3JtIC5saXN0LWZvcm1fX2xhYmVsJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVkoMTRweCknKTtcclxuICAgICQodGhpcykuY3NzKCdmb250LXNpemUnLCAnMTZweCcpXHJcbiAgfSk7XHJcbn0pO1xyXG4kKCcubGlzdC1mb3JtIC5saXN0LWZvcm1fX2lucHV0JykuZm9jdXMoZnVuY3Rpb24gKCkge1xyXG4gICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2ZvY3VzZWQnKTtcclxuICBhbmltZSh7XHJcbiAgICB0YXJnZXRzOiAnLmxpc3QtZm9ybV9fZmllbGQuZm9jdXNlZCAubGlzdC1mb3JtX19sYWJlbCcsXHJcbiAgICB0cmFuc2xhdGVZOiAnLTEycHgnLFxyXG4gICAgZm9udFNpemU6IDEyLFxyXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcclxuICAgIGR1cmF0aW9uOiAyMDBcclxuICB9KTtcclxufSk7XHJcbiQoJy5saXN0LWZvcm0gLmxpc3QtZm9ybV9faW5wdXQnKS5mb2N1c291dChmdW5jdGlvbiAoKSB7XHJcbiAgaWYoJCh0aGlzKS52YWwoKSkge1xyXG4gICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnZmlsbCcpO1xyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIGFuaW1lKHtcclxuICAgICAgdGFyZ2V0czogJy5saXN0LWZvcm1fX2ZpZWxkLmZvY3VzZWQgLmxpc3QtZm9ybV9fbGFiZWwnLFxyXG4gICAgICB0cmFuc2xhdGVZOiAnMTRweCcsXHJcbiAgICAgIGZvbnRTaXplOiAxNixcclxuICAgICAgZWFzaW5nOiAnbGluZWFyJyxcclxuICAgICAgZHVyYXRpb246IDIwMFxyXG4gICAgfSk7XHJcbiAgICBpZigkKHRoaXMpLnBhcmVudCgpLmhhc0NsYXNzKCdmaWxsJykpIHtcclxuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZmlsbCcpXHJcbiAgICB9XHJcbiAgfVxyXG4gICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2ZvY3VzZWQnKTtcclxufSk7Il0sImZpbGUiOiJhcHAuanMifQ==
