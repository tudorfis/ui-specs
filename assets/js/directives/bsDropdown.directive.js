app.directive('bsDropdown', function ($timeout) {
    return {
        restrict: 'A',
        link: function link(scope, el, atts, controller) {
            el.dropdown();
        }
    }
});