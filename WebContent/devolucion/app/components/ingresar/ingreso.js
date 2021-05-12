angular.module('ingresoModule')
    .controller('ingresoCtrl',
        ['$scope', '$http', '$state', 'ingresoService', '$location', function ($scope, $http, $state, ingresoService, $location) {
            var vm = this;
            var host = $location.protocol() + '://' + $location.host() + ':' + $location.port();
            vm.formData = {
            };
            vm.errors = {};
            vm.createTodo = function (form1, form2) {
                var dataEnviar = angular.copy(vm.formData);
                dataEnviar.codigoEmpresa = dataEnviar.codigoEmpresa.codigoEmpresa;
                dataEnviar.codigoMotivo = dataEnviar.codigoMotivo.codigoMotivo;
                $http.post(host + '/devolucionRest/rest/logistica/insertDevolutionClient/', dataEnviar)
                    .success(function (data) {
                        const usuario = vm.formData.nombre;
                        $scope.formData = {};
                        if (form1) {
                            form1.$setPristine();
                            form1.$setUntouched();
                            form2.$setPristine();
                            form2.$setUntouched();
                        }
                        $('#paso3').show();
                        vm.hoy = moment().format('DD-MM-YYYY');
                        $('#retornaDevolucion').html('<h4><strong><b>¡Hemos recibido tu solicitud!</b></strong></h4><br>' +
                            '<h4>Ya fue enviada a la Tienda con fecha <b style=color:#0033a0;>' + vm.hoy + '</b>, puedes <br>' + 
                            ' revisar la confirmación de la solicitud en tu email. </h4>'+
                            '<h4><b style=color:#0033a0;>Número de Devolución: '+data.idNumeroRequerimiento+'</b></h4>');
                        $('#paso2').hide();
                    })
                    .error(function (data) {
                        console.log('Error:' + data);
                    });
            };

            vm.cargarEcommerces = function (form) {
                $http.get(host + '/devolucionRest/rest/logistica/eCommerces')
                    .success(function (data) {
                        vm.formData.eCommerce = data;
                        vm.formData.codigoEmpresa = data[0];
                    })
                    .error(function (data) {
                        console.log('Error:' + data);
                    });
            };

            vm.cargarMotivos = function (form) {
                $http.get(host + '/devolucionRest/rest/logistica/motivos')
                    .success(function (data) {
                        vm.formData.motivos = data;
                        vm.formData.codigoMotivo = data[0];
                    })
                    .error(function (data) {
                        console.log('Error:' + data);
                    });
            };

            vm.ocultar = function () {
                $('#paso2').hide();
                $('#paso3').hide();
            }

            vm.goPasoDos = function () {
                $http.get(host + '/devolucionRest/rest/logistica/consultarOS/' + vm.formData.ordenCompra + '/' + vm.formData.codigoEmpresa.codigoEmpresa)
                    .success(function (data) {
                        if (true == data) {
                            $('#paso1').hide();
                            $('#paso2').show();
                            $('#paso3').hide();
                        } else {
                            $("#myModal").modal('show');
                            //window.alert('Nª Orden Servicio / Empresa no coinciden.');
                        }

                    })
                    .error(function (data) {
                        console.log('Error:' + data);
                    });

            };

            vm.goPasoUno = function () {
                window.location.reload();
            };

            vm.validarPaso2 = () => {
                return !vm.errors.rutFormato && !vm.errors.rutVacio;
            }

            vm.validarRut = () => {

                vm.formData.rut = vm.formData.rut.replace(/[^\d-k]/g, "")

                if (!vm.formData.rut) {
                    vm.errors.rutVacio = true;
                    vm.errors.rutFormato = false;
                    return;
                } else {
                    vm.errors.rutVacio = false;
                }

                if (!vm.validaRutUtil(vm.formData.rut)) {
                    vm.errors.rutFormato = true;
                } else {
                    vm.errors.rutFormato = false;
                }

            }

            vm.soloTextoNombre = () => {
                if(!vm.formData.nombre){
                    return;
                }

                if (!/^[ a-záéíóúüñ]*$/i.test(vm.formData.nombre)) {
                    vm.formData.nombre = vm.formData.nombre.replace(/[^ a-záéíóúüñ]+/ig,"");
                }
            }
            
            vm.soloNumeros = () => {
                if(!vm.formData.telefono){
                    return;
                }

                if (!/^([0-9])*$/i.test(vm.formData.telefono)) {
                    vm.formData.telefono = vm.formData.telefono.replace(/[^ 0-9]+/ig,"");
                }
            }

            vm.validaRutUtil = (rutCompleto) => {
                if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                    return false;
                var tmp = rutCompleto.split('-');
                var digv = tmp[1];
                var rut = tmp[0];
                if (digv == 'K') digv = 'k';
                return (vm.dvUtil(rut) == digv);
            }

            vm.dvUtil = (T) => {
                var M = 0, S = 1;
                for (; T; T = Math.floor(T / 10))
                    S = (S + T % 10 * (9 - M++ % 6)) % 11;
                return S ? S - 1 : 'k';
            }


        }]);