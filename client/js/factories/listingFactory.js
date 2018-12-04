angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
        return $http.get('https://nullclass.herokuapp.com/api/listings');
    },
  
  create: function(listing) {
      return $http.post('https://nullclass.herokuapp.com/api/listings', listing);
    },
    
  update : function(id, listing) {
      return $http.put(`https://nullclass.herokuapp.com/api/listings/${id}`, listing);
    },
    
  delete: function(id) {
      return $http.delete(`https://nullclass.herokuapp.com/api/listings/${id}`);
    }
  };
   return methods;
});