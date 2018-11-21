angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('http://localhost:8080/api/listings');
    },
  
  create: function(listing) {
    return $http.post('http://localhost:8080api/listings', listing);
    },
    
  update : function(id, listing) {
      return $http.put(`http://localhost:8080/api/listings/${id}`, listing);
    },
    
  delete: function(id) {
    return $http.delete(`http://localhost:8080/api/listings/${id}`);
    }
  };
   return methods;
});