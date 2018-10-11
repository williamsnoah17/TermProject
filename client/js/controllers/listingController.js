angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;

    $scope.addListing = function() {

      Listings.create($scope.newListing).then(function(response) {}, function(error) {
        console.log('Unable to add listing:', error);
      });

      //Refresh the page
      location.reload();
    };

    $scope.deleteListing = function(index) {

      Listings.delete($scope.listings[index]._id).then(function(response) {}, function(error) {
        console.log('Unable to delete listing:', error);
      });
      //Refresh the page upon deletion.
      location.reload();
  };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);