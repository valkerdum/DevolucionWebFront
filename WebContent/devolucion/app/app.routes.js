var app = angular.module('myAppRouter', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('productos', {
            url: '/dashboard',
            views: {
                header: {
                    templateUrl: 'app/components/header/header.html'
                },
                content: {
                    templateUrl: 'app/components/productos/lista-productos/lista-productos.html',
                    css: 'app/components/productos/lista-productos/lista-productos.css'
                },
                footer: {
                    templateUrl: 'app/components/footer/footer.html'
                }
            }
        })
        .state('detalleProducto', {
            url: '/dashboard/detalleProducto',
            views: {
                header: {
                    templateUrl: 'app/components/header/header.html'
                },
                content: {
                    templateUrl: 'app/components/productos/detalle-producto/detalle-producto.html'
                },
                footer: {
                    templateUrl: 'app/components/footer/footer.html'
                }
            }
        })
        .state('login', {
            url: '/login',
            views: {
                header: {
                    templateUrl: 'app/components/header/header.html'
                },
                content: {
                    templateUrl: 'app/components/login/login.html'
                },
                footer: {
                    templateUrl: 'app/components/footer/footer.html'
                }
            }
        })
        .state('consultar', {
            url: '/consultar',
            views: {
                header: {
                    templateUrl: 'app/components/header/header.html'
                },
                content: {
                    templateUrl: 'app/components/consultar/buscarDevolucion.html'
                },
                footer: {
                    templateUrl: 'app/components/footer/footer.html'
                }
            }
        })
        .state('ingresar', {
            url: '/ingresar',
            views: {
                header: {
                    templateUrl: 'app/components/header/header.html'
                },
                content: {
                    templateUrl: 'app/components/ingresar/ingresoDevolucion.html'
                },
                footer: {
                    templateUrl: 'app/components/footer/footer.html'
                }
            }
        })


});