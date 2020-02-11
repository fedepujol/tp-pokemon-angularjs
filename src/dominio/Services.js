class EntrenadorService {
    constructor($http) {
        this.$http = $http
        this.usuario = new Entrenador("Red", -38.598, -58.236, [], 1, 1)

    }

    findAll(callback) {
        this.$http.get('/oponentes').then(callback)
    }

    user(callback) {
        this.$http.get('/user').then(callback)
    }

    items(callback) {
        this.$http.get('/inventarioEntrenador').then(callback)
    }

    updateItems(unArray, callback) {
        this.$http.put('/updateItems/', unArray).then(callback)
    }

    updateOponentes(unEntrenador, callback){
        this.$http.put('/oponentesUbicacion/', unEntrenador.ubicacion).then(callback)
    }

    setUsuario(response) {
        this.user((response) => {
            this.usuario = _.map(response.data, Entrenador.asEntrenador)
        })
    }

    batallaGanada(unOponente, unPokemonElegido, callback) {
        this.$http.put('/batalla/' + unOponente.id + '/' + _.first(unOponente.pokemonesAtrapados).idPokemon + '/' + unPokemonElegido.idPokemon,
                            unOponente.apuesta).then(callback)
    }
}

class PokemonService {
    constructor($http) {
        this.$http = $http
    }

    findAll(callback) {
        this.$http.get('/pokemones').then(callback)
    }

    catchPokemon(unIdPokeball, unPokemon, callback) {
        this.$http.put('/atraparPokemon/' + unPokemon.idRepo + '/' + unIdPokeball).then(callback)
    }

    userPokemones(callback) {
        this.$http.get('/pokemonesEntrenador').then(callback)
    }

    updateTeam(unArray, callback) {
        this.$http.put('/updateTeam/', unArray).then(callback)
    }

    cambiarNombre(unPokemon, unNombre, callback) {
        this.$http.put('/nombrePokemon/' + unPokemon.idPokemon, unNombre).then(callback)
    }

    updatePokemones(unEntrenador, callback){
        this.$http.put('/pokemonesUbicacion/', unEntrenador.ubicacion).then(callback)
    }
}

class PokeparadaService {
    constructor($http) {
        this.$http = $http
    }

    findAll(callback) {
        this.$http.get('/pokeparadas').then(callback)
    }

    curarEquipo(unIdPokeparada, unArray, callback){
        this.$http.put('/curarEquipo/' + unIdPokeparada, unArray).then(callback)
    }

    updatePokeparadas(unEntrenador, callback){
        this.$http.put('/pokeparadasUbicacion/', unEntrenador.ubicacion).then(callback)
    }

}