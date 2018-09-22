$('.js-show-popup').on('click', function () {
  $('.pop-up').css('display', 'flex');
});

$('.js-popup-close').on('click', function () {
  $('.pop-up').css('display', 'none');
});

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJCgnLmpzLXNob3ctcG9wdXAnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgJCgnLnBvcC11cCcpLmNzcygnZGlzcGxheScsICdmbGV4Jyk7XHJcbn0pO1xyXG5cclxuJCgnLmpzLXBvcHVwLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICQoJy5wb3AtdXAnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG59KTtcclxuXHJcbmxldCBUeHRUeXBlID0gZnVuY3Rpb24oZWwsIHRvUm90YXRlLCBwZXJpb2QpIHtcclxuICB0aGlzLnRvUm90YXRlID0gdG9Sb3RhdGU7XHJcbiAgdGhpcy5lbCA9IGVsO1xyXG4gIHRoaXMubG9vcE51bSA9IDA7XHJcbiAgdGhpcy5wZXJpb2QgPSBwYXJzZUludChwZXJpb2QsIDEwKSB8fCAyMDAwO1xyXG4gIHRoaXMudHh0ID0gJ1dlIGJ1aWxkICc7XHJcbiAgdGhpcy50aWNrKCk7XHJcbiAgdGhpcy5pc0RlbGV0aW5nID0gZmFsc2U7XHJcbn07XHJcblxyXG5UeHRUeXBlLnByb3RvdHlwZS50aWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgbGV0IGkgPSB0aGlzLmxvb3BOdW0gJSB0aGlzLnRvUm90YXRlLmxlbmd0aDtcclxuXHJcbiAgbGV0IGZ1bGxUeHQgPSB0aGlzLnRvUm90YXRlW2ldO1xyXG5cclxuICBpZiAodGhpcy5pc0RlbGV0aW5nKSB7XHJcbiAgICB0aGlzLnR4dCA9IGZ1bGxUeHQuc3Vic3RyaW5nKDAsIHRoaXMudHh0Lmxlbmd0aCAtIDEpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aGlzLnR4dCA9IGZ1bGxUeHQuc3Vic3RyaW5nKDAsIHRoaXMudHh0Lmxlbmd0aCArIDEpO1xyXG4gIH1cclxuXHJcbiAgdGhpcy5lbC5pbm5lckhUTUwgPSAnV2UgYnVpbGQnICsgJzxicj4gJyArICcmZW5zcDsnICsgJzxzcGFuIGNsYXNzPVwid3JhcFwiPicrdGhpcy50eHQrJzwvc3Bhbj4nO1xyXG5cclxuICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgbGV0IGRlbHRhID0gMjAwIC0gTWF0aC5yYW5kb20oKSAqIDEwMDtcclxuXHJcbiAgaWYgKHRoaXMuaXNEZWxldGluZykgeyBkZWx0YSAvPSAyOyB9XHJcblxyXG4gIGlmICghdGhpcy5pc0RlbGV0aW5nICYmIHRoaXMudHh0ID09PSBmdWxsVHh0KSB7XHJcbiAgICBkZWx0YSA9IHRoaXMucGVyaW9kO1xyXG4gICAgdGhpcy5pc0RlbGV0aW5nID0gdHJ1ZTtcclxuICB9IGVsc2UgaWYgKHRoaXMuaXNEZWxldGluZyAmJiB0aGlzLnR4dCA9PT0gJycpIHtcclxuICAgIHRoaXMuaXNEZWxldGluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5sb29wTnVtKys7XHJcbiAgICBkZWx0YSA9IDUwMDtcclxuICB9XHJcblxyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICB0aGF0LnRpY2soKTtcclxuICB9LCBkZWx0YSk7XHJcbn07XHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdqcy10eXBlZC10ZXh0Jyk7XHJcbiAgdmFyIHRvUm90YXRlID0gZWxlbWVudFswXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdHlwZScpO1xyXG4gIHZhciBwZXJpb2QgPSBlbGVtZW50WzBdLmdldEF0dHJpYnV0ZSgnZGF0YS1wZXJpb2QnKTtcclxuICBpZiAodG9Sb3RhdGUpIHtcclxuICAgIG5ldyBUeHRUeXBlKGVsZW1lbnRbMF0sIEpTT04ucGFyc2UodG9Sb3RhdGUpLCBwZXJpb2QpO1xyXG4gIH1cclxufTsiXSwiZmlsZSI6ImFwcC5qcyJ9
