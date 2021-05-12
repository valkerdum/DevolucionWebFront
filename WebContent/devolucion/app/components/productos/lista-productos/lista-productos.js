angular.module('productosModule')
    .controller('listaProductosCtrl', [
        '$scope',
        '$http',
        '$state',
        '$filter',
        'productoService',
        '$location',
        function ($scope, $http, $state, $filter, productoService, $location) {
            var vm = this;
            var host = $location.protocol() + '://' + $location.host() + ':' + $location.port();
            vm.today = moment().add(1, 'days').format('YYYY-MM-DD');
            vm.dateRange = 90;
            vm.minDate = '2020-11-01';

            vm.desde = moment().subtract(30, 'days').format('DD-MM-YYYY');
            vm.hasta = moment().format('DD-MM-YYYY');

            vm.init = function () {
                vm.buscar();
            };

            vm.pendientes = {};
            vm.aceptadas = {};
            vm.rechazadas = {};
            vm.loadingProductos = true;

            vm.pageSize = 10;
            vm.pages = [];
            vm.page = 0;
            vm.productosPaginados;
            vm.productosFiltrados;
            vm.filtro = "";

            vm.producto;

            vm.buscar = function () {
            	console.log("desde: " + vm.desde);
            	console.log("hasta" + vm.hasta);
            	var filtroFechas = {
                        "fechaInicio": vm.desde,
                        "fechaFin": vm.hasta
                    };
                vm.error = false;
                vm.loadingProductos = true;
                vm.producto = undefined;
                $http.post(host + '/devolucionRest/rest/logistica/dashboard/eCommerce', filtroFechas)
                    .success(function (data) {
                    	if(data === "false"){
                    		$state.go('login');
                    	}else{                    		
                    		vm.productos = data.lstDevoluciones;
                    		vm.filtrar();
                    		vm.pendientes = data.pendientes;
                    		vm.aceptadas = data.aceptados;
                    		vm.rechazadas = data.rechazados;
                    		vm.loadingProductos = false;
                    		vm.etiquetas = ['Pendientes', 'Aprobados', 'Rechazados'];
                    	}
                    })
                    .error(() => {
                        vm.loadingProductos = false;
                        vm.error = true;
                        console.log('Error:' + data);
                    });
            }

            vm.filtrar = () => {
                let filtro = vm.filtro.trim();
                if (filtro.length > 3) {
                    vm.productosFiltrados = $filter('filter')(vm.productos, filtro, false);
                } else {
                    vm.productosFiltrados = vm.productos;
                }

                vm.pages = new Array((vm.productosFiltrados.length / vm.pageSize | 0) + 1);
                vm.toPage(0);
            }

            vm.toPage = (page) => {
                vm.page = page;
                vm.productosPaginados = vm.productosFiltrados.slice(page * vm.pageSize, (page + 1) * vm.pageSize);
            }

            vm.goToDetail = (producto) => {
                if (producto.estadoDevolucion === 'Pendiente') {
                    if (vm.producto && vm.producto.numeroRequerimiento == producto.numeroRequerimiento) {
                        vm.producto = undefined;
                    } else {
                        vm.producto = producto;
                    }
                }
            }

            vm.sendStatus = () => {

                vm.mensajeActualizacion = "Enviando actualización..."
                $("#myModal").modal('show');
                var dataUpd = {
                    "codigoDevolucion": vm.producto.cdgSeqReq,
                    "motivoDevolucion": vm.producto.accion,
                    "descripcionDevolucion": vm.producto.motivo,
                    "nombreCliente": vm.producto.nombreCliente,
                    "emailCliente": vm.producto.emailCliente,
                    "numeroRequerimiento": vm.producto.numeroRequerimiento
                };
                $http.post(host + '/devolucionRest/rest/logistica/dashboard/updateDevolucion', dataUpd)
                    .success(function (data) {
                        vm.mensajeActualizacion = 'Se ha realizado la actualización de manera Exitosa.';
                    })
                    .error(function (data) {
                        vm.mensajeActualizacion = 'Ha ocurrido un error en la actualización de la devolución.';
                        console.log('Error:' + data);
                    });
            }

            vm.validar = () => {
                return vm.producto && (vm.producto.accion === '4' ||
                    (vm.producto.accion === '2' && vm.producto.motivo && vm.producto.motivo.trim() !== ''));
            }

            vm.dateYYYYMMDD = (dateDDMMYYYY) => {
                return moment(dateDDMMYYYY, "DD-MM-YYYY").format('YYYY-MM-DD');
            }

            vm.filtrarGrilla = (valor) => {
                vm.filtro = valor;
                vm.filtrar();
            }

        }]);
