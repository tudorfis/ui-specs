app.controller("MainCtrl", function($scope, $http){

    var apiUrl = 'http://aha.indicoebm.com/api/RiskCalculatorManager/',
        apiHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=utf-8'
        };

    $scope.races = {
        '-': 'Select race',
        'AA': 'African American',
        'WH': 'Other'
    };

    $scope.bs_data = {
        Race: '-',
        TreatmentwithStatin: false,
        TreatmentforHypertension: false,
        HistoryofDiabetes: false,
        CurrentSmoker: false,
        AspirinTherapy: false
    };

    $scope.ur_data = {
        TreatmentwithStatin: false,
        TreatmentforHypertension: false,
        HistoryofDiabetes: false,
        CurrentSmoker: false,
        AspirinTherapy: false
    };

    $scope.submitBaselineRisk = function(blrForm) {
        $scope.blrFormSubmited = true;
        if (blrForm.$valid) {
            $scope.blrFormLoading = true;
            $scope.blrFormSuccess = false;
            $scope.blrFormWarning = false;
            $scope.blrFormError = false;

            var url = apiUrl + 'GetBaselineRiskResult';
            $http({
                method: "POST",
                url: url,
                headers: apiHeaders,
                data: $scope.bs_data
            }).then(function(res){
                $scope.blrFormLoading = false;
                var data = res.data;
                if (data.status == "Success") {
                    $scope.blrFormSuccess = true;
                    $scope.baselineRisk = data.baselineRisk;
                    $scope.therapyChoice = data.therapyChoice;
                    $scope.ur_data.age = $scope.bs_data.age;
                    $scope.ur_data.Race = $scope.bs_data.Race;
                    $scope.ur_data.Gender = $scope.bs_data.Gender;
                } else if (data.status == "Error") {
                    $scope.blrFormWarning = true;
                    $scope.blrFormWarningMessage = data.message;
                }
            }, function(res){
                $scope.blrFormError = true;
            });
        }
    };

    $scope.submitUpdatedRisk = function(urForm) {
        $scope.urFormSubmited = true;
        if (urForm.$valid) {
            $scope.urFormLoading = true;
            $scope.urFormSuccess = false;
            $scope.urFormWarning = false;
            $scope.urFormError = false;

            if (parseFloat($scope.bs_data.age) >= parseFloat($scope.ur_data.age)) {
                $scope.urFormLoading = false;
                $scope.urFormWarning = true;
                $scope.urFormWarningMessage = "Warning, age must be greater than previous age entered in baseline risk.";
            } else {
                var url = apiUrl + 'GetFollowUpRiskResult';
                $http({
                    method: "POST",
                    url: url,
                    headers: apiHeaders,
                    data: {
                        "BaselineParameters": $scope.bs_data,
                        "FollowupParameters": $scope.ur_data
                    }
                }).then(function(res){
                    $scope.urFormLoading = false;
                    var data = res.data;
                    if (data.status == "Success") {
                        $scope.urFormSuccess = true;
                        $scope.followupResult = data.followupResult;
                        $scope.urBaselineRisk = data.baselineRisk;
                        $scope.followupRiskNothingDone = data.followupRiskNothingDone;
                        $scope.compositeASCVDRisk = data.compositeASCVDRisk;
                    } else if (data.status == "Error") {
                        $scope.urFormWarning = true;
                        $scope.urFormWarningMessage = data.message;
                    }
                }, function(res){
                    $scope.urFormError = true;
                });
            }
        }
    }

});