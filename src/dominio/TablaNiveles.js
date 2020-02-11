class TablaNiveles {

    constructor() {
        this.tabla = new Map()
        this.agregarNivel(1, 0)
        this.agregarNivel(2, 1000)
        this.agregarNivel(3, 3000)
        this.agregarNivel(4, 6000)
        this.agregarNivel(5, 10000)
    }

    agregarNivel(unNivel, unaExperiencia) {
        this.tabla.set(unNivel, unaExperiencia)
    }

    getNivel(unaExperiencia) {
        let llave = 1
        this.tabla.forEach(function(value, key, tabla){
            if(unaExperiencia >= value){ // Se puede escribir el if como:
                llave = key              // unaExperiencia => value ? llave = key : 1
            }
        })
        return llave
    }
}