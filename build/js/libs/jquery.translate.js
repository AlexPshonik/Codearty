/**
 * @file jquery.translate.js
 * @brief jQuery plugin to translate text in the client side.
 * @author Manuel Fernandes
 * @site
 * @version 0.9
 * @license MIT license <http://www.opensource.org/licenses/MIT>
 *
 * translate.js is a jQuery plugin to translate text in the client side.
 *
 */

(function($){
  $.fn.translate = function(options) {

    var that = this; //a reference to ourselves
	
    var settings = {
      css: "trn",
      lang: "en"/*,
      t: {
        "translate": {
          pt: "tradução",
          br: "tradução"
        }
      }*/
    };
    settings = $.extend(settings, options || {});
    if (settings.css.lastIndexOf(".", 0) !== 0)   //doesn't start with '.'
      settings.css = "." + settings.css;
       
    var t = settings.t;
 
    //public methods
    this.lang = function(l) {
      if (l) {
        settings.lang = l;
        this.translate(settings);  //translate everything
      }
        
      return settings.lang;
    };


    this.get = function(index) {
      var res = index;

      try {
        res = t[index][settings.lang];
      }
      catch (err) {
        //not found, return index
        return index;
      }
      
      if (res)
        return res;
      else
        return index;
    };

    this.g = this.get;


    
    //main
    this.find(settings.css).each(function(i) {
      var $this = $(this);

      var trn_key = $this.attr("data-trn-key");
      if (!trn_key) {
        trn_key = $this.html();
        $this.attr("data-trn-key", trn_key);   //store key for next time
      }

      $this.html(that.get(trn_key));
    });
    
    
		return this;
		
		

  };
})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsaWJzL2pxdWVyeS50cmFuc2xhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBqcXVlcnkudHJhbnNsYXRlLmpzXG4gKiBAYnJpZWYgalF1ZXJ5IHBsdWdpbiB0byB0cmFuc2xhdGUgdGV4dCBpbiB0aGUgY2xpZW50IHNpZGUuXG4gKiBAYXV0aG9yIE1hbnVlbCBGZXJuYW5kZXNcbiAqIEBzaXRlXG4gKiBAdmVyc2lvbiAwLjlcbiAqIEBsaWNlbnNlIE1JVCBsaWNlbnNlIDxodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVD5cbiAqXG4gKiB0cmFuc2xhdGUuanMgaXMgYSBqUXVlcnkgcGx1Z2luIHRvIHRyYW5zbGF0ZSB0ZXh0IGluIHRoZSBjbGllbnQgc2lkZS5cbiAqXG4gKi9cblxuKGZ1bmN0aW9uKCQpe1xuICAkLmZuLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAgIHZhciB0aGF0ID0gdGhpczsgLy9hIHJlZmVyZW5jZSB0byBvdXJzZWx2ZXNcblx0XG4gICAgdmFyIHNldHRpbmdzID0ge1xuICAgICAgY3NzOiBcInRyblwiLFxuICAgICAgbGFuZzogXCJlblwiLyosXG4gICAgICB0OiB7XG4gICAgICAgIFwidHJhbnNsYXRlXCI6IHtcbiAgICAgICAgICBwdDogXCJ0cmFkdcOnw6NvXCIsXG4gICAgICAgICAgYnI6IFwidHJhZHXDp8Ojb1wiXG4gICAgICAgIH1cbiAgICAgIH0qL1xuICAgIH07XG4gICAgc2V0dGluZ3MgPSAkLmV4dGVuZChzZXR0aW5ncywgb3B0aW9ucyB8fCB7fSk7XG4gICAgaWYgKHNldHRpbmdzLmNzcy5sYXN0SW5kZXhPZihcIi5cIiwgMCkgIT09IDApICAgLy9kb2Vzbid0IHN0YXJ0IHdpdGggJy4nXG4gICAgICBzZXR0aW5ncy5jc3MgPSBcIi5cIiArIHNldHRpbmdzLmNzcztcbiAgICAgICBcbiAgICB2YXIgdCA9IHNldHRpbmdzLnQ7XG4gXG4gICAgLy9wdWJsaWMgbWV0aG9kc1xuICAgIHRoaXMubGFuZyA9IGZ1bmN0aW9uKGwpIHtcbiAgICAgIGlmIChsKSB7XG4gICAgICAgIHNldHRpbmdzLmxhbmcgPSBsO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZShzZXR0aW5ncyk7ICAvL3RyYW5zbGF0ZSBldmVyeXRoaW5nXG4gICAgICB9XG4gICAgICAgIFxuICAgICAgcmV0dXJuIHNldHRpbmdzLmxhbmc7XG4gICAgfTtcblxuXG4gICAgdGhpcy5nZXQgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgdmFyIHJlcyA9IGluZGV4O1xuXG4gICAgICB0cnkge1xuICAgICAgICByZXMgPSB0W2luZGV4XVtzZXR0aW5ncy5sYW5nXTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy9ub3QgZm91bmQsIHJldHVybiBpbmRleFxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmIChyZXMpXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9O1xuXG4gICAgdGhpcy5nID0gdGhpcy5nZXQ7XG5cblxuICAgIFxuICAgIC8vbWFpblxuICAgIHRoaXMuZmluZChzZXR0aW5ncy5jc3MpLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgdmFyIHRybl9rZXkgPSAkdGhpcy5hdHRyKFwiZGF0YS10cm4ta2V5XCIpO1xuICAgICAgaWYgKCF0cm5fa2V5KSB7XG4gICAgICAgIHRybl9rZXkgPSAkdGhpcy5odG1sKCk7XG4gICAgICAgICR0aGlzLmF0dHIoXCJkYXRhLXRybi1rZXlcIiwgdHJuX2tleSk7ICAgLy9zdG9yZSBrZXkgZm9yIG5leHQgdGltZVxuICAgICAgfVxuXG4gICAgICAkdGhpcy5odG1sKHRoYXQuZ2V0KHRybl9rZXkpKTtcbiAgICB9KTtcbiAgICBcbiAgICBcblx0XHRyZXR1cm4gdGhpcztcblx0XHRcblx0XHRcblxuICB9O1xufSkoalF1ZXJ5KTsiXSwiZmlsZSI6ImxpYnMvanF1ZXJ5LnRyYW5zbGF0ZS5qcyJ9
