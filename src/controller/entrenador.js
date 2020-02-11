class EntrenadorController {

    constructor(entrenadoresService, pokemonesService, pokeparadasService) { //entrenadorService (servicio listado Entrenadores) / pokemonService (servicio listado pokemones)
        this.entrenadorService = entrenadoresService
        this.pokemonService = pokemonesService
        this.pokeparadaService = pokeparadasService
        this.oponentes = []
        this.pokemones = []
        this.pokeparadas = []
        this.pokemonSeleccionado = null
        this.pokemonPeleaSeleccionado = null
        this.oponenteSeleccionado = null
        this.pokemonSalvajeSeleccionado = null
        this.pokeparadaSeleccionada = null
        this.pokeballSeleccionada = null
        this.resultadoCaptura = false
        this.resultadoBatalla = false
        this.nombrePokemon
        this.entrenador = entrenadoresService.usuario
        this.getDatos()
    }

    getDatos() {
        this.getEntrenador()
        this.updateDatos()
    }

    updateDatos() {
        this.updateOponentes()
        this.updatePokemones()
        this.updatePokeparadas()
    }

    updateOponentes() {
        this.entrenadorService.updateOponentes(this.entrenador, (response) => {
            this.getOponentes()
        })
    }

    updatePokemones() {
        this.pokemonService.updatePokemones(this.entrenador, (response) => {
            this.getPokemones()
        })
    }

    updatePokeparadas() {
        this.pokeparadaService.updatePokeparadas(this.entrenador, (response) => {
            this.getPokeparadas()
        })
    }

    getOponentes() {
        this.entrenadorService.findAll((response) => {
            this.oponentes = _.map(response.data, Entrenador.asEntrenador)
        })
    }

    getPokemones() {
        this.pokemonService.findAll((response) => {
            this.pokemones = _.map(response.data, Pokemon.asPokemon)
        })
    }

    getEntrenador() {
        this.entrenadorService.user((response) => {
            this.entrenador = _.first(_.map(response.data, Entrenador.asEntrenador))
            this.getPokemonesEntrenador()
            this.getInventario()
        })
    }

    getPokeparadas() {
        this.pokeparadaService.findAll((response) => {
            this.pokeparadas = _.map(response.data, Pokeparada.asPokeparada)
        })
    }

    getPokemonesEntrenador() {
        this.pokemonService.userPokemones((response) => {
            this.setEquipoEntrenador(response.data, this.entrenador)
        })
    }

    setEquipoEntrenador(unArrayJson, unEntrenador) {
        let especieAux = null
        let pokeAux = null
        unEntrenador.equipo = []
        unEntrenador.pokemonesAtrapados = []
        unArrayJson.forEach(function (element, index, unArrayJson) {
            especieAux = new Especie(element.especie.nombre, _.map(element.especie.tipos, Tipo.asTipo))
            pokeAux = new Pokemon(element.nombrePokemon,
                especieAux,
                element.experiencia,
                element.puntosDeVida,
                element.genero,
                element.puntosDeVidaMax,
                element.idRepo,
                element.idPokemon,
                element.estado)
            unEntrenador.agregarPokemon(pokeAux)
        })
    }

    getInventario() {
        this.entrenadorService.items((response) => {
            this.setInventario(response.data, this.entrenador)
        })
    }

    setInventario(array, entrenador) {
        array.forEach(function (element, index, array) {
            let item = {
                "id": element.id,
                "nombre": element.nombre
            }
            entrenador.inventario.set(item, element.cantidad)
        })
    }

    moverNorteCtrl() {
        this.entrenador.moverNorte()
        this.updateDatos()
    }

    moverEsteCtrl() {
        this.entrenador.moverEste()
        this.updateDatos()
    }

    moverOesteCtrl() {
        this.entrenador.moverOeste()
        this.updateDatos()
    }

    moverSurCtrl() {
        this.entrenador.moverSur()
        this.updateDatos()
    }

    seleccionarPokemon(unPokemon) {
        this.pokemonSeleccionado = unPokemon
    }

    seleccionarPokemonPelea(unPokemon) {
        this.pokemonPeleaSeleccionado = unPokemon
    }

    seleccionarOponente(unOponente) {
        this.oponenteSeleccionado = unOponente
    }

    seleccionarPokeparada(unaPokeparada) {
        this.pokeparadaSeleccionada = unaPokeparada
    }

    seleccionarPokemonSalvaje(unPokemon) {
        this.pokemonSalvajeSeleccionado = unPokemon
        this.nombrePokemon = unPokemon.nombre
    }

    cambiarNombrePokemon() {
        this.entrenador.cambiarNombrePokemon(this.pokemonSalvajeSeleccionado, document.getElementById('nombrePokemon').value)
    }

    curarPokemones() {
        this.pokeparadaService.curarEquipo(this.pokeparadaSeleccionada.id, this.createJsonEquipo(), (response) => {
            this.getPokemonesEntrenador()
        })
    }

    equipoNoVacio() {
        return this.entrenador.equipoNoVacio()
    }

    pokemonSeleccionadoNulo() {
        return this.pokemonSeleccionado == null
    }

    consecuenciasBatalla() {
        this.entrenador.consecuenciasBatalla(this.oponenteSeleccionado.apuesta)
    }

    seleccionarPokeball(unaPokeball) {
        this.pokeballSeleccionada = unaPokeball
        this.atraparPokemonConNombre()
    }

    atraparPokemonConNombre() {
        //Creacion de un nuevo Pokemon para agregar al equipo
        //con los mismos datos iguales al pokemon salvaje
        // excepto el nombre
        var pokemonNuevo = new Pokemon("",
            this.pokemonSalvajeSeleccionado.especie,
            this.pokemonSalvajeSeleccionado.experiencia,
            this.pokemonSalvajeSeleccionado.puntosDeVida,
            this.pokemonSalvajeSeleccionado.genero,
            this.pokemonSalvajeSeleccionado.puntosVidaMax,
            this.pokemonSalvajeSeleccionado.idRepo)
        this.atraparPokemon(pokemonNuevo)
    }

    atraparPokemon(pokemonNuevo) {
        let idPokeball = this.entrenador.idItemPorNombre(this.pokeballSeleccionada)
        let resultado = null
        this.pokemonService.catchPokemon(idPokeball, this.pokemonSalvajeSeleccionado, (response) => {
            resultado = response.data
            this.entrenador.atraparPokemon(response.data, pokemonNuevo, this.pokeballSeleccionada)
            this.updateItems()
            this.setResultadoCaptura(resultado)
        })
    }

    setResultadoCaptura(unBoolean) {
        this.resultadoCaptura = unBoolean
    }

    updateItems() {
        this.entrenadorService.updateItems(this.createJsonInventario(), (response) => {
            this.getInventario()
            this.getEntrenador()
        })
    }

    createJsonInventario() {
        let object = {
            "id": [],
            "cantidad": []
        }
        this.entrenador.inventario.forEach(function (key, value, inventario) {
            object.id.push(value.id)
            object.cantidad.push(key)
        })
        return object
    }

    cambiarNombrePokemonSeleccionado() {
        if (this.nombrePokemon == "" || this.nombrePokemon == undefined || this.nombrePokemon == null) {
            this.nombrePokemon = this.pokemonSalvajeSeleccionado.especie.nombre
        }
        this.pokemonService.cambiarNombre(_.last(this.entrenador.pokemonesAtrapados), this.nombrePokemon, (response) => {
            this.getPokemonesEntrenador()
        })
        this.pokemonSalvajeSeleccionado = null
    }

    batalla() {
        let resultado = false
        this.entrenadorService.batallaGanada(this.oponenteSeleccionado, this.pokemonPeleaSeleccionado, (response) => {
            resultado = response.data
            this.getEntrenador()
            this.setResultadoBatalla(resultado)
        })
    }

    setResultadoBatalla(unBoolean) {
        this.resultadoBatalla = unBoolean
    }

    setSeleccionNull() {
        this.pokemonSeleccionado = null
        this.pokemonPeleaSeleccionado = null
        this.oponenteSeleccionado = null
        this.pokemonSalvajeSeleccionado = null
        this.pokeparadaSeleccionada = null
        this.pokeballSeleccionada = null
    }

    createJsonEquipo() {
        let array = []
        this.entrenador.equipo.forEach(function (element, index, equipo) {
            array.push({
                "idPokemon": element.idPokemon,
                "idRepo": element.idRepo,
                "puntosDeVida": element.puntosDeVida,
                "experiencia": element.experiencia
            })
        })
        return array
    }

    pokemonConVida() {
        return this.pokemonPeleaSeleccionado != null && this.pokemonPeleaSeleccionado.puntosDeVida > 0
    }

}

class NavController { //Controlador NavBar

    constructor($state) {
        this.$state = $state //Estado de Ui-View (retorna en que pantalla esta)
    }

    elMundo() {
        this.$state.go("elMundo")
    }

    entrenador() {
        this.$state.go("entrenador")
    }


}