// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', [])

	.controller('MainController', ['$scope', 'Application',function($scope, Application){
		Application.get().then(function(applications){
			$scope.home = {
				documents: applications.data
			};
		});
	}])

	.directive('a', [function() {
		return {
			restrict: 'E',
			link: function(scope, elem, attrs) {
				if(attrs.ngClick || attrs.href === '' || attrs.href === '#'){
					elem.on('click', function(e){
						e.preventDefault();
					});
				}
			}
		};
	}])

	.directive('createItem', ['$modal','$filter','Application','dataService', function($modal,$filter,Application,dataService){
		return{
			restrict: 'A',
			scope: {
				items: '=?'
			},
			link: function(scope, elem, attrs){
				var lists = dataService.getLists();
				elem.on('click', function(){
					lists.then(function(data){
						if(!scope.items) scope.items = [];
						scope.form = {
							data: {
								importItems: [{}]
							},
							options: {
								units: $filter('filter')(data.data,{listType: 'unitsOfMeasure'}, true)[0].list,
								countries: $filter('filter')(data.data,{listType: 'country'}, true)[0].list,
								states: $filter('filter')(data.data,{listType: 'countryState'}, true)[0].list
							},
							modal: $modal.open({
					      		templateUrl: 'views/forms/create-import.html',
					      		scope: scope
					    	}),
					    	submit: function(form){
					    		if(form.$valid && form.$dirty){ //Validate Form
					    			Application.create(this.data).then(function(item){ //POST data
					    				scope.items.unshift(item.data); //POST - Success
					    			},
					    			function(err){
					    				console.log(JSON.stringify(err)); //POST - Fail
					    			});
						    		this.modal.close();
					    		}
					    	},
					    	cancel: function(){
					    		this.modal.close();
					    	}
					    }
				    });
				});
			}
		}
	}])

	.directive('editItem', ['$modal','$q','$filter','Application','dataService', function($modal,$q,$filter,Application,dataService){
		return{
			restrict: 'A',
			scope: {
				item: '=editItem',
				items: '=?'
			},
			link: function(scope, elem, attrs){
				elem.on('click', function(){
					dataService.getLists().then(function(lists){
						if(!scope.items) scope.items = [];
						scope.form = {
							data: angular.copy(scope.item),
							options: {
								units: $filter('filter')(lists.data,{listType: 'unitsOfMeasure'}, true)[0].list,
								countries: $filter('filter')(lists.data,{listType: 'country'}, true)[0].list,
								states: $filter('filter')(lists.data,{listType: 'countryState'}, true)[0].list
							},
							modal: $modal.open({
					      		templateUrl: 'views/forms/create-import.html',
					      		scope: scope
					    	}),
					    	submit: function(form){
					    		if(form.$valid && form.$dirty){
									Application.update(scope.item._id,this.data).then(function(item){ //POST data
					    				angular.extend(scope.item,item.data);
					    			},
					    			function(err){
					    				console.log(JSON.stringify(err)); //POST - Fail
					    			});
						    		this.modal.close();
					    		}
					    	},
					    	cancel: function(){
					    		this.modal.close();
					    	}
					    }
					})
				});
			}
		}
	}])

	.directive('deleteItem', ['Application', function(Application){
		return{
			restrict: 'A',
			scope: {
				item: '=deleteItem',
				items: '=?'
			},
			link: function(scope, elem, attrs){
				elem.on('click', function(){
					Application.delete(scope.item._id).then(function(){
						if(scope.items){
							var index = scope.items.indexOf(scope.item);
							if(index != -1) scope.items.splice(index, 1);
						}
					})
					
				});
			}
		}
	}])

	.factory('dataService', ['$q','$http', function($q,$http) {
		return {
			getLists: function(){
				return $http.get("sample-data/lists.json", {cache: true});
			}
		}
	}]);