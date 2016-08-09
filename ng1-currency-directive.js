(function () {
  "use strict";

  angular.module("ng1-currency-directive", []).directive('currencyControl', function ($browser) {
    return {
      restrict: 'A', // only activate on element attribute
      require: '?ngModel', // get a hold of NgModelController
      link: function (scope, element, attrs, ngModel) {
        
        Number.prototype.format = function (n, x) {
          var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
          return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
        };

        function formatter() {
          if (element.val()) {
            var value = element.val().replace(/,/g, '');

            value = Number(value);
            if (!isNaN(value) && value !== 0) {
              value = value.format();
              element.val(value);
            } else
              element.val("");
          }
        }
        
        ngModel.$parsers.push(function (viewValue) {
          return viewValue.replace(/,/g, '');
        })

        element.bind('change', formatter);

        element.bind('keydown', function (event) {
          var key = event.keyCode;
          // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
          // This lets us support copy and paste too
          if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40))
            return;
          $browser.defer(formatter);
        });
      }
        
    }
  });

})();

