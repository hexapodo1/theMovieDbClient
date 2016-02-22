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
        actorId: 0,
        movieId: 0,
    };
})
.controller("HomeController", function($scope, $http, api, parametros) {
    $scope.actorClick = function(id) {
        parametros['actorId']=id;
    };
    $scope.movieClick = function(id) {
        parametros['movieId']=id;
    };
    $scope.searchAction = function (){
        if ($scope.search.length >= 3) {
            $http.get('http://api.themoviedb.org/3/configuration?api_key=' + api.key)
            .success(function(data){
                $scope.config=data;
                    $http.get('http://api.themoviedb.org/3/search/person?query=' + $scope.search + '&api_key=' + api.key)
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
        }
    };
})
.controller("ActorController", function($scope, $http, api, parametros) {
    $http.get('http://api.themoviedb.org/3/configuration?api_key=' + api.key)
        .success(function(data){
            $scope.config=data;
                $http.get('http://api.themoviedb.org/3/person/' + parametros['actorId'] + '?api_key=' + api.key)
                    .success(function(data){
                        $scope.actor=data;
                    });
                $http.get('http://api.themoviedb.org/3/person/' + parametros['actorId'] + '/movie_credits?api_key=' + api.key)
                    .success(function(data){
                        $scope.movies=data.cast;
                    });   
        });
    $scope.movieClick = function(id) {
        parametros['movieId']=id;
    };
})
.controller("MovieController", function($scope, $http, api, parametros) {
    $http.get('http://api.themoviedb.org/3/configuration?api_key=' + api.key)
        .success(function(data){
            $scope.config=data;
                $http.get('http://api.themoviedb.org/3/movie/' + parametros['movieId'] + '?api_key=' + api.key)
                    .success(function(data){
                        $scope.movie=data;
                    });
                $http.get('http://api.themoviedb.org/3/movie/' + parametros['movieId'] + '/images?api_key=' + api.key)
                    .success(function(data){
                        $scope.images=data.backdrops;
                    });   
                $http.get('http://api.themoviedb.org/3/movie/' + parametros['movieId'] + '/credits?api_key=' + api.key)
                    .success(function(data){
                        $scope.casts=data.cast;
                    });   
        });
    $scope.actorClick = function(id) {
        parametros['actorId']=id;
    };
})
;