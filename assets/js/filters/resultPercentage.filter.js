app.filter('resultPercentage', function() {
    return function(input) {
        if (input != 'NA') {
            return input + '%';
        }
        return input;
    };
});