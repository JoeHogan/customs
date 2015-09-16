// public/js/controllers/MainCtrl.js
angular.module('ApplicationCtrl', [])

.controller('ApplicationController', ['$scope','Application','$q', function($scope,Application,$q) {
    
    Application.get().then(function(applications){

    }, function(err){
    	console.log(JSON.stringify(err)); //error getting taps
    }); 
    
}]);