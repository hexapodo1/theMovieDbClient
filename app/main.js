/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('miAp', ['ngRoute'])

.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'partials/home.html'
        })
        .when('/actor', {
            controller: 'ActorController',
            templateUrl: 'partials/actor.html'
        })
        .when('/movie', {
            controller: 'MovieController',
            templateUrl: 'partials/movie.html'
        })
        .when('/ajax', {
            controller: 'ajax',
            templateUrl: 'partials/test.html'
        })
        .otherwise({
            redirectTo: '/'
        });
})
.factory('api', function() {
    return { key: '977cda5d9bfac0a6b0252ef0272785b6' };
})
.factory('parametros', function() {
    return { 
        actorId: '',
        movieId: ''
    };
})
.controller("ajax", function($scope, $http) {
    $scope.getData=function(){
        $http.get('http://api.themoviedb.org/3/configuration?api_key=977cda5d9bfac0a6b0252ef0272785b6')
                .success(function(data){
                    Dato=data;
                    //$scope.dato=
                });
    };
})
.controller("HomeController", function($scope, $http, api) {
    $http.get('http://api.themoviedb.org/3/configuration?api_key=' + api.key)
        .success(function(data){
            $scope.config=data;
                $http.get('http://api.themoviedb.org/3/search/person?query=depp&api_key=' + api.key)
                    .success(function(data){
                        $scope.actors=data.results;
                        $.each(data.results, function(i,j){
                            $http.get('http://api.themoviedb.org/3/person/' + data.results[i].id + '?api_key=' + api.key)
                                .success(function(data2){
                                    $scope.actors[i].detail=data2;
                                });
                        });
                    });   
        });
})
.controller("ActorController", function($scope, $http, api) {
    $http.get('http://api.themoviedb.org/3/configuration?api_key=' + api.key)
        .success(function(data){
            $scope.config=data;
                $http.get('http://api.themoviedb.org/3/person/6885?api_key=' + api.key)
                    .success(function(data){
                        $scope.actor=data;
                    });
                $http.get('http://api.themoviedb.org/3/person/6885/movie_credits?api_key=' + api.key)
                    .success(function(data){
                        $scope.movies=data.cast;
                    });   
        });
})
.controller("MovieController", function($scope, $http, api) {
    $http.get('http://api.themoviedb.org/3/configuration?api_key=' + api.key)
        .success(function(data){
            $scope.config=data;
                $http.get('http://api.themoviedb.org/3/movie/194?api_key=' + api.key)
                    .success(function(data){
                        $scope.movie=data;
                    });
                $http.get('http://api.themoviedb.org/3/movie/194/images?api_key=' + api.key)
                    .success(function(data){
                        $scope.images=data.backdrops;
                    });   
                $http.get('http://api.themoviedb.org/3/movie/194/credits?api_key=' + api.key)
                    .success(function(data){
                        $scope.casts=data.cast;
                    });   
        });
})
;