class Pokeparada {
    constructor(unId, unNombre, unaPosicionX, unaPosicionY) {
        this.id = unId
        this.nombre = unNombre
        this.ubicacion = {
            "x": unaPosicionX,
            "y": unaPosicionY
        }
    }

    static asPokeparada(jsonPokeparada) {
        return angular.extend(new Pokeparada(), jsonPokeparada)
    }

    curarPokemon(unEntrenador) {
        unEntrenador.pokemonesAtrapados.forEach(function (element, index, pokemonesAtrapados) {
            element.puntosDeVida = element.puntosDeVidaMax
        })
    }
}