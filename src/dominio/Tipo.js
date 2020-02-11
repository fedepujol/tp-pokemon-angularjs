class Tipo {
    constructor(unNombre) {
        this.nombre = unNombre
        this.tiposFuertes = []
        this.tiposResistentes = []
    }

    static asTipo(jsonTipo){
        return angular.extend(new Tipo(), jsonTipo)
    }

    checkTiposFuertes(unTipo) {
        return this.tiposFuertes.some(tipo => tipo.nombre === unTipo.nombre)
    }

    checkTiposResistentes(unTipo) {
        return this.tiposResistentes.some(tipo => tipo.nombre === unTipo.nombre)
    }
}