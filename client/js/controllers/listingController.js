  angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
    function($scope, Listings) {
      $scope.roomInfo = {};
      $scope.roomInfo.roomSize = "Small";
      $scope.roomInfo.blackboard = false;
      $scope.roomInfo.whiteboard = false;
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

    $scope.addClassroom = function(index, place) {
      
      const roomInfo = $scope.roomInfo;
      var duplicateRoom = false;

      for(var i = 0; i < $scope.listings[index].classRoomArray.length; i++) {
        if($scope.listings[index].classRoomArray[i].roomNumber == roomInfo.roomNumber) {
          $scope.roomInfo = {}; //Clear the scope afterwards.
          $scope.roomInfo.roomSize = "Small"; //And set the small box to be checked.
          $scope.roomInfo.blackboard = false;
          $scope.roomInfo.whiteboard = false;
          duplicateRoom = true;
          break;
        }
      }

      if(duplicateRoom) {
        window.alert("Cannot add duplicate room number!");
        $scope.roomInfo = {}; //Clear the scope afterwards.
        $scope.roomInfo.roomSize = "Small"; //And set the small box to be checked.
        $scope.roomInfo.blackboard = false;
        $scope.roomInfo.whiteboard = false;
        return;
      }
      else {
      console.log(roomInfo);
      $scope.listings[index].classRoomArray.push(roomInfo);

      Listings.update($scope.listings[index]._id, $scope.listings[index]).then(function(response) {}, function(error) {
         console.log('Unable to update listing:', error);
      });

      $scope.roomInfo = {}; //Clear the scope afterwards.
      $scope.roomInfo.roomSize = "Small"; //And set the small box to be checked.
      $scope.roomInfo.blackboard = false;
      $scope.roomInfo.whiteboard = false;


      window.alert("A new room has been added to: " + place.code);
      }
  
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