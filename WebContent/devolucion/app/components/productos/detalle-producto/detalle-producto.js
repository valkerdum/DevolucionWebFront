angular.module('productosModule')
    .controller('detalleProductoCtrl',
        ['$scope', '$http', '$state', 'productoService', 'loginService','$location', function ($scope, $http, $state, productoService, loginService,$location) {
            var vm = this;
            var mensajeActualizacion = '';
            var host = $location.protocol()+'://'+$location.host()+':'+$location.port();
            vm.producto = angular.copy(productoService.producto);
            
            if (!vm.producto) {
                $state.go('productos');
            }

            vm.producto.accion = '0';
            vm.enviar = () => {
            	var dataUpd = {"codigoDevolucion":vm.producto.cdgSeqReq, 
            			"motivoDevolucion":vm.producto.accion, 
            			"descripcionDevolucion":vm.producto.motivo,
            			"nombreCliente":vm.producto.nombreCliente,
            			"emailCliente":vm.producto.emailCliente,
            			"numeroRequerimiento":vm.producto.numeroRequerimiento};
            	$http.post(host+'/devolucionRest/rest/logistica/dashboard/updateDevolucion', dataUpd)
                .success(function(data) {
                	vm.mensajeActualizacion = 'Se ha realizado la actualización de manera Exitosa.';
                	$("#myModal").modal('show');
                	//$state.go('productos');
                })
                .error(function(data) {
                	vm.mensajeActualizacion = 'Ha ocurrido un error en la actualización de la devolución.';
                	$("#myModal").modal('show');
                    console.log('Error:' + data);
                });
            }

            vm.validar = () => {
                return vm.producto.accion === '4' ||
                    (vm.producto.accion === '2' && vm.producto.motivo && vm.producto.motivo.trim() !== '');
            }

            vm.volver = () => {
            	$("#myModal").modal('hide');
                $state.go('productos');
            }

        }]);