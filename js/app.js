(function(){
  var app = angular.module('atvalSearch', []);

  // Getting the necessary JSON files and
  // storing data to arrays
  app.controller('SearchCtrl', function($scope, $http){
    $scope.sites = [];
    $scope.logos = [];
    $scope.content = null;

    $http.get('/js/ATVAL.json')
    .success(function(data){
      $scope.sites = data;
    });

    $http.get('/js/LOGOS.json')
    .success(function(data){
      $scope.logos = data;
    });

    $scope.setContent = function(data) {
      $scope.content = data;
    };

    // Resets the form
    $scope.reset = function() {
      $scope.searchTerms = "";
      $scope.customTerms = "";
      $scope.showATVAL = "";
      $scope.miscLogos = "";
      $scope.content = null;
      $scope.form.$setPristine();
    };

    $scope.dataType = function(data) {
      return typeof data;
    };
  });

  // Filter to loop through sites array and pull matches
  app.filter('siteFilter', function() {
    return function(arr, searchTerms) {
      var siteResult = [];
      searchTerms = searchTerms.toLowerCase();

      if (!searchTerms) {
        return arr;
      }

      angular.forEach(arr, function(v, k) {
        if (v.PUBNAME.toLowerCase().indexOf(searchTerms) !== -1 || v.PUBBRAND.toLowerCase().indexOf(searchTerms) !== -1 || v.PUBPCITY.toLowerCase().indexOf(searchTerms) !== -1 || v.MARKETAREA.toLowerCase().indexOf(searchTerms) !== -1) {
          siteResult.push(v);
        }
      });

      return siteResult;
    };
  });

  app.filter('customFilter', function() {
    return function(arr, customTerms) {
      var customResult = [];
      customTerms = customTerms.toLowerCase();

      if (!customTerms) {
        return arr;
      }

      angular.forEach(arr, function(v, k) {
        if (k.toLowerCase().indexOf(customTerms) !== -1) {
          customResult.push(k + ': ' + v);
        }
      });

      return customResult;
    };
  });

})();