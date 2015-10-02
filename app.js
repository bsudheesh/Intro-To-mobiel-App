angular.module('serviceTestApp', ['ionic'])
    .service('MyHttpService', function ($http) {

        // these are functions exposed to public
        return {
            /**
             * returns all of the data
             */
            getAllUsers: function () {
                return $http.get('https://randomuser.me/api/?results=20');
            }
        }

    })
    .controller('MainController', function ($scope, MyHttpService) {
        /* BODY OF CONTROLLER - ADD CODE HERE */

        $scope.itemsList = [];


        /**
         * calls the service to get the data to populate the list
         * 
         * this function is NOT exposed to view
         */
        function populateList() {
            MyHttpService.getAllUsers().then(function (_data) {
                $scope.userList = _data.data.results;
            }, function error(_error) {
                alert("Error", _error);
            });
        }

        // To initialize the view, call populateList when controller
        // starts
        populateList();

    });
