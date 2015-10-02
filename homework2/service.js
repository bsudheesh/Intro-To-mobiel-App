(function () {
    'use strict';
    angular.module('App.Services', [])
        .service('ParseService', function ($http) {

            var baseURL = "https://api.parse.com/1/";
            var authenticationHeaders = PARSE__HEADER_CREDENTIALS;
            return {
                login: function () {
                    var settings = {
                        headers: authenticationHeaders,
                        params: {
                            "username": "admin",
                            "password": "test"
                        }
                    };
                    return $http.get(baseURL + 'login', settings)
                        .then(function (response) {
                            console.log('login', response);
                            return response.data;
                        });
                },
                getAllObjects: function (_id) {
                    var settings = {
                        headers: authenticationHeaders
                    };
                    return $http.get(baseURL + 'classes/stuff/', settings)
                        .then(function (response) {
                            console.log('getAllObjects', response);
                            return response.data;
                        });
                },
                getObjectById: function (_id) {
                    var settings = {
                        headers: authenticationHeaders
                    };
                    return $http.get(baseURL + 'classes/stuff/' + _id, settings)
                        .then(function (response) {
                            console.log('getObjectById', response);
                            return response.data;
                        });
				
                },
				addObject: function (_params) {
                var settings = {
                    headers: authenticationHeaders
					};
                var dataObject = {
                    "name": _params.name,
                    "room": _params.room,
					};
                var dataObjectString = JSON.stringify(dataObject);
                return $http.post(baseURL + 'classes/stuff', dataObjectString, settings)
                    .then(function (response) {
                        console.log('addObject', response);
                        return response.data;
                    });
				},
				updateObject: function (_params) {
                var settings = {
                    headers: authenticationHeaders
					};
                var dataObject = {
                    "name": (_params.name ? _params.name : JSON.null),
                    "room": (_params.room ? _params.room : JSON.null)
					};
                var dataObjectString = JSON.stringify(dataObject);
                var apiUrl = baseURL + 'classes/stuff/' + _params.objectId;
                return $http.put(apiUrl, dataObjectString, settings)
                    .then(function (response) {
                        console.log('updateObject', response);
                        return response.data;
                    });
				},
				deleteObjectById: function (_id) {
                var settings = {
                    headers: authenticationHeaders
					};
                return $http.delete(baseURL + 'classes/stuff/' + _id, settings)
                    .then(function (response) {
                        console.log('deleteObjectById', response);
                        return response.data;
                    });
				}
				
            }

        })
})();
