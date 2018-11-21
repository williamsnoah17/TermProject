angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function ($scope, Listings) {
    $scope.detailedInfo = {};
    $scope.roomInfo = {rating: {}};
    $scope.roomInfo.roomSize = "Small";
    $scope.roomInfo.blackboard = false;
    $scope.roomInfo.whiteboard = false;
    $scope.roomInfo.isOccupied = false;
    $scope.roomInfo.rating.likes = 0;
    $scope.roomInfo.rating.dislikes = 0;
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
      var roomInfo = $scope.roomInfo;
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
        $scope.roomInfo = {rating: {}}; //Clear the scope afterwards.
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

        $scope.roomInfo = {rating: {}}; //Clear the scope afterwards.
        $scope.roomInfo.roomSize = "Small"; //And set the small box to be checked.
        $scope.roomInfo.blackboard = false;
        $scope.roomInfo.whiteboard = false;
        $scope.roomInfo.isOccupied = false;

        window.alert("A new room has been added to : " + place.code);
      }
      location.reload();

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
      //Display details
      $scope.showDetails($scope.listings[placeIndex], classIndex);
    };

    //What happens when the user hits the like button
    $scope.hitLike = function (placeIndex, classIndex) {
      //Display details
      $scope.showDetails($scope.listings[placeIndex], classIndex);
      //Get user variable.
      var user = firebase.auth().currentUser;
      //Dislay the name of the user logged in.
      if(user != null) {
        var hasLiked = false;
        var hasDisliked = false;
        const email = user.email;

        //Check if the user has liked the post.
        var likedIndex = 0;
        for (likedIndex = 0; likedIndex < $scope.listings[placeIndex].classRoomArray[classIndex].likedBy.length; likedIndex++) {
          if ($scope.listings[placeIndex].classRoomArray[classIndex].likedBy[likedIndex] == email) {
            hasLiked = true;
            break;
          }
        }
        //Check if they have disliked the post.
        var dislikedIndex = 0;
        for (dislikedIndex = 0; dislikedIndex < $scope.listings[placeIndex].classRoomArray[classIndex].dislikedBy.length; dislikedIndex++) {
          if ($scope.listings[placeIndex].classRoomArray[classIndex].dislikedBy[dislikedIndex] == email) {
            hasDisliked = true;
            break;
          }
        }

        //Error
        if(hasDisliked && hasLiked) {
          window.alert("Error : cannot have both liked and disliked a post.");
          return;
        }
        //If they have previously liked the post, then unlike it.
        else if(hasLiked) {
          //Lower the like count by 1 and remove the liker.
          $scope.listings[placeIndex].classRoomArray[classIndex].likedBy.splice(likedIndex, 1);
          $scope.listings[placeIndex].classRoomArray[classIndex].rating.likes = $scope.listings[placeIndex].classRoomArray[classIndex].likedBy.length;

          Listings.update($scope.listings[placeIndex]._id, $scope.listings[placeIndex]).then(function (response) { }, function (error) {
            console.log('Unable to update listing:', error);
          });
        }
        else if(hasDisliked) {
          //Lower the dislike count by 1, remove from the dislike list
          $scope.listings[placeIndex].classRoomArray[classIndex].dislikedBy.splice(dislikedIndex, 1);
          $scope.listings[placeIndex].classRoomArray[classIndex].rating.dislikes = $scope.listings[placeIndex].classRoomArray[classIndex].dislikedBy.length;

          //Increment the like count by 1, add to the like list
          $scope.listings[placeIndex].classRoomArray[classIndex].likedBy.push(email);
          $scope.listings[placeIndex].classRoomArray[classIndex].rating.likes = $scope.listings[placeIndex].classRoomArray[classIndex].likedBy.length;          
          
          Listings.update($scope.listings[placeIndex]._id, $scope.listings[placeIndex]).then(function (response) { }, function (error) {
            console.log('Unable to update listing:', error);
          });          
        }
        else {
          //Increment the like count by 1, add to the like list
          $scope.listings[placeIndex].classRoomArray[classIndex].likedBy.push(email);    
          $scope.listings[placeIndex].classRoomArray[classIndex].rating.likes = $scope.listings[placeIndex].classRoomArray[classIndex].likedBy.length;      
          
          Listings.update($scope.listings[placeIndex]._id, $scope.listings[placeIndex]).then(function (response) { }, function (error) {
            console.log('Unable to update listing:', error);
          });  
        }  
      }
      //If no one is logged in then you cannot like.
      else {
        return;
      }
    };


    //When user hits the dislike button
    $scope.hitDislike = function (placeIndex, classIndex) {
      //Display details
      $scope.showDetails($scope.listings[placeIndex], classIndex);
      //Get user variable.
      var user = firebase.auth().currentUser;
      //Dislay the name of the user logged in.
      if(user != null) {
        var hasLiked = false;
        var hasDisliked = false;
        const email = user.email;

        //Check if the user has liked the post.
        var likedIndex = 0;
        for (likedIndex = 0; likedIndex < $scope.listings[placeIndex].classRoomArray[classIndex].likedBy.length; likedIndex++) {
          if ($scope.listings[placeIndex].classRoomArray[classIndex].likedBy[likedIndex] == email) {
            hasLiked = true;
            break;
          }
        }
        //Check if they have disliked the post.
        var dislikedIndex = 0;
        for (dislikedIndex = 0; dislikedIndex < $scope.listings[placeIndex].classRoomArray[classIndex].dislikedBy.length; dislikedIndex++) {
          if ($scope.listings[placeIndex].classRoomArray[classIndex].dislikedBy[dislikedIndex] == email) {
            hasDisliked = true;
            break;
          }
        }

        //Error
        if(hasDisliked && hasLiked) {
          return;
        }
        //If they have previously disliked the post, then undislike it.
        else if(hasDisliked) {

          //Lower the dislike count by 1 and remove the disliker.
          $scope.listings[placeIndex].classRoomArray[classIndex].dislikedBy.splice(dislikedIndex, 1);
          $scope.listings[placeIndex].classRoomArray[classIndex].rating.dislikes = $scope.listings[placeIndex].classRoomArray[classIndex].dislikedBy.length;

          Listings.update($scope.listings[placeIndex]._id, $scope.listings[placeIndex]).then(function (response) { }, function (error) {
            console.log('Unable to update listing:', error);
          });

        }
        //Has previously liked the classroom
        else if(hasLiked) {
          //Lower the like count by 1, remove from the like list
          $scope.listings[placeIndex].classRoomArray[classIndex].likedBy.splice(likedIndex, 1);
          $scope.listings[placeIndex].classRoomArray[classIndex].rating.likes = $scope.listings[placeIndex].classRoomArray[classIndex].likedBy.length;

          //Increment the like count by 1, add to the like list
          $scope.listings[placeIndex].classRoomArray[classIndex].dislikedBy.push(email);
          $scope.listings[placeIndex].classRoomArray[classIndex].rating.dislikes = $scope.listings[placeIndex].classRoomArray[classIndex].dislikedBy.length;          
          
          Listings.update($scope.listings[placeIndex]._id, $scope.listings[placeIndex]).then(function (response) { }, function (error) {
            console.log('Unable to update listing:', error);
          });
          
        }
        //Neither liked nor disliked
        else {
          //Increment the dislike count by 1, add to the dislike list
          $scope.listings[placeIndex].classRoomArray[classIndex].dislikedBy.push(email);   
          $scope.listings[placeIndex].classRoomArray[classIndex].rating.dislikes = $scope.listings[placeIndex].classRoomArray[classIndex].dislikedBy.length;       
          
          Listings.update($scope.listings[placeIndex]._id, $scope.listings[placeIndex]).then(function (response) { }, function (error) {
            console.log('Unable to update listing:', error);
          });   
        }  
      }
      //If no one is logged in then you cannot dislike.
      else {
        return;
      }
    };

  }
]);