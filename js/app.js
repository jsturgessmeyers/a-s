(function(){
  var app = angular.module('atvalSearch', []);

  // Getting the necessary JSON files and
  // storing data to arrays
  app.controller('SearchCtrl', function($scope, $http){
    $scope.sites = [];
    $scope.logos = [];

    $http.get('/js/ATVAL.json')
    .success(function(data){
      $scope.sites = data;
    });

    $http.get('/js/LOGOS.json')
    .success(function(data){
      $scope.logos = data;
    });
  });

  // Filter to loop through sites array and pull matches
  app.filter('siteFilter', function() {
    return function(arr, searchTerms) {
      if (!searchTerms) {
        return arr;
      }

      var result = [];
      searchTerms = searchTerms.toLowerCase();

      angular.forEach(arr, function(v, k) {
        if (v.PUBNAME.toLowerCase().indexOf(searchTerms) !== -1 || v.PUBBRAND.toLowerCase().indexOf(searchTerms) !== -1 || v.PUBPCITY.toLowerCase().indexOf(searchTerms) !== -1 || v.MARKETAREA.toLowerCase().indexOf(searchTerms) !== -1) {
          result.push(v);
        }
      });

      return result;
    }
  });
})();