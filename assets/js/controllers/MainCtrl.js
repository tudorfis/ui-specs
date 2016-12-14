app.controller("MainCtrl", function($scope, $http, $filter){

    // Basic admin:hvby0LTwjYCzP8Hojy4X

    var apiUrl = 'http://132.148.71.52/admin-panel-0.0.1-SNAPSHOT',
        apiHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Basic YWRtaW46aHZieTBMVHdqWUN6UDhIb2p5NFg='
        };

    $scope.users = [];
    $scope.user_mod = {};
    $scope.user_mod_selected = false;

    var url = apiUrl + '/users/list';
    $http({
        method: "GET",
        url: url,
        headers: apiHeaders,
        data: {}
    }).then(function(res){
        $scope.users = res.data.content;
        console.log($scope.users);
    }, function(res){
        console.log(res)
    });

    $scope.searchUsers = function() {
        var result = $filter('filter')($scope.users, $scope.search_users);
        if (result.length == 1) {
            $scope.selectUser(result[0]);
        } else {
            $scope.cancelUser();
        }
    };

    $scope.selectUser = function(user) {
        $scope.user_mod = user;
        $scope.user_mod_selected = true;
    };

    $scope.addUser = function() {
        $scope.user_mod = {};
        $scope.user_mod_selected = true;
    };

    $scope.cancelUser = function() {
        $scope.user_mod = {};
        $scope.user_mod_selected = false;
    };

    $scope.saveUser = function() {
        console.log($scope.user_mod);
        console.log('save user');
    };

    $scope.deleteUser = function() {
        console.log($scope.user_mod);
        console.log('delete');
    };






    $scope.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });

});