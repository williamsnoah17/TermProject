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

    $scope.addClassroom = function(place) {
      window.alert(place.code);

      /*
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      TODO
      */
      Listing.updateOne({ name: place.name }, {classRoomArray: classRoomArray.push()}, function(err, listing) {
        if (err) throw err;
        Listing.findOne({ name: place.name }, function(err, listing) {
          if (err) throw err;
          console.log(listing);
        });
      });

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

    $scope.searchFilterCustom = function(entry) {

      return function(entry) {
        if(typeof $scope.filterText == 'undefined')
        {
          return entry;
        }

        if(entry.code.toLowerCase().includes($scope.filterText.toLowerCase()) || entry.name.toLowerCase().includes($scope.filterText.toLowerCase())) 
        {
         return entry;
       }
     }
   };
 }
 ]);