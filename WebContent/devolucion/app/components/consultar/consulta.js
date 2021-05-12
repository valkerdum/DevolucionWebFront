angular.module('consultaModule')
    .controller('consultaCtrl',
        ['$scope', '$http', '$state', 'consultaService', '$location',
            function ($scope, $http, $state, consultaService, $location) {
                var vm = this;
                var host = $location.protocol()+'://'+$location.host()+':'+$location.port();
                vm.mostrarMensaje = false;
                vm.estado = "";
                vm.numeroOC = $location.search().numeroOC;
                vm.buscarDevolucion = function () {

                    $http.get(host+'/devolucionRest/rest/logistica/devolucionClient/' + vm.numeroOC)
                        .success(function (data) {
                            console.log(data);
                            if (null != data.estadoDevolucion) {
                                vm.mostrarMensaje = data.estadoDevolucion;
                                vm.estado = data.estadoDevolucion;
                            } else {
                                $('#mensaje').html('Solicitud no encontrada. </b>');
                            }
                            $('#formIngreso').hide();
                            //$('#contenedorMensaje').show();
                            //vm.mostrarMensaje=true;

                        })
                        .error(function (data) {
                            console.log('Error:' + data);
                            $('#mensaje').html('Ha ocurrido un error: </br>' + data + '</b>');
                            $('#contenedorMensaje').show();
                        });
                };

            }]);