angular.module('serviceParseApp', ['ionic', 'App.Controllers'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/home");
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "views/home.html",
                controller: "homeCtrl"
            })
            .state('detail', {
                url: "/detail/:objectId",
                templateUrl: "views/detail.html",
                controller: "detailCtrl"
            });
    });
