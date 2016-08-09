(function () {
  "use strict";

  angular.module("ng1-currency-directive", []).directive('currencyControl', function ($browser) {
    return {
      restrict: 'A', // only activate on element attribute
      require: '?ngModel', // get a hold of NgModelController
      link: function (scope, element, attrs, ngModel) {
            
       
      }
        
    }
  });

})();

