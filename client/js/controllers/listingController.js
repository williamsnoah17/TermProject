  angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
    function($scope, Listings) {
      $scope.detailedInfo = {};
      $scope.roomInfo = {};
      $scope.roomInfo.roomSize = "Small";
      $scope.roomInfo.blackboard = false;
      $scope.roomInfo.whiteboard = false;
      $scope.roomInfo.isOccupied = false;
      /* Get all the listings, then bind it to the scope */
      Listings.getAll().then(function(response) {
        $scope.listings = response.data;
      }, function(error) {
        console.log('Unable to retrieve listings:', error);
      });


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
        $scope.roomInfo.isOccupied = false;
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
      $scope.roomInfo.isOccupied = false;


      window.alert("A new room has been added to : " + place.code);
      }
  
    };

    $scope.deleteListing = function(index) {

      Listings.delete($scope.listings[index]._id).then(function(response) {}, function(error) {
        console.log('Unable to delete listing:', error);
      });
      //Refresh the page upon deletion.
      location.reload();
    };

    $scope.showDetails = function(place, index) {
      console.log(place);
      $scope.detailedInfo = {code: place.code, 
        name: place.name,
        classroom : place.classRoomArray[index]};
      console.log($scope.detailedInfo);
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

   $scope.toggleOccupied = function(placeIndex, classIndex, place) {
   
    console.log(placeIndex);
     const isOccupied = $scope.listings[placeIndex].classRoomArray[classIndex].isOccupied;

    console.log($scope.listings[placeIndex]);
     console.log($scope.listings[placeIndex].classRoomArray[classIndex]);
     console.log(isOccupied);

    if(isOccupied) {
      $scope.listings[placeIndex].classRoomArray[classIndex].isOccupied = false;

    }
    else {
      $scope.listings[placeIndex].classRoomArray[classIndex].isOccupied = true;
    }

    Listings.update($scope.listings[placeIndex]._id, $scope.listings[placeIndex]).then(function(response) {}, function(error) {
       console.log('Unable to update listing:', error);
    });
    const afterToggle = $scope.listings[placeIndex].classRoomArray[classIndex].isOccupied;
    if(afterToggle) {
      document.getElementById("occupiedButton" + placeIndex + "" + classIndex).style.backgroundColor = "red";
    }
    else {
      document.getElementById("occupiedButton" + placeIndex + "" + classIndex).style.backgroundColor = "green";
    }
    };

    $scope.hitLike = function(placeIndex, classIndex) {

        $scope.listings[placeIndex].classRoomArray[classIndex].rating.likes++;

      Listings.update($scope.listings[placeIndex]._id, $scope.listings[placeIndex]).then(function(response) {}, function(error) {
         console.log('Unable to update listing:', error);
      });
      };

      $scope.hitDislike = function(placeIndex, classIndex) {

        $scope.listings[placeIndex].classRoomArray[classIndex].rating.dislikes++;

      Listings.update($scope.listings[placeIndex]._id, $scope.listings[placeIndex]).then(function(response) {}, function(error) {
         console.log('Unable to update listing:', error);
      });
      };
   
 }
 ]);