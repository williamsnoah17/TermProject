angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function ($scope, Listings) {
    $scope.detailedInfo = {};
    $scope.roomInfo = {};
    $scope.roomInfo.roomSize = "Small";
    $scope.roomInfo.blackboard = false;
    $scope.roomInfo.whiteboard = false;
    $scope.roomInfo.isOccupied = false;
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function (response) {
      $scope.listings = response.data;
    }, function (error) {
      console.log('Unable to retrieve listings:', error);
    });

    //Creates a new building - unused function
    $scope.addListing = function () {

      Listings.create($scope.newListing).then(function (response) { }, function (error) {
        console.log('Unable to add listing:', error);
      });

      //Refresh the page
      location.reload();
    };

    //Adding a classroom
    $scope.addClassroom = function (index, place) {

      const roomInfo = $scope.roomInfo;
      var duplicateRoom = false;

      //Check if the room number already exists.
      for (var i = 0; i < $scope.listings[index].classRoomArray.length; i++) {
        if ($scope.listings[index].classRoomArray[i].roomNumber == roomInfo.roomNumber) {
          duplicateRoom = true;
          break;
        }
      }

      //If it exists, reset the request and return.
      if (duplicateRoom) {
        window.alert("Cannot add duplicate room number!");
        $scope.roomInfo = {}; //Clear the scope afterwards.
        $scope.roomInfo.roomSize = "Small"; //And set the small box to be checked.
        $scope.roomInfo.blackboard = false;
        $scope.roomInfo.whiteboard = false;
        $scope.roomInfo.isOccupied = false;
        return;
      }
      //Otherwise add the classroom the building's classroom array.
      else {
        $scope.listings[index].classRoomArray.push(roomInfo);

        Listings.update($scope.listings[index]._id, $scope.listings[index]).then(function (response) { }, function (error) {
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
    
    //Erases a function at a given index.
    $scope.deleteListing = function (index) {

      Listings.delete($scope.listings[index]._id).then(function (response) { }, function (error) {
        console.log('Unable to delete listing:', error);
      });
      //Refresh the page upon deletion.
      location.reload();
    };

    //Puts the information we need into the scope variable to be displayed.
    $scope.showDetails = function (place, index) {
      $scope.detailedInfo = {
        code: place.code,
        name: place.name,
        classroom: place.classRoomArray[index]
      };
    };

    //Search for classrooms in the search bar.
    $scope.searchFilterCustom = function (entry) {

      return function (entry) {
        if (typeof $scope.filterText == 'undefined') {
          return entry;
        }
        //Case insensitive
        if (entry.code.toLowerCase().includes($scope.filterText.toLowerCase()) || entry.name.toLowerCase().includes($scope.filterText.toLowerCase())) {
          return entry;
        }
      }
    };

    //Handles the style of the occupied button.
    $scope.loadOccupied = function (placeIndex, classIndex) {

      const isOccupied = $scope.listings[placeIndex].classRoomArray[classIndex].isOccupied;

      //Occupied
      if (isOccupied) {
        return {
            "background-color": 'red'
        }
      }
      //Empty
      else {
        return {
          "background-color": 'green'
        }
      }
    };

    //Toggles the occupancy of the classroom.
    $scope.toggleOccupied = function (placeIndex, classIndex) {

      const isOccupied = $scope.listings[placeIndex].classRoomArray[classIndex].isOccupied;
      
      //Toggles the occupancy.
      if (isOccupied) {
        $scope.listings[placeIndex].classRoomArray[classIndex].isOccupied = false;

      }
      else {
        $scope.listings[placeIndex].classRoomArray[classIndex].isOccupied = true;
      }

      //Update the database.
      Listings.update($scope.listings[placeIndex]._id, $scope.listings[placeIndex]).then(function (response) { }, function (error) {
        console.log('Unable to update listing:', error);
      });
    };


    //WIP
    $scope.hitLike = function (placeIndex, classIndex) {

      $scope.listings[placeIndex].classRoomArray[classIndex].rating.likes++;

      Listings.update($scope.listings[placeIndex]._id, $scope.listings[placeIndex]).then(function (response) { }, function (error) {
        console.log('Unable to update listing:', error);
      });
    };


    //WIP
    $scope.hitDislike = function (placeIndex, classIndex) {

      $scope.listings[placeIndex].classRoomArray[classIndex].rating.dislikes++;

      Listings.update($scope.listings[placeIndex]._id, $scope.listings[placeIndex]).then(function (response) { }, function (error) {
        console.log('Unable to update listing:', error);
      });
    };

  }
]);