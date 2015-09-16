// public/js/services/TapService.js
angular.module('ApplicationService', []).factory('Application', ['$http', function($http) {

    return {
        get : function() {
            return $http.get('/api/applications');
        },
        create : function(applicationData) {
            return $http.post('/api/applications', applicationData);
        },
        update : function(id, applicationData) {
            return $http.put('/api/applications/' + id, applicationData);
        },
        delete : function(id) {
            return $http.delete('/api/applications/' + id);
        }
    }       

}]);