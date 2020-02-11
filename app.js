angular.module('pokemonAlgoApp', ['ui.router'])
    .filter('inventario', function(){
        return function(input){
            var out = {}
            input.forEach((v, k) => out[k.nombre] = v)
            return out
        }
    })
    .filter('inventarioCaptura', function(){
        return function(input){
            var out = {}
            input.forEach((v, k) => {
                if(k.nombre.includes('ball')){
                    out[k.nombre] = v
                }
            })
            return out
        }
    })   
    .service('entrenadoresService', EntrenadorService)
    .service('pokemonesService', PokemonService)
    .service('pokeparadasService', PokeparadaService)
    .controller('NavController', NavController) //definicion nombre del controller
    .controller('EntrenadorController', EntrenadorController)
    .config(routes)