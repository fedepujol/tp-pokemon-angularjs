const routes = ($stateProvider, $urlRouterProvider) => {

    $urlRouterProvider.otherwise("/") //Redireccion a la pagina origen

    $stateProvider
        .state('elMundo', { //Diferentes estado de las paginas (partials)
            url: "/", //Seteo de pagina origen
            templateUrl: "../partials/el_mundo.html", //Busqueda del partial
            controller: "EntrenadorController as entrenadorCtrl" //Controlador del partial
        })
        .state('entrenador', {
            url: "/entrenador",
            templateUrl: "../partials/entrenador.html", //Busqueda del partial
            controller: "EntrenadorController as entrenadorCtrl" //Controlador del partial
        })
}