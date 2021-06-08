angular.module('headerDinamicoModule')
    .controller('headerDinamicoCtrl',
        ['$scope',
            '$http',
            '$state',
            'loginService',
            '$location',
            function ($scope, $http, $state, loginService, $location) {
                var vm = this;

                vm.init = function () {
                    console.log("Empezamos");
                    loginService.getProfileConfig($location.search().url).then((profileConfig) => {
                        vm.titleStyle = profileConfig.titleStyle;
                        $scope.$apply();
                    })
                }

            }]);