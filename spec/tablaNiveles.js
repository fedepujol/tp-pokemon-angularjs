describe('Test TablaNiveles', () => {
    let tabla

    beforeEach(() => {
        tabla = new TablaNiveles()
        tabla.agregarNivel(1, 0)
        tabla.agregarNivel(2, 300)
    })

    it('Tabla sin mapa de niveles devuelve 1 por defecto', () => {
        tabla.tabla.clear() //Se borran las entradas del Mapa
        expect(1).toBe(tabla.getNivel(6548)) //Ingreso experiencia superior al nivel 1
    })

    it('Experiencia 0 devuelve Nivel 1', () => {
        expect(1).toBe(tabla.getNivel(0))
    })

    it('Experiencia 400 devuelve Nivel 2', () => {
        expect(2).toBe(tabla.getNivel(400))
    })
})