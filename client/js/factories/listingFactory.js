angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('http://localhost:8080/api/listings');
    },
  
  create: function(listing) {
    return $http.post('http://localhost:8080/api/listings', listing);
    },
     
    //Not sure how to build this function to update the listings.
    // update : function(id) {
    //   return $http.put(`http://localhost:8080/api/listings/${id}`);
    // },
    
     delete: function(id) {
    return $http.delete(`http://localhost:8080/api/listings/${id}`);
    }
  };
   return methods;
});