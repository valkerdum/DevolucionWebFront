var app = angular.module('myApp', ['datatables']);
app.controller('validateCtrl', function($scope, $http, $window, $q, $location) {
	$('#contenedorMensaje').hide();
	$scope.formData = {};
	$scope.mensaje = "";
	
	$scope.createTodo = function(form){
		var dataEnviar = angular.copy($scope.formData);
		dataEnviar.codigoEmpresa = dataEnviar.codigoEmpresa.codigoEmpresa;
		dataEnviar.codigoMotivo = dataEnviar.codigoMotivo.codigoMotivo;
        $http.post('http://localhost:8080/devolucionRest/rest/logistica/insertDevolutionClient/', dataEnviar)
            .success(function(data) {
            	const usuario = $scope.formData.nombre;
                $scope.formData = {};
                if (form) {
                    form.$setPristine();
                    form.$setUntouched();
                  }
                $('#paso3').show();
                $('#retornaDevolucion').html('<h4><strong><b>¡Hemos recibido tu solicitud!</b></strong></h4><br>'+
                		'<h4>Ya fue enviada al eCommerce, puedes <br> revisar la confirmación de la solicitud <br> en'+
                		' tu email. </h4>');
                $('#paso2').hide();
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
    
    $scope.buscarDevolucion = function(form){
    		console.log("numeroOC:" + this.formData.numeroOC);
    		$http.get('http://localhost:8080/devolucionRest/rest/logistica/devolucionClient/'+ $scope.formData.numeroOC)
            .success(function(data) {
            	console.log(data);
            	if(null != data.nombreCliente){        		
            		$('#mensaje').html('<p>Tu solicitud de devolución <b style=color:#0033a0> Nº' + $scope.formData.numeroOC +'</b> está </br>'+
            				'<strong>'+ data.estadoDevolucion + '</strong> por el eCommerce.</br></br>'+
            				 'Te sugerimos volver a consultar en los próximos días.</p></b>');
            	}else{
            		$('#mensaje').html('Solicitud no encontrada. </b>');
            	}
            	$('#formIngreso').hide();
            	$('#contenedorMensaje').show();
            	
            })
            .error(function(data) {
                console.log('Error:' + data);
                $('#mensaje').html('Ha ocurrido un error: </br>' + data + '</b>');
            	$('#contenedorMensaje').show();
            });
    };
    
    $scope.buscarDevolucionXId = function(form){
        $http.get('http://localhost:8080/devolucionRest/rest/logistica/buscarDevolucionxId/'+ $scope.formData.numeroOC)
        .success(function(data) {
        	if(false === (data)){
        		$window.location.href = "/devolucionRest/new/login.html";
                return $q.reject(data);
        	}else{   
        		$window.location.href = "/devolucionRest/new/consultaDevolucionXId.html";
                return $q.reject(data);
        	}
        })
        .error(function(data) {
            console.log('Error:' + data);
            $('#mensaje').html('Ha ocurrido un error: </br>' + data + '</b>');
        	$('#contenedorMensaje').show();
        });
    };
    
    $scope.cargarDevolucionXId = function(form){
    	console.log("id "+form);
    	console.log("id "+$scope.formData.numeroOC);
        $http.get('http://localhost:8080/devolucionRest/rest/logistica/buscarDevolucionxId/'+ $scope.formData.numeroOC)
        .success(function(data) {
        	console.log("aqui data: " + data);
        	//if(false === (data)){
        	//	$window.location.href = "/devolucionRest/new/login.html";
            //    return $q.reject(data);
        	//}else{   
        		$scope.formData.numOC = data.numeroRequerimiento;
        		$scope.formData.tipoProducto = data.nombreProducto;
        		$scope.formData.nombre = data.nombreCliente;
        		$scope.formData.motivo = data.motivoDevolucion;
        		$scope.formData.estado = data.estadoDevolucion;
        		$scope.formData.fecha = data.fechaIngresoDevolucion;
        	//}
        })
        .error(function(data) {
            console.log('Error:' + data);
            $('#mensaje').html('Ha ocurrido un error: </br>' + data + '</b>');
        	$('#contenedorMensaje').show();
        });
        
    };
    
    $scope.buscarUsuario = function(form){
        $http.post('http://localhost:8080/devolucionRest/rest/logistica/validaUser/', $scope.formData)
        .success(function(data) {
        	if("false"!=data){        		
        		$window.location.href = data;
        	}else{
        		$('#mensaje').html('Datos Inválidos </b>'); 
            	$('#contenedorMensaje').show();
        	}
        })
        .error(function(data) {
            console.log('Error:' + data);
        });
    };
    
    $scope.cargarEcommerces = function(form){
        $http.get('http://localhost:8080/devolucionRest/rest/logistica/eCommerces')
        .success(function(data) {
        	$scope.formData.eCommerce = data;
        	$scope.formData.codigoEmpresa=data[0];
        })
        .error(function(data) {
            console.log('Error:' + data);
        });
    };
    
    $scope.cargarMotivos = function(form){
        $http.get('http://localhost:8080/devolucionRest/rest/logistica/motivos')
        .success(function(data) {
        	$scope.formData.motivos = data;
        	$scope.formData.codigoMotivo=data[0];
        })
        .error(function(data) {
            console.log('Error:' + data);
        });
    };
    
    $scope.goPasoUno = function () {
    	window.location.reload();
    };

    $scope.goPasoDos = function () {
    	$http.get('http://localhost:8080/devolucionRest/rest/logistica/consultarOS/' + $scope.formData.ordenCompra+'/'+ 1)
        .success(function(data) {
        	if(true == data){
        		$('#paso1').hide();
        		$('#paso2').show();
        		$('#paso3').hide();        		
        	}else{
        		window.alert('Nª Orden Servicio / Empresa no coinciden.');
        	}
        	
        })
        .error(function(data) {
            console.log('Error:' + data);
        });
    	
    };
    
    $scope.goPasoTres = function () {
    	$('#paso1').hide();
    	$('#paso2').hide();
    	$('#paso3').show();
    };
    
    $scope.ocultar = function(){
    	$('#paso2').hide();
        $('#paso3').hide();
    }
    
});