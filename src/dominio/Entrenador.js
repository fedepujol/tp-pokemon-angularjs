class Entrenador {
    constructor(unNombre, unaPosicionX, unaPosicionY, unEquipo, unIdPokemon, unaExp) {
        this.id = 0
        this.nombre = unNombre
        this.ubicacion = {
            'x': unaPosicionX,
            'y': unaPosicionY
        }
        this.experiencia = unaExp
        this.dinero = 0
        this.esExperto = false
        this.tablaNiveles = new TablaNiveles()
        this.equipo = unEquipo
        this.pokemonesAtrapados = unEquipo
        this.inventario = new Map()
        this.apuesta = 0
        this.idPokemon = unIdPokemon
    }

    static asEntrenador(jsonEntrenador) {
        return angular.extend(new Entrenador(), jsonEntrenador)
    }

    calcularNivel() {
        return this.tablaNiveles.getNivel(this.experiencia)
    }

    cambiarExperto() {
        this.esExperto = !this.esExperto
    }

    moverNorte() {
        return this.ubicacion.y = (parseFloat(this.ubicacion.y) + parseFloat(0.001)).toFixed(3)
    }

    moverSur() {
        return this.ubicacion.y = (parseFloat(this.ubicacion.y) - parseFloat(0.001)).toFixed(3)
    }

    moverEste() {
        return this.ubicacion.x = (parseFloat(this.ubicacion.x) + parseFloat(0.001)).toFixed(3)
    }

    moverOeste() {
        return this.ubicacion.x = (parseFloat(this.ubicacion.x) - parseFloat(0.001)).toFixed(3)
    }

    agregarPokemon(unPokemon) {
        if (unPokemon.estado) {
            this.equipo.push(unPokemon)
        }
        this.pokemonesAtrapados.push(unPokemon)
    }

    cambiarNombrePokemon(unPokemon, unNombre) {
        var index = this.pokemonesAtrapados.indexOf(unPokemon)
        this.pokemonesAtrapados[index].nombre = unNombre
    }

    equipoNoVacio() {
        return this.equipo.length > 0
    }

    agregarAInventario(unItem, unaCantidad) {
        if (this.inventario.get(unItem) === undefined) {
            this.inventario.set(unItem, unaCantidad)
        }
        this.inventario.set(unItem, this.inventario.get(unItem) + unaCantidad)
    }

    consecuenciasBatalla(unMonto) {
        this.dinero += unMonto
    }

    atraparPokemon(unBooleano, unPokemon, unaPokebola) {
        if (unBooleano) {
            this.agregarPokemon(unPokemon)
        }
        this.restarElemento(unaPokebola)
    }

    restarElemento(unaPokebola) {
        let obj = {}
        this.inventario.forEach(function(key, value, inventario){
            if(value.nombre.includes(unaPokebola)){
                obj = value
            }
        })
        this.inventario.set(obj, this.inventario.get(obj) - 1)
    }

    tienePokeballs(unaPokeball) {
        this.inventario.forEach(function(key, value, inventario){
            if (value.nombre.includes(unaPokeball)){
                return key > 0
            }
        })
    }

    idItemPorNombre(unaPokebola) {
        let items = []
        let id = null
        this.inventario.forEach(function(key, value, inventario){
            items.push(value)
        })
        items.forEach(function (element, index, items) {
            if (element.nombre.includes(unaPokebola)) {
                id = element.id
            }
        })
        return id
    }
}