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
.factory('config', function($http) {
    return { baseUrl: 'http://test.kishron.com.co:8086/index.php/' };
})
.factory('parametros', function() {
    return { 
        actorId: 0,
        movieId: 0,
        void_profile_path: ['assets/img/nopr45.png', '', 'assets/img/nopr632.png'],
        void_poster_path: ['assets/img/nopo92.png', '', '', 'assets/img/nopo342.png' ],
    };
})
.controller("HomeController", function($scope, $http, config, parametros) {
    $scope.void_profile_path = parametros['void_profile_path'];
    $scope.actorClick = function(id) {
        parametros['actorId']=id;
    };
    $scope.movieClick = function(id) {
        parametros['movieId']=id;
    };
    $scope.searchAction = function (){
        if ($scope.search.length >= 3) {
            $scope.config = globalConfig;
            $http.get(config.baseUrl + 'search/person?query=' + $scope.search)
                .success(function(data){
                    $scope.actors=data.results;
                    if (data.total_results===0) {
                        $scope.void = true;
                    } else {
                        $scope.void = false;
                    }
                    // disabled by performance
                    /*$.each(data.results, function(i,j){
                        $http.get(config.baseUrl + 'detail/person/' + data.results[i].id )
                            .success(function(data2){
                                $scope.actors[i].detail=data2;
                            });
                    });*/
                });   
        } else {
            $scope.config = false;
        }
    };
})
.controller("ActorController", function($scope, $http, config, parametros) {
    $scope.void_profile_path = parametros['void_profile_path'];
    $scope.void_poster_path = parametros['void_poster_path'];
    
    $scope.config = globalConfig;
    $http.get(config.baseUrl + 'detail/person/' + parametros['actorId'])
        .success(function(data){
            $scope.actor=data;
        });
    $http.get(config.baseUrl + 'movie/credits/person/' + parametros['actorId'])
        .success(function(data){
            $scope.movies=data.cast;
        });   
    $scope.movieClick = function(id) {
        parametros['movieId']=id;
    };
})
.controller("MovieController", function($scope, $http, config, parametros) {
    $scope.void_profile_path = parametros['void_profile_path'];
    $scope.void_poster_path = parametros['void_poster_path'];
    $scope.config=globalConfig;
    $http.get(config.baseUrl + 'detail/movie/' + parametros['movieId'])
        .success(function(data){
            $scope.movie=data;
        });
    $http.get(config.baseUrl + 'images/movie/' + parametros['movieId'] )
        .success(function(data){
            $scope.images=data.backdrops;
        });   
    $http.get(config.baseUrl + 'credits/movie/' + parametros['movieId'] )
        .success(function(data){
            $scope.casts=data.cast;
        });   
    $scope.actorClick = function(id) {
        parametros['actorId']=id;
    };
})
;