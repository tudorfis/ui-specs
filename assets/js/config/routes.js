app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/baseline-risk');
    $stateProvider
        .state('baseline-risk', {
            url: '/baseline-risk',
            templateUrl: 'assets/html/baseline-risk.html'
        })
        .state('updated-risk', {
            url: '/updated-risk',
            templateUrl: 'assets/html/updated-risk.html'
        });
});