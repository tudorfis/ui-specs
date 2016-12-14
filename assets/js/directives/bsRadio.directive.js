app.directive('bsRadio', function ($timeout) {
    return {
        restrict: 'A',
        link: function link(scope, el, atts, controller) {
            el.radio();
        }
    }
});