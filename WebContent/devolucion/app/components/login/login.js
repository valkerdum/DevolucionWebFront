angular.module('loginModule')
    .controller('loginCtrl',
        ['$scope', '$http', '$state', 'loginService','$location', function ($scope, $http, $state, loginService,$location) {
            var vm = this;

            vm.buscarUsuario = function () {
            	var host = $location.protocol()+'://'+$location.host()+':'+$location.port();
                $http.post(host+'/devolucionRest/rest/logistica/login/validaUser', vm.formData)
                    .success(function (data) {
                        if ("false" != data) {
                            $state.go('productos');
                        } else {
                            vm.formData.error = 'Usuario o Clave Inválidos';
                        }
                    })
                    .error(function (data) {
                        console.log('Error:' + data);
                    });
            }
        }]);