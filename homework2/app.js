(function () {
    'use strict';
    angular.module('serviceParseApp', ['ionic','App.Services'])
        .controller('Controller', function ($scope, ParseService) {
            $scope.itemsList = [];
			$scope.inputItem = {
                value: "",
                name: "",
                room: ""
            };
            function populateList() {
                return ParseService.getAllObjects()
            }
            ParseService.login().then(function (_loggedInUser) {
                alert("User Logged In " + _loggedInUser.username);
                return populateList();
            }).then(function (_listData) {
                $scope.itemsList = _listData.results;

            }, function error(_errorResponse) {
                alert("ERROR " + _errorResponse);
            });
			$scope.editObject = function editObject(_object) {
                var data = null;
                var editedObject = {};
                var objectData = prompt("Enter the Edited Information", _object.name + ", " + _object.room);
                if (objectData != null) {
                    data = objectData.split(",");
                }
                if (objectData && (data.length === 2)) {
                    editedObject.name = data[0].trim();
                    editedObject.room = data[1].trim();
                    editedObject.objectId = _object.objectId;
                    console.log(JSON.stringify(editedObject));
                    ParseService.updateObject(editedObject)
                        .then(function itemUpdated(_updatedItem) {
                            alert("Item Updated " + _updatedItem.objectId);
                            return populateList();
                        }, function errorSaving(_error) {
                            alert("Error Editing Object " + _error)
                        });
                } else {
                    if (objectData !== null) {
                        alert("Invalid Input: " + objectData);
                    }
                }
            };
            $scope.deleteObject = function editObject(_objectId) {
                ParseService.deleteObjectById(_objectId)
                    .then(function itemSaved(_deletedObject) {
                        alert("Item Deleted " + _deletedObject.objectId);
                        return populateList();
                    }, function errorDeleting(_error) {
                        alert("Error Deleting Object " + _objectId)
                    });
            };
            $scope.addItem = function addItem() {
                var data = $scope.inputItem.value.split(",");
                if (data.length === 2) {
                    $scope.inputItem.name = data[0].trim();
                    $scope.inputItem.room = data[1].trim();
                    console.log(JSON.stringify($scope.inputItem));
                    ParseService.addObject($scope.inputItem)
                        .then(function itemSaved(_newItem) {
                            alert("Item Saved", _newItem.objectId);
                            $scope.inputItem = {};
                            return populateList();
                        }, function errorSaving(_error) {
                            $scope.inputItem = {};
                        });
                } else {
                    alert("Invalid Input: " + $scope.inputItem.value);
                    $scope.inputItem = {};
                }
            };
            function populateList() {
                return ParseService.getAllObjects().then(function (_listData) {
                    $scope.itemsList = _listData.results;
                });
            }
            function initializeController() {
                ParseService.login().then(function (_loggedInUser) {
                    alert("User Logged In " + _loggedInUser.username);
                    return populateList();
                }, function error(_errorResponse) {
                    alert("ERROR " + _errorResponse);
                });
            }
            initializeController();
        });
})();
