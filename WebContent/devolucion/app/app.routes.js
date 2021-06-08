var app = angular.module('myAppRouter', ['ui.router', 'headerDinamicoModule']);

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
                    templateUrl: 'app/components/header-dinamico/header-edicion.html',
                    controller: 'headerDinamicoCtrl as hdCtrl'                    
                },
                content: {
                    templateUrl: 'app/components/ingresar/ingresoDevolucion.html'
                },
                footer: {
                    templateUrl: 'app/components/footer-dinamico/footer-dinamico.html'
                }
            }
        })
        .state('disenoConfig', {
            url: '/diseno-config',
            views: {
                content: {
                    templateUrl: 'app/components/diseno-config/diseno-config.html'
                }
            }
        })
        .state('dashboard-edicion', {
            url: '/dashboard-edicion',
            views: {
                header: {
                    templateUrl: 'app/components/header/header.html',
                    controller: 'headerDinamicoCtrl as hdCtrl'                    
                },
                content: {
                    templateUrl: 'app/components/dashboard/dashboard.html'
                }
                ,
                footer: {
                    templateUrl: 'app/components/footer-dinamico/footer-dinamico.html'
                }
            }
        })
        .state('generar-reporte', {
            url: '/generar-reporte',
            views: {
                header: {
                    templateUrl: 'app/components/header/header.html',
                    controller: 'headerDinamicoCtrl as hdCtrl'                    
                },
                content: {
                    templateUrl: 'app/components/generar-reporte/generar-reporte.html'
                }
                ,
                footer: {
                    templateUrl: 'app/components/footer-dinamico/footer-dinamico.html'
                }
            }
        })
        .state('panel-admin', {
            url: '/panel-admin',
            views: {
                header: {
                    templateUrl: 'app/components/header/header.html',
                    controller: 'headerDinamicoCtrl as hdCtrl'                    
                },
                content: {
                    templateUrl: 'app/components/panel-admin/panel-admin.html'
                }
                ,
                footer: {
                    templateUrl: 'app/components/footer-dinamico/footer-dinamico.html'
                }
            }
        })
        .state('personalizar-sitio', {
            url: '/personalizar-sitio',
            views: {
                header: {
                    templateUrl: 'app/components/header/header.html',
                    controller: 'headerDinamicoCtrl as hdCtrl'                    
                },
                content: {
                    templateUrl: 'app/components/personalizar-sitio/personalizar-sitio.html'
                }
                ,
                footer: {
                    templateUrl: 'app/components/footer-dinamico/footer-dinamico.html'
                }
            }
        })


})