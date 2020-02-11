class Especie {
    constructor(unNombre, unosTipos) {
        this.nombre = unNombre
        this.tipos = unosTipos
    }

    static asEspecie(jsonEspecie){
        return angular.extend(new Especie(), jsonEspecie)
    }

    fuerteA(listaTipos) {
        return this.tipos.checkTiposFuertes(listaTipos)
    }

    resistenteA(listaTipos) {
       return this.tipos.checkTiposResistentes(listaTipos)
    }

}